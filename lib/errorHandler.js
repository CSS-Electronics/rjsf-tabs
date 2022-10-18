"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.fetchField = fetchField;
function fetchField(_ref) {
  var property = _ref.property,
      argument = _ref.argument;

  if (property === "instance") {
    return argument;
  } else {
    var fullField = property.startsWith("instance") ? property.substring(9) : property.substring(1);
    var nextArrSep = fullField.indexOf("[");
    var nextFieldSep = fullField.indexOf(".");
    var nextSeparator = nextArrSep != -1 && nextFieldSep != -1 ? Math.min(nextArrSep, nextFieldSep) : Math.max(nextArrSep, nextFieldSep);
    if (nextSeparator === -1) {
      return fullField;
    } else {
      return fullField.substring(0, nextSeparator);
    }
  }
}

var errorHandler = function errorHandler(navTree, transformErrors) {
  return function (errors) {
    var errorsWithNav = errors.map(function (error) {
      var field = fetchField(error);
      var activeNav = navTree.findActiveNav(field);
      if (activeNav && activeNav.length > 0) {
        return Object.assign({ activeNav: activeNav }, error);
      } else {
        return error;
      }
    });

    if (transformErrors) {
      return transformErrors(errorsWithNav);
    } else {
      return errorsWithNav;
    }
  };
};

exports.default = errorHandler;