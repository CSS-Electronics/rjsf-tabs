"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _utils = require("../utils");

var _extractSubNavs = require("./extractSubNavs");

var _extractSubNavs2 = _interopRequireDefault(_extractSubNavs);

var _extractTree = require("./extractTree");

var _util = require("./util");

var _extractSubUiSchema = require("./extractSubUiSchema");

var _extractSubUiSchema2 = _interopRequireDefault(_extractSubUiSchema);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var NavTree = function NavTree(schema, uiSchema) {
  _classCallCheck(this, NavTree);

  _initialiseProps.call(this);

  this.tree = (0, _extractTree.extractTree)(schema, uiSchema);
  this.schema = schema;
  this.uiSchema = uiSchema;
};

var _initialiseProps = function _initialiseProps() {
  var _this = this;

  this.updateActiveNav = function (activeNavs, relTree) {
    relTree = relTree ? relTree : (0, _extractTree.findRelTree)(_this.tree, activeNavs);
    var orderedNavs = (0, _extractSubNavs.orderNavByName)(Object.keys(relTree), _this.uiSchema);
    var nextNav = orderedNavs.find(function (nav) {
      return nav !== _utils.GENERIC_NAV;
    });
    if (nextNav) {
      activeNavs.push(nextNav);
      _this.updateActiveNav(activeNavs, relTree[nextNav]);
    }
  };

  this.findActiveNav = function (field) {
    return (0, _utils.findFieldNavs)(field, _this.uiSchema).map(function (nav) {
      return (0, _extractSubNavs.toNavConfOrDefault)(nav, _this.uiSchema);
    });
  };

  this.buildUiSchema = function (activeNav, tree, uiSchema, onNavChange) {
    var pos = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : 0;
    var navConfs = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : [];

    if (tree[_utils.GENERIC_NAV] && activeNav.length === pos) {
      var _tree$GENERIC_NAV = tree[_utils.GENERIC_NAV],
          fields = _tree$GENERIC_NAV.fields,
          aliases = _tree$GENERIC_NAV.aliases;


      (0, _extractSubUiSchema2.default)(fields, aliases, _this.uiSchema, uiSchema, _this.schema);

      if (navConfs.length > 0) {
        (0, _util.asNavField)(fields[0], navConfs, uiSchema);
      }
      navConfs = [];
    }

    if (activeNav.length === pos) {
      return uiSchema;
    }

    var nextTree = tree[activeNav[pos]];
    var nextNavConf = (0, _extractSubNavs2.default)(tree, _this.uiSchema, activeNav.slice(0, pos + 1), onNavChange);

    return _this.buildUiSchema(activeNav, nextTree, uiSchema, onNavChange, pos + 1, navConfs.concat(nextNavConf));
  };

  this.toSubForms = function (activeNav, onNavChange) {
    var hiddenUiSchema = (0, _util.toHiddenUiSchema)(_this.schema, _this.uiSchema);
    return _this.buildUiSchema(activeNav, _this.tree, hiddenUiSchema, onNavChange);
  };
};

exports.default = NavTree;