"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = extractSubUiSchema;

var _util = require("./util");

var restoreField = function restoreField(field, uiSchema, origUiSchema, schema) {
  var separatorIndex = field.indexOf(".");
  if (separatorIndex === -1) {
    uiSchema[field] = origUiSchema[field];
  } else {
    var parentField = field.substr(0, separatorIndex);
    var childField = field.substr(separatorIndex + 1);
    var parentFieldSchema = schema.properties[parentField];

    if (uiSchema[parentField]["ui:widget"] === "hidden") {
      delete uiSchema[parentField]["ui:widget"];
      delete uiSchema[parentField]["ui:field"];
      uiSchema[parentField] = (0, _util.toHiddenUiSchema)(parentFieldSchema, origUiSchema[parentField]);
    }

    restoreField(childField, uiSchema[parentField], origUiSchema[parentField], parentFieldSchema);
  }
};

function restoreFields(fields, uiSchema, origUiSchema, schema) {
  fields.forEach(function (field) {
    return restoreField(field, uiSchema, origUiSchema, schema);
  });
  return uiSchema;
}

function replaceAliases(aliases, uiSchema, origUiSchema) {
  Object.keys(aliases).forEach(function (field) {
    var alias = aliases[field];
    uiSchema[field] = origUiSchema[alias];
  });
}

function extractSubUiSchema(fields, aliases, origUiSchema) {
  var uiSchema = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};
  var schema = arguments[4];

  restoreFields(fields, uiSchema, origUiSchema, schema);
  replaceAliases(aliases, uiSchema, origUiSchema);

  return uiSchema;
}