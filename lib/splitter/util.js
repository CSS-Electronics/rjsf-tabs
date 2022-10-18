"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var asNavField = exports.asNavField = function asNavField(field, navConfs, uiSchema) {
  var separatorIndex = field.indexOf(".");
  if (separatorIndex === -1) {
    uiSchema[field] = {
      navConfs: navConfs,
      "ui:field": "nav",
      origUiSchema: uiSchema[field]
    };
  } else {
    var parentField = field.substr(0, separatorIndex);
    var childField = field.substr(separatorIndex + 1);

    asNavField(childField, navConfs, uiSchema[parentField]);
  }
};

function asHiddenField(field, uiSchema) {
  uiSchema[field] = {
    "ui:widget": "hidden",
    "ui:field": "hidden"
  };
}

var toHiddenUiSchema = exports.toHiddenUiSchema = function toHiddenUiSchema(_ref, uiSchema) {
  var properties = _ref.properties;

  var cleanUiSchema = Object.keys(properties).reduce(function (agg, field) {
    asHiddenField(field, agg);
    return agg;
  }, Object.assign({}, uiSchema));
  return cleanUiSchema;
};