"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;
exports.toNavConf = toNavConf;
exports.toNavConfOrDefault = toNavConfOrDefault;
exports.orderNavByName = orderNavByName;
exports.orderNavs = orderNavs;
exports.buildNavs = buildNavs;

var _utils = require("../utils");

function toNavConf(nav, _ref) {
  var _ref$navConf = _ref.navConf;
  _ref$navConf = _ref$navConf === undefined ? {} : _ref$navConf;
  var _ref$navConf$navs = _ref$navConf.navs,
      navs = _ref$navConf$navs === undefined ? [] : _ref$navConf$navs;

  return navs.find(function (conf) {
    return conf.nav === nav;
  });
}

function toNavConfOrDefault(nav, uiSchema) {
  var navConf = toNavConf(nav, uiSchema);
  return navConf ? navConf : { nav: nav };
}

function orderNavByName(navs, _ref2) {
  var _ref2$navConf = _ref2.navConf;
  _ref2$navConf = _ref2$navConf === undefined ? {} : _ref2$navConf;
  var _ref2$navConf$order = _ref2$navConf.order,
      order = _ref2$navConf$order === undefined ? [] : _ref2$navConf$order;

  if (!order || order.length === 0) {
    return navs;
  }

  var orderedNavs = navs.filter(function (nav) {
    return order.includes(nav);
  }).sort(function (a, b) {
    return order.indexOf(a) - order.indexOf(b);
  });
  if (orderedNavs.length === 0) {
    return navs;
  }
  if (orderedNavs.length == navs.length) {
    return orderedNavs;
  }

  var nonOrderedNavs = navs.filter(function (nav) {
    return !orderedNavs.includes(nav);
  });
  return orderedNavs.concat(nonOrderedNavs);
}

function orderNavs(navs, uiSchema) {
  var navNames = navs.map(function (_ref3) {
    var nav = _ref3.nav;
    return nav;
  });
  var orderedNavs = orderNavByName(navNames, uiSchema);
  return orderedNavs.map(function (ordNav) {
    return navs.find(function (_ref4) {
      var nav = _ref4.nav;
      return nav === ordNav;
    });
  });
}

function buildNavs(tree, uiSchema, activeNav) {
  var navs = Object.keys(tree).filter(function (nav) {
    return nav !== _utils.GENERIC_NAV;
  }).map(function (nav) {
    return toNavConfOrDefault(nav, uiSchema);
  }).map(function (nav) {
    return Object.assign({ isActive: nav.nav === activeNav }, nav);
  });
  var orderedNavs = orderNavs(navs, uiSchema);
  return { links: orderedNavs, activeNav: activeNav };
}

function extractSubNavs(tree, uiSchema, navPath, _onNavChange) {
  var activeNav = navPath[navPath.length - 1];
  var navs = buildNavs(tree, uiSchema, activeNav);
  if (navs && navs.links.length > 0) {
    return {
      navs: navs,
      onNavChange: function onNavChange(nav) {
        var selectedNav = navPath.length === 0 ? [nav] : navPath.slice(0, navPath.length - 1).concat([nav]);
        _onNavChange(selectedNav);
      }
    };
  } else {
    return undefined;
  }
}
exports.default = extractSubNavs;