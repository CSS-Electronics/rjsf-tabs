"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _utils = require("../utils");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function Nav(_ref) {
  var handleClick = _ref.handleClick,
      isActive = _ref.isActive,
      name = _ref.name,
      icon = _ref.icon;

  return _react2.default.createElement(
    "li",
    { onClick: handleClick, className: isActive ? "active" : null },
    _react2.default.createElement(
      "a",
      null,
      icon && _react2.default.createElement("span", { className: icon, "aria-hidden": "true" }),
      "\xA0",
      name
    )
  );
}

function Navs(_ref2) {
  var links = _ref2.navs.links,
      onNavChange = _ref2.onNavChange;

  var relLinks = links.filter(function (_ref3) {
    var nav = _ref3.nav;
    return nav !== _utils.GENERIC_NAV;
  });
  return _react2.default.createElement(
    "ul",
    { className: "nav nav-pills" },
    relLinks.map(function (_ref4, i) {
      var nav = _ref4.nav,
          name = _ref4.name,
          icon = _ref4.icon,
          isActive = _ref4.isActive;
      return _react2.default.createElement(Nav, {
        key: i,
        name: name ? name : nav,
        icon: icon,
        isActive: isActive,
        handleClick: function handleClick() {
          return onNavChange(nav);
        }
      });
    })
  );
}

exports.default = Navs;