"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _propTypes = require("prop-types");

var _propTypes2 = _interopRequireDefault(_propTypes);

var _Navs = require("./Navs");

var _Navs2 = _interopRequireDefault(_Navs);

var _HiddenField = require("./HiddenField");

var _HiddenField2 = _interopRequireDefault(_HiddenField);

var _NavField = require("./NavField");

var _NavField2 = _interopRequireDefault(_NavField);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var formWithNav = function formWithNav(FormComponent) {
  var NavComponent = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : _Navs2.default;

  var FormWithTabs = function (_Component) {
    _inherits(FormWithTabs, _Component);

    function FormWithTabs() {
      _classCallCheck(this, FormWithTabs);

      return _possibleConstructorReturn(this, (FormWithTabs.__proto__ || Object.getPrototypeOf(FormWithTabs)).apply(this, arguments));
    }

    _createClass(FormWithTabs, [{
      key: "render",
      value: function render() {
        var _props = this.props,
            _props$fields = _props.fields,
            fields = _props$fields === undefined ? {} : _props$fields,
            uiSchema = _props.uiSchema;

        var formConf = Object.assign({}, this.props, {
          uiSchema: uiSchema,
          fields: Object.assign({}, fields, {
            hidden: _HiddenField2.default,
            nav: (0, _NavField2.default)(NavComponent)
          })
        });
        return _react2.default.createElement(
          FormComponent,
          formConf,
          this.props.children
        );
      }
    }]);

    return FormWithTabs;
  }(_react.Component);

  FormWithTabs.propTypes = process.env.NODE_ENV !== "production" ? {
    navs: _propTypes2.default.shape({
      links: _propTypes2.default.array
    })
  } : {};

  return FormWithTabs;
};

exports.default = formWithNav;