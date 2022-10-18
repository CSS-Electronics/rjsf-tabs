"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _utils = require("./utils");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var navField = function navField(NavComponent) {
  return function (props) {
    var schema = props.schema,
        _props$uiSchema = props.uiSchema,
        navConfs = _props$uiSchema.navConfs,
        origUiSchema = _props$uiSchema.origUiSchema,
        fields = props.registry.fields,
        required = props.required,
        idSchema = props.idSchema,
        name = props.name;

    var FieldUI = (0, _utils.getFieldComponent)(props.schema, origUiSchema, fields);
    var fieldConf = Object.assign({}, props, { uiSchema: origUiSchema });

    return _react2.default.createElement(
      "div",
      null,
      navConfs.map(function (navConf, i) {
        return _react2.default.createElement(
          "div",
          { key: i },
          _react2.default.createElement(NavComponent, navConf),
          _react2.default.createElement("br", null)
        );
      }),
      _react2.default.createElement(
        "div",
        { className: origUiSchema.classNames },
        _react2.default.createElement(_utils.Label, {
          schema: schema,
          uiSchema: origUiSchema,
          name: name,
          required: required,
          idSchema: idSchema
        }),
        _react2.default.createElement(FieldUI, fieldConf)
      )
    );
  };
};

exports.default = navField;