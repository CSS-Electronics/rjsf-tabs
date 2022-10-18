"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.findRelTree = findRelTree;
exports.orderFields = orderFields;
exports.extractTree = extractTree;

var _utils = require("../utils");

function findRelTree(tree, navs) {
  return navs.reduce(function (pos, nav) {
    if (pos[nav] === undefined) {
      pos[nav] = {};
    }
    return pos[nav];
  }, tree);
}

function pushField(tree, field, uiAlias) {
  if (tree[_utils.GENERIC_NAV] === undefined) {
    tree[_utils.GENERIC_NAV] = {
      fields: [],
      aliases: {}
    };
  }
  tree[_utils.GENERIC_NAV].fields.push(field);
  if (uiAlias) {
    tree[_utils.GENERIC_NAV].aliases[field] = uiAlias;
  }
}

function fillSchemaConf(tree, schema, uiSchema) {
  var prefix = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : "";

  Object.keys(schema.properties).forEach(function (field) {
    var fieldSchema = schema.properties[field];
    var fieldUiSchema = uiSchema[field];
    var navs = (0, _utils.findFieldNavs)(field, uiSchema);
    var subTree = findRelTree(tree, navs);

    if (fieldSchema.type === "object" && fieldUiSchema) {
      fillSchemaConf(tree, fieldSchema, fieldUiSchema, prefix + field + ".");
    }
    pushField(subTree, prefix ? prefix + field : field);
  }, {});
}

function fillAliasesConf(tree, uiSchema) {
  var aliases = (0, _utils.getNavAliases)(uiSchema);
  Object.keys(aliases).forEach(function (field) {
    var fieldAlias = (0, _utils.toArray)(aliases[field]);
    fieldAlias.forEach(function (alias) {
      var navs = (0, _utils.findFieldNavs)(alias, uiSchema);
      var subTree = findRelTree(tree, navs);
      pushField(subTree, field, alias);
    });
  });
}

function orderFields(tree, fieldsOrder) {
  Object.keys(tree).forEach(function (nav) {
    if (nav === _utils.GENERIC_NAV) {
      var fields = tree[nav].fields;

      fields.sort(function (a, b) {
        return fieldsOrder.indexOf(a) - fieldsOrder.indexOf(b);
      });
    } else {
      orderFields(tree[nav], fieldsOrder);
    }
  });
}

function extractTree(schema, uiSchema) {
  var tree = {};

  fillSchemaConf(tree, schema, uiSchema);
  fillAliasesConf(tree, uiSchema);

  // Calculate field order, either with UI_ORDER or with natural order
  var fieldsOrder = uiSchema[_utils.UI_ORDER] ? uiSchema[_utils.UI_ORDER] : Object.keys(schema.properties);
  orderFields(tree, fieldsOrder);

  return tree;
}