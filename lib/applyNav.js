"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

exports.default = applyPagination;

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _propTypes = require("prop-types");

var _propTypes2 = _interopRequireDefault(_propTypes);

var _render = require("./render");

var _render2 = _interopRequireDefault(_render);

var _Navs = require("./render/Navs");

var _Navs2 = _interopRequireDefault(_Navs);

var _splitter = require("./splitter");

var _splitter2 = _interopRequireDefault(_splitter);

var _utils = require("./utils");

var _errorHandler = require("./errorHandler");

var _errorHandler2 = _interopRequireDefault(_errorHandler);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function applyPagination(FormComponent) {
  var NavComponent = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : _Navs2.default;

  var FormWithNavs = (0, _render2.default)(FormComponent, NavComponent);

  var FormWithPagination = function (_Component) {
    _inherits(FormWithPagination, _Component);

    function FormWithPagination(props) {
      _classCallCheck(this, FormWithPagination);

      var _this = _possibleConstructorReturn(this, (FormWithPagination.__proto__ || Object.getPrototypeOf(FormWithPagination)).call(this, props));

      _initialiseProps.call(_this);

      var _this$props = _this.props,
          _this$props$formData = _this$props.formData,
          formData = _this$props$formData === undefined ? {} : _this$props$formData,
          schema = _this$props.schema,
          uiSchema = _this$props.uiSchema,
          activeNav = _this$props.activeNav;


      activeNav = activeNav ? (0, _utils.toArray)(activeNav) : [];
      _this.navTree = (0, _splitter2.default)(schema, uiSchema);
      _this.navTree.updateActiveNav(activeNav, 0);

      _this.shouldUpdate = false;
      _this.formData = formData;
      _this.state = { activeNav: activeNav };
      return _this;
    }

    _createClass(FormWithPagination, [{
      key: "navTreeChanged",
      value: function navTreeChanged(_ref) {
        var schema = _ref.schema,
            uiSchema = _ref.uiSchema;

        return !(0, _utils.deepEquals)(schema, this.props.schema) || !(0, _utils.deepEquals)(uiSchema, this.props.uiSchema);
      }
    }, {
      key: "componentDidUpdate",
      value: function componentDidUpdate(nextProps) {
        var _this2 = this;

        if (this.props === nextProps) {
          return;
        }

        if (this.navTreeChanged(nextProps)) {
          this.navTree = (0, _splitter2.default)(nextProps.schema, nextProps.uiSchema);
          this.shouldUpdate = true;
        }

        if (nextProps.activeNav && !(0, _utils.deepEquals)(nextProps.activeNav, this.state.activeNav)) {
          this.setState(function () {
            _this2.shouldUpdate = true;
            return { activeNav: (0, _utils.toArray)(nextProps.activeNav) };
          });
        }

        if (nextProps.formData && !(0, _utils.deepEquals)(this.formData, nextProps.formData)) {
          this.formData = nextProps.formData;
          this.shouldUpdate = true;
        }
      }
    }, {
      key: "render",
      value: function render() {
        var uiSchema = this.navTree.toSubForms(this.state.activeNav, this.handleNavChange);

        var formProps = Object.assign({}, this.props, {
          uiSchema: uiSchema,
          transformErrors: (0, _errorHandler2.default)(this.navTree, this.props.transformErrors),
          formData: this.formData,
          onChange: this.handleOnChange
        });
        return _react2.default.createElement(
          FormWithNavs,
          formProps,
          this.props.children
        );
      }
    }]);

    return FormWithPagination;
  }(_react.Component);

  var _initialiseProps = function _initialiseProps() {
    var _this3 = this;

    this.handleNavChange = function (activeNav) {

      _this3.navTree.updateActiveNav(activeNav);

      var oldNav = _this3.state.activeNav;
      if ((0, _utils.deepEquals)(oldNav, activeNav)) {
        return;
      } else {
        _this3.setState(function () {
          _this3.shouldUpdate = true;
          return { activeNav: activeNav };
        });
      }

      if (_this3.props.onNavChange) {
        _this3.props.onNavChange(activeNav, oldNav);
      }
    };

    this.handleOnChange = function (state) {
      _this3.formData = state.formData;

      if (_this3.props.onChange) {
        _this3.props.onChange(state);
      }
    };
  };

  FormWithPagination.propTypes = process.env.NODE_ENV !== "production" ? {
    schema: _propTypes2.default.shape({
      type: function type(props, propName, componentName) {
        if (props[propName] !== "object") {
          return new Error("Only \"object\" schemas supported by pagination for " + componentName + ".");
        }
      }
    }),
    onNavChange: _propTypes2.default.func,
    uiSchema: _propTypes2.default.shape({
      navConf: _propTypes2.default.shape({
        aliases: _propTypes2.default.object,
        navs: _propTypes2.default.array,
        order: _propTypes2.default.array
      })
    })
  } : {};

  return FormWithPagination;
}