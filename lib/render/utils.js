"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getFieldComponent = getFieldComponent;
exports.Label = Label;

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var COMPONENT_TYPES = {
  array: "ArrayField",
  boolean: "BooleanField",
  integer: "NumberField",
  number: "NumberField",
  object: "ObjectField",
  string: "StringField"
};

function getFieldComponent(schema, uiSchema, fields) {
  var field = uiSchema["ui:field"];
  if (typeof field === "function") {
    return field;
  }
  if (typeof field === "string" && field in fields) {
    return fields[field];
  }
  var componentName = COMPONENT_TYPES[schema.type];
  return componentName in fields ? fields[componentName] : function () {
    return _react2.default.createElement(
      "h1",
      null,
      "Unknown field type ",
      schema.type
    );
  };
}

var REQUIRED_FIELD_SYMBOL = "*";

function DefaultLabel(props) {
  var label = props.label,
      required = props.required,
      id = props.id;

  if (!label) {
    // See #312: Ensure compatibility with old versions of React.
    return _react2.default.createElement("div", null);
  }
  return _react2.default.createElement(
    "label",
    { className: "control-label", htmlFor: id },
    required ? label + REQUIRED_FIELD_SYMBOL : label
  );
}

function Label(_ref) {
  var _ref$schema = _ref.schema,
      type = _ref$schema.type,
      title = _ref$schema.title,
      uiSchema = _ref.uiSchema,
      name = _ref.name,
      required = _ref.required,
      idSchema = _ref.idSchema;

  var label = uiSchema["ui:title"] || title || name;
  var _uiSchema$uiOptions = uiSchema["ui:options"];
  _uiSchema$uiOptions = _uiSchema$uiOptions === undefined ? {} : _uiSchema$uiOptions;
  var _uiSchema$uiOptions$l = _uiSchema$uiOptions.label,
      displayLabel = _uiSchema$uiOptions$l === undefined ? true : _uiSchema$uiOptions$l;

  if (type === "object") {
    displayLabel = false;
  }
  if (type === "boolean" && !uiSchema["ui:widget"]) {
    displayLabel = false;
  }

  if (displayLabel) {
    return _react2.default.createElement(DefaultLabel, { label: label, required: required, id: idSchema["$id"] });
  } else {
    return null;
  }
}