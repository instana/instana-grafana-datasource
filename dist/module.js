define(["@grafana/data","@grafana/runtime","@grafana/ui","lodash","react"], function(__WEBPACK_EXTERNAL_MODULE__grafana_data__, __WEBPACK_EXTERNAL_MODULE__grafana_runtime__, __WEBPACK_EXTERNAL_MODULE__grafana_ui__, __WEBPACK_EXTERNAL_MODULE_lodash__, __WEBPACK_EXTERNAL_MODULE_react__) { return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./module.ts");
/******/ })
/************************************************************************/
/******/ ({

/***/ "../node_modules/css-loader/dist/cjs.js?!../node_modules/postcss-loader/src/index.js?!../node_modules/sass-loader/dist/cjs.js!./components/ApplicationServiceEndpointMetrics/ApplicationBoundaryScope.css":
/*!*************************************************************************************************************************************************************************************************************************!*\
  !*** ../node_modules/css-loader/dist/cjs.js??ref--8-1!../node_modules/postcss-loader/src??ref--8-2!../node_modules/sass-loader/dist/cjs.js!./components/ApplicationServiceEndpointMetrics/ApplicationBoundaryScope.css ***!
  \*************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// Imports
var ___CSS_LOADER_API_IMPORT___ = __webpack_require__(/*! ../../../node_modules/css-loader/dist/runtime/api.js */ "../node_modules/css-loader/dist/runtime/api.js");
exports = ___CSS_LOADER_API_IMPORT___(true);
// Module
exports.push([module.i, ".dropdown {\n  position: relative;\n  background: transparent;\n  width: \"32px\";\n  height: \"32px\";\n  margin-right: \"4px\";\n}\n\n.dropdown-list {\n  transition: max-height 0.2s ease-out;\n  max-height: 0;\n  overflow: hidden;\n  z-index: 2;\n  position: absolute;\n}\n\n.dropdown-list-active {\n  overflow: hidden;\n  z-index: 2;\n  /* we set a zIndex to ensure that the overlay is above other elements and does not move any DOM elements. */\n  max-height: 1000px;\n  opacity: 1;\n  position: absolute;\n}\n\n.iconTextContainer {\n  display: inline-flex;\n}\n\n.iconStyle {\n  display: flex;\n  align-items: center;\n  justify-content: center;\n}\n\n.iconTextStyle {\n  padding: 7px;\n}", "",{"version":3,"sources":["ApplicationBoundaryScope.css"],"names":[],"mappings":"AAAA;EACE,kBAAkB;EAClB,uBAAuB;EACvB,aAAa;EACb,cAAc;EACd,mBAAmB;AACrB;;AAEA;EACE,oCAAoC;EACpC,aAAa;EACb,gBAAgB;EAChB,UAAU;EACV,kBAAkB;AACpB;;AAEA;EACE,gBAAgB;EAChB,UAAU;EACV,2GAA2G;EAC3G,kBAAkB;EAClB,UAAU;EACV,kBAAkB;AACpB;;AAEA;EACE,oBAAoB;AACtB;;AAEA;EACE,aAAa;EACb,mBAAmB;EACnB,uBAAuB;AACzB;;AAEA;EACE,YAAY;AACd","file":"ApplicationBoundaryScope.css","sourcesContent":[".dropdown {\n  position: relative;\n  background: transparent;\n  width: \"32px\";\n  height: \"32px\";\n  margin-right: \"4px\";\n}\n\n.dropdown-list {\n  transition: max-height 0.2s ease-out;\n  max-height: 0;\n  overflow: hidden;\n  z-index: 2;\n  position: absolute;\n}\n\n.dropdown-list-active {\n  overflow: hidden;\n  z-index: 2;\n  /* we set a zIndex to ensure that the overlay is above other elements and does not move any DOM elements. */\n  max-height: 1000px;\n  opacity: 1;\n  position: absolute;\n}\n\n.iconTextContainer {\n  display: inline-flex;\n}\n\n.iconStyle {\n  display: flex;\n  align-items: center;\n  justify-content: center;\n}\n\n.iconTextStyle {\n  padding: 7px;\n}"]}]);
// Exports
module.exports = exports;


/***/ }),

/***/ "../node_modules/css-loader/dist/cjs.js?!../node_modules/postcss-loader/src/index.js?!../node_modules/sass-loader/dist/cjs.js!./components/plugin.css":
/*!*********************************************************************************************************************************************************************!*\
  !*** ../node_modules/css-loader/dist/cjs.js??ref--8-1!../node_modules/postcss-loader/src??ref--8-2!../node_modules/sass-loader/dist/cjs.js!./components/plugin.css ***!
  \*********************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// Imports
var ___CSS_LOADER_API_IMPORT___ = __webpack_require__(/*! ../../node_modules/css-loader/dist/runtime/api.js */ "../node_modules/css-loader/dist/runtime/api.js");
exports = ___CSS_LOADER_API_IMPORT___(true);
// Module
exports.push([module.i, ".entityDropdown {\n  min-width: 80px;\n}\n\n.settings {\n  max-width: 600px;\n}", "",{"version":3,"sources":["plugin.css"],"names":[],"mappings":"AAAA;EACE,eAAe;AACjB;;AAEA;EACE,gBAAgB;AAClB","file":"plugin.css","sourcesContent":[".entityDropdown {\n  min-width: 80px;\n}\n\n.settings {\n  max-width: 600px;\n}"]}]);
// Exports
module.exports = exports;


/***/ }),

/***/ "../node_modules/css-loader/dist/cjs.js?!../node_modules/postcss-loader/src/index.js?!../node_modules/sass-loader/dist/cjs.js!./instana-grafana.css":
/*!*******************************************************************************************************************************************************************!*\
  !*** ../node_modules/css-loader/dist/cjs.js??ref--8-1!../node_modules/postcss-loader/src??ref--8-2!../node_modules/sass-loader/dist/cjs.js!./instana-grafana.css ***!
  \*******************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// Imports
var ___CSS_LOADER_API_IMPORT___ = __webpack_require__(/*! ../node_modules/css-loader/dist/runtime/api.js */ "../node_modules/css-loader/dist/runtime/api.js");
exports = ___CSS_LOADER_API_IMPORT___(true);
// Module
exports.push([module.i, "path[d=\"M18.71,7.21a1,1,0,0,0-1.42,0L9.84,14.67,6.71,11.53A1,1,0,1,0,5.29,13l3.84,3.84a1,1,0,0,0,1.42,0l8.16-8.16A1,1,0,0,0,18.71,7.21Z\"] {\n  display: none;\n}", "",{"version":3,"sources":["instana-grafana.css"],"names":[],"mappings":"AAAA;EACE,aAAa;AACf","file":"instana-grafana.css","sourcesContent":["path[d=\"M18.71,7.21a1,1,0,0,0-1.42,0L9.84,14.67,6.71,11.53A1,1,0,1,0,5.29,13l3.84,3.84a1,1,0,0,0,1.42,0l8.16-8.16A1,1,0,0,0,18.71,7.21Z\"] {\n  display: none;\n}"]}]);
// Exports
module.exports = exports;


/***/ }),

/***/ "../node_modules/css-loader/dist/runtime/api.js":
/*!******************************************************!*\
  !*** ../node_modules/css-loader/dist/runtime/api.js ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/*
  MIT License http://www.opensource.org/licenses/mit-license.php
  Author Tobias Koppers @sokra
*/
// css base code, injected by the css-loader
// eslint-disable-next-line func-names
module.exports = function (useSourceMap) {
  var list = []; // return the list of modules as css string

  list.toString = function toString() {
    return this.map(function (item) {
      var content = cssWithMappingToString(item, useSourceMap);

      if (item[2]) {
        return "@media ".concat(item[2], " {").concat(content, "}");
      }

      return content;
    }).join('');
  }; // import a list of modules into the list
  // eslint-disable-next-line func-names


  list.i = function (modules, mediaQuery, dedupe) {
    if (typeof modules === 'string') {
      // eslint-disable-next-line no-param-reassign
      modules = [[null, modules, '']];
    }

    var alreadyImportedModules = {};

    if (dedupe) {
      for (var i = 0; i < this.length; i++) {
        // eslint-disable-next-line prefer-destructuring
        var id = this[i][0];

        if (id != null) {
          alreadyImportedModules[id] = true;
        }
      }
    }

    for (var _i = 0; _i < modules.length; _i++) {
      var item = [].concat(modules[_i]);

      if (dedupe && alreadyImportedModules[item[0]]) {
        // eslint-disable-next-line no-continue
        continue;
      }

      if (mediaQuery) {
        if (!item[2]) {
          item[2] = mediaQuery;
        } else {
          item[2] = "".concat(mediaQuery, " and ").concat(item[2]);
        }
      }

      list.push(item);
    }
  };

  return list;
};

function cssWithMappingToString(item, useSourceMap) {
  var content = item[1] || ''; // eslint-disable-next-line prefer-destructuring

  var cssMapping = item[3];

  if (!cssMapping) {
    return content;
  }

  if (useSourceMap && typeof btoa === 'function') {
    var sourceMapping = toComment(cssMapping);
    var sourceURLs = cssMapping.sources.map(function (source) {
      return "/*# sourceURL=".concat(cssMapping.sourceRoot || '').concat(source, " */");
    });
    return [content].concat(sourceURLs).concat([sourceMapping]).join('\n');
  }

  return [content].join('\n');
} // Adapted from convert-source-map (MIT)


function toComment(sourceMap) {
  // eslint-disable-next-line no-undef
  var base64 = btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap))));
  var data = "sourceMappingURL=data:application/json;charset=utf-8;base64,".concat(base64);
  return "/*# ".concat(data, " */");
}

/***/ }),

/***/ "../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js":
/*!*****************************************************************************!*\
  !*** ../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js ***!
  \*****************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var isOldIE = function isOldIE() {
  var memo;
  return function memorize() {
    if (typeof memo === 'undefined') {
      // Test for IE <= 9 as proposed by Browserhacks
      // @see http://browserhacks.com/#hack-e71d8692f65334173fee715c222cb805
      // Tests for existence of standard globals is to allow style-loader
      // to operate correctly into non-standard environments
      // @see https://github.com/webpack-contrib/style-loader/issues/177
      memo = Boolean(window && document && document.all && !window.atob);
    }

    return memo;
  };
}();

var getTarget = function getTarget() {
  var memo = {};
  return function memorize(target) {
    if (typeof memo[target] === 'undefined') {
      var styleTarget = document.querySelector(target); // Special case to return head of iframe instead of iframe itself

      if (window.HTMLIFrameElement && styleTarget instanceof window.HTMLIFrameElement) {
        try {
          // This will throw an exception if access to iframe is blocked
          // due to cross-origin restrictions
          styleTarget = styleTarget.contentDocument.head;
        } catch (e) {
          // istanbul ignore next
          styleTarget = null;
        }
      }

      memo[target] = styleTarget;
    }

    return memo[target];
  };
}();

var stylesInDom = [];

function getIndexByIdentifier(identifier) {
  var result = -1;

  for (var i = 0; i < stylesInDom.length; i++) {
    if (stylesInDom[i].identifier === identifier) {
      result = i;
      break;
    }
  }

  return result;
}

function modulesToDom(list, options) {
  var idCountMap = {};
  var identifiers = [];

  for (var i = 0; i < list.length; i++) {
    var item = list[i];
    var id = options.base ? item[0] + options.base : item[0];
    var count = idCountMap[id] || 0;
    var identifier = "".concat(id, " ").concat(count);
    idCountMap[id] = count + 1;
    var index = getIndexByIdentifier(identifier);
    var obj = {
      css: item[1],
      media: item[2],
      sourceMap: item[3]
    };

    if (index !== -1) {
      stylesInDom[index].references++;
      stylesInDom[index].updater(obj);
    } else {
      stylesInDom.push({
        identifier: identifier,
        updater: addStyle(obj, options),
        references: 1
      });
    }

    identifiers.push(identifier);
  }

  return identifiers;
}

function insertStyleElement(options) {
  var style = document.createElement('style');
  var attributes = options.attributes || {};

  if (typeof attributes.nonce === 'undefined') {
    var nonce =  true ? __webpack_require__.nc : undefined;

    if (nonce) {
      attributes.nonce = nonce;
    }
  }

  Object.keys(attributes).forEach(function (key) {
    style.setAttribute(key, attributes[key]);
  });

  if (typeof options.insert === 'function') {
    options.insert(style);
  } else {
    var target = getTarget(options.insert || 'head');

    if (!target) {
      throw new Error("Couldn't find a style target. This probably means that the value for the 'insert' parameter is invalid.");
    }

    target.appendChild(style);
  }

  return style;
}

function removeStyleElement(style) {
  // istanbul ignore if
  if (style.parentNode === null) {
    return false;
  }

  style.parentNode.removeChild(style);
}
/* istanbul ignore next  */


var replaceText = function replaceText() {
  var textStore = [];
  return function replace(index, replacement) {
    textStore[index] = replacement;
    return textStore.filter(Boolean).join('\n');
  };
}();

function applyToSingletonTag(style, index, remove, obj) {
  var css = remove ? '' : obj.media ? "@media ".concat(obj.media, " {").concat(obj.css, "}") : obj.css; // For old IE

  /* istanbul ignore if  */

  if (style.styleSheet) {
    style.styleSheet.cssText = replaceText(index, css);
  } else {
    var cssNode = document.createTextNode(css);
    var childNodes = style.childNodes;

    if (childNodes[index]) {
      style.removeChild(childNodes[index]);
    }

    if (childNodes.length) {
      style.insertBefore(cssNode, childNodes[index]);
    } else {
      style.appendChild(cssNode);
    }
  }
}

function applyToTag(style, options, obj) {
  var css = obj.css;
  var media = obj.media;
  var sourceMap = obj.sourceMap;

  if (media) {
    style.setAttribute('media', media);
  } else {
    style.removeAttribute('media');
  }

  if (sourceMap && btoa) {
    css += "\n/*# sourceMappingURL=data:application/json;base64,".concat(btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))), " */");
  } // For old IE

  /* istanbul ignore if  */


  if (style.styleSheet) {
    style.styleSheet.cssText = css;
  } else {
    while (style.firstChild) {
      style.removeChild(style.firstChild);
    }

    style.appendChild(document.createTextNode(css));
  }
}

var singleton = null;
var singletonCounter = 0;

function addStyle(obj, options) {
  var style;
  var update;
  var remove;

  if (options.singleton) {
    var styleIndex = singletonCounter++;
    style = singleton || (singleton = insertStyleElement(options));
    update = applyToSingletonTag.bind(null, style, styleIndex, false);
    remove = applyToSingletonTag.bind(null, style, styleIndex, true);
  } else {
    style = insertStyleElement(options);
    update = applyToTag.bind(null, style, options);

    remove = function remove() {
      removeStyleElement(style);
    };
  }

  update(obj);
  return function updateStyle(newObj) {
    if (newObj) {
      if (newObj.css === obj.css && newObj.media === obj.media && newObj.sourceMap === obj.sourceMap) {
        return;
      }

      update(obj = newObj);
    } else {
      remove();
    }
  };
}

module.exports = function (list, options) {
  options = options || {}; // Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
  // tags it will allow on a page

  if (!options.singleton && typeof options.singleton !== 'boolean') {
    options.singleton = isOldIE();
  }

  list = list || [];
  var lastIdentifiers = modulesToDom(list, options);
  return function update(newList) {
    newList = newList || [];

    if (Object.prototype.toString.call(newList) !== '[object Array]') {
      return;
    }

    for (var i = 0; i < lastIdentifiers.length; i++) {
      var identifier = lastIdentifiers[i];
      var index = getIndexByIdentifier(identifier);
      stylesInDom[index].references--;
    }

    var newLastIdentifiers = modulesToDom(newList, options);

    for (var _i = 0; _i < lastIdentifiers.length; _i++) {
      var _identifier = lastIdentifiers[_i];

      var _index = getIndexByIdentifier(_identifier);

      if (stylesInDom[_index].references === 0) {
        stylesInDom[_index].updater();

        stylesInDom.splice(_index, 1);
      }
    }

    lastIdentifiers = newLastIdentifiers;
  };
};

/***/ }),

/***/ "../node_modules/tslib/tslib.es6.js":
/*!******************************************!*\
  !*** ../node_modules/tslib/tslib.es6.js ***!
  \******************************************/
/*! exports provided: __extends, __assign, __rest, __decorate, __param, __metadata, __awaiter, __generator, __createBinding, __exportStar, __values, __read, __spread, __spreadArrays, __spreadArray, __await, __asyncGenerator, __asyncDelegator, __asyncValues, __makeTemplateObject, __importStar, __importDefault, __classPrivateFieldGet, __classPrivateFieldSet */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__extends", function() { return __extends; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__assign", function() { return __assign; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__rest", function() { return __rest; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__decorate", function() { return __decorate; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__param", function() { return __param; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__metadata", function() { return __metadata; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__awaiter", function() { return __awaiter; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__generator", function() { return __generator; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__createBinding", function() { return __createBinding; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__exportStar", function() { return __exportStar; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__values", function() { return __values; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__read", function() { return __read; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__spread", function() { return __spread; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__spreadArrays", function() { return __spreadArrays; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__spreadArray", function() { return __spreadArray; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__await", function() { return __await; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__asyncGenerator", function() { return __asyncGenerator; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__asyncDelegator", function() { return __asyncDelegator; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__asyncValues", function() { return __asyncValues; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__makeTemplateObject", function() { return __makeTemplateObject; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__importStar", function() { return __importStar; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__importDefault", function() { return __importDefault; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__classPrivateFieldGet", function() { return __classPrivateFieldGet; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__classPrivateFieldSet", function() { return __classPrivateFieldSet; });
/*! *****************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */
/* global Reflect, Promise */

var extendStatics = function(d, b) {
    extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
    return extendStatics(d, b);
};

function __extends(d, b) {
    if (typeof b !== "function" && b !== null)
        throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
    extendStatics(d, b);
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
}

var __assign = function() {
    __assign = Object.assign || function __assign(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
        }
        return t;
    }
    return __assign.apply(this, arguments);
}

function __rest(s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
}

function __decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}

function __param(paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
}

function __metadata(metadataKey, metadataValue) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(metadataKey, metadataValue);
}

function __awaiter(thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
}

function __generator(thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
}

var __createBinding = Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
});

function __exportStar(m, o) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(o, p)) __createBinding(o, m, p);
}

function __values(o) {
    var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
    if (m) return m.call(o);
    if (o && typeof o.length === "number") return {
        next: function () {
            if (o && i >= o.length) o = void 0;
            return { value: o && o[i++], done: !o };
        }
    };
    throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
}

function __read(o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
}

/** @deprecated */
function __spread() {
    for (var ar = [], i = 0; i < arguments.length; i++)
        ar = ar.concat(__read(arguments[i]));
    return ar;
}

/** @deprecated */
function __spreadArrays() {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
}

function __spreadArray(to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
}

function __await(v) {
    return this instanceof __await ? (this.v = v, this) : new __await(v);
}

function __asyncGenerator(thisArg, _arguments, generator) {
    if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
    var g = generator.apply(thisArg, _arguments || []), i, q = [];
    return i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i;
    function verb(n) { if (g[n]) i[n] = function (v) { return new Promise(function (a, b) { q.push([n, v, a, b]) > 1 || resume(n, v); }); }; }
    function resume(n, v) { try { step(g[n](v)); } catch (e) { settle(q[0][3], e); } }
    function step(r) { r.value instanceof __await ? Promise.resolve(r.value.v).then(fulfill, reject) : settle(q[0][2], r); }
    function fulfill(value) { resume("next", value); }
    function reject(value) { resume("throw", value); }
    function settle(f, v) { if (f(v), q.shift(), q.length) resume(q[0][0], q[0][1]); }
}

function __asyncDelegator(o) {
    var i, p;
    return i = {}, verb("next"), verb("throw", function (e) { throw e; }), verb("return"), i[Symbol.iterator] = function () { return this; }, i;
    function verb(n, f) { i[n] = o[n] ? function (v) { return (p = !p) ? { value: __await(o[n](v)), done: n === "return" } : f ? f(v) : v; } : f; }
}

function __asyncValues(o) {
    if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
    var m = o[Symbol.asyncIterator], i;
    return m ? m.call(o) : (o = typeof __values === "function" ? __values(o) : o[Symbol.iterator](), i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i);
    function verb(n) { i[n] = o[n] && function (v) { return new Promise(function (resolve, reject) { v = o[n](v), settle(resolve, reject, v.done, v.value); }); }; }
    function settle(resolve, reject, d, v) { Promise.resolve(v).then(function(v) { resolve({ value: v, done: d }); }, reject); }
}

function __makeTemplateObject(cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};

var __setModuleDefault = Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
};

function __importStar(mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
}

function __importDefault(mod) {
    return (mod && mod.__esModule) ? mod : { default: mod };
}

function __classPrivateFieldGet(receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
}

function __classPrivateFieldSet(receiver, state, value, kind, f) {
    if (kind === "m") throw new TypeError("Private method is not writable");
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
    return (kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value)), value;
}


/***/ }),

/***/ "./GlobalVariables.ts":
/*!****************************!*\
  !*** ./GlobalVariables.ts ***!
  \****************************/
/*! exports provided: PAGINATION_LIMIT, CACHE_MAX_AGE, SEPARATOR, BUILT_IN_METRICS, CUSTOM_METRICS, ANALYZE_APPLICATION_METRICS, ANALYZE_WEBSITE_METRICS, APPLICATION_SERVICE_ENDPOINT_METRICS, SLO_INFORMATION, INFRASTRUCTURE_ANALYZE, ANALYZE_MOBILE_APP_METRICS, SLO2_INFORMATION, ALL_APPLICATIONS, ALL_WEBSITES, ALL_MOBILE_APPS, ALL_SERVICES, ALL_ENDPOINTS, PLEASE_SPECIFY */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PAGINATION_LIMIT", function() { return PAGINATION_LIMIT; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CACHE_MAX_AGE", function() { return CACHE_MAX_AGE; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SEPARATOR", function() { return SEPARATOR; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "BUILT_IN_METRICS", function() { return BUILT_IN_METRICS; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CUSTOM_METRICS", function() { return CUSTOM_METRICS; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ANALYZE_APPLICATION_METRICS", function() { return ANALYZE_APPLICATION_METRICS; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ANALYZE_WEBSITE_METRICS", function() { return ANALYZE_WEBSITE_METRICS; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "APPLICATION_SERVICE_ENDPOINT_METRICS", function() { return APPLICATION_SERVICE_ENDPOINT_METRICS; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SLO_INFORMATION", function() { return SLO_INFORMATION; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "INFRASTRUCTURE_ANALYZE", function() { return INFRASTRUCTURE_ANALYZE; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ANALYZE_MOBILE_APP_METRICS", function() { return ANALYZE_MOBILE_APP_METRICS; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SLO2_INFORMATION", function() { return SLO2_INFORMATION; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ALL_APPLICATIONS", function() { return ALL_APPLICATIONS; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ALL_WEBSITES", function() { return ALL_WEBSITES; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ALL_MOBILE_APPS", function() { return ALL_MOBILE_APPS; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ALL_SERVICES", function() { return ALL_SERVICES; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ALL_ENDPOINTS", function() { return ALL_ENDPOINTS; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PLEASE_SPECIFY", function() { return PLEASE_SPECIFY; });
/* CONFIG */
var PAGINATION_LIMIT = 15; // pagesize=200 => 3000 results in dropdown (~30sec.)

var CACHE_MAX_AGE = 60000;
var SEPARATOR = '|';
/* CATEGORIES */

var BUILT_IN_METRICS = 0;
var CUSTOM_METRICS = 1;
var ANALYZE_APPLICATION_METRICS = 2;
var ANALYZE_WEBSITE_METRICS = 3;
var APPLICATION_SERVICE_ENDPOINT_METRICS = 4; // replaces previous ->
// APPLICATION_METRICS = '4';
// SERVICE_METRICS = '5';
// ENDPOINT_METRICS = '6';

var SLO_INFORMATION = 7;
var INFRASTRUCTURE_ANALYZE = 8;
var ANALYZE_MOBILE_APP_METRICS = 9;
var SLO2_INFORMATION = 10;
/* DROPDOWN DEFAULTS */

var ALL_APPLICATIONS = '-- No Application Filter --';
var ALL_WEBSITES = '-- No Website Filter --';
var ALL_MOBILE_APPS = '-- No Mobile App Filter --';
var ALL_SERVICES = '-- No Service Filter --';
var ALL_ENDPOINTS = '-- No Endpoint Filter --';
/* PLACEHOLDER */

var PLEASE_SPECIFY = 'Please specify';

/***/ }),

/***/ "./cache.ts":
/*!******************!*\
  !*** ./cache.ts ***!
  \******************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
var Cache =
/** @class */
function () {
  function Cache() {
    this.store = {};
  }

  Cache.prototype.put = function (key, value, ttl) {
    var _this = this;

    if (ttl === void 0) {
      ttl = 70000;
    }

    if (key === undefined || value === undefined) {
      return;
    }

    this.del(key);
    this.store[key] = {
      value: value,
      expiry: Date.now() + ttl,
      timeout: setTimeout(function () {
        _this.del(key);
      }, ttl)
    };
  };

  Cache.prototype.get = function (key) {
    var item = this.store[key];

    if (item && !(item.expiry && item.expiry > Date.now())) {
      this.del(key);
      item = undefined;
    }

    return item && item.value;
  };

  Cache.prototype.del = function (key) {
    if (this.store.hasOwnProperty(key)) {
      clearTimeout(this.store[key].timeout);
      delete this.store[key];
    }
  };

  return Cache;
}();

/* harmony default export */ __webpack_exports__["default"] = (Cache);

/***/ }),

/***/ "./components/AdvancedSettings/AdvancedSettings.tsx":
/*!**********************************************************!*\
  !*** ./components/AdvancedSettings/AdvancedSettings.tsx ***!
  \**********************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "../node_modules/tslib/tslib.es6.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _GlobalVariables__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../GlobalVariables */ "./GlobalVariables.ts");
/* harmony import */ var _Infrastructure_Custom_FreeTextMetrics__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../Infrastructure/Custom/FreeTextMetrics */ "./components/Infrastructure/Custom/FreeTextMetrics.tsx");
/* harmony import */ var _AggregateQuery__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./AggregateQuery */ "./components/AdvancedSettings/AggregateQuery.tsx");
/* harmony import */ var _FormField_FormSwitch__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../FormField/FormSwitch */ "./components/FormField/FormSwitch.tsx");
/* harmony import */ var _FormField_FormInput__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../FormField/FormInput */ "./components/FormField/FormInput.tsx");
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! lodash */ "lodash");
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(lodash__WEBPACK_IMPORTED_MODULE_7__);








var legendFormatPlaceholders = ['$label (on host $host)', '$label (on host $host)', '$label ($application) - $key', '$label ($website) - $key', '$label ($application) - $key', '', '', ''];
var legendFormatTooltips = [react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", {
  key: "builtIn"
}, "Default: $label (on host $host)", react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("ul", null, react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("li", null, "\u2022 $label - entity label"), react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("li", null, "\u2022 $host - corresponding host"), react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("li", null, "\u2022 $pid - corresponding PID"), react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("li", null, "\u2022 $timeShift - corresponding timeShift"), react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("li", null, "\u2022 $metric - displayed metric"), react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("li", null, "\u2022 $type - entity type"), react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("li", null, "\u2022 $service - service label"), react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("li", null, "\u2022 $name - label alternative"), react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("li", null, "\u2022 $index - index in the list"))), react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", {
  key: "custom"
}, "Default: $label (on host $host)", react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("ul", null, react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("li", null, "\u2022 $label - entity label"), react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("li", null, "\u2022 $host - corresponding host"), react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("li", null, "\u2022 $pid - corresponding PID"), react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("li", null, "\u2022 $timeShift - corresponding timeShift"), react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("li", null, "\u2022 $metric - displayed metric"), react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("li", null, "\u2022 $type - entity type"), react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("li", null, "\u2022 $service - service label"), react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("li", null, "\u2022 $name - label alternative"), react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("li", null, "\u2022 $index - index in the list"))), react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", {
  key: "application"
}, "Default: $label ($application) - $key", react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("ul", null, react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("li", null, "\u2022 $label - entity label"), react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("li", null, "\u2022 $application - application label"), react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("li", null, "\u2022 $timeShift - corresponding timeShift"), react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("li", null, "\u2022 $metric - displayed metric"), react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("li", null, "\u2022 $key - metric key with aggregation and rollup"), react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("li", null, "\u2022 $index - index in the list"))), react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", {
  key: "website"
}, "Default: $label ($website) - $key", react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("ul", null, react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("li", null, "\u2022 $label - entity label"), react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("li", null, "\u2022 $website - application label"), react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("li", null, "\u2022 $type - entity type"), react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("li", null, "\u2022 $timeShift - corresponding timeShift"), react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("li", null, "\u2022 $metric - displayed metric"), react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("li", null, "\u2022 $key - metric key with aggregation and rollup"), react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("li", null, "\u2022 $index - index in the list"))), react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", {
  key: "endpoint"
}, "Default: $label ($application) - $key", react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("ul", null, react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("li", null, "\u2022 $label - entity label"), react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("li", null, "\u2022 $application - application label"), react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("li", null, "\u2022 $service - service label"), react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("li", null, "\u2022 $endpoint - endpoint label"), react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("li", null, "\u2022 $timeShift - corresponding timeShift"), react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("li", null, "\u2022 $metric - displayed metric"), react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("li", null, "\u2022 $key - metric key with aggregation and rollup"), react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("li", null, "\u2022 $index - index in the list"))), '', '', ''];

var AdvancedSettings =
/** @class */
function (_super) {
  Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__extends"])(AdvancedSettings, _super);

  function AdvancedSettings(props) {
    var _this = _super.call(this, props) || this;

    _this.debouncedRunQuery = lodash__WEBPACK_IMPORTED_MODULE_7___default.a.debounce(_this.props.onRunQuery, 500);

    _this.onLegendFormatChange = function (eventItem) {
      var _a = _this.props,
          query = _a.query,
          onChange = _a.onChange;
      query.labelFormat = eventItem.currentTarget.value;
      onChange(query); // onRunQuery with 500ms delay after last debounce

      _this.debouncedRunQuery();
    };

    _this.onTimeShiftChange = function (eventItem) {
      var _a = _this.props,
          query = _a.query,
          onChange = _a.onChange;
      query.timeShift = eventItem.currentTarget.value;

      if (query.timeShift) {
        query.timeShiftIsValid = query.timeShift.match(/\d+[m,s,h,d,w]{1}/) ? true : false;
      } else {
        query.timeShiftIsValid = true;
      }

      onChange(query);

      if (query.timeShiftIsValid) {
        // onRunQuery with 500ms delay after last debounce
        _this.debouncedRunQuery();
      }
    };

    _this.onShowAdvancedSettingsChange = function (event) {
      if (event && event.currentTarget) {
        var _a = _this.props,
            query = _a.query,
            onChange = _a.onChange;
        query.showAdvancedSettings = event.currentTarget.checked;
        onChange(query);
      }
    };

    _this.state = {
      legendFormatPlaceholder: _this.setLegendFormatPlaceholder()
    };
    return _this;
  }

  AdvancedSettings.prototype.setLegendFormatPlaceholder = function () {
    var query = this.props.query;
    return legendFormatPlaceholders[query.metricCategory.key];
  };

  AdvancedSettings.prototype.setLegendFormatTooltip = function () {
    var query = this.props.query;
    return legendFormatTooltips[query.metricCategory.key];
  };

  AdvancedSettings.prototype.render = function () {
    var _this = this;

    var _a = this.props,
        query = _a.query,
        onRunQuery = _a.onRunQuery,
        onChange = _a.onChange,
        loadEntityTypes = _a.loadEntityTypes;
    var category = query.metricCategory.key;
    return react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", null, react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", {
      className: 'gf-form'
    }, react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_FormField_FormSwitch__WEBPACK_IMPORTED_MODULE_5__["default"], {
      label: 'Show advanced settings',
      tooltip: 'Show all additional settings',
      value: query.showAdvancedSettings,
      onChange: function onChange(e) {
        return _this.onShowAdvancedSettingsChange(e);
      }
    })), react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", {
      hidden: !query.showAdvancedSettings
    }, react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", {
      className: 'gf-form',
      hidden: category === _GlobalVariables__WEBPACK_IMPORTED_MODULE_2__["SLO_INFORMATION"] || category === _GlobalVariables__WEBPACK_IMPORTED_MODULE_2__["INFRASTRUCTURE_ANALYZE"]
    }, react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_FormField_FormInput__WEBPACK_IMPORTED_MODULE_6__["default"], {
      queryKeyword: true,
      inputWidth: 0,
      label: 'Legend format',
      tooltip: this.setLegendFormatTooltip(),
      value: query.labelFormat,
      placeholder: this.setLegendFormatPlaceholder(),
      onChange: function onChange(event) {
        return _this.onLegendFormatChange(event);
      }
    })), react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", {
      className: 'gf-form'
    }, react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_FormField_FormInput__WEBPACK_IMPORTED_MODULE_6__["default"], {
      queryKeyword: true,
      inputWidth: 0,
      label: 'Time shift',
      tooltip: 'Specify the amount of hours that shall be used. The time shift function always go back in time, ' + 'not forward. Accepts values such as 1s, 1m, 1h, 1d, 1w.',
      value: query.timeShift,
      invalid: !query.timeShiftIsValid,
      placeholder: '1h',
      onChange: function onChange(event) {
        return _this.onTimeShiftChange(event);
      }
    })), react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", {
      hidden: category !== _GlobalVariables__WEBPACK_IMPORTED_MODULE_2__["CUSTOM_METRICS"]
    }, react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_Infrastructure_Custom_FreeTextMetrics__WEBPACK_IMPORTED_MODULE_3__["FreeTextMetrics"], {
      query: query,
      onRunQuery: onRunQuery,
      onChange: onChange,
      loadEntityTypes: loadEntityTypes
    })), react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", {
      hidden: category !== _GlobalVariables__WEBPACK_IMPORTED_MODULE_2__["BUILT_IN_METRICS"] && category !== _GlobalVariables__WEBPACK_IMPORTED_MODULE_2__["CUSTOM_METRICS"]
    }, react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_AggregateQuery__WEBPACK_IMPORTED_MODULE_4__["AggregateQuery"], {
      query: query,
      onRunQuery: onRunQuery,
      onChange: onChange
    }))));
  };

  return AdvancedSettings;
}(react__WEBPACK_IMPORTED_MODULE_1___default.a.Component);

/* harmony default export */ __webpack_exports__["default"] = (AdvancedSettings);

/***/ }),

/***/ "./components/AdvancedSettings/AggregateQuery.tsx":
/*!********************************************************!*\
  !*** ./components/AdvancedSettings/AggregateQuery.tsx ***!
  \********************************************************/
/*! exports provided: AggregateQuery */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AggregateQuery", function() { return AggregateQuery; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "../node_modules/tslib/tslib.es6.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _lists_aggregation_function__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../lists/aggregation_function */ "./lists/aggregation_function.ts");
/* harmony import */ var _FormField_FormSwitch__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../FormField/FormSwitch */ "./components/FormField/FormSwitch.tsx");
/* harmony import */ var _grafana_ui__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @grafana/ui */ "@grafana/ui");
/* harmony import */ var _grafana_ui__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_grafana_ui__WEBPACK_IMPORTED_MODULE_4__);






var AggregateQuery =
/** @class */
function (_super) {
  Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__extends"])(AggregateQuery, _super);

  function AggregateQuery(props) {
    var _this = _super.call(this, props) || this;

    _this.onAggregateGraphs = function (event) {
      var _a = _this.props,
          query = _a.query,
          onRunQuery = _a.onRunQuery;

      if (event && event.currentTarget) {
        query.aggregateGraphs = event.currentTarget.checked;
        onRunQuery();
      }
    };

    _this.onHideOriginalGraph = function (event) {
      var _a = _this.props,
          query = _a.query,
          onRunQuery = _a.onRunQuery;

      if (event && event.currentTarget) {
        query.hideOriginalGraphs = event.currentTarget.checked;
        onRunQuery();
      }
    };

    _this.onAggregationFunctionChange = function (event) {
      var _a = _this.props,
          query = _a.query,
          onRunQuery = _a.onRunQuery;
      query.aggregationFunction = event;
      onRunQuery();
    };

    _this.state = {
      showAdditionalSettings: false,
      legendFormat: ''
    };
    var query = _this.props.query;

    if (!query.aggregationFunction) {
      query.aggregationFunction = _lists_aggregation_function__WEBPACK_IMPORTED_MODULE_2__["default"][0];
    }

    return _this;
  }

  AggregateQuery.prototype.render = function () {
    var query = this.props.query;
    return react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", {
      className: 'gf-form'
    }, react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_FormField_FormSwitch__WEBPACK_IMPORTED_MODULE_3__["default"], {
      queryKeyword: true,
      label: 'Aggregate query graphs',
      tooltip: 'Aggregate all graphs of a query.',
      value: query.aggregateGraphs,
      onChange: this.onAggregateGraphs
    }), react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_grafana_ui__WEBPACK_IMPORTED_MODULE_4__["Select"], {
      menuPlacement: 'bottom',
      width: 12,
      isSearchable: true,
      options: _lists_aggregation_function__WEBPACK_IMPORTED_MODULE_2__["default"],
      value: query.aggregationFunction,
      disabled: !query.aggregateGraphs,
      onChange: this.onAggregationFunctionChange
    }), react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_FormField_FormSwitch__WEBPACK_IMPORTED_MODULE_3__["default"], {
      queryKeyword: true,
      disabled: !query.aggregateGraphs,
      labelWidth: 10,
      label: 'Hide original graphs',
      tooltip: 'Removes the original graphs resulted from the query and only shows the aggregated graph.',
      value: query.hideOriginalGraphs,
      onChange: this.onHideOriginalGraph
    }));
  };

  return AggregateQuery;
}(react__WEBPACK_IMPORTED_MODULE_1___default.a.Component);



/***/ }),

/***/ "./components/Analyze/ApplicationCallsMetrics.tsx":
/*!********************************************************!*\
  !*** ./components/Analyze/ApplicationCallsMetrics.tsx ***!
  \********************************************************/
/*! exports provided: ApplicationCallsMetrics */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ApplicationCallsMetrics", function() { return ApplicationCallsMetrics; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "../node_modules/tslib/tslib.es6.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _GlobalVariables__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../GlobalVariables */ "./GlobalVariables.ts");
/* harmony import */ var _lists_apply_call_to_entities__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../lists/apply_call_to_entities */ "./lists/apply_call_to_entities.ts");
/* harmony import */ var _grafana_ui__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @grafana/ui */ "@grafana/ui");
/* harmony import */ var _grafana_ui__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_grafana_ui__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _FormField_FormWrapper__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../FormField/FormWrapper */ "./components/FormField/FormWrapper.tsx");
/* harmony import */ var _Entity_Entity__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../Entity/Entity */ "./components/Entity/Entity.tsx");
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! lodash */ "lodash");
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(lodash__WEBPACK_IMPORTED_MODULE_7__);
/* harmony import */ var _plugin_css__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../plugin.css */ "./components/plugin.css");
/* harmony import */ var _plugin_css__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(_plugin_css__WEBPACK_IMPORTED_MODULE_8__);









var isUnmounting = false;

var ApplicationCallsMetrics =
/** @class */
function (_super) {
  Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__extends"])(ApplicationCallsMetrics, _super);

  function ApplicationCallsMetrics(props) {
    var _this = _super.call(this, props) || this;

    _this.onApplicationChange = function (application) {
      var _a = _this.props,
          query = _a.query,
          onChange = _a.onChange,
          onRunQuery = _a.onRunQuery;
      query.entity = application;
      onChange(query);
      onRunQuery();
    };

    _this.onGroupChange = function (group) {
      var _a = _this.props,
          query = _a.query,
          onChange = _a.onChange,
          onRunQuery = _a.onRunQuery;
      query.group = group;

      if (query.group && query.metricCategory.key === _GlobalVariables__WEBPACK_IMPORTED_MODULE_2__["ANALYZE_APPLICATION_METRICS"]) {
        query.showGroupBySecondLevel = query.group.type === 'KEY_VALUE_PAIR';
      }

      if (!query.showGroupBySecondLevel) {
        query.groupbyTagSecondLevelKey = '';
      }

      onChange(query);
      onRunQuery();
    };

    _this.onApplicationCallToEntityChange = function (applicationCallToEntity) {
      var _a = _this.props,
          query = _a.query,
          onChange = _a.onChange,
          onRunQuery = _a.onRunQuery;
      query.applicationCallToEntity = applicationCallToEntity;
      onChange(query);
      onRunQuery();
    };

    _this.onCallToEntityChange = function (callToEntity) {
      var _a = _this.props,
          query = _a.query,
          onChange = _a.onChange,
          onRunQuery = _a.onRunQuery;
      query.callToEntity = callToEntity;
      onChange(query);
      onRunQuery();
    };

    _this.debouncedRunQuery = lodash__WEBPACK_IMPORTED_MODULE_7___default.a.debounce(_this.props.onRunQuery, 500);

    _this.onGroupByTagSecondLevelKeyChange = function (eventItem) {
      var _a = _this.props,
          query = _a.query,
          onChange = _a.onChange;
      query.groupbyTagSecondLevelKey = eventItem.currentTarget.value;
      onChange(query); // onRunQuery with 500ms delay after last debounce

      _this.debouncedRunQuery();
    };

    _this.state = {
      applications: []
    };
    return _this;
  }

  ApplicationCallsMetrics.prototype.componentDidMount = function () {
    var _this = this;

    var _a = this.props,
        query = _a.query,
        datasource = _a.datasource,
        onChange = _a.onChange;
    isUnmounting = false;
    datasource.fetchApplications().then(function (applications) {
      if (!isUnmounting) {
        if (!lodash__WEBPACK_IMPORTED_MODULE_7___default.a.find(applications, {
          key: null
        })) {
          applications.unshift({
            key: null,
            label: _GlobalVariables__WEBPACK_IMPORTED_MODULE_2__["ALL_APPLICATIONS"]
          });
        }

        _this.setState({
          applications: applications
        });

        if (!query.entity || !query.entity.key && !query.entity.label) {
          query.entity = applications[0];
        }

        if (!query.callToEntity) {
          query.callToEntity = _lists_apply_call_to_entities__WEBPACK_IMPORTED_MODULE_3__["default"][0];
        }

        if (!query.applicationCallToEntity) {
          query.applicationCallToEntity = _lists_apply_call_to_entities__WEBPACK_IMPORTED_MODULE_3__["default"][0];
        }

        onChange(query);
      }
    });
    datasource.fetchApplicationTags().then(function (applicationTags) {
      if (!isUnmounting) {
        _this.props.updateGroups(lodash__WEBPACK_IMPORTED_MODULE_7___default.a.sortBy(applicationTags, 'key')); // select a meaningful default group


        if (!query.group || !query.group.key) {
          query.group = lodash__WEBPACK_IMPORTED_MODULE_7___default.a.find(applicationTags, ['key', 'endpoint.name']);
          onChange(query);
        }
      }
    });
    this.props.updateMetrics(datasource.dataSourceApplication.getApplicationMetricsCatalog());
  };

  ApplicationCallsMetrics.prototype.componentWillUnmount = function () {
    isUnmounting = true;
  };

  ApplicationCallsMetrics.prototype.render = function () {
    var _a = this.props,
        query = _a.query,
        groups = _a.groups;
    return react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", {
      className: 'gf-form'
    }, react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_FormField_FormWrapper__WEBPACK_IMPORTED_MODULE_5__["default"], {
      stretch: true
    }, react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_grafana_ui__WEBPACK_IMPORTED_MODULE_4__["InlineFormLabel"], {
      className: 'query-keyword',
      width: 14,
      tooltip: 'Select your application.'
    }, "Application"), react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_Entity_Entity__WEBPACK_IMPORTED_MODULE_6__["default"], {
      value: query.applicationCallToEntity,
      onChange: this.onApplicationCallToEntityChange
    }), react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_grafana_ui__WEBPACK_IMPORTED_MODULE_4__["Select"], {
      menuPlacement: 'bottom',
      width: 0,
      isSearchable: true,
      value: query.entity,
      options: this.state.applications,
      onChange: this.onApplicationChange
    })), react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_FormField_FormWrapper__WEBPACK_IMPORTED_MODULE_5__["default"], {
      stretch: true
    }, react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_grafana_ui__WEBPACK_IMPORTED_MODULE_4__["InlineFormLabel"], {
      className: 'query-keyword',
      width: 7,
      tooltip: 'Group by tag.'
    }, "Group by"), react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_Entity_Entity__WEBPACK_IMPORTED_MODULE_6__["default"], {
      value: query.callToEntity,
      onChange: this.onCallToEntityChange
    }), react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_grafana_ui__WEBPACK_IMPORTED_MODULE_4__["Select"], {
      menuPlacement: 'bottom',
      width: 0,
      isSearchable: true,
      options: groups,
      value: query.group,
      onChange: this.onGroupChange
    })), react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", {
      style: !query.showGroupBySecondLevel ? {
        display: 'none'
      } : {}
    }, react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_grafana_ui__WEBPACK_IMPORTED_MODULE_4__["Input"], {
      type: 'text',
      value: query.groupbyTagSecondLevelKey,
      onChange: this.onGroupByTagSecondLevelKeyChange
    })));
  };

  return ApplicationCallsMetrics;
}(react__WEBPACK_IMPORTED_MODULE_1___default.a.Component);



/***/ }),

/***/ "./components/Analyze/Filter.tsx":
/*!***************************************!*\
  !*** ./components/Analyze/Filter.tsx ***!
  \***************************************/
/*! exports provided: Filters */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Filters", function() { return Filters; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "../node_modules/tslib/tslib.es6.js");
/* harmony import */ var _GlobalVariables__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../GlobalVariables */ "./GlobalVariables.ts");
/* harmony import */ var _grafana_ui__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @grafana/ui */ "@grafana/ui");
/* harmony import */ var _grafana_ui__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_grafana_ui__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _Entity_Entity__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../Entity/Entity */ "./components/Entity/Entity.tsx");
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! lodash */ "lodash");
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(lodash__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _lists_apply_call_to_entities__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../lists/apply_call_to_entities */ "./lists/apply_call_to_entities.ts");
/* harmony import */ var _lists_operators__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../lists/operators */ "./lists/operators.ts");
/* harmony import */ var components_FormField_FormTextArea__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! components/FormField/FormTextArea */ "./components/FormField/FormTextArea.tsx");










var Filters =
/** @class */
function (_super) {
  Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__extends"])(Filters, _super);

  function Filters(props) {
    var _this = _super.call(this, props) || this;

    _this.OPERATOR_STRING = 'STRING';
    _this.OPERATOR_STRING_SET = 'STRING_SET';
    _this.OPERATOR_NUMBER = 'NUMBER';
    _this.OPERATOR_BOOLEAN = 'BOOLEAN';
    _this.OPERATOR_KEY_VALUE = 'KEY_VALUE_PAIR';

    _this.addTagFilter = function () {
      var _a = _this.props,
          query = _a.query,
          onChange = _a.onChange;
      query.filters.push({
        tag: query.group,
        entity: _lists_apply_call_to_entities__WEBPACK_IMPORTED_MODULE_6__["default"][0],
        operator: _this.filterOperatorsOnType(query.group.type)[0],
        booleanValue: false,
        numberValue: 0,
        stringValue: '',
        isValid: false
      });
      onChange(query);
    };

    _this.removeTagFilter = function (index) {
      var _a = _this.props,
          query = _a.query,
          onChange = _a.onChange,
          onRunQuery = _a.onRunQuery;
      query.filters.splice(index, 1);
      onChange(query);
      onRunQuery();
    };

    _this.onCallToEntityChange = function (callToEntity, index) {
      var query = _this.props.query;
      query.filters[index].entity = callToEntity;

      _this.validateChangeAndRun(index);
    };

    _this.onOperatorChange = function (operator, index) {
      var query = _this.props.query;
      query.filters[index].operator = operator;

      _this.validateChangeAndRun(index);
    };

    _this.debouncedRunQuery = lodash__WEBPACK_IMPORTED_MODULE_5___default.a.debounce(_this.props.onRunQuery, 500);

    _this.onTagFilterStringValueChange = function (value, index) {
      var query = _this.props.query;
      query.filters[index].stringValue = value.currentTarget.value;

      _this.validateChangeAndRun(index, true);
    };

    _this.onTagFilterNumberValueChange = function (value, index) {
      var query = _this.props.query;
      query.filters[index].numberValue = value.currentTarget.valueAsNumber;

      _this.validateChangeAndRun(index, true);
    };

    _this.onFilterChange = function (event) {
      var _a = _this.props,
          query = _a.query,
          onChange = _a.onChange,
          onRunQuery = _a.onRunQuery;
      var filterValue = event.currentTarget.value;

      _this.setState({
        textareaValue: event.currentTarget.value
      });

      if (filterValue.trim() !== '') {
        query.filters = JSON.parse(filterValue);
      } else {
        query.filters = [];
      }

      onChange(query);
      _this.debouncedRunQuery = lodash__WEBPACK_IMPORTED_MODULE_5___default.a.debounce(_this.props.onRunQuery, 500);
      onRunQuery();
    };

    _this.state = {
      textareaValue: ''
    };
    return _this;
  }

  Filters.prototype.filterOperatorsOnType = function (type) {
    return lodash__WEBPACK_IMPORTED_MODULE_5___default.a.filter(_lists_operators__WEBPACK_IMPORTED_MODULE_7__["default"], function (o) {
      return o.type === type;
    });
  };

  Filters.prototype.onGroupChange = function (group, index) {
    var query = this.props.query;
    query.filters[index].tag = group;
    var ops = this.filterOperatorsOnType(group.type);

    if (!lodash__WEBPACK_IMPORTED_MODULE_5___default.a.includes(ops, query.filters[index].operator)) {
      query.filters[index].operator = ops[0];
    }

    this.validateChangeAndRun(index);
  };

  Filters.prototype.canShowStringInput = function (filter) {
    return filter.tag.type === this.OPERATOR_KEY_VALUE || !filter.operator.key.includes('EMPTY') && (filter.tag.type === this.OPERATOR_STRING || filter.tag.type === this.OPERATOR_STRING_SET);
  };

  Filters.prototype.canShowNumberInput = function (filter) {
    return filter.tag.type === this.OPERATOR_NUMBER && !filter.operator.key.includes('EMPTY');
  };

  Filters.prototype.onTagFilterBooleanValueChange = function (value, index) {
    var query = this.props.query;
    query.filters[index].booleanValue = value.key;
    this.validateChangeAndRun(index);
  };

  Filters.prototype.validateChangeAndRun = function (index, runDebounced) {
    if (runDebounced === void 0) {
      runDebounced = false;
    }

    var _a = this.props,
        query = _a.query,
        onChange = _a.onChange,
        onRunQuery = _a.onRunQuery;

    if (query.filters[index].tag) {
      if (query.filters[index].operator.key.includes('EMPTY') && (this.OPERATOR_STRING === query.filters[index].tag.type || this.OPERATOR_STRING_SET === query.filters[index].tag.type)) {
        query.filters[index].isValid = true; // to avoid sending value with query.filters[index] operators that do not require a value (such as is-present/is-not-present)

        query.filters[index].stringValue = '';
        query.filters[index].numberValue = 0;
        query.filters[index].booleanValue = true;
      } else if ((this.OPERATOR_STRING === query.filters[index].tag.type || this.OPERATOR_STRING_SET === query.filters[index].tag.type) && query.filters[index].stringValue) {
        query.filters[index].isValid = true;
      } else if (query.filters[index].operator.key.includes('EMPTY') && this.OPERATOR_KEY_VALUE === query.filters[index].tag.type && query.filters[index].stringValue) {
        query.filters[index].isValid = true;
      } else if (this.OPERATOR_KEY_VALUE === query.filters[index].tag.type && query.filters[index].stringValue && query.filters[index].stringValue.includes('=')) {
        query.filters[index].isValid = true;
      } else if (this.OPERATOR_NUMBER === query.filters[index].tag.type && !isNaN(query.filters[index].numberValue)) {
        query.filters[index].isValid = true;
      } else if (this.OPERATOR_BOOLEAN === query.filters[index].tag.type && query.filters[index].booleanValue !== undefined) {
        query.filters[index].isValid = true;
      }
    } else {
      query.filters[index].isValid = false;
    }

    onChange(query);

    if (runDebounced) {
      // onRunQuery with 500ms delay after last debounce
      this.debouncedRunQuery();
    } else {
      onRunQuery();
    }
  };

  Filters.prototype.render = function () {
    var _this = this;

    var _a;

    var _b = this.props,
        query = _b.query,
        groups = _b.groups;

    if (query.metricCategory.key === _GlobalVariables__WEBPACK_IMPORTED_MODULE_1__["INFRASTRUCTURE_ANALYZE"]) {
      return react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement("div", {
        className: 'gf-form'
      }, react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement(components_FormField_FormTextArea__WEBPACK_IMPORTED_MODULE_8__["default"], {
        queryKeyword: true,
        inputWidth: 0,
        label: 'TagFilterExpression',
        tooltip: 'Enter the tagFilterExpression here ',
        placeholder: "[{Enter the filter JSON here}]",
        value: this.state.textareaValue,
        onChange: function onChange(event) {
          return _this.onFilterChange(event);
        }
      }));
    } else {
      var listFilter = (_a = query.filters) === null || _a === void 0 ? void 0 : _a.map(function (singleFilter, index) {
        return react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement("div", {
          key: 'filter_' + index,
          className: 'gf-form'
        }, react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement(_grafana_ui__WEBPACK_IMPORTED_MODULE_2__["InlineFormLabel"], {
          className: 'query-keyword',
          width: 14,
          tooltip: 'Filter by tag.'
        }, index + 1, ". filter"), query.metricCategory.key === _GlobalVariables__WEBPACK_IMPORTED_MODULE_1__["ANALYZE_APPLICATION_METRICS"] && _GlobalVariables__WEBPACK_IMPORTED_MODULE_1__["ANALYZE_MOBILE_APP_METRICS"] && react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement(_Entity_Entity__WEBPACK_IMPORTED_MODULE_4__["default"], {
          value: query.filters[index].entity,
          onChange: function onChange(callToEntity) {
            return _this.onCallToEntityChange(callToEntity, index);
          }
        }), react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement(_grafana_ui__WEBPACK_IMPORTED_MODULE_2__["Select"], {
          menuPlacement: 'bottom',
          width: 30,
          isSearchable: true,
          value: query.filters[index].tag,
          options: groups,
          onChange: function onChange(group) {
            return _this.onGroupChange(group, index);
          }
        }), react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement(_grafana_ui__WEBPACK_IMPORTED_MODULE_2__["Select"], {
          menuPlacement: 'bottom',
          width: 20,
          isSearchable: true,
          value: query.filters[index].operator,
          options: _this.filterOperatorsOnType(query.filters[index].tag.type),
          onChange: function onChange(operator) {
            return _this.onOperatorChange(operator, index);
          }
        }), _this.canShowStringInput(query.filters[index]) && react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement(_grafana_ui__WEBPACK_IMPORTED_MODULE_2__["Input"], {
          width: 30,
          value: query.filters[index].stringValue,
          placeholder: query.filters[index].tag.type === 'KEY_VALUE_PAIR' ? 'key=value' : _GlobalVariables__WEBPACK_IMPORTED_MODULE_1__["PLEASE_SPECIFY"],
          onChange: function onChange(event) {
            return _this.onTagFilterStringValueChange(event, index);
          }
        }), _this.canShowNumberInput(query.filters[index]) && react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement(_grafana_ui__WEBPACK_IMPORTED_MODULE_2__["Input"], {
          type: 'number',
          width: 30,
          value: query.filters[index].numberValue,
          placeholder: _GlobalVariables__WEBPACK_IMPORTED_MODULE_1__["PLEASE_SPECIFY"],
          onChange: function onChange(event) {
            return _this.onTagFilterNumberValueChange(event, index);
          }
        }), query.filters[index].tag.type === 'BOOLEAN' && react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement(_grafana_ui__WEBPACK_IMPORTED_MODULE_2__["Select"], {
          menuPlacement: 'bottom',
          width: 30,
          isSearchable: true,
          onChange: function onChange(e) {
            return _this.onTagFilterBooleanValueChange(e, index);
          },
          value: {
            key: '' + query.filters[index].booleanValue,
            label: '' + query.filters[index].booleanValue
          },
          options: [{
            key: false,
            label: 'false'
          }, {
            key: true,
            label: 'true'
          }]
        }), react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement(_grafana_ui__WEBPACK_IMPORTED_MODULE_2__["Button"], {
          variant: 'secondary',
          onClick: function onClick() {
            return _this.removeTagFilter(index);
          }
        }, "-"));
      });
      return react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement("div", null, listFilter, react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement("div", {
        className: 'gf-form'
      }, react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement(_grafana_ui__WEBPACK_IMPORTED_MODULE_2__["InlineFormLabel"], {
        width: 14,
        tooltip: 'Add an additional tag filter.'
      }, "Add filter"), react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement(_grafana_ui__WEBPACK_IMPORTED_MODULE_2__["Button"], {
        variant: 'secondary',
        onClick: this.addTagFilter
      }, "+"), react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement("div", {
        hidden: !query.showWarningCantShowAllResults
      }, react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement(_grafana_ui__WEBPACK_IMPORTED_MODULE_2__["InlineFormLabel"], {
        width: 12,
        tooltip: 'Add Filter to narrow down the data.'
      }, "\u26A0\uFE0F Can't show all results"))));
    }
  };

  return Filters;
}(react__WEBPACK_IMPORTED_MODULE_3___default.a.Component);



/***/ }),

/***/ "./components/Analyze/MobileAppMetrics.tsx":
/*!*************************************************!*\
  !*** ./components/Analyze/MobileAppMetrics.tsx ***!
  \*************************************************/
/*! exports provided: MobileAppMetrics */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MobileAppMetrics", function() { return MobileAppMetrics; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "../node_modules/tslib/tslib.es6.js");
/* harmony import */ var _GlobalVariables__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../GlobalVariables */ "./GlobalVariables.ts");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _FormField_FormSelect__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../FormField/FormSelect */ "./components/FormField/FormSelect.tsx");
/* harmony import */ var _grafana_ui__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @grafana/ui */ "@grafana/ui");
/* harmony import */ var _grafana_ui__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_grafana_ui__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! lodash */ "lodash");
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(lodash__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _lists_beacon_types_mobile_app__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../lists/beacon_types_mobile_app */ "./lists/beacon_types_mobile_app.ts");







var isUnmounting = false;

var MobileAppMetrics =
/** @class */
function (_super) {
  Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__extends"])(MobileAppMetrics, _super);

  function MobileAppMetrics(props) {
    var _this = _super.call(this, props) || this;

    _this.onMobileappChange = function (mobileapp) {
      var _a = _this.props,
          query = _a.query,
          onChange = _a.onChange,
          onRunQuery = _a.onRunQuery;
      query.entity = mobileapp;
      onChange(query);
      onRunQuery();
    };

    _this.onBeaconTypeChange = function (type) {
      var _a = _this.props,
          query = _a.query,
          onChange = _a.onChange,
          filterMetricsOnType = _a.filterMetricsOnType;
      query.entityType = type;
      onChange(query);
      filterMetricsOnType(query.entityType.key);
    };

    _this.onGroupChange = function (group) {
      var _a = _this.props,
          query = _a.query,
          onChange = _a.onChange,
          onRunQuery = _a.onRunQuery;
      query.group = group;

      if (query.group && query.metricCategory.key === _GlobalVariables__WEBPACK_IMPORTED_MODULE_1__["ANALYZE_MOBILE_APP_METRICS"]) {
        query.showGroupBySecondLevel = query.group.type === 'KEY_VALUE_PAIR';
      }

      if (!query.showGroupBySecondLevel) {
        query.groupbyTagSecondLevelKey = '';
      }

      onChange(query);
      onRunQuery();
    };

    _this.debouncedRunQuery = lodash__WEBPACK_IMPORTED_MODULE_5___default.a.debounce(_this.props.onRunQuery, 500);

    _this.onGroupByTagSecondLevelKeyChange = function (eventItem) {
      var _a = _this.props,
          query = _a.query,
          onChange = _a.onChange;
      query.groupbyTagSecondLevelKey = eventItem.currentTarget.value;
      onChange(query); // onRunQuery with 500ms delay after last debounce

      _this.debouncedRunQuery();
    };

    _this.state = {
      mobileapps: []
    };
    return _this;
  }

  MobileAppMetrics.prototype.componentDidMount = function () {
    var _this = this;

    var _a = this.props,
        query = _a.query,
        datasource = _a.datasource,
        onChange = _a.onChange;
    isUnmounting = false;
    datasource.fetchMobileapp().then(function (mobileapps) {
      if (!isUnmounting) {
        if (!lodash__WEBPACK_IMPORTED_MODULE_5___default.a.find(mobileapps, {
          key: null
        })) {
          mobileapps.unshift({
            key: null,
            label: _GlobalVariables__WEBPACK_IMPORTED_MODULE_1__["ALL_MOBILE_APPS"]
          });
        }

        _this.setState({
          mobileapps: mobileapps
        });

        if ((!query.entity || !query.entity.key) && mobileapps) {
          query.entity = mobileapps[0];
        } else if (query.entity && !lodash__WEBPACK_IMPORTED_MODULE_5___default.a.find(mobileapps, ['key', query.entity.key])) {
          query.entity = mobileapps[0];
        }

        onChange(query);
      }
    });
    datasource.dataSourceMobileapp.getMobileappTags().then(function (mobileappTags) {
      if (!isUnmounting) {
        _this.props.updateGroups(lodash__WEBPACK_IMPORTED_MODULE_5___default.a.sortBy(mobileappTags, 'key')); // select a meaningful default group


        if (!query.group || !query.group.key) {
          query.group = lodash__WEBPACK_IMPORTED_MODULE_5___default.a.find(mobileappTags, ['key', 'beacon.page.name']);
          onChange(query);
        }
      }
    });

    if (!query.entityType || !query.entityType.key) {
      query.entityType = _lists_beacon_types_mobile_app__WEBPACK_IMPORTED_MODULE_6__["default"][0];
      onChange(query);
    }

    datasource.dataSourceMobileapp.getMobileappMetricsCatalog().then(function (mobileappMetrics) {
      if (!isUnmounting) {
        // store all available metrics first and filter by type afterwards
        _this.props.updateMetrics(mobileappMetrics);

        _this.props.filterMetricsOnType(query.entityType.key);
      }
    });
  };

  MobileAppMetrics.prototype.componentWillUnmount = function () {
    isUnmounting = true;
  };

  MobileAppMetrics.prototype.render = function () {
    var _a = this.props,
        query = _a.query,
        groups = _a.groups;
    return react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement("div", {
      className: 'gf-form'
    }, react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(_FormField_FormSelect__WEBPACK_IMPORTED_MODULE_3__["default"], {
      queryKeyword: true,
      inputWidth: 0,
      label: 'Mobile-app',
      tooltip: 'Select your mobile app.',
      noOptionsMessage: 'No mobile apps found',
      value: query.entity,
      options: this.state.mobileapps,
      onChange: this.onMobileappChange
    }), react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(_FormField_FormSelect__WEBPACK_IMPORTED_MODULE_3__["default"], {
      queryKeyword: true,
      labelWidth: 6,
      label: 'Type',
      tooltip: 'Select a beacon type.',
      value: query.entityType,
      options: _lists_beacon_types_mobile_app__WEBPACK_IMPORTED_MODULE_6__["default"],
      onChange: this.onBeaconTypeChange
    }), react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(_FormField_FormSelect__WEBPACK_IMPORTED_MODULE_3__["default"], {
      queryKeyword: true,
      labelWidth: 6,
      label: 'Group by',
      tooltip: 'Group by tag.',
      value: query.group,
      options: groups,
      onChange: this.onGroupChange
    }), react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement("div", {
      style: !query.showGroupBySecondLevel ? {
        display: 'none'
      } : {}
    }, react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(_grafana_ui__WEBPACK_IMPORTED_MODULE_4__["Input"], {
      value: query.groupbyTagSecondLevelKey,
      onChange: this.onGroupByTagSecondLevelKeyChange
    })));
  };

  return MobileAppMetrics;
}(react__WEBPACK_IMPORTED_MODULE_2___default.a.Component);



/***/ }),

/***/ "./components/Analyze/WebsiteMetrics.tsx":
/*!***********************************************!*\
  !*** ./components/Analyze/WebsiteMetrics.tsx ***!
  \***********************************************/
/*! exports provided: WebsiteMetrics */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "WebsiteMetrics", function() { return WebsiteMetrics; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "../node_modules/tslib/tslib.es6.js");
/* harmony import */ var _GlobalVariables__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../GlobalVariables */ "./GlobalVariables.ts");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _FormField_FormSelect__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../FormField/FormSelect */ "./components/FormField/FormSelect.tsx");
/* harmony import */ var _grafana_ui__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @grafana/ui */ "@grafana/ui");
/* harmony import */ var _grafana_ui__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_grafana_ui__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! lodash */ "lodash");
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(lodash__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _lists_beacon_types_website__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../lists/beacon_types_website */ "./lists/beacon_types_website.ts");







var isUnmounting = false;

var WebsiteMetrics =
/** @class */
function (_super) {
  Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__extends"])(WebsiteMetrics, _super);

  function WebsiteMetrics(props) {
    var _this = _super.call(this, props) || this;

    _this.onWebsiteChange = function (website) {
      var _a = _this.props,
          query = _a.query,
          onChange = _a.onChange,
          onRunQuery = _a.onRunQuery;
      query.entity = website;
      onChange(query);
      onRunQuery();
    };

    _this.onBeaconTypeChange = function (type) {
      var _a = _this.props,
          query = _a.query,
          onChange = _a.onChange,
          filterMetricsOnType = _a.filterMetricsOnType;
      query.entityType = type;
      onChange(query);
      filterMetricsOnType(query.entityType.key);
    };

    _this.onGroupChange = function (group) {
      var _a = _this.props,
          query = _a.query,
          onChange = _a.onChange,
          onRunQuery = _a.onRunQuery;
      query.group = group;

      if (query.group && query.metricCategory.key === _GlobalVariables__WEBPACK_IMPORTED_MODULE_1__["ANALYZE_WEBSITE_METRICS"]) {
        query.showGroupBySecondLevel = query.group.type === 'KEY_VALUE_PAIR';
      }

      if (!query.showGroupBySecondLevel) {
        query.groupbyTagSecondLevelKey = '';
      }

      onChange(query);
      onRunQuery();
    };

    _this.debouncedRunQuery = lodash__WEBPACK_IMPORTED_MODULE_5___default.a.debounce(_this.props.onRunQuery, 500);

    _this.onGroupByTagSecondLevelKeyChange = function (eventItem) {
      var _a = _this.props,
          query = _a.query,
          onChange = _a.onChange;
      query.groupbyTagSecondLevelKey = eventItem.currentTarget.value;
      onChange(query); // onRunQuery with 500ms delay after last debounce

      _this.debouncedRunQuery();
    };

    _this.state = {
      websites: []
    };
    return _this;
  }

  WebsiteMetrics.prototype.componentDidMount = function () {
    var _this = this;

    var _a = this.props,
        query = _a.query,
        datasource = _a.datasource,
        onChange = _a.onChange;
    isUnmounting = false;
    datasource.fetchWebsites().then(function (websites) {
      if (!isUnmounting) {
        if (!lodash__WEBPACK_IMPORTED_MODULE_5___default.a.find(websites, {
          key: null
        })) {
          websites.unshift({
            key: null,
            label: _GlobalVariables__WEBPACK_IMPORTED_MODULE_1__["ALL_WEBSITES"]
          });
        }

        _this.setState({
          websites: websites
        });

        if ((!query.entity || !query.entity.key) && websites) {
          query.entity = websites[0];
        } else if (query.entity && !lodash__WEBPACK_IMPORTED_MODULE_5___default.a.find(websites, ['key', query.entity.key])) {
          query.entity = websites[0];
        }

        onChange(query);
      }
    });
    datasource.dataSourceWebsite.getWebsiteTags().then(function (websiteTags) {
      if (!isUnmounting) {
        _this.props.updateGroups(lodash__WEBPACK_IMPORTED_MODULE_5___default.a.sortBy(websiteTags, 'key')); // select a meaningful default group


        if (!query.group || !query.group.key) {
          query.group = lodash__WEBPACK_IMPORTED_MODULE_5___default.a.find(websiteTags, ['key', 'beacon.page.name']);
          onChange(query);
        }
      }
    });

    if (!query.entityType || !query.entityType.key) {
      query.entityType = _lists_beacon_types_website__WEBPACK_IMPORTED_MODULE_6__["default"][0];
      onChange(query);
    }

    datasource.dataSourceWebsite.getWebsiteMetricsCatalog().then(function (websiteMetrics) {
      if (!isUnmounting) {
        // store all available metrics first and filter by type afterwards
        _this.props.updateMetrics(websiteMetrics);

        _this.props.filterMetricsOnType(query.entityType.key);
      }
    });
  };

  WebsiteMetrics.prototype.componentWillUnmount = function () {
    isUnmounting = true;
  };

  WebsiteMetrics.prototype.render = function () {
    var _a = this.props,
        query = _a.query,
        groups = _a.groups;
    return react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement("div", {
      className: 'gf-form'
    }, react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(_FormField_FormSelect__WEBPACK_IMPORTED_MODULE_3__["default"], {
      queryKeyword: true,
      inputWidth: 0,
      label: 'Website',
      tooltip: 'Select your website.',
      noOptionsMessage: 'No websites found',
      value: query.entity,
      options: this.state.websites,
      onChange: this.onWebsiteChange
    }), react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(_FormField_FormSelect__WEBPACK_IMPORTED_MODULE_3__["default"], {
      queryKeyword: true,
      labelWidth: 6,
      label: 'Type',
      tooltip: 'Select a beacon type.',
      value: query.entityType,
      options: _lists_beacon_types_website__WEBPACK_IMPORTED_MODULE_6__["default"],
      onChange: this.onBeaconTypeChange
    }), react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(_FormField_FormSelect__WEBPACK_IMPORTED_MODULE_3__["default"], {
      queryKeyword: true,
      labelWidth: 6,
      label: 'Group by',
      tooltip: 'Group by tag.',
      value: query.group,
      options: groups,
      onChange: this.onGroupChange
    }), react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement("div", {
      style: !query.showGroupBySecondLevel ? {
        display: 'none'
      } : {}
    }, react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(_grafana_ui__WEBPACK_IMPORTED_MODULE_4__["Input"], {
      value: query.groupbyTagSecondLevelKey,
      onChange: this.onGroupByTagSecondLevelKeyChange
    })));
  };

  return WebsiteMetrics;
}(react__WEBPACK_IMPORTED_MODULE_2___default.a.Component);



/***/ }),

/***/ "./components/ApplicationServiceEndpointMetrics/ApplicationBoundaryScope.css":
/*!***********************************************************************************!*\
  !*** ./components/ApplicationServiceEndpointMetrics/ApplicationBoundaryScope.css ***!
  \***********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var api = __webpack_require__(/*! ../../../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js */ "../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js");
            var content = __webpack_require__(/*! !../../../node_modules/css-loader/dist/cjs.js??ref--8-1!../../../node_modules/postcss-loader/src??ref--8-2!../../../node_modules/sass-loader/dist/cjs.js!./ApplicationBoundaryScope.css */ "../node_modules/css-loader/dist/cjs.js?!../node_modules/postcss-loader/src/index.js?!../node_modules/sass-loader/dist/cjs.js!./components/ApplicationServiceEndpointMetrics/ApplicationBoundaryScope.css");

            content = content.__esModule ? content.default : content;

            if (typeof content === 'string') {
              content = [[module.i, content, '']];
            }

var options = {};

options.insert = "head";
options.singleton = false;

var update = api(content, options);

var exported = content.locals ? content.locals : {};



module.exports = exported;

/***/ }),

/***/ "./components/ApplicationServiceEndpointMetrics/ApplicationBoundaryScope.tsx":
/*!***********************************************************************************!*\
  !*** ./components/ApplicationServiceEndpointMetrics/ApplicationBoundaryScope.tsx ***!
  \***********************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return ApplicationBoundaryScope; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "../node_modules/tslib/tslib.es6.js");
/* harmony import */ var _grafana_ui__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @grafana/ui */ "@grafana/ui");
/* harmony import */ var _grafana_ui__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_grafana_ui__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _ApplicationBoundaryScope_css__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./ApplicationBoundaryScope.css */ "./components/ApplicationServiceEndpointMetrics/ApplicationBoundaryScope.css");
/* harmony import */ var _ApplicationBoundaryScope_css__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_ApplicationBoundaryScope_css__WEBPACK_IMPORTED_MODULE_3__);




var INBOUND = 'INBOUND';
var ALL = 'ALL';
var dropdown = {
  position: 'relative',
  background: 'transparent',
  width: '32px',
  height: '32px',
  marginRight: '4px'
};
var iconSize = 30;
var inboundIcon = react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement("svg", {
  className: 'iconStyle',
  height: iconSize,
  width: iconSize
}, react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement("path", {
  transform: "translate(3, 5)",
  fill: "#33a2e5",
  d: "M12.7891666,14.6051302 L12.7751756,19.8293818 L11.4691127,19.8328795 L11.4776628,16.6402814 L6.96695389,21.1509902 L6.2433066,20.427343 L10.7540155,15.9166341 L7.56141732,15.9251842 L7.56491507,14.6191213 L12.7891666,14.6051302 Z M15.754133,9.38135895 C17.1795716,9.38135895 18.3857119,10.5874993 18.3857119,12.0129379 C18.3857119,13.4383765 17.1795716,14.6445168 15.754133,14.6445168 C14.3286944,14.6445168 13.122554,13.4383765 13.122554,12.0129379 C13.122554,10.5874993 14.3286944,9.38135895 15.754133,9.38135895 Z M6.96695389,3.2433066 L11.4776628,7.75401547 L11.4691127,4.56141732 L12.7751756,4.56491507 L12.7891666,9.7891666 L7.56491507,9.77517557 L7.56141732,8.46911269 L10.7540155,8.47766276 L6.2433066,3.96695389 L6.96695389,3.2433066 Z"
}));
var allIcon = react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement("svg", {
  className: 'iconStyle',
  height: iconSize,
  width: iconSize
}, react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement("path", {
  transform: "translate(3, 5)",
  fill: "#33a2e5",
  d: "M7.54586,15 L7.53186897,20.2242515 L6.22580608,20.2277493 L6.23435616,17.0351511 L1.72364729,21.54586 L1,20.8222127 L5.51070887,16.3115038 L2.31811071,16.3200539 L2.32160847,15.013991 L7.54586,15 Z M14.1975552,7.94441147 L17.901552,11.628622 L14.1975552,15.3128325 L13.271556,14.3917799 L15.5351096,12.1403179 L12.4724561,12.1407167 C12.2827518,13.474447 11.1361413,14.5 9.75,14.5 C8.23121694,14.5 7,13.2687831 7,11.75 C7,10.2312169 8.23121694,9 9.75,9 C11.0508538,9 12.1407461,9.90323356 12.4267385,11.1167623 L15.5351096,11.1169261 L13.271556,8.8654641 L14.1975552,7.94441147 Z M20.75,9 C22.2687831,9 23.5,10.2312169 23.5,11.75 C23.5,13.2687831 22.2687831,14.5 20.75,14.5 C19.2312169,14.5 18,13.2687831 18,11.75 C18,10.2312169 19.2312169,9 20.75,9 Z M1.72364729,2 L6.23435616,6.51070887 L6.22580608,3.31811071 L7.53186897,3.32160847 L7.54586,8.54586 L2.32160847,8.53186897 L2.31811071,7.22580608 L5.51070887,7.23435616 L1,2.72364729 L1.72364729,2 Z"
}));
/**
 * Props have to be:
 *   value: string
 *   onChange: function that accepts a string as a parameter and returns void
 *   disabled: boolean
 */

function ApplicationBoundaryScope(props) {
  var theme = Object(_grafana_ui__WEBPACK_IMPORTED_MODULE_1__["useTheme"])();
  var opacity = props.disabled ? 0.5 : 1;
  var dropdown__list__item = {
    background: theme.colors.bg2,
    cursor: 'pointer',
    listStyle: 'none',
    borderRadius: '3px',
    height: '32px',
    opacity: opacity
  };

  var _a = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__read"])(Object(react__WEBPACK_IMPORTED_MODULE_2__["useState"])(false), 2),
      active = _a[0],
      setActive = _a[1];

  function toggleDropdown() {
    if (!props.disabled) {
      setActive(!active);
    }
  }

  function handleClick(entity) {
    props.onChange(entity);
    setActive(false);
  }

  return react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement("div", {
    style: dropdown
  }, react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement("div", {
    onClick: function onClick() {
      return toggleDropdown();
    },
    onBlur: function onBlur() {
      return setActive(false);
    },
    style: dropdown__list__item,
    contentEditable: true
  }, react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(_grafana_ui__WEBPACK_IMPORTED_MODULE_1__["Tooltip"], {
    content: props.value ? props.value : ALL,
    theme: 'info',
    placement: 'top'
  }, props.value === INBOUND ? inboundIcon : allIcon)), react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement("ul", {
    className: active ? 'dropdown-list-active' : 'dropdown-list'
  }, react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement("li", {
    onClick: function onClick() {
      return handleClick(INBOUND);
    },
    key: INBOUND,
    style: dropdown__list__item
  }, react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement("div", {
    className: 'iconTextContainer'
  }, inboundIcon, " ", react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement("span", {
    className: 'iconTextStyle'
  }, INBOUND))), react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement("li", {
    onClick: function onClick() {
      return handleClick(ALL);
    },
    key: ALL,
    style: dropdown__list__item
  }, react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement("div", {
    className: 'iconTextContainer'
  }, allIcon, " ", react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement("span", {
    className: 'iconTextStyle'
  }, ALL)))));
}

/***/ }),

/***/ "./components/ApplicationServiceEndpointMetrics/ApplicationServiceEndpointMetrics.tsx":
/*!********************************************************************************************!*\
  !*** ./components/ApplicationServiceEndpointMetrics/ApplicationServiceEndpointMetrics.tsx ***!
  \********************************************************************************************/
/*! exports provided: ApplicationServiceEndpointMetrics */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ApplicationServiceEndpointMetrics", function() { return ApplicationServiceEndpointMetrics; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "../node_modules/tslib/tslib.es6.js");
/* harmony import */ var _GlobalVariables__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../GlobalVariables */ "./GlobalVariables.ts");
/* harmony import */ var _grafana_ui__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @grafana/ui */ "@grafana/ui");
/* harmony import */ var _grafana_ui__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_grafana_ui__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _ApplicationBoundaryScope__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./ApplicationBoundaryScope */ "./components/ApplicationServiceEndpointMetrics/ApplicationBoundaryScope.tsx");
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! lodash */ "lodash");
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(lodash__WEBPACK_IMPORTED_MODULE_5__);






var isUnmounting = false;

var ApplicationServiceEndpointMetrics =
/** @class */
function (_super) {
  Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__extends"])(ApplicationServiceEndpointMetrics, _super);

  function ApplicationServiceEndpointMetrics(props) {
    var _this = _super.call(this, props) || this;

    _this.onApplicationChange = function (application) {
      var _a = _this.props,
          query = _a.query,
          onChange = _a.onChange,
          onRunQuery = _a.onRunQuery;
      query.entity = application;

      if (application.boundaryScope !== '') {
        //set the default boundary scope that is configured for this application
        query.applicationBoundaryScope = application.boundaryScope;
      } else {
        if (query.applicationBoundaryScope !== 'ALL' && query.applicationBoundaryScope !== 'INBOUND') {
          //if no default is set, set it to INBOUND
          query.applicationBoundaryScope = 'INBOUND';
        }
      }

      onChange(query);

      _this.loadServices();

      _this.loadEndpoints();

      onRunQuery();
    };

    _this.onServiceChange = function (service) {
      var _a = _this.props,
          query = _a.query,
          onChange = _a.onChange,
          onRunQuery = _a.onRunQuery;
      query.service = service;
      onChange(query);

      _this.loadEndpoints();

      onRunQuery();
    };

    _this.onEndpointChange = function (endpoint) {
      var _a = _this.props,
          query = _a.query,
          onChange = _a.onChange,
          onRunQuery = _a.onRunQuery;
      query.endpoint = endpoint;
      onChange(query);
      onRunQuery();
    };

    _this.debouncedRunQuery = lodash__WEBPACK_IMPORTED_MODULE_5___default.a.debounce(_this.props.onRunQuery, 500);

    _this.onGroupByTagSecondLevelKeyChange = function (eventItem) {
      var _a = _this.props,
          query = _a.query,
          onChange = _a.onChange;
      query.groupbyTagSecondLevelKey = eventItem.currentTarget.value;
      onChange(query); // onRunQuery with 500ms delay after last debounce

      _this.debouncedRunQuery();
    };

    _this.onApplicationBoundaryScopeChange = function (scope) {
      var _a = _this.props,
          query = _a.query,
          onChange = _a.onChange,
          onRunQuery = _a.onRunQuery;
      query.applicationBoundaryScope = scope;
      onChange(query);

      _this.loadServices();

      _this.loadEndpoints();

      onRunQuery();
    };

    _this.state = {
      applications: [],
      services: [],
      endpoints: [],
      value: {
        value: 2,
        imgUrl: '../../resources/dest.png'
      }
    };
    return _this;
  }

  ApplicationServiceEndpointMetrics.prototype.componentDidMount = function () {
    isUnmounting = false;
    this.loadApplications();
    this.loadServices();
    this.loadEndpoints();
    var datasource = this.props.datasource;
    this.props.updateMetrics(datasource.dataSourceApplication.getApplicationMetricsCatalog());
  };

  ApplicationServiceEndpointMetrics.prototype.componentWillUnmount = function () {
    isUnmounting = true;
  };

  ApplicationServiceEndpointMetrics.prototype.loadApplications = function () {
    var _this = this;

    var _a = this.props,
        query = _a.query,
        onChange = _a.onChange,
        datasource = _a.datasource;
    datasource.fetchApplications().then(function (applications) {
      if (!isUnmounting) {
        if (!lodash__WEBPACK_IMPORTED_MODULE_5___default.a.find(applications, {
          key: null
        })) {
          applications.unshift({
            key: null,
            label: _GlobalVariables__WEBPACK_IMPORTED_MODULE_1__["ALL_APPLICATIONS"]
          });
        }

        _this.setState({
          applications: applications
        }); // replace removed application and preselect entity


        if (query.entity && query.entity.key && !lodash__WEBPACK_IMPORTED_MODULE_5___default.a.find(applications, function (app) {
          return app.key === query.entity.key;
        })) {
          query.entity = applications[0];
        } else if ((!query.entity || !query.entity.key) && applications) {
          query.entity = applications[0];
        }

        onChange(query);
      }
    });
  };

  ApplicationServiceEndpointMetrics.prototype.loadServices = function () {
    var _this = this;

    var _a = this.props,
        query = _a.query,
        onChange = _a.onChange,
        datasource = _a.datasource;
    datasource.fetchServices(query).then(function (services) {
      if (!isUnmounting) {
        if (!lodash__WEBPACK_IMPORTED_MODULE_5___default.a.find(services, {
          key: null
        })) {
          services.unshift({
            key: null,
            label: _GlobalVariables__WEBPACK_IMPORTED_MODULE_1__["ALL_SERVICES"]
          });
        }

        _this.setState({
          services: services
        }); // replace removed service and preselect service


        if (query.service && query.service.key) {
          if (!lodash__WEBPACK_IMPORTED_MODULE_5___default.a.find(services, function (app) {
            return app.key === query.service.key;
          })) {
            query.service = services[0];
          }
        } else {
          query.service = services[0];
        }

        onChange(query);
      }
    });
  };

  ApplicationServiceEndpointMetrics.prototype.loadEndpoints = function () {
    var _this = this;

    var _a = this.props,
        query = _a.query,
        onChange = _a.onChange,
        datasource = _a.datasource;
    datasource.fetchEndpoints(query).then(function (endpoints) {
      if (!isUnmounting) {
        if (!lodash__WEBPACK_IMPORTED_MODULE_5___default.a.find(endpoints, {
          key: null
        })) {
          endpoints.unshift({
            key: null,
            label: _GlobalVariables__WEBPACK_IMPORTED_MODULE_1__["ALL_ENDPOINTS"]
          });
        }

        _this.setState({
          endpoints: endpoints
        }); // replace removed endpoint and preselect endpoint


        if (query.endpoint && query.endpoint.key) {
          if (!lodash__WEBPACK_IMPORTED_MODULE_5___default.a.find(endpoints, function (app) {
            return app.key === query.endpoint.key;
          })) {
            query.endpoint = {
              key: null,
              label: _GlobalVariables__WEBPACK_IMPORTED_MODULE_1__["ALL_ENDPOINTS"]
            };
          }
        } else {
          query.endpoint = {
            key: null,
            label: _GlobalVariables__WEBPACK_IMPORTED_MODULE_1__["ALL_ENDPOINTS"]
          };
        }

        onChange(query);
      }
    });
  };

  ApplicationServiceEndpointMetrics.prototype.render = function () {
    var _a;

    var query = this.props.query;
    return react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement("div", {
      className: 'gf-form'
    }, react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement(_grafana_ui__WEBPACK_IMPORTED_MODULE_2__["InlineFormLabel"], {
      className: 'query-keyword',
      width: 14,
      tooltip: 'Select your application.'
    }, "Application"), react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement(_ApplicationBoundaryScope__WEBPACK_IMPORTED_MODULE_4__["default"], {
      value: query.applicationBoundaryScope,
      disabled: !((_a = query.entity) === null || _a === void 0 ? void 0 : _a.key),
      onChange: this.onApplicationBoundaryScopeChange
    }), react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement(_grafana_ui__WEBPACK_IMPORTED_MODULE_2__["Select"], {
      menuPlacement: 'bottom',
      width: 0,
      isSearchable: true,
      value: query.entity,
      options: this.state.applications,
      onChange: this.onApplicationChange
    }), react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement(_grafana_ui__WEBPACK_IMPORTED_MODULE_2__["InlineFormLabel"], {
      className: 'query-keyword',
      width: 6,
      tooltip: 'Select your service.'
    }, "Service"), react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement(_grafana_ui__WEBPACK_IMPORTED_MODULE_2__["Select"], {
      menuPlacement: 'bottom',
      width: 0,
      isSearchable: true,
      value: query.service,
      options: this.state.services,
      onChange: this.onServiceChange
    }), react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement(_grafana_ui__WEBPACK_IMPORTED_MODULE_2__["InlineFormLabel"], {
      className: 'query-keyword',
      width: 6,
      tooltip: 'Select your endpoint.'
    }, "Endpoint"), react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement(_grafana_ui__WEBPACK_IMPORTED_MODULE_2__["Select"], {
      menuPlacement: 'bottom',
      width: 0,
      isSearchable: true,
      value: query.endpoint,
      options: this.state.endpoints,
      onChange: this.onEndpointChange
    }), react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement("div", {
      style: !query.showGroupBySecondLevel ? {
        display: 'none'
      } : {}
    }, react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement(_grafana_ui__WEBPACK_IMPORTED_MODULE_2__["Input"], {
      value: query.groupbyTagSecondLevelKey,
      onChange: this.onGroupByTagSecondLevelKeyChange
    })));
  };

  return ApplicationServiceEndpointMetrics;
}(react__WEBPACK_IMPORTED_MODULE_3___default.a.Component);



/***/ }),

/***/ "./components/ConfigEditor.tsx":
/*!*************************************!*\
  !*** ./components/ConfigEditor.tsx ***!
  \*************************************/
/*! exports provided: ConfigEditor */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ConfigEditor", function() { return ConfigEditor; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "../node_modules/tslib/tslib.es6.js");
/* harmony import */ var _plugin_css__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./plugin.css */ "./components/plugin.css");
/* harmony import */ var _plugin_css__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_plugin_css__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _grafana_ui__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @grafana/ui */ "@grafana/ui");
/* harmony import */ var _grafana_ui__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_grafana_ui__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! lodash */ "lodash");
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(lodash__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _util_instana_version__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../util/instana_version */ "./util/instana_version.ts");
/* harmony import */ var _util_proxy_check__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../util/proxy_check */ "./util/proxy_check.ts");








var ConfigEditor =
/** @class */
function (_super) {
  Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__extends"])(ConfigEditor, _super);

  function ConfigEditor(props) {
    var _a;

    var _this = _super.call(this, props) || this;

    _this.onInstanaOptionsChange = function (eventItem, key) {
      var _a;

      var _b = _this.props,
          options = _b.options,
          onOptionsChange = _b.onOptionsChange;

      var jsonData = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"])(Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"])({}, options.jsonData), (_a = {}, _a[key] = eventItem.currentTarget.value, _a));

      var secureJsonData;

      if (key === 'apiToken') {
        secureJsonData = {
          apiToken: eventItem.currentTarget.value
        };
        delete jsonData.apiToken;
        options.secureJsonData = secureJsonData; // Update state for API key configuration

        var isApiKeyConfigured = !!eventItem.currentTarget.value;
        var apiKeyValue = isApiKeyConfigured ? eventItem.currentTarget.value : '';

        _this.setState({
          isApiKeyConfigured: isApiKeyConfigured,
          apiKeyValue: apiKeyValue
        });
      }

      onOptionsChange(Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"])(Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"])({}, options), {
        jsonData: jsonData,
        secureJsonData: secureJsonData
      }));

      if ('url' === key || 'apiToken' === key) {
        _this.debouncedDetectFeatures(options);
      }
    };

    _this.onResetAPIKey = function () {
      var _a = _this.props,
          options = _a.options,
          onOptionsChange = _a.onOptionsChange;
      onOptionsChange(Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"])(Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"])({}, options), {
        secureJsonFields: Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"])(Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"])({}, options.secureJsonFields), {
          apiToken: false
        }),
        secureJsonData: Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"])(Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"])({}, options.secureJsonData), {
          apiToken: ''
        })
      })); // Removed unused variable

      _this.setState({
        apiKeyValue: ''
      });
    };

    _this.onSwitchChange = function (eventItem, key) {
      var _a;

      var _b = _this.props,
          options = _b.options,
          onOptionsChange = _b.onOptionsChange;
      var value = false;

      if (eventItem && eventItem.currentTarget) {
        value = !options.jsonData[key];
      }

      var jsonData = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"])(Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"])({}, options.jsonData), (_a = {}, _a[key] = value, _a));

      onOptionsChange(Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"])(Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"])({}, options), {
        jsonData: jsonData
      }));
    };

    _this.debouncedDetectFeatures = function (settings) {
      lodash__WEBPACK_IMPORTED_MODULE_4___default.a.debounce(function () {
        return _this.detectFeatures(settings);
      }, 500);
    };
    /**
     * Checks whether the provided tenant-unit is able to provide certain features such as querying offline snapshots.
     */


    _this.detectFeatures = function (settings) {
      var jsonData = settings ? settings.jsonData : _this.props.options.jsonData;

      if (!jsonData || !jsonData.url) {
        return;
      }

      _this.setState({
        canUseProxy: Object(_util_proxy_check__WEBPACK_IMPORTED_MODULE_6__["default"])()
      });

      Object(_util_instana_version__WEBPACK_IMPORTED_MODULE_5__["default"])(jsonData).then(function (version) {
        version ? _this.setState({
          canQueryOfflineSnapshots: version >= 156
        }) : _this.setState({
          canQueryOfflineSnapshots: false
        });
      });
    };

    _this.state = {
      canQueryOfflineSnapshots: false,
      canUseProxy: false,
      isApiKeyConfigured: false,
      apiKeyValue: ''
    }; // check possibility every time

    _this.detectFeatures();

    var _b = _this.props,
        options = _b.options,
        onOptionsChange = _b.onOptionsChange;
    var jsonData = options.jsonData;

    if (jsonData.useProxy === undefined) {
      jsonData.useProxy = Object(_util_proxy_check__WEBPACK_IMPORTED_MODULE_6__["default"])();
    }

    jsonData.useProxy = true; // Check if API key is already configured

    var isApiKeyConfigured = !!((_a = options.secureJsonData) === null || _a === void 0 ? void 0 : _a.apiToken);
    var apiKeyValue = isApiKeyConfigured ? '********' : '';

    _this.setState({
      isApiKeyConfigured: isApiKeyConfigured,
      apiKeyValue: apiKeyValue
    });

    onOptionsChange(Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"])(Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"])({}, options), {
      jsonData: jsonData
    }));
    return _this;
  }

  ConfigEditor.prototype.render = function () {
    var _this = this;

    var _a, _b;

    var options = this.props.options;
    var jsonData = options.jsonData;
    var apiKeyValue = this.state.apiKeyValue;
    return react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement("div", {
      className: "settings"
    }, react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement(_grafana_ui__WEBPACK_IMPORTED_MODULE_2__["Legend"], null, "Instana configuration"), react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement(_grafana_ui__WEBPACK_IMPORTED_MODULE_2__["Field"], {
      className: 'width-30',
      horizontal: true,
      required: true,
      label: "URL",
      description: "The URL of your Instana installation."
    }, react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement(_grafana_ui__WEBPACK_IMPORTED_MODULE_2__["Input"], {
      width: 30,
      value: jsonData.url,
      placeholder: 'https://tools-acme.instana.io',
      onChange: function onChange(event) {
        return _this.onInstanaOptionsChange(event, 'url');
      }
    })), react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement(_grafana_ui__WEBPACK_IMPORTED_MODULE_2__["Field"], {
      style: {
        width: '637px'
      },
      horizontal: true,
      required: true,
      label: "API Token",
      description: "The API token to access the data."
    }, react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement("div", {
      style: {
        display: 'flex'
      }
    }, react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement(_grafana_ui__WEBPACK_IMPORTED_MODULE_2__["Input"], {
      type: "password",
      width: 30,
      value: apiKeyValue,
      placeholder: ((_a = options.secureJsonFields) === null || _a === void 0 ? void 0 : _a.apiToken) ? 'Configured' : 'Enter API Key',
      readOnly: (_b = options.secureJsonFields) === null || _b === void 0 ? void 0 : _b.apiToken,
      suffix: react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement(_grafana_ui__WEBPACK_IMPORTED_MODULE_2__["Tooltip"], {
        content: react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement("p", null, "You can create API tokens following the instructions at\xA0", react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement("a", {
          href: "https://www.ibm.com/docs/en/obi/current?topic=apis-web-rest-api#unit-specific-api-tokens"
        }, "https://www.ibm.com/docs/en/obi/current?topic=apis-web-rest-api")),
        theme: 'info'
      }, react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement(_grafana_ui__WEBPACK_IMPORTED_MODULE_2__["Icon"], {
        name: "info-circle"
      })),
      onChange: function onChange(event) {
        return _this.onInstanaOptionsChange(event, 'apiToken');
      }
    }), react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement("div", {
      style: {
        marginLeft: '15px'
      }
    }, react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement(_grafana_ui__WEBPACK_IMPORTED_MODULE_2__["Button"], {
      onClick: this.onResetAPIKey
    }, "Reset API Token")))), react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement(_grafana_ui__WEBPACK_IMPORTED_MODULE_2__["Checkbox"], {
      label: 'Use Proxy',
      value: true,
      disabled: true,
      description: 'The only way to use the API token for authentication in Grafana is through Use-Proxy. Needs Grafana 10.0.0+ and Instana datasource 4.0.0+'
    }), react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement(_grafana_ui__WEBPACK_IMPORTED_MODULE_2__["Checkbox"], {
      label: 'Enable offline snapshots',
      value: jsonData.showOffline,
      onChange: function onChange(event) {
        return _this.onSwitchChange(event, 'showOffline');
      },
      description: 'Enables querying offline snapshots. Needs Instana release 260+ and Instana datasource 3.3.0+'
    }), react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement(_grafana_ui__WEBPACK_IMPORTED_MODULE_2__["Checkbox"], {
      label: 'Enable Infrastructure Analyze category',
      value: jsonData.allowInfraExplore,
      onChange: function onChange(event) {
        return _this.onSwitchChange(event, 'allowInfraExplore');
      },
      description: 'Adds a new category that allows usage of Infrastructure Analyze functionality. Needs Instana release ' + '195+ and an explicit feature flag. If you are interested in this technology, please submit a request via ' + 'our support system at https://support.instana.com/.'
    }), react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement("br", null), react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement("br", null), react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement("b", null, "Maximum query intervals in hours"), react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement("p", {
      className: 'width-30'
    }, "This settings are optional values to control the load of data queries, by defining the maximum allowed query intervals against the Instana API."), react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement(_grafana_ui__WEBPACK_IMPORTED_MODULE_2__["Field"], {
      className: 'width-30',
      horizontal: true,
      label: "Infrastructure metrics"
    }, react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement(_grafana_ui__WEBPACK_IMPORTED_MODULE_2__["Input"], {
      width: 30,
      value: jsonData.queryinterval_limit_infra,
      placeholder: 'optional: interval limit in hours',
      onChange: function onChange(event) {
        return _this.onInstanaOptionsChange(event, 'queryinterval_limit_infra');
      }
    })), react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement(_grafana_ui__WEBPACK_IMPORTED_MODULE_2__["Field"], {
      className: 'width-30',
      horizontal: true,
      label: "Application metrics"
    }, react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement(_grafana_ui__WEBPACK_IMPORTED_MODULE_2__["Input"], {
      width: 30,
      value: jsonData.queryinterval_limit_app_metrics,
      placeholder: 'optional: interval limit in hours',
      onChange: function onChange(event) {
        return _this.onInstanaOptionsChange(event, 'queryinterval_limit_app_metrics');
      }
    })), react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement(_grafana_ui__WEBPACK_IMPORTED_MODULE_2__["Field"], {
      className: 'width-30',
      horizontal: true,
      label: "Analyze application calls"
    }, react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement(_grafana_ui__WEBPACK_IMPORTED_MODULE_2__["Input"], {
      width: 30,
      value: jsonData.queryinterval_limit_app_calls,
      placeholder: 'optional: interval limit in hours',
      onChange: function onChange(event) {
        return _this.onInstanaOptionsChange(event, 'queryinterval_limit_app_calls');
      }
    })), react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement(_grafana_ui__WEBPACK_IMPORTED_MODULE_2__["Field"], {
      className: 'width-30',
      horizontal: true,
      label: "Analyze website"
    }, react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement(_grafana_ui__WEBPACK_IMPORTED_MODULE_2__["Input"], {
      width: 30,
      value: jsonData.queryinterval_limit_website_metrics,
      placeholder: 'optional: interval limit in hours',
      onChange: function onChange(event) {
        return _this.onInstanaOptionsChange(event, 'queryinterval_limit_website_metrics');
      }
    })), react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement(_grafana_ui__WEBPACK_IMPORTED_MODULE_2__["Field"], {
      className: 'width-30',
      horizontal: true,
      label: "Analyze mobile app"
    }, react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement(_grafana_ui__WEBPACK_IMPORTED_MODULE_2__["Input"], {
      width: 30,
      value: jsonData.queryinterval_limit_mobileapp_metrics,
      placeholder: 'optional: interval limit in hours',
      onChange: function onChange(event) {
        return _this.onInstanaOptionsChange(event, 'queryinterval_limit_mobileapp_metrics');
      }
    })));
  };

  return ConfigEditor;
}(react__WEBPACK_IMPORTED_MODULE_3__["PureComponent"]);



/***/ }),

/***/ "./components/Entity/Entity.tsx":
/*!**************************************!*\
  !*** ./components/Entity/Entity.tsx ***!
  \**************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Entity; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "../node_modules/tslib/tslib.es6.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _grafana_ui__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @grafana/ui */ "@grafana/ui");
/* harmony import */ var _grafana_ui__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_grafana_ui__WEBPACK_IMPORTED_MODULE_2__);



var DESTINATION = 'DESTINATION';
var SOURCE = 'SOURCE';
var dropdown = {
  position: 'relative',
  background: 'transparent',
  width: '32px',
  height: '32px',
  marginRight: '4px'
};
var dropdown__list = {
  transition: 'max-height .2s ease-out',
  maxHeight: 0,
  overflow: 'hidden',
  zIndex: 1,
  position: 'fixed'
};
var dropdown__list__active = {
  overflow: 'hidden',
  zIndex: 2,
  position: 'fixed',
  maxHeight: '1000px',
  opacity: 1
};
var iconTextContainer = {
  display: 'inline-flex'
};
var iconStyle = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center'
};
var iconTextStyle = {
  padding: '7px'
};
var iconSize = 30;
var destinationIcon = react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("svg", {
  style: iconStyle,
  height: iconSize,
  width: iconSize
}, react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("path", {
  transform: "translate(3, 5)",
  fill: "#33a2e5",
  d: "M4 11.173h6.38L8.115 8.92 9.042 8l3.704 3.684-3.704 3.684-.926-.92 2.263-2.252H4zM16.43 14.316c-1.426 0-2.632-1.206-2.632-2.632 0-1.425 1.206-2.631 2.632-2.631 1.425 0 2.631 1.206 2.631 2.631 0 1.426-1.206 2.632-2.631 2.632z"
}));
var sourceIcon = react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("svg", {
  style: iconStyle,
  height: iconSize,
  width: iconSize
}, react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("path", {
  transform: "translate(3, 5)",
  fill: "#33a2e5",
  d: "M9.939 11.173h6.379L14.054 8.92 14.98 8l3.704 3.684-3.704 3.684-.926-.92 2.264-2.252h-6.38c-.308 1.023-1.234 1.842-2.366 1.842C6.132 14.243 5 13.117 5 11.787c0-1.33 1.132-2.457 2.47-2.457 1.234 0 2.16.717 2.469 1.843z"
}));
/**
 * Props have to be:
 *   value: string
 *   onChange: function that accepts a string as a parameter and returns void
 */

function Entity(props) {
  var theme = Object(_grafana_ui__WEBPACK_IMPORTED_MODULE_2__["useTheme"])();
  var dropdown__list__item = {
    background: theme.colors.bg2,
    cursor: 'pointer',
    listStyle: 'none',
    borderRadius: '3px',
    height: '32px'
  };

  var _a = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__read"])(Object(react__WEBPACK_IMPORTED_MODULE_1__["useState"])(false), 2),
      active = _a[0],
      setActive = _a[1];

  function toggleDropdown() {
    setActive(!active);
  }

  function handleClick(entity) {
    props.onChange(entity);
    setActive(false);
  }

  return react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", {
    style: dropdown
  }, react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", {
    onClick: function onClick() {
      return toggleDropdown();
    },
    onBlur: function onBlur() {
      return setActive(false);
    },
    style: dropdown__list__item,
    contentEditable: true
  }, react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_grafana_ui__WEBPACK_IMPORTED_MODULE_2__["Tooltip"], {
    content: props.value,
    theme: 'info',
    placement: 'top'
  }, props.value === DESTINATION ? destinationIcon : sourceIcon)), react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("ul", {
    style: active ? dropdown__list__active : dropdown__list
  }, react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("li", {
    onClick: function onClick() {
      return handleClick(DESTINATION);
    },
    key: DESTINATION,
    style: dropdown__list__item
  }, react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", {
    style: iconTextContainer
  }, destinationIcon, " ", react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("span", {
    style: iconTextStyle
  }, DESTINATION))), react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("li", {
    onClick: function onClick() {
      return handleClick('SOURCE');
    },
    key: SOURCE,
    style: dropdown__list__item
  }, react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", {
    style: iconTextContainer
  }, sourceIcon, " ", react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("span", {
    style: iconTextStyle
  }, SOURCE)))));
}

/***/ }),

/***/ "./components/FormField/FormInput.tsx":
/*!********************************************!*\
  !*** ./components/FormField/FormInput.tsx ***!
  \********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "../node_modules/tslib/tslib.es6.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _grafana_ui__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @grafana/ui */ "@grafana/ui");
/* harmony import */ var _grafana_ui__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_grafana_ui__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _FormWrapper__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./FormWrapper */ "./components/FormField/FormWrapper.tsx");




/**
 * Default input field including label. Input element is grafana/ui <Input />.
 */

var FormInput =
/** @class */
function (_super) {
  Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__extends"])(FormInput, _super);

  function FormInput(props) {
    return _super.call(this, props) || this;
  }

  FormInput.prototype.render = function () {
    var _a = this.props,
        label = _a.label,
        tooltip = _a.tooltip,
        queryKeyword = _a.queryKeyword,
        disabled = _a.disabled,
        _b = _a.labelWidth,
        labelWidth = _b === void 0 ? 14 : _b,
        _c = _a.inputWidth,
        inputWidth = _c === void 0 ? 30 : _c,
        remainingProps = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__rest"])(_a, ["label", "tooltip", "queryKeyword", "disabled", "labelWidth", "inputWidth"]);

    return react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_FormWrapper__WEBPACK_IMPORTED_MODULE_3__["default"], {
      disabled: disabled,
      stretch: !inputWidth
    }, react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_grafana_ui__WEBPACK_IMPORTED_MODULE_2__["InlineFormLabel"], {
      className: queryKeyword ? 'query-keyword' : '',
      width: labelWidth,
      tooltip: tooltip
    }, label), react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_grafana_ui__WEBPACK_IMPORTED_MODULE_2__["Input"], Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"])({
      width: inputWidth,
      disabled: disabled
    }, remainingProps)));
  };

  return FormInput;
}(react__WEBPACK_IMPORTED_MODULE_1___default.a.Component);

/* harmony default export */ __webpack_exports__["default"] = (FormInput);

/***/ }),

/***/ "./components/FormField/FormSelect.tsx":
/*!*********************************************!*\
  !*** ./components/FormField/FormSelect.tsx ***!
  \*********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "../node_modules/tslib/tslib.es6.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _grafana_ui__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @grafana/ui */ "@grafana/ui");
/* harmony import */ var _grafana_ui__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_grafana_ui__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _FormWrapper__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./FormWrapper */ "./components/FormField/FormWrapper.tsx");




/**
 * Default select field including label. Select element is grafana/ui <Select />.
 */

var FormSelect =
/** @class */
function (_super) {
  Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__extends"])(FormSelect, _super);

  function FormSelect(props) {
    return _super.call(this, props) || this;
  }

  FormSelect.prototype.render = function () {
    var _a = this.props,
        label = _a.label,
        tooltip = _a.tooltip,
        _b = _a.searchable,
        searchable = _b === void 0 ? true : _b,
        disabled = _a.disabled,
        queryKeyword = _a.queryKeyword,
        _c = _a.placeholder,
        placeholder = _c === void 0 ? '-' : _c,
        _d = _a.labelWidth,
        labelWidth = _d === void 0 ? 14 : _d,
        _e = _a.inputWidth,
        inputWidth = _e === void 0 ? 30 : _e,
        remainingProps = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__rest"])(_a, ["label", "tooltip", "searchable", "disabled", "queryKeyword", "placeholder", "labelWidth", "inputWidth"]);

    return react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_FormWrapper__WEBPACK_IMPORTED_MODULE_3__["default"], {
      disabled: disabled,
      stretch: !inputWidth
    }, react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_grafana_ui__WEBPACK_IMPORTED_MODULE_2__["InlineFormLabel"], {
      className: queryKeyword ? 'query-keyword' : '',
      width: labelWidth,
      tooltip: tooltip
    }, label), react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_grafana_ui__WEBPACK_IMPORTED_MODULE_2__["Select"], Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"])({
      menuPlacement: 'bottom',
      disabled: disabled,
      width: inputWidth,
      isSearchable: searchable,
      placeholder: placeholder
    }, remainingProps)));
  };

  return FormSelect;
}(react__WEBPACK_IMPORTED_MODULE_1___default.a.Component);

/* harmony default export */ __webpack_exports__["default"] = (FormSelect);

/***/ }),

/***/ "./components/FormField/FormSwitch.tsx":
/*!*********************************************!*\
  !*** ./components/FormField/FormSwitch.tsx ***!
  \*********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "../node_modules/tslib/tslib.es6.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _grafana_ui__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @grafana/ui */ "@grafana/ui");
/* harmony import */ var _grafana_ui__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_grafana_ui__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _FormWrapper__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./FormWrapper */ "./components/FormField/FormWrapper.tsx");




var Switch = _grafana_ui__WEBPACK_IMPORTED_MODULE_2__["LegacyForms"].Switch;
/**
 * Default switch field including label. Switch element is grafana/ui <Switch />.
 */

var FormSwitch =
/** @class */
function (_super) {
  Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__extends"])(FormSwitch, _super);

  function FormSwitch(props) {
    return _super.call(this, props) || this;
  }

  FormSwitch.prototype.render = function () {
    var _a = this.props,
        label = _a.label,
        tooltip = _a.tooltip,
        queryKeyword = _a.queryKeyword,
        disabled = _a.disabled,
        _b = _a.labelWidth,
        labelWidth = _b === void 0 ? 14 : _b,
        value = _a.value,
        remainingProps = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__rest"])(_a, ["label", "tooltip", "queryKeyword", "disabled", "labelWidth", "value"]);

    return react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_FormWrapper__WEBPACK_IMPORTED_MODULE_3__["default"], {
      disabled: disabled,
      stretch: false
    }, react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_grafana_ui__WEBPACK_IMPORTED_MODULE_2__["InlineFormLabel"], {
      className: queryKeyword ? 'query-keyword' : '',
      width: labelWidth,
      tooltip: tooltip
    }, label), react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(Switch, Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"])({
      checked: value,
      label: ''
    }, remainingProps)));
  };

  return FormSwitch;
}(react__WEBPACK_IMPORTED_MODULE_1___default.a.Component);

/* harmony default export */ __webpack_exports__["default"] = (FormSwitch);

/***/ }),

/***/ "./components/FormField/FormTextArea.tsx":
/*!***********************************************!*\
  !*** ./components/FormField/FormTextArea.tsx ***!
  \***********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "../node_modules/tslib/tslib.es6.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _grafana_ui__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @grafana/ui */ "@grafana/ui");
/* harmony import */ var _grafana_ui__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_grafana_ui__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _FormWrapper__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./FormWrapper */ "./components/FormField/FormWrapper.tsx");




/**
 * Default input text area including label. Input text area is grafana/ui <TextArea />.
 */

var FormTextArea =
/** @class */
function (_super) {
  Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__extends"])(FormTextArea, _super);

  function FormTextArea(props) {
    return _super.call(this, props) || this;
  }

  FormTextArea.prototype.render = function () {
    var _a = this.props,
        label = _a.label,
        tooltip = _a.tooltip,
        queryKeyword = _a.queryKeyword,
        disabled = _a.disabled,
        _b = _a.labelWidth,
        labelWidth = _b === void 0 ? 14 : _b,
        _c = _a.inputWidth,
        inputWidth = _c === void 0 ? 30 : _c,
        remainingProps = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__rest"])(_a, ["label", "tooltip", "queryKeyword", "disabled", "labelWidth", "inputWidth"]);

    return react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_FormWrapper__WEBPACK_IMPORTED_MODULE_3__["default"], {
      disabled: disabled,
      stretch: !inputWidth
    }, react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_grafana_ui__WEBPACK_IMPORTED_MODULE_2__["InlineFormLabel"], {
      className: queryKeyword ? 'query-keyword' : '',
      width: labelWidth,
      tooltip: tooltip
    }, label), react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_grafana_ui__WEBPACK_IMPORTED_MODULE_2__["TextArea"], Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"])({
      rows: 4,
      width: inputWidth,
      disabled: disabled
    }, remainingProps)));
  };

  return FormTextArea;
}(react__WEBPACK_IMPORTED_MODULE_1___default.a.Component);

/* harmony default export */ __webpack_exports__["default"] = (FormTextArea);

/***/ }),

/***/ "./components/FormField/FormWrapper.tsx":
/*!**********************************************!*\
  !*** ./components/FormField/FormWrapper.tsx ***!
  \**********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return FormWrapper; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);

function FormWrapper(props) {
  var style = {
    display: 'flex'
  };

  if (props.disabled) {
    style.opacity = '0.4';
    style.pointerEvents = 'none';
  }

  if (props.stretch) {
    style.width = '100%';
  }

  return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    style: style
  }, props.children);
}

/***/ }),

/***/ "./components/Infrastructure/Custom/FreeTextMetrics.tsx":
/*!**************************************************************!*\
  !*** ./components/Infrastructure/Custom/FreeTextMetrics.tsx ***!
  \**************************************************************/
/*! exports provided: FreeTextMetrics */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FreeTextMetrics", function() { return FreeTextMetrics; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "../node_modules/tslib/tslib.es6.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _FormField_FormSwitch__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../FormField/FormSwitch */ "./components/FormField/FormSwitch.tsx");
/* harmony import */ var _grafana_ui__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @grafana/ui */ "@grafana/ui");
/* harmony import */ var _grafana_ui__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_grafana_ui__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! lodash */ "lodash");
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(lodash__WEBPACK_IMPORTED_MODULE_4__);






var FreeTextMetrics =
/** @class */
function (_super) {
  Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__extends"])(FreeTextMetrics, _super);

  function FreeTextMetrics(props) {
    var _this = _super.call(this, props) || this;

    _this.debouncedRunQuery = lodash__WEBPACK_IMPORTED_MODULE_4___default.a.debounce(_this.props.onRunQuery, 500);

    _this.onUseFreeTextMetricsChange = function (event) {
      var _a = _this.props,
          query = _a.query,
          onChange = _a.onChange,
          loadEntityTypes = _a.loadEntityTypes;

      if (event && event.currentTarget) {
        query.useFreeTextMetrics = event.currentTarget.checked;

        if (query.useFreeTextMetrics) {
          loadEntityTypes(false);
          query.metric = {};
        } else {
          loadEntityTypes(true);
        }

        onChange(query);
      }
    };

    _this.onFreeTextMetricsChange = function (eventItem) {
      var _a = _this.props,
          query = _a.query,
          onChange = _a.onChange;
      query.freeTextMetrics = eventItem.currentTarget.value;
      onChange(query); // onRunQuery with 500ms delay after last debounce

      _this.debouncedRunQuery();
    };

    return _this;
  }

  FreeTextMetrics.prototype.render = function () {
    var query = this.props.query;
    return react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", {
      className: 'gf-form'
    }, react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_FormField_FormSwitch__WEBPACK_IMPORTED_MODULE_2__["default"], {
      queryKeyword: true,
      label: 'Enable free text metrics',
      tooltip: 'Specify comma separated metrics directly in this text field. Once this field has a value,' + ' selected metrics from above will be ignored. Enabled as soon as a query is entered.' + ' Max 4 metrics supported.',
      value: query.useFreeTextMetrics,
      onChange: this.onUseFreeTextMetricsChange,
      disabled: false
    }), react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_grafana_ui__WEBPACK_IMPORTED_MODULE_3__["Input"], {
      width: 0,
      disabled: !query.useFreeTextMetrics,
      value: query.freeTextMetrics,
      placeholder: 'metric.one,metric.two,metric.three',
      onChange: this.onFreeTextMetricsChange
    }));
  };

  return FreeTextMetrics;
}(react__WEBPACK_IMPORTED_MODULE_1___default.a.Component);



/***/ }),

/***/ "./components/Infrastructure/Custom/MetricFilter.tsx":
/*!***********************************************************!*\
  !*** ./components/Infrastructure/Custom/MetricFilter.tsx ***!
  \***********************************************************/
/*! exports provided: MetricFilter */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MetricFilter", function() { return MetricFilter; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "../node_modules/tslib/tslib.es6.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _GlobalVariables__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../GlobalVariables */ "./GlobalVariables.ts");
/* harmony import */ var _grafana_ui__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @grafana/ui */ "@grafana/ui");
/* harmony import */ var _grafana_ui__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_grafana_ui__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _FormField_FormInput__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../FormField/FormInput */ "./components/FormField/FormInput.tsx");






var MetricFilter =
/** @class */
function (_super) {
  Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__extends"])(MetricFilter, _super);

  function MetricFilter(props) {
    var _this = _super.call(this, props) || this;

    _this.onFilterChange = function (eventItem, index) {
      var customFilters = _this.state.customFilters;
      customFilters[index] = eventItem.currentTarget.value;

      _this.setState({
        customFilters: customFilters
      });

      _this.props.onFilterChange(customFilters);
    };

    _this.addCustomFilter = function () {
      var customFilters = _this.state.customFilters;
      customFilters.push('');

      _this.setState({
        customFilters: customFilters
      });

      var _a = _this.props,
          query = _a.query,
          onChange = _a.onChange;
      query.customFilters = customFilters;
      onChange(query);
    };

    _this.removeCustomFilter = function (index) {
      var customFilters = _this.state.customFilters;
      customFilters.splice(index, 1);

      _this.setState({
        customFilters: customFilters
      });

      _this.props.onFilterChange(customFilters);
    };

    _this.state = {
      customFilters: []
    };
    return _this;
  }

  MetricFilter.prototype.componentDidMount = function () {
    var query = this.props.query;
    this.setState({
      customFilters: query.customFilters
    });
  };

  MetricFilter.prototype.render = function () {
    var _this = this;

    var filter = null;
    var listFilter = this.state.customFilters.map(function (filters, index) {
      filter = react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", {
        className: 'gf-form'
      }, react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_FormField_FormInput__WEBPACK_IMPORTED_MODULE_4__["default"], {
        label: index + 1 + '. filter metric select',
        value: _this.state.customFilters[index],
        placeholder: _GlobalVariables__WEBPACK_IMPORTED_MODULE_2__["PLEASE_SPECIFY"],
        onChange: function onChange(event) {
          return _this.onFilterChange(event, index);
        },
        tooltip: 'Type to suggest metrics.'
      }), react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_grafana_ui__WEBPACK_IMPORTED_MODULE_3__["Button"], {
        variant: 'secondary',
        onClick: function onClick() {
          return _this.removeCustomFilter(index);
        }
      }, "-"));
      return filter;
    });
    return react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", null, listFilter, react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", {
      className: 'gf-form'
    }, react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_grafana_ui__WEBPACK_IMPORTED_MODULE_3__["InlineFormLabel"], {
      width: 14,
      tooltip: 'Add an additional metric select filter.'
    }, "Add filter metric select"), react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_grafana_ui__WEBPACK_IMPORTED_MODULE_3__["Button"], {
      variant: 'secondary',
      onClick: this.addCustomFilter
    }, "+")));
  };

  return MetricFilter;
}(react__WEBPACK_IMPORTED_MODULE_1___default.a.Component);



/***/ }),

/***/ "./components/Infrastructure/Explore.tsx":
/*!***********************************************!*\
  !*** ./components/Infrastructure/Explore.tsx ***!
  \***********************************************/
/*! exports provided: Explore */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Explore", function() { return Explore; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "../node_modules/tslib/tslib.es6.js");
/* harmony import */ var _plugin_css__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../plugin.css */ "./components/plugin.css");
/* harmony import */ var _plugin_css__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_plugin_css__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _grafana_ui__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @grafana/ui */ "@grafana/ui");
/* harmony import */ var _grafana_ui__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_grafana_ui__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _FormField_FormWrapper__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../FormField/FormWrapper */ "./components/FormField/FormWrapper.tsx");
/* harmony import */ var _GlobalVariables__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../GlobalVariables */ "./GlobalVariables.ts");
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! lodash */ "lodash");
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(lodash__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var _lists_apply_call_to_entities__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../lists/apply_call_to_entities */ "./lists/apply_call_to_entities.ts");








var isUnmounting = false;

var Explore =
/** @class */
function (_super) {
  Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__extends"])(Explore, _super);

  function Explore(props) {
    var _this = _super.call(this, props) || this;

    _this.onEntityChange = function (entityType) {
      var _a = _this.props,
          query = _a.query,
          datasource = _a.datasource,
          onChange = _a.onChange,
          onRunQuery = _a.onRunQuery;
      query.entity = entityType;
      onChange(query);
      onRunQuery();
      datasource.fetchMetricsForEntityType(query).then(function (result) {
        _this.props.updateMetrics(result);
      });
    };

    _this.onInfraCallToEntityChange = function (applicationCallToEntity) {
      var _a = _this.props,
          query = _a.query,
          onChange = _a.onChange,
          onRunQuery = _a.onRunQuery;
      query.applicationCallToEntity = applicationCallToEntity;
      onChange(query);
      onRunQuery();
    };

    _this.debouncedRunQuery = lodash__WEBPACK_IMPORTED_MODULE_6___default.a.debounce(_this.props.onRunQuery, 500);

    _this.onCallToEntityChange = function (eventItem) {
      var _a = _this.props,
          query = _a.query,
          onChange = _a.onChange;
      query.callToEntity = eventItem.currentTarget.value;
      onChange(query); // onRunQuery with 500ms delay after last debounce

      _this.debouncedRunQuery();
    };

    _this.onGroupByTagSecondLevelKeyChange = function (eventItem) {
      var _a = _this.props,
          query = _a.query,
          onChange = _a.onChange;
      query.group = {
        key: eventItem.currentTarget.value,
        label: eventItem.currentTarget.value,
        type: 'STRING'
      };
      query.groupbyTagSecondLevelKey = eventItem.currentTarget.value;
      onChange(query); // onRunQuery with 500ms delay after last debounce

      _this.debouncedRunQuery();
    };

    _this.state = {
      entityTypes: []
    };
    return _this;
  }

  Explore.prototype.componentDidMount = function () {
    var _this = this;

    var _a = this.props,
        query = _a.query,
        datasource = _a.datasource,
        onChange = _a.onChange;
    isUnmounting = false;
    datasource.getEntityTypes().then(function (entityTypes) {
      if (!isUnmounting) {
        if (!lodash__WEBPACK_IMPORTED_MODULE_6___default.a.find(entityTypes, {
          key: null
        })) {
          entityTypes.unshift({
            key: null,
            label: _GlobalVariables__WEBPACK_IMPORTED_MODULE_5__["PLEASE_SPECIFY"]
          });
        }

        _this.setState({
          entityTypes: entityTypes
        });

        if (!query.entity || !query.entity.key && !query.entity.label) {
          query.entity = entityTypes[0];
        }

        if (!query.callToEntity) {
          query.callToEntity = _lists_apply_call_to_entities__WEBPACK_IMPORTED_MODULE_7__["default"][0];
        }

        if (!query.applicationCallToEntity) {
          query.applicationCallToEntity = _lists_apply_call_to_entities__WEBPACK_IMPORTED_MODULE_7__["default"][0];
        }

        onChange(query);
      }
    });
  };

  Explore.prototype.componentWillUnmount = function () {
    isUnmounting = true;
  };

  Explore.prototype.render = function () {
    var query = this.props.query;
    return react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement("div", {
      className: 'gf-form'
    }, react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement(_FormField_FormWrapper__WEBPACK_IMPORTED_MODULE_4__["default"], {
      stretch: true
    }, react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement(_grafana_ui__WEBPACK_IMPORTED_MODULE_2__["InlineFormLabel"], {
      className: 'query-keyword',
      width: 14,
      tooltip: 'Select your Entity Type.'
    }, "Entity types"), react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement(_grafana_ui__WEBPACK_IMPORTED_MODULE_2__["Select"], {
      menuPlacement: 'bottom',
      width: 0,
      isSearchable: true,
      value: query.entity,
      options: this.state.entityTypes,
      onChange: this.onEntityChange
    })), react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement(_FormField_FormWrapper__WEBPACK_IMPORTED_MODULE_4__["default"], {
      stretch: true
    }, react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement(_grafana_ui__WEBPACK_IMPORTED_MODULE_2__["InlineFormLabel"], {
      className: 'query-keyword',
      width: 7,
      tooltip: 'Enter the Group by tag.'
    }, "Group by"), react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement(_grafana_ui__WEBPACK_IMPORTED_MODULE_2__["Input"], {
      type: 'text',
      value: query.groupbyTagSecondLevelKey,
      onChange: this.onGroupByTagSecondLevelKeyChange
    })));
  };

  return Explore;
}(react__WEBPACK_IMPORTED_MODULE_3___default.a.Component);



/***/ }),

/***/ "./components/Infrastructure/Infrastructure.tsx":
/*!******************************************************!*\
  !*** ./components/Infrastructure/Infrastructure.tsx ***!
  \******************************************************/
/*! exports provided: Infrastructure */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Infrastructure", function() { return Infrastructure; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "../node_modules/tslib/tslib.es6.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _QueryType__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./QueryType */ "./components/Infrastructure/QueryType.tsx");



var isUnmounting = false;

var Infrastructure =
/** @class */
function (_super) {
  Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__extends"])(Infrastructure, _super);

  function Infrastructure(props) {
    return _super.call(this, props) || this;
  }

  Infrastructure.prototype.componentDidMount = function () {
    var _this = this;

    var _a = this.props,
        query = _a.query,
        onChange = _a.onChange,
        datasource = _a.datasource;
    isUnmounting = false;

    if (query.entityQuery && query.entityType && query.entityType.key) {
      datasource.dataSourceInfrastructure.getMetricsCatalog(query.entityType, query.metricCategory.key).then(function (results) {
        if (!isUnmounting) {
          _this.props.updateMetrics(results);
        }
      });
    } else {
      query.metric = {
        key: null,
        label: '-'
      };
    }

    onChange(query);
  };

  Infrastructure.prototype.componentWillUnmount = function () {
    isUnmounting = true;
  };

  Infrastructure.prototype.render = function () {
    var _a = this.props,
        query = _a.query,
        onRunQuery = _a.onRunQuery,
        onChange = _a.onChange,
        updateMetrics = _a.updateMetrics,
        loadEntityTypes = _a.loadEntityTypes,
        datasource = _a.datasource,
        queryTypes = _a.queryTypes,
        updateQueryTypes = _a.updateQueryTypes;
    return react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_QueryType__WEBPACK_IMPORTED_MODULE_2__["QueryType"], {
      query: query,
      onChange: onChange,
      queryTypes: queryTypes,
      onRunQuery: onRunQuery,
      datasource: datasource,
      updateMetrics: updateMetrics,
      loadEntityTypes: loadEntityTypes,
      updateQueryTypes: updateQueryTypes
    });
  };

  return Infrastructure;
}(react__WEBPACK_IMPORTED_MODULE_1___default.a.Component);



/***/ }),

/***/ "./components/Infrastructure/QueryType.tsx":
/*!*************************************************!*\
  !*** ./components/Infrastructure/QueryType.tsx ***!
  \*************************************************/
/*! exports provided: QueryType */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "QueryType", function() { return QueryType; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "../node_modules/tslib/tslib.es6.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _GlobalVariables__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../GlobalVariables */ "./GlobalVariables.ts");
/* harmony import */ var _FormField_FormSelect__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../FormField/FormSelect */ "./components/FormField/FormSelect.tsx");
/* harmony import */ var _FormField_FormInput__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../FormField/FormInput */ "./components/FormField/FormInput.tsx");
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! lodash */ "lodash");
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(lodash__WEBPACK_IMPORTED_MODULE_5__);







var QueryType =
/** @class */
function (_super) {
  Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__extends"])(QueryType, _super);

  function QueryType(props) {
    var _this = _super.call(this, props) || this;

    _this.onQueryChange = function (eventItem) {
      var _a = _this.props,
          query = _a.query,
          onChange = _a.onChange,
          updateQueryTypes = _a.updateQueryTypes;

      if (eventItem.currentTarget && eventItem.currentTarget.value) {
        query.entityQuery = eventItem.currentTarget.value;
      } else {
        updateQueryTypes([]);
        query.entityQuery = '';
        query.entityType = {
          key: null,
          label: '-'
        };
      }

      onChange(query); // loadEntityTypes with 500ms delay after last debounce

      _this.debouncedEntityTypes();
    };

    _this.onTypeChange = function (eventItem) {
      var _a = _this.props,
          query = _a.query,
          datasource = _a.datasource,
          onChange = _a.onChange;
      query.entityType = eventItem;
      onChange(query);
      datasource.dataSourceInfrastructure.getMetricsCatalog(query.entityType, query.metricCategory.key).then(function (results) {
        _this.props.updateMetrics(results);
      });
    };

    _this.debouncedEntityTypes = lodash__WEBPACK_IMPORTED_MODULE_5___default.a.debounce(_this.props.loadEntityTypes, 500);
    return _this;
  }

  QueryType.prototype.componentDidMount = function () {
    var _a = this.props,
        query = _a.query,
        loadEntityTypes = _a.loadEntityTypes;

    if (query.entityQuery) {
      loadEntityTypes();
    }
  };

  QueryType.prototype.render = function () {
    var _a = this.props,
        query = _a.query,
        queryTypes = _a.queryTypes;
    return react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", {
      className: 'gf-form'
    }, react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_FormField_FormInput__WEBPACK_IMPORTED_MODULE_4__["default"], {
      queryKeyword: true,
      inputWidth: 0,
      label: 'Query',
      tooltip: react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", null, "Specify a query for the entities you wish to plot. Use the dynamic focus syntax:", react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("a", {
        href: "https://www.ibm.com/docs/en/instana-observability/current?topic=instana-filtering-dynamic-focus#syntax"
      }, "https://www.ibm.com/docs/en/instana-observability/current?topic=instana-filtering-dynamic-focus#syntax")),
      value: query.entityQuery,
      placeholder: _GlobalVariables__WEBPACK_IMPORTED_MODULE_2__["PLEASE_SPECIFY"],
      onChange: this.onQueryChange
    }), react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_FormField_FormSelect__WEBPACK_IMPORTED_MODULE_3__["default"], {
      queryKeyword: true,
      labelWidth: 6,
      label: 'Type',
      tooltip: 'Select an entity type for a list of available metrics.',
      noOptionsMessage: 'No types found with query',
      value: query.entityType,
      options: queryTypes,
      onChange: this.onTypeChange
    }));
  };

  return QueryType;
}(react__WEBPACK_IMPORTED_MODULE_1___default.a.Component);



/***/ }),

/***/ "./components/Metric/Metric.tsx":
/*!**************************************!*\
  !*** ./components/Metric/Metric.tsx ***!
  \**************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "../node_modules/tslib/tslib.es6.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _GlobalVariables__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../GlobalVariables */ "./GlobalVariables.ts");
/* harmony import */ var _lists_max_metrics__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../lists/max_metrics */ "./lists/max_metrics.ts");
/* harmony import */ var _FormField_FormSelect__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../FormField/FormSelect */ "./components/FormField/FormSelect.tsx");
/* harmony import */ var _FormField_FormSwitch__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../FormField/FormSwitch */ "./components/FormField/FormSwitch.tsx");
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! lodash */ "lodash");
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(lodash__WEBPACK_IMPORTED_MODULE_6__);








var Metric =
/** @class */
function (_super) {
  Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__extends"])(Metric, _super);

  function Metric(props) {
    var _this = _super.call(this, props) || this;

    _this.onMetricChange = function (metric) {
      var _a = _this.props,
          query = _a.query,
          onRunQuery = _a.onRunQuery,
          onChange = _a.onChange;
      query.metric = metric;

      if (query.metric && query.metric.key && !lodash__WEBPACK_IMPORTED_MODULE_6___default.a.includes(query.metric.aggregations, query.aggregation)) {
        query.aggregation = query.metric.aggregations[0];
      }

      if (query.displayMaxMetricValue && !_this.canShowMaxMetricValue()) {
        query.displayMaxMetricValue = false;
      }

      query.allMetrics = [];
      query.showAllMetrics = false;
      onChange(query);
      onRunQuery();
    };

    _this.onTimeIntervalChange = function (timeInterval) {
      var _a = _this.props,
          query = _a.query,
          onRunQuery = _a.onRunQuery,
          onChange = _a.onChange;
      query.timeInterval = timeInterval;
      onChange(query);
      onRunQuery();
    };

    _this.onAggregationChange = function (aggregation) {
      var _a = _this.props,
          query = _a.query,
          onRunQuery = _a.onRunQuery,
          onChange = _a.onChange;
      query.aggregation = aggregation;
      onChange(query);
      onRunQuery();
    };

    _this.onShowMaxValueChange = function (event) {
      var _a = _this.props,
          query = _a.query,
          onChange = _a.onChange,
          onRunQuery = _a.onRunQuery;

      if (event && event.currentTarget) {
        query.displayMaxMetricValue = event.currentTarget.checked;
        onChange(query);
        onRunQuery();
      }
    };

    _this.onShowAllMetricsChange = function (event) {
      var _a = _this.props,
          query = _a.query,
          onChange = _a.onChange,
          onRunQuery = _a.onRunQuery;

      if (event && event.currentTarget) {
        query.showAllMetrics = event.currentTarget.checked;

        if (query.showAllMetrics) {
          query.metric = {
            key: null,
            label: "Displaying " + _this.props.availableMetrics.length + " metrics"
          };
          query.allMetrics = _this.props.availableMetrics;
        }

        onChange(query);
        onRunQuery();
      }
    };

    _this.state = {
      possibleTimeIntervals: [],
      possibleAggregations: []
    };
    return _this;
  }

  Metric.prototype.componentDidMount = function () {
    var _a = this.props,
        query = _a.query,
        datasource = _a.datasource,
        onChange = _a.onChange;

    if (!query.timeInterval || !query.timeInterval.key || !datasource.availableTimeIntervals.find(function (i) {
      return i.key === query.timeInterval.key;
    })) {
      query.timeInterval = datasource.getDefaultTimeInterval(query);
    }

    onChange(query);
  };

  Metric.prototype.canShowMaxMetricValue = function () {
    var query = this.props.query;
    return query.entityType && query.entityType.key === 'host' && query.metric && lodash__WEBPACK_IMPORTED_MODULE_6___default.a.find(_lists_max_metrics__WEBPACK_IMPORTED_MODULE_3__["default"], function (m) {
      return m.key === query.metric.key;
    });
  };

  Metric.prototype.canShowAggregation = function () {
    var query = this.props.query;
    return query.metricCategory.key >= _GlobalVariables__WEBPACK_IMPORTED_MODULE_2__["ANALYZE_APPLICATION_METRICS"];
  };

  Metric.prototype.canSelectAggregation = function () {
    var query = this.props.query;
    return query.metric && query.metric.aggregations && query.metric.aggregations.length > 1;
  };

  Metric.prototype.render = function () {
    var _a = this.props,
        query = _a.query,
        datasource = _a.datasource;
    return react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", {
      className: 'gf-form'
    }, react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_FormField_FormSelect__WEBPACK_IMPORTED_MODULE_4__["default"], {
      queryKeyword: true,
      disabled: query.useFreeTextMetrics,
      inputWidth: 0,
      label: 'Metric',
      tooltip: 'Select the metric you wish to plot.',
      value: query.metric,
      noOptionsMessage: 'No metrics found',
      options: this.props.availableMetrics,
      onChange: this.onMetricChange
    }), query.metricCategory.key === _GlobalVariables__WEBPACK_IMPORTED_MODULE_2__["BUILT_IN_METRICS"] && react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_FormField_FormSwitch__WEBPACK_IMPORTED_MODULE_5__["default"], {
      queryKeyword: true,
      disabled: !this.canShowMaxMetricValue(),
      labelWidth: 9,
      label: 'Show max value',
      tooltip: "Displays the maximal value of current metric. Supported for 'Type=Host' with cpu.used, " + 'memory.used and openFiles.used only.',
      value: query.displayMaxMetricValue,
      onChange: this.onShowMaxValueChange
    }), query.metricCategory.key === _GlobalVariables__WEBPACK_IMPORTED_MODULE_2__["CUSTOM_METRICS"] && react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_FormField_FormSwitch__WEBPACK_IMPORTED_MODULE_5__["default"], {
      queryKeyword: true,
      disabled: !query.canShowAllMetrics,
      labelWidth: 9,
      label: 'Show all metrics',
      tooltip: 'You have the option to show all metrics in the graph once the amount of possible, selectable ' + 'metrics is between 1 and 5.',
      value: query.showAllMetrics,
      onChange: this.onShowAllMetricsChange
    }), this.canShowAggregation() && react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_FormField_FormSelect__WEBPACK_IMPORTED_MODULE_4__["default"], {
      queryKeyword: true,
      disabled: !this.canSelectAggregation(),
      labelWidth: 7,
      inputWidth: 12,
      label: 'Aggregation',
      tooltip: 'Select a metric aggregation.',
      value: query.aggregation,
      options: query.metric.aggregations,
      onChange: this.onAggregationChange
    }), query.metricCategory.key !== _GlobalVariables__WEBPACK_IMPORTED_MODULE_2__["INFRASTRUCTURE_ANALYZE"] && react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_FormField_FormSelect__WEBPACK_IMPORTED_MODULE_4__["default"], {
      queryKeyword: true,
      disabled: datasource.availableTimeIntervals.length <= 1,
      labelWidth: 5,
      inputWidth: 12,
      label: 'Rollup',
      tooltip: 'Select the rollup value.',
      value: query.timeInterval,
      options: datasource.availableTimeIntervals,
      onChange: this.onTimeIntervalChange
    }));
  };

  return Metric;
}(react__WEBPACK_IMPORTED_MODULE_1___default.a.Component);

/* harmony default export */ __webpack_exports__["default"] = (Metric);

/***/ }),

/***/ "./components/QueryEditor.tsx":
/*!************************************!*\
  !*** ./components/QueryEditor.tsx ***!
  \************************************/
/*! exports provided: QueryEditor */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "QueryEditor", function() { return QueryEditor; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "../node_modules/tslib/tslib.es6.js");
/* harmony import */ var _instana_grafana_css__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../instana-grafana.css */ "./instana-grafana.css");
/* harmony import */ var _instana_grafana_css__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_instana_grafana_css__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _GlobalVariables__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../GlobalVariables */ "./GlobalVariables.ts");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _AdvancedSettings_AdvancedSettings__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./AdvancedSettings/AdvancedSettings */ "./components/AdvancedSettings/AdvancedSettings.tsx");
/* harmony import */ var _lists_aggregation_function__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../lists/aggregation_function */ "./lists/aggregation_function.ts");
/* harmony import */ var _Analyze_ApplicationCallsMetrics__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./Analyze/ApplicationCallsMetrics */ "./components/Analyze/ApplicationCallsMetrics.tsx");
/* harmony import */ var _ApplicationServiceEndpointMetrics_ApplicationServiceEndpointMetrics__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./ApplicationServiceEndpointMetrics/ApplicationServiceEndpointMetrics */ "./components/ApplicationServiceEndpointMetrics/ApplicationServiceEndpointMetrics.tsx");
/* harmony import */ var _grafana_ui__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @grafana/ui */ "@grafana/ui");
/* harmony import */ var _grafana_ui__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(_grafana_ui__WEBPACK_IMPORTED_MODULE_8__);
/* harmony import */ var _Infrastructure_Explore__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./Infrastructure/Explore */ "./components/Infrastructure/Explore.tsx");
/* harmony import */ var _Analyze_Filter__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./Analyze/Filter */ "./components/Analyze/Filter.tsx");
/* harmony import */ var _FormField_FormSelect__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./FormField/FormSelect */ "./components/FormField/FormSelect.tsx");
/* harmony import */ var _Infrastructure_Infrastructure__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./Infrastructure/Infrastructure */ "./components/Infrastructure/Infrastructure.tsx");
/* harmony import */ var _Metric_Metric__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ./Metric/Metric */ "./components/Metric/Metric.tsx");
/* harmony import */ var _Infrastructure_Custom_MetricFilter__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ./Infrastructure/Custom/MetricFilter */ "./components/Infrastructure/Custom/MetricFilter.tsx");
/* harmony import */ var _Analyze_MobileAppMetrics__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ./Analyze/MobileAppMetrics */ "./components/Analyze/MobileAppMetrics.tsx");
/* harmony import */ var _SLOInformation_SloInformation__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! ./SLOInformation/SloInformation */ "./components/SLOInformation/SloInformation.tsx");
/* harmony import */ var _SLOInformation_Slo2Information__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! ./SLOInformation/Slo2Information */ "./components/SLOInformation/Slo2Information.tsx");
/* harmony import */ var _Analyze_WebsiteMetrics__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! ./Analyze/WebsiteMetrics */ "./components/Analyze/WebsiteMetrics.tsx");
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(/*! lodash */ "lodash");
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_19___default = /*#__PURE__*/__webpack_require__.n(lodash__WEBPACK_IMPORTED_MODULE_19__);
/* harmony import */ var _lists_metric_categories__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__(/*! ../lists/metric_categories */ "./lists/metric_categories.ts");
/* harmony import */ var _migration__WEBPACK_IMPORTED_MODULE_21__ = __webpack_require__(/*! ../migration */ "./migration.ts");
/* harmony import */ var _util_time_util__WEBPACK_IMPORTED_MODULE_22__ = __webpack_require__(/*! ../util/time_util */ "./util/time_util.ts");
























var QueryEditor =
/** @class */
function (_super) {
  Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__extends"])(QueryEditor, _super);

  function QueryEditor(props) {
    var _this = _super.call(this, props) || this;

    _this.onCategoryChange = function (newCategory) {
      if (_this.query.metricCategory === newCategory) {// nothing needs to be done
      } else {
        _this.selectionReset();

        _this.query.metricCategory = newCategory;
        _this.query.timeInterval = _this.props.datasource.getDefaultTimeInterval(_this.query);

        _this.changeAndRun();
      }
    };

    _this.changeAndRun = function () {
      _this.props.onChange(_this.query);

      _this.props.onRunQuery();
    };

    _this.updateMetrics = function (metrics) {
      _this.setState({
        availableMetrics: lodash__WEBPACK_IMPORTED_MODULE_19___default.a.sortBy(metrics, 'key'),
        allMetrics: lodash__WEBPACK_IMPORTED_MODULE_19___default.a.sortBy(metrics, 'key')
      }, function () {
        if (_this.query.metric && _this.query.metric.key || _this.query.showAllMetrics) {
          var metric = lodash__WEBPACK_IMPORTED_MODULE_19___default.a.find(metrics, function (m) {
            return m.key === _this.query.metric.key;
          });

          metric ? _this.query.metric = metric : _this.query.metric = {
            key: null
          };
        }

        if (_this.query.metricCategory.key === _GlobalVariables__WEBPACK_IMPORTED_MODULE_2__["CUSTOM_METRICS"]) {
          _this.onMetricsFilter(_this.query.customFilters); // this contains setMetricPlaceholder

        } else if (!_this.query.metric || !_this.query.metric.key) {
          _this.setMetricPlaceholder(metrics.length);
        }

        _this.changeAndRun();
      });
    };

    _this.filterForEntityType = function (findMatchingEntityTypes, filterResults) {
      if (findMatchingEntityTypes === void 0) {
        findMatchingEntityTypes = true;
      }

      if (filterResults === void 0) {
        filterResults = true;
      }

      var _a = _this.props,
          query = _a.query,
          datasource = _a.datasource,
          onChange = _a.onChange;
      datasource.getEntityTypes().then(function (entityTypes) {
        var queryTypes = entityTypes;

        if (filterResults && !query.useFreeTextMetrics) {
          queryTypes = _this.filterEntityTypes(entityTypes, findMatchingEntityTypes);
        }

        _this.setState({
          queryTypes: queryTypes
        });

        if (!query.entityType || !query.entityType.key || !lodash__WEBPACK_IMPORTED_MODULE_19___default.a.find(queryTypes, function (m) {
          return m.key === query.entityType.key;
        })) {
          query.entityType = {
            key: null,
            label: 'Please select (' + queryTypes.length + ')'
          };
        }

        onChange(query);
      });
    };

    _this.filterEntityTypes = function (entityTypes, findMatchingEntityTypes) {
      if (findMatchingEntityTypes) {
        return lodash__WEBPACK_IMPORTED_MODULE_19___default.a.sortBy(lodash__WEBPACK_IMPORTED_MODULE_19___default.a.filter(entityTypes, function (entityType) {
          return _this.findMatchingEntityTypes(entityType);
        }), 'label');
      }

      return lodash__WEBPACK_IMPORTED_MODULE_19___default.a.sortBy(entityTypes, 'label');
    };

    _this.findMatchingEntityTypes = function (entityType) {
      var query = _this.props.query;

      if (query.metricCategory.key === _GlobalVariables__WEBPACK_IMPORTED_MODULE_2__["BUILT_IN_METRICS"] || query.metricCategory.key === _GlobalVariables__WEBPACK_IMPORTED_MODULE_2__["CUSTOM_METRICS"]) {
        return _this.snapshots.find(function (type) {
          return type === entityType.key;
        }) && entityType.label != null;
      }

      return false;
    };

    _this.updateQueryTypes = function (types) {
      _this.setState({
        queryTypes: types
      });
    };

    _this.updateGroups = function (groups) {
      _this.setState({
        groups: groups
      });
    };

    _this.onMetricsFilter = function (customFilters) {
      var newAvailableMetrics = [];

      if (!customFilters || customFilters.length === 0) {
        newAvailableMetrics = _this.state.allMetrics;
      } else {
        newAvailableMetrics = _this.applyFilterToMetricList(customFilters);
      }

      _this.query.canShowAllMetrics = _this.isAbleToShowAllMetrics(newAvailableMetrics);

      if (!_this.query.canShowAllMetrics) {
        _this.query.showAllMetrics = false;
      }

      _this.query.customFilters = customFilters;

      if (!_this.query.metric || !_this.query.metric.key) {
        _this.setMetricPlaceholder(newAvailableMetrics.length);
      }

      _this.setState(function (state) {
        return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"])(Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"])({}, state), {
          availableMetrics: newAvailableMetrics
        });
      });

      _this.props.onChange(_this.query);

      _this.checkMetricAndRefresh();
    };

    var defaultQuery = {
      metricCategory: _lists_metric_categories__WEBPACK_IMPORTED_MODULE_20__["default"][0],
      timeShiftIsValid: true,
      customFilters: []
    };
    _this.query = Object.assign(defaultQuery, props.query);
    Object(_migration__WEBPACK_IMPORTED_MODULE_21__["default"])(_this.query);
    _this.state = {
      groups: [],
      allMetrics: [],
      queryTypes: [],
      availableMetrics: [],
      selectedWindowSize: props.range ? Object(_util_time_util__WEBPACK_IMPORTED_MODULE_22__["readTime"])(props.range).windowSize : 21600000
    };
    _this.filterMetricsOnType = _this.filterMetricsOnType.bind(_this);
    _this.loadEntityTypes = _this.loadEntityTypes.bind(_this);
    _this.allowInfraExplore = props.datasource.options.allowInfraExplore;
    props.onChange(_this.query);
    return _this;
  }

  QueryEditor.prototype.componentDidUpdate = function (prevProps, prevState, snapshot) {
    var _this = this;

    var _a = this.props,
        onChange = _a.onChange,
        range = _a.range,
        datasource = _a.datasource;

    if (range && this.state.selectedWindowSize !== Object(_util_time_util__WEBPACK_IMPORTED_MODULE_22__["readTime"])(range).windowSize) {
      this.setState(Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"])(Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"])({}, this.state), {
        selectedWindowSize: Object(_util_time_util__WEBPACK_IMPORTED_MODULE_22__["readTime"])(range).windowSize
      }));
      datasource.setPossibleTimeIntervals(this.query);

      if (!datasource.availableTimeIntervals.find(function (i) {
        return i.key === _this.query.timeInterval.key;
      })) {
        this.query.timeInterval = datasource.getDefaultTimeInterval(this.query);
        onChange(this.query); // no need to execute onRunQuery() here because the change of time frame triggers
        // datasource.query() anyways and datasource will take care of correcting the timeInterval
      }
    }
  };

  QueryEditor.prototype.setMetricPlaceholder = function (nrOfTotalResults) {
    if (this.query.metricCategory.key === _GlobalVariables__WEBPACK_IMPORTED_MODULE_2__["CUSTOM_METRICS"]) {
      this.query.metric = {
        key: null,
        label: 'Please select (' + nrOfTotalResults + '/' + this.state.allMetrics.length + ')'
      };
    } else {
      this.query.metric = {
        key: null,
        label: 'Please select (' + nrOfTotalResults + ')'
      };
    }

    this.props.onChange(this.query);
  };

  QueryEditor.prototype.loadEntityTypes = function (filterResult) {
    var _this = this;

    if (filterResult === void 0) {
      filterResult = true;
    }

    var _a = this.props,
        query = _a.query,
        datasource = _a.datasource,
        onRunQuery = _a.onRunQuery;

    if (query.entityQuery) {
      datasource.fetchTypesForTarget(query).then(function (response) {
        _this.snapshots = response.data;

        _this.filterForEntityType(true, filterResult);

        onRunQuery();
      });
    } else {
      this.setState({
        queryTypes: []
      });
    }
  };

  QueryEditor.prototype.applyFilterToMetricList = function (filters) {
    var filteredMetrics = this.state.allMetrics;

    lodash__WEBPACK_IMPORTED_MODULE_19___default.a.forEach(filters, function (filter) {
      if (filter !== '') {
        filteredMetrics = lodash__WEBPACK_IMPORTED_MODULE_19___default.a.sortBy(lodash__WEBPACK_IMPORTED_MODULE_19___default.a.filter(filteredMetrics, function (metric) {
          return metric.key.toLowerCase().includes(filter.toLowerCase());
        }), 'key');
      }
    });

    return filteredMetrics;
  };

  QueryEditor.prototype.filterMetricsOnType = function (type) {
    var filteredMetrics = this.state.allMetrics.filter(function (metric) {
      return metric.beaconTypes.includes(type);
    });
    this.setState({
      availableMetrics: filteredMetrics
    });

    if (!this.query.metric || !this.query.metric.key || !this.query.metric.beaconTypes.includes(type)) {
      this.setMetricPlaceholder(filteredMetrics.length);
    }

    this.changeAndRun();
  };

  QueryEditor.prototype.isAbleToShowAllMetrics = function (metrics) {
    return this.query.metricCategory.key === _GlobalVariables__WEBPACK_IMPORTED_MODULE_2__["CUSTOM_METRICS"] && metrics.length > 0 && metrics.length <= 5;
  };

  QueryEditor.prototype.checkMetricAndRefresh = function () {
    if (this.query.metric && this.query.metric.key && !lodash__WEBPACK_IMPORTED_MODULE_19___default.a.includes(lodash__WEBPACK_IMPORTED_MODULE_19___default.a.map(this.state.availableMetrics, function (m) {
      return m.key;
    }), this.query.metric.key)) {
      this.resetMetricSelection();
    }

    this.changeAndRun();
  };

  QueryEditor.prototype.selectionReset = function () {
    var query = this.props.query;

    if (query.metricCategory.key > _GlobalVariables__WEBPACK_IMPORTED_MODULE_2__["CUSTOM_METRICS"]) {
      query.entityQuery = '';
    }

    this.setState({
      availableMetrics: [],
      allMetrics: [],
      groups: []
    });
    this.resetEntityTypeSelection();
    this.resetEntitySelection();
    this.resetMetricSelection();
  };

  QueryEditor.prototype.resetEntityTypeSelection = function () {
    var query = this.props.query;
    query.entityType = {
      key: null,
      label: '-'
    };
    query.customFilters = [];
  };

  QueryEditor.prototype.resetEntitySelection = function () {
    var query = this.props.query;
    query.entity = {};
    query.group = {};
    query.showGroupBySecondLevel = false;
    query.groupbyTagSecondLevelKey = '';
    query.aggregateGraphs = false;
    query.aggregationFunction = _lists_aggregation_function__WEBPACK_IMPORTED_MODULE_5__["default"][0];
    query.hideOriginalGraphs = false;
    query.filters = [];
    query.showWarningCantShowAllResults = false;
    query.showAllMetrics = false;
    query.canShowAllMetrics = false;
    query.displayMaxMetricValue = false;
    query.applicationCallToEntity = '';
    query.callToEntity = '';
    query.tagFilterExpression = '';
    this.resetServices();
    this.resetEndpoints();
    this.resetSLO();
    this.resetSLO2();
  };

  QueryEditor.prototype.resetMetricSelection = function () {
    var query = this.props.query;
    query.metric = {};
    query.timeShift = '';
    query.timeShiftIsValid = true;
    query.showWarningCantShowAllResults = false;
    query.showAllMetrics = false;
    query.labelFormat = '';
    query.freeTextMetrics = '';
    query.useFreeTextMetrics = false;
  };

  QueryEditor.prototype.resetServices = function () {
    this.props.query.service = {};
  };

  QueryEditor.prototype.resetEndpoints = function () {
    this.props.query.endpoint = {};
  };

  QueryEditor.prototype.resetSLO = function () {
    var query = this.props.query;
    query.sloValue = '';
    query.sloReport = {};
  };

  QueryEditor.prototype.resetSLO2 = function () {
    var query = this.props.query;
    query.sloValue = '';
    query.sloReport = {};
  };

  QueryEditor.prototype.render = function () {
    var _a = this,
        query = _a.query,
        onCategoryChange = _a.onCategoryChange;

    var categories = this.allowInfraExplore ? _lists_metric_categories__WEBPACK_IMPORTED_MODULE_20__["default"] : _lists_metric_categories__WEBPACK_IMPORTED_MODULE_20__["default"].filter(function (category) {
      return category.key !== _GlobalVariables__WEBPACK_IMPORTED_MODULE_2__["INFRASTRUCTURE_ANALYZE"];
    });
    return react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement("div", {
      className: 'gf-form-group'
    }, react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement("div", {
      className: 'gf-form'
    }, react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement(_FormField_FormSelect__WEBPACK_IMPORTED_MODULE_11__["default"], {
      queryKeyword: true,
      inputWidth: 0,
      label: 'Category',
      tooltip: 'Select a metric category.',
      value: query.metricCategory,
      options: categories,
      onChange: onCategoryChange
    })), query.metricCategory.key === _GlobalVariables__WEBPACK_IMPORTED_MODULE_2__["BUILT_IN_METRICS"] && react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement(_Infrastructure_Infrastructure__WEBPACK_IMPORTED_MODULE_12__["Infrastructure"], {
      query: query,
      queryTypes: this.state.queryTypes,
      datasource: this.props.datasource,
      onRunQuery: this.props.onRunQuery,
      onChange: this.props.onChange,
      updateMetrics: this.updateMetrics,
      loadEntityTypes: this.loadEntityTypes,
      updateQueryTypes: this.updateQueryTypes
    }), query.metricCategory.key === _GlobalVariables__WEBPACK_IMPORTED_MODULE_2__["CUSTOM_METRICS"] && react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement(_Infrastructure_Infrastructure__WEBPACK_IMPORTED_MODULE_12__["Infrastructure"], {
      query: query,
      queryTypes: this.state.queryTypes,
      datasource: this.props.datasource,
      onRunQuery: this.props.onRunQuery,
      onChange: this.props.onChange,
      updateMetrics: this.updateMetrics,
      loadEntityTypes: this.loadEntityTypes,
      updateQueryTypes: this.updateQueryTypes
    }), query.metricCategory.key === _GlobalVariables__WEBPACK_IMPORTED_MODULE_2__["INFRASTRUCTURE_ANALYZE"] && react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement(_Infrastructure_Explore__WEBPACK_IMPORTED_MODULE_9__["Explore"], {
      query: query,
      onRunQuery: this.props.onRunQuery,
      onChange: this.props.onChange,
      updateMetrics: this.updateMetrics,
      groups: this.state.groups,
      updateGroups: this.updateGroups,
      datasource: this.props.datasource
    }), query.metricCategory.key === _GlobalVariables__WEBPACK_IMPORTED_MODULE_2__["ANALYZE_APPLICATION_METRICS"] && react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement(_Analyze_ApplicationCallsMetrics__WEBPACK_IMPORTED_MODULE_6__["ApplicationCallsMetrics"], {
      query: query,
      onRunQuery: this.props.onRunQuery,
      onChange: this.props.onChange,
      updateMetrics: this.updateMetrics,
      groups: this.state.groups,
      updateGroups: this.updateGroups,
      datasource: this.props.datasource
    }), query.metricCategory.key === _GlobalVariables__WEBPACK_IMPORTED_MODULE_2__["ANALYZE_WEBSITE_METRICS"] && react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement(_Analyze_WebsiteMetrics__WEBPACK_IMPORTED_MODULE_18__["WebsiteMetrics"], {
      query: query,
      onRunQuery: this.props.onRunQuery,
      onChange: this.props.onChange,
      updateMetrics: this.updateMetrics,
      groups: this.state.groups,
      updateGroups: this.updateGroups,
      filterMetricsOnType: this.filterMetricsOnType,
      datasource: this.props.datasource
    }), query.metricCategory.key === _GlobalVariables__WEBPACK_IMPORTED_MODULE_2__["ANALYZE_MOBILE_APP_METRICS"] && react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement(_Analyze_MobileAppMetrics__WEBPACK_IMPORTED_MODULE_15__["MobileAppMetrics"], {
      query: query,
      onRunQuery: this.props.onRunQuery,
      onChange: this.props.onChange,
      updateMetrics: this.updateMetrics,
      groups: this.state.groups,
      updateGroups: this.updateGroups,
      filterMetricsOnType: this.filterMetricsOnType,
      datasource: this.props.datasource
    }), query.metricCategory.key === _GlobalVariables__WEBPACK_IMPORTED_MODULE_2__["APPLICATION_SERVICE_ENDPOINT_METRICS"] && react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement(_ApplicationServiceEndpointMetrics_ApplicationServiceEndpointMetrics__WEBPACK_IMPORTED_MODULE_7__["ApplicationServiceEndpointMetrics"], {
      query: query,
      onRunQuery: this.props.onRunQuery,
      onChange: this.props.onChange,
      updateMetrics: this.updateMetrics,
      datasource: this.props.datasource
    }), query.metricCategory.key === _GlobalVariables__WEBPACK_IMPORTED_MODULE_2__["SLO_INFORMATION"] && react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement(_SLOInformation_SloInformation__WEBPACK_IMPORTED_MODULE_16__["SloInformation"], {
      query: query,
      onRunQuery: this.props.onRunQuery,
      onChange: this.props.onChange,
      datasource: this.props.datasource
    }), query.metricCategory.key === _GlobalVariables__WEBPACK_IMPORTED_MODULE_2__["SLO2_INFORMATION"] && react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement(_SLOInformation_Slo2Information__WEBPACK_IMPORTED_MODULE_17__["Slo2Information"], {
      query: query,
      onRunQuery: this.props.onRunQuery,
      onChange: this.props.onChange,
      datasource: this.props.datasource
    }), query.metricCategory.key !== _GlobalVariables__WEBPACK_IMPORTED_MODULE_2__["SLO_INFORMATION"] && query.metricCategory.key !== _GlobalVariables__WEBPACK_IMPORTED_MODULE_2__["SLO2_INFORMATION"] && react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement(_Metric_Metric__WEBPACK_IMPORTED_MODULE_13__["default"], {
      query: query,
      onChange: this.props.onChange,
      onRunQuery: this.props.onRunQuery,
      updateMetrics: this.updateMetrics,
      availableMetrics: this.state.availableMetrics,
      datasource: this.props.datasource
    }), query.metricCategory.key === _GlobalVariables__WEBPACK_IMPORTED_MODULE_2__["CUSTOM_METRICS"] && react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement(_Infrastructure_Custom_MetricFilter__WEBPACK_IMPORTED_MODULE_14__["MetricFilter"], {
      query: query,
      onChange: this.props.onChange,
      onRunQuery: this.props.onRunQuery,
      onFilterChange: this.onMetricsFilter,
      availableMetrics: this.state.availableMetrics,
      datasource: this.props.datasource
    }), (query.metricCategory.key === _GlobalVariables__WEBPACK_IMPORTED_MODULE_2__["ANALYZE_APPLICATION_METRICS"] || query.metricCategory.key === _GlobalVariables__WEBPACK_IMPORTED_MODULE_2__["ANALYZE_WEBSITE_METRICS"] || query.metricCategory.key === _GlobalVariables__WEBPACK_IMPORTED_MODULE_2__["ANALYZE_MOBILE_APP_METRICS"] || query.metricCategory.key === _GlobalVariables__WEBPACK_IMPORTED_MODULE_2__["INFRASTRUCTURE_ANALYZE"]) && react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement(_Analyze_Filter__WEBPACK_IMPORTED_MODULE_10__["Filters"], {
      query: query,
      onChange: this.props.onChange,
      onRunQuery: this.props.onRunQuery,
      datasource: this.props.datasource,
      groups: this.state.groups
    }), react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement(_AdvancedSettings_AdvancedSettings__WEBPACK_IMPORTED_MODULE_4__["default"], {
      query: query,
      onRunQuery: this.props.onRunQuery,
      onChange: this.props.onChange,
      loadEntityTypes: this.loadEntityTypes
    }), react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement(_grafana_ui__WEBPACK_IMPORTED_MODULE_8__["Badge"], {
      text: '4.1.0',
      color: 'blue'
    }));
  };

  return QueryEditor;
}(react__WEBPACK_IMPORTED_MODULE_3__["PureComponent"]);



/***/ }),

/***/ "./components/SLOInformation/Slo2Information.tsx":
/*!*******************************************************!*\
  !*** ./components/SLOInformation/Slo2Information.tsx ***!
  \*******************************************************/
/*! exports provided: Slo2Information */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Slo2Information", function() { return Slo2Information; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "../node_modules/tslib/tslib.es6.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _FormField_FormSelect__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../FormField/FormSelect */ "./components/FormField/FormSelect.tsx");
/* harmony import */ var _GlobalVariables__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../GlobalVariables */ "./GlobalVariables.ts");
/* harmony import */ var _lists_slo2_specifics__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../lists/slo2_specifics */ "./lists/slo2_specifics.ts");
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! lodash */ "lodash");
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(lodash__WEBPACK_IMPORTED_MODULE_5__);






var isUnmounting = false;

var Slo2Information =
/** @class */
function (_super) {
  Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__extends"])(Slo2Information, _super);

  function Slo2Information(props) {
    var _this = _super.call(this, props) || this;

    _this.debouncedRunQuery = lodash__WEBPACK_IMPORTED_MODULE_5___default.a.debounce(_this.props.onRunQuery, 500);

    _this.onSlo2Change = function (slo) {
      var _a = _this.props,
          query = _a.query,
          onRunQuery = _a.onRunQuery;
      query.slo2Report = slo;
      onRunQuery();
    };

    _this.onSloSpecificChange = function (slo2Specific) {
      var _a = _this.props,
          query = _a.query,
          onRunQuery = _a.onRunQuery,
          onChange = _a.onChange;
      query.slo2Specific = slo2Specific;
      onChange(Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"])({}, query));
      onRunQuery();
    };

    _this.state = {
      slo2Reports: [],
      isValidSlo: true
    };
    return _this;
  }

  Slo2Information.prototype.componentDidMount = function () {
    isUnmounting = false;
    this.loadSloReports();
  };

  Slo2Information.prototype.componentWillUnmount = function () {
    isUnmounting = true;
  };

  Slo2Information.prototype.shouldComponentUpdate = function (nextProps, nextState, nextContext) {
    return nextProps.query.metricCategory.key === _GlobalVariables__WEBPACK_IMPORTED_MODULE_3__["SLO2_INFORMATION"];
  };

  Slo2Information.prototype.loadSloReports = function () {
    var _this = this;

    this.props.datasource.getSlo2Reports().then(function (slo2Reports) {
      if (!isUnmounting) {
        _this.setState({
          slo2Reports: slo2Reports
        });
      }
    });
  };

  Slo2Information.prototype.render = function () {
    var query = this.props.query;
    return react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", {
      className: 'gf-form'
    }, react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_FormField_FormSelect__WEBPACK_IMPORTED_MODULE_2__["default"], {
      queryKeyword: true,
      inputWidth: 0,
      label: 'SLO Configuration name',
      tooltip: 'SLI configuration used to compute SLI Report.',
      noOptionsMessage: 'No configured SLO found',
      value: query.slo2Report,
      options: this.state.slo2Reports,
      onChange: this.onSlo2Change
    }), react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_FormField_FormSelect__WEBPACK_IMPORTED_MODULE_2__["default"], {
      queryKeyword: true,
      labelWidth: 7,
      inputWidth: 0,
      label: 'Value type',
      tooltip: react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", null, "Select your specific SLO information:", react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("ul", null, react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("li", null, "'Status' requires Gauge visualization"), react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("li", null, "'Service Level Target' requires Gauge visualization"), react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("li", null, "'Total Error Budget' requires Singlestat visualization"), react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("li", null, "'Remaining Error Budget' requires Singlestat visualization"), react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("li", null, "'Spended Error Budget' requires Singlestat visualization"), react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("li", null, "'Violation' requires Bars draw mode on Graph visualization"), react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("li", null, "'Error Chart' requires Bars draw mode on Graph visualization"), react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("li", null, "'Error Accumulation Chart' requires Bars draw mode on Graph visualization"), react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("li", null, "'Error Budget Chart' requires Bars draw mode on Graph visualization"))),
      value: query.slo2Specific,
      options: _lists_slo2_specifics__WEBPACK_IMPORTED_MODULE_4__["default"],
      onChange: this.onSloSpecificChange
    }));
  };

  return Slo2Information;
}(react__WEBPACK_IMPORTED_MODULE_1___default.a.Component);



/***/ }),

/***/ "./components/SLOInformation/SloInformation.tsx":
/*!******************************************************!*\
  !*** ./components/SLOInformation/SloInformation.tsx ***!
  \******************************************************/
/*! exports provided: SloInformation */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SloInformation", function() { return SloInformation; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "../node_modules/tslib/tslib.es6.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _GlobalVariables__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../GlobalVariables */ "./GlobalVariables.ts");
/* harmony import */ var _lists_slo_specifics__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../lists/slo_specifics */ "./lists/slo_specifics.ts");
/* harmony import */ var _FormField_FormSelect__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../FormField/FormSelect */ "./components/FormField/FormSelect.tsx");
/* harmony import */ var _FormField_FormInput__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../FormField/FormInput */ "./components/FormField/FormInput.tsx");
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! lodash */ "lodash");
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(lodash__WEBPACK_IMPORTED_MODULE_6__);







var MAX_VAL = 0.9999;
var isUnmounting = false;

var SloInformation =
/** @class */
function (_super) {
  Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__extends"])(SloInformation, _super);

  function SloInformation(props) {
    var _this = _super.call(this, props) || this;

    _this.debouncedRunQuery = lodash__WEBPACK_IMPORTED_MODULE_6___default.a.debounce(_this.props.onRunQuery, 500);

    _this.onSloChange = function (slo) {
      var _a = _this.props,
          query = _a.query,
          onRunQuery = _a.onRunQuery;
      query.sloReport = slo;
      onRunQuery();
    };

    _this.onSloValueChange = function (sloValue) {
      var query = _this.props.query;
      query.sloValue = sloValue.currentTarget.value;

      if (_this.isValid(query.sloValue)) {
        // onRunQuery with 500ms delay after last debounce
        _this.debouncedRunQuery();
      }
    };

    _this.onSloSpecificChange = function (sloSpecific) {
      var _a = _this.props,
          query = _a.query,
          onRunQuery = _a.onRunQuery;
      query.sloSpecific = sloSpecific;
      onRunQuery();
    };

    _this.state = {
      sloReports: [],
      isValidSlo: true
    };
    return _this;
  }

  SloInformation.prototype.componentDidMount = function () {
    isUnmounting = false;
    this.loadSloReports();
    this.isValid(this.props.query.sloValue);
  };

  SloInformation.prototype.componentWillUnmount = function () {
    isUnmounting = true;
  };

  SloInformation.prototype.isValid = function (val) {
    var valid = !val || +val >= 0 && +val <= MAX_VAL;
    this.setState({
      isValidSlo: valid
    });
    return valid;
  };

  SloInformation.prototype.shouldComponentUpdate = function (nextProps, nextState, nextContext) {
    return nextProps.query.metricCategory.key === _GlobalVariables__WEBPACK_IMPORTED_MODULE_2__["SLO_INFORMATION"];
  };

  SloInformation.prototype.loadSloReports = function () {
    var _this = this;

    var query = this.props.query;
    this.props.datasource.getSloReports().then(function (sloReports) {
      if (!isUnmounting) {
        _this.setState({
          sloReports: sloReports
        });

        if (!query.sloReport && sloReports.length >= 1) {
          query.sloReport = sloReports[0];
        }
      }
    });
  };

  SloInformation.prototype.render = function () {
    var query = this.props.query;
    return react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", {
      className: 'gf-form'
    }, react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_FormField_FormSelect__WEBPACK_IMPORTED_MODULE_4__["default"], {
      queryKeyword: true,
      inputWidth: 0,
      label: 'Configured SLI',
      tooltip: 'SLI configuration used to compute error budget and SLI values.',
      noOptionsMessage: 'No configured SLI found',
      value: query.sloReport,
      options: this.state.sloReports,
      onChange: this.onSloChange
    }), react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_FormField_FormInput__WEBPACK_IMPORTED_MODULE_5__["default"], {
      queryKeyword: true,
      labelWidth: 7,
      inputWidth: 0,
      label: 'SLO',
      tooltip: 'Type in your desired SLO threshold from 0 to ' + MAX_VAL,
      value: query.sloValue,
      invalid: !this.state.isValidSlo,
      placeholder: '0.99',
      onChange: this.onSloValueChange
    }), react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_FormField_FormSelect__WEBPACK_IMPORTED_MODULE_4__["default"], {
      queryKeyword: true,
      labelWidth: 7,
      inputWidth: 0,
      label: 'Value type',
      tooltip: react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", null, "Select your specific SLO information:", react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("ul", null, react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("li", null, "'SLI' requires Gauge visualization"), react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("li", null, "'Remaining Error Budget' requires Singlestat visualization"), react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("li", null, "'Timeseries' requires Bars draw mode on Graph visualization"))),
      value: query.sloSpecific,
      options: _lists_slo_specifics__WEBPACK_IMPORTED_MODULE_3__["default"],
      onChange: this.onSloSpecificChange
    }));
  };

  return SloInformation;
}(react__WEBPACK_IMPORTED_MODULE_1___default.a.Component);



/***/ }),

/***/ "./components/plugin.css":
/*!*******************************!*\
  !*** ./components/plugin.css ***!
  \*******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var api = __webpack_require__(/*! ../../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js */ "../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js");
            var content = __webpack_require__(/*! !../../node_modules/css-loader/dist/cjs.js??ref--8-1!../../node_modules/postcss-loader/src??ref--8-2!../../node_modules/sass-loader/dist/cjs.js!./plugin.css */ "../node_modules/css-loader/dist/cjs.js?!../node_modules/postcss-loader/src/index.js?!../node_modules/sass-loader/dist/cjs.js!./components/plugin.css");

            content = content.__esModule ? content.default : content;

            if (typeof content === 'string') {
              content = [[module.i, content, '']];
            }

var options = {};

options.insert = "head";
options.singleton = false;

var update = api(content, options);

var exported = content.locals ? content.locals : {};



module.exports = exported;

/***/ }),

/***/ "./datasources/DataSource.ts":
/*!***********************************!*\
  !*** ./datasources/DataSource.ts ***!
  \***********************************/
/*! exports provided: DataSource */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DataSource", function() { return DataSource; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "../node_modules/tslib/tslib.es6.js");
/* harmony import */ var _GlobalVariables__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../GlobalVariables */ "./GlobalVariables.ts");
/* harmony import */ var _grafana_data__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @grafana/data */ "@grafana/data");
/* harmony import */ var _grafana_data__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_grafana_data__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _util_delta_util__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../util/delta_util */ "./util/delta_util.ts");
/* harmony import */ var _util_rollup_granularity_util__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../util/rollup_granularity_util */ "./util/rollup_granularity_util.ts");
/* harmony import */ var _util_request_handler__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../util/request_handler */ "./util/request_handler.ts");
/* harmony import */ var _util_time_util__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../util/time_util */ "./util/time_util.ts");
/* harmony import */ var _cache__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../cache */ "./cache.ts");
/* harmony import */ var _DataSource_Application__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./DataSource_Application */ "./datasources/DataSource_Application.ts");
/* harmony import */ var _DataSource_Endpoint__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./DataSource_Endpoint */ "./datasources/DataSource_Endpoint.ts");
/* harmony import */ var _Datasource_Infrastructure__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./Datasource_Infrastructure */ "./datasources/Datasource_Infrastructure.ts");
/* harmony import */ var _DataSource_MobileApp__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./DataSource_MobileApp */ "./datasources/DataSource_MobileApp.ts");
/* harmony import */ var _DataSource_Service__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./DataSource_Service */ "./datasources/DataSource_Service.ts");
/* harmony import */ var _DataSource_Slo__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ./DataSource_Slo */ "./datasources/DataSource_Slo.ts");
/* harmony import */ var _DataSource_Slo2__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ./DataSource_Slo2 */ "./datasources/DataSource_Slo2.ts");
/* harmony import */ var _DataSource_Website__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ./DataSource_Website */ "./datasources/DataSource_Website.ts");
/* harmony import */ var _lists_metric_categories__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! ../lists/metric_categories */ "./lists/metric_categories.ts");
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! lodash */ "lodash");
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_17___default = /*#__PURE__*/__webpack_require__.n(lodash__WEBPACK_IMPORTED_MODULE_17__);
/* harmony import */ var _util_aggregation_util__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! ../util/aggregation_util */ "./util/aggregation_util.ts");
/* harmony import */ var _util_target_util__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(/*! ../util/target_util */ "./util/target_util.ts");
/* harmony import */ var _util_instana_version__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__(/*! ../util/instana_version */ "./util/instana_version.ts");
/* harmony import */ var _util_queryInterval_check__WEBPACK_IMPORTED_MODULE_21__ = __webpack_require__(/*! ../util/queryInterval_check */ "./util/queryInterval_check.ts");
/* harmony import */ var _migration__WEBPACK_IMPORTED_MODULE_22__ = __webpack_require__(/*! ../migration */ "./migration.ts");
/* harmony import */ var _util_analyze_util__WEBPACK_IMPORTED_MODULE_23__ = __webpack_require__(/*! ../util/analyze_util */ "./util/analyze_util.ts");

























var DataSource =
/** @class */
function (_super) {
  Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__extends"])(DataSource, _super);

  function DataSource(instanceSettings) {
    var _this = _super.call(this, instanceSettings) || this;

    _this.options = instanceSettings.jsonData;
    _this.options.url = Object(_util_request_handler__WEBPACK_IMPORTED_MODULE_5__["instanaUrl"])(instanceSettings);
    _this.availableGranularities = [];
    _this.availableRollups = [];
    _this.availableTimeIntervals = [];
    _this.dataSourceSlo = new _DataSource_Slo__WEBPACK_IMPORTED_MODULE_13__["DataSourceSlo"](instanceSettings.jsonData);
    _this.dataSourceSlo2 = new _DataSource_Slo2__WEBPACK_IMPORTED_MODULE_14__["DataSourceSlo2"](instanceSettings.jsonData);
    _this.dataSourceInfrastructure = new _Datasource_Infrastructure__WEBPACK_IMPORTED_MODULE_10__["DataSourceInfrastructure"](instanceSettings.jsonData);
    _this.dataSourceWebsite = new _DataSource_Website__WEBPACK_IMPORTED_MODULE_15__["DataSourceWebsite"](instanceSettings.jsonData);
    _this.dataSourceMobileapp = new _DataSource_MobileApp__WEBPACK_IMPORTED_MODULE_11__["DataSourceMobileApp"](instanceSettings.jsonData);
    _this.dataSourceApplication = new _DataSource_Application__WEBPACK_IMPORTED_MODULE_8__["DataSourceApplication"](instanceSettings.jsonData);
    _this.dataSourceService = new _DataSource_Service__WEBPACK_IMPORTED_MODULE_12__["DataSourceService"](instanceSettings.jsonData);
    _this.dataSourceEndpoint = new _DataSource_Endpoint__WEBPACK_IMPORTED_MODULE_9__["DataSourceEndpoint"](instanceSettings.jsonData);
    _this.resultCache = new _cache__WEBPACK_IMPORTED_MODULE_7__["default"]();
    return _this;
  }

  DataSource.prototype.query = function (options) {
    return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, Promise, function () {
      var range;

      var _this = this;

      return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"])(this, function (_a) {
        range = options.range;
        this.timeFilter = Object(_util_time_util__WEBPACK_IMPORTED_MODULE_6__["readTime"])(range);
        this.availableRollups = Object(_util_rollup_granularity_util__WEBPACK_IMPORTED_MODULE_4__["getPossibleRollups"])(this.timeFilter);
        this.availableGranularities = Object(_util_rollup_granularity_util__WEBPACK_IMPORTED_MODULE_4__["getPossibleGranularities"])(this.timeFilter.windowSize);
        return [2
        /*return*/
        , Promise.all(options.targets.map(function (target) {
          var targetTimeFilter = Object(_util_time_util__WEBPACK_IMPORTED_MODULE_6__["readTime"])(range); // grafana setting to disable query execution

          if (target.hide) {
            return {
              data: [],
              target: target
            };
          } // target migration for downwards compatibility


          Object(_migration__WEBPACK_IMPORTED_MODULE_22__["default"])(target);

          if (!target.metricCategory) {
            target.metricCategory = _lists_metric_categories__WEBPACK_IMPORTED_MODULE_16__["default"][0];
          }

          _this.setPossibleTimeIntervals(target);

          if (!_this.availableTimeIntervals.find(function (i) {
            return i.key === target.timeInterval.key;
          })) {
            target.timeInterval = _this.getDefaultTimeInterval(target);
          }

          if (target.timeShift) {
            var millis = _this.convertTimeShiftToMillis(target.timeShift);

            if (millis > 0) {
              targetTimeFilter = _this.applyTimeShiftOnTimeFilter(targetTimeFilter, millis);
            }
          }

          target.timeFilter = targetTimeFilter;
          target.stableHash = Object(_util_delta_util__WEBPACK_IMPORTED_MODULE_3__["generateStableHash"])(target);
          targetTimeFilter = _this.adjustTimeFilterIfCached(targetTimeFilter, target);
          var category = target.metricCategory.key;

          if (category === _GlobalVariables__WEBPACK_IMPORTED_MODULE_1__["SLO_INFORMATION"]) {
            return _this.dataSourceSlo.runQuery(target, targetTimeFilter).then(function (data) {
              return _this.buildTargetWithAppendedDataResult(target, targetTimeFilter, data);
            });
          } else if (category === _GlobalVariables__WEBPACK_IMPORTED_MODULE_1__["SLO2_INFORMATION"]) {
            return _this.dataSourceSlo2.runQuery(target, targetTimeFilter).then(function (data) {
              return _this.buildTargetWithAppendedDataResult(target, targetTimeFilter, data);
            });
          } else if (category === _GlobalVariables__WEBPACK_IMPORTED_MODULE_1__["INFRASTRUCTURE_ANALYZE"]) {
            return _this.dataSourceInfrastructure.runQuery(target, targetTimeFilter).then(function (data) {
              return _this.buildTarget(target, data);
            });
          } else if (category === _GlobalVariables__WEBPACK_IMPORTED_MODULE_1__["BUILT_IN_METRICS"] || category === _GlobalVariables__WEBPACK_IMPORTED_MODULE_1__["CUSTOM_METRICS"]) {
            return _this.dataSourceInfrastructure.runQuery(target, targetTimeFilter).then(function (data) {
              return _this.buildTargetWithAppendedDataResult(target, targetTimeFilter, data);
            });
          } else if (category === _GlobalVariables__WEBPACK_IMPORTED_MODULE_1__["ANALYZE_WEBSITE_METRICS"]) {
            return _this.dataSourceWebsite.runQuery(target, targetTimeFilter).then(function (data) {
              return _this.buildTargetWithAppendedDataResult(target, targetTimeFilter, data);
            });
          } else if (category === _GlobalVariables__WEBPACK_IMPORTED_MODULE_1__["ANALYZE_MOBILE_APP_METRICS"]) {
            return _this.dataSourceMobileapp.runQuery(target, targetTimeFilter).then(function (data) {
              return _this.buildTargetWithAppendedDataResult(target, targetTimeFilter, data);
            });
          } else if (category === _GlobalVariables__WEBPACK_IMPORTED_MODULE_1__["ANALYZE_APPLICATION_METRICS"]) {
            return _this.dataSourceApplication.runQuery(target, targetTimeFilter).then(function (data) {
              return _this.buildTargetWithAppendedDataResult(target, targetTimeFilter, data);
            });
          } else if (category === _GlobalVariables__WEBPACK_IMPORTED_MODULE_1__["APPLICATION_SERVICE_ENDPOINT_METRICS"]) {
            return _this.getApplicationServiceEndpointMetrics(target, targetTimeFilter).then(function (data) {
              return _this.buildTargetWithAppendedDataResult(target, targetTimeFilter, data);
            });
          }

          return Promise.resolve(Object(_util_target_util__WEBPACK_IMPORTED_MODULE_19__["emptyResultData"])(target.refId));
        })).then(function (targetData) {
          var result = [];

          lodash__WEBPACK_IMPORTED_MODULE_17___default.a.each(targetData, function (targetAndData) {
            // Flatten the list as Grafana expects a list of targets with corresponding datapoints.
            var resultData = lodash__WEBPACK_IMPORTED_MODULE_17___default.a.compact(lodash__WEBPACK_IMPORTED_MODULE_17___default.a.flatten(targetAndData.data)); // Also remove empty data items


            _this.cacheResultIfNecessary(lodash__WEBPACK_IMPORTED_MODULE_17___default.a.cloneDeep(resultData), targetAndData.target); // clone to store results without timeshift re-calculation


            _this.applyTimeShiftIfNecessary(resultData, targetAndData.target); // adjust resultdata after caching the result


            resultData = _this.aggregateDataIfNecessary(resultData, targetAndData.target);
            result.push(resultData);
          });

          return {
            data: lodash__WEBPACK_IMPORTED_MODULE_17___default.a.flatten(result)
          };
        })];
      });
    });
  };

  DataSource.prototype.getApplicationServiceEndpointMetrics = function (target, timeFilter) {
    var _this = this; // do not try to execute too big queries


    if (Object(_util_queryInterval_check__WEBPACK_IMPORTED_MODULE_21__["isInvalidQueryInterval"])(timeFilter.windowSize, Object(_util_time_util__WEBPACK_IMPORTED_MODULE_6__["hoursToMs"])(this.options.queryinterval_limit_app_metrics))) {
      throw new Error('Limit for maximum selectable windowsize exceeded, max is: ' + this.options.queryinterval_limit_app_metrics + ' hours');
    }

    if (target.endpoint && target.endpoint.key) {
      return this.dataSourceEndpoint.fetchEndpointMetrics(target, timeFilter).then(function (response) {
        return Object(_util_analyze_util__WEBPACK_IMPORTED_MODULE_23__["readItemMetrics"])(target, response, _this.dataSourceEndpoint.buildEndpointMetricLabel);
      });
    } else if (target.service && target.service.key) {
      return this.dataSourceService.fetchServiceMetrics(target, timeFilter).then(function (response) {
        return Object(_util_analyze_util__WEBPACK_IMPORTED_MODULE_23__["readItemMetrics"])(target, response, _this.dataSourceService.buildServiceMetricLabel);
      });
    } else if (target.entity && target.entity.key) {
      return this.dataSourceApplication.fetchApplicationMetrics(target, timeFilter).then(function (response) {
        if (response.data) {
          target.showWarningCantShowAllResults = response.data.canLoadMore;
        }

        return Object(_util_analyze_util__WEBPACK_IMPORTED_MODULE_23__["readItemMetrics"])(target, response, _this.dataSourceApplication.buildApplicationMetricLabel);
      });
    }

    return Promise.resolve({
      data: {
        items: []
      }
    });
  };

  DataSource.prototype.applyTimeShiftIfNecessary = function (data, target) {
    var _this = this;

    if (target.timeShift) {
      var millis_1 = this.convertTimeShiftToMillis(target.timeShift);

      if (millis_1 > 0) {
        data.forEach(function (data) {
          _this.applyTimeShiftOnData(data, millis_1);
        });
      }
    }
  };

  DataSource.prototype.cacheResultIfNecessary = function (result, target) {
    if (this.supportsDeltaRequests(target) && this.hasResult(result)) {
      var cachedObj = {
        timeFilter: target.timeFilter,
        results: result
      };
      this.resultCache.put(target.stableHash, cachedObj, 4000000); // set to 1,11 hour
    }
  };

  DataSource.prototype.supportsDeltaRequests = function (target) {
    var _this = this;

    if (target.metricCategory) {
      if (target.metricCategory.key === _GlobalVariables__WEBPACK_IMPORTED_MODULE_1__["SLO_INFORMATION"] || target.metricCategory.key === _GlobalVariables__WEBPACK_IMPORTED_MODULE_1__["SLO2_INFORMATION"] || target.metricCategory.key === _GlobalVariables__WEBPACK_IMPORTED_MODULE_1__["INFRASTRUCTURE_ANALYZE"]) {
        return false;
      }
    }

    var version = this.resultCache.get('version');

    if (!version) {
      return Object(_util_instana_version__WEBPACK_IMPORTED_MODULE_20__["default"])(this.options).then(function (version) {
        _this.resultCache.put('version', version, 4000000); // set to 1,11 hour


        return version >= 171;
      });
    }

    return version >= 171;
  };

  DataSource.prototype.hasResult = function (result) {
    return result && result.length > 0;
  };

  DataSource.prototype.applyTimeShiftOnData = function (data, timeshift) {
    data.datapoints.forEach(function (datapoint) {
      datapoint[1] = datapoint[1] + timeshift;
    });
  };

  DataSource.prototype.aggregateDataIfNecessary = function (data, target) {
    var newData = [];

    if (target.aggregateGraphs) {
      var aggregatedData_1 = Object(_util_aggregation_util__WEBPACK_IMPORTED_MODULE_18__["aggregateTarget"])(data, target);
      newData.push(aggregatedData_1);

      if (!target.hideOriginalGraphs) {
        lodash__WEBPACK_IMPORTED_MODULE_17___default.a.each(data, function (dt) {
          if (dt.target !== aggregatedData_1.target) {
            newData.push(dt);
          }
        });
      }

      return newData;
    }

    return data;
  };

  DataSource.prototype.buildTarget = function (target, data) {
    return {
      target: target,
      data: data
    };
  };

  DataSource.prototype.buildTargetWithAppendedDataResult = function (target, timeFilter, data) {
    if (timeFilter.from !== target.timeFilter.from && data) {
      data = this.appendResult(data, target);
      data.forEach(function (t) {
        t.datapoints = t.datapoints.filter(function (d) {
          return d[1] >= target.timeFilter.from;
        });
      });
    }

    return this.buildTarget(target, data);
  };

  DataSource.prototype.appendResult = function (data, target) {
    var cachedResult = this.resultCache.get(target.stableHash);

    if (cachedResult && cachedResult.results) {
      data = Object(_util_delta_util__WEBPACK_IMPORTED_MODULE_3__["appendData"])(data, cachedResult.results);
    }

    return data;
  };

  DataSource.prototype.adjustTimeFilterIfCached = function (timeFilter, target) {
    var cachedResult = this.resultCache.get(target.stableHash);

    if (cachedResult && Object(_util_delta_util__WEBPACK_IMPORTED_MODULE_3__["hasIntersection"])(timeFilter, cachedResult.timeFilter)) {
      var newFrom = Object(_util_delta_util__WEBPACK_IMPORTED_MODULE_3__["getDeltaRequestTimestamp"])(cachedResult.results, cachedResult.timeFilter.from, target.timeInterval);
      var newTo = timeFilter.to;
      return {
        from: newFrom,
        to: newTo,
        windowSize: newTo - newFrom
      };
    }

    return timeFilter;
  };

  DataSource.prototype.getSloReports = function () {
    return this.dataSourceSlo.getConfiguredSLIs();
  };

  DataSource.prototype.getSlo2Reports = function () {
    return this.dataSourceSlo2.getSLOConfigurations();
  };

  DataSource.prototype.getEntityTypes = function () {
    return this.dataSourceInfrastructure.getEntityTypes();
  };

  DataSource.prototype.fetchApplications = function () {
    return this.dataSourceApplication.getApplications(this.getTimeFilter());
  };

  DataSource.prototype.fetchApplicationTags = function () {
    return this.dataSourceApplication.getApplicationTags(this.getTimeFilter());
  };

  DataSource.prototype.fetchServices = function (target) {
    return this.dataSourceService.getServicesOfApplication(target, this.getTimeFilter());
  };

  DataSource.prototype.fetchEndpoints = function (target) {
    return this.dataSourceEndpoint.getEndpointsOfService(target, this.getTimeFilter());
  };

  DataSource.prototype.fetchTypesForTarget = function (query) {
    return this.dataSourceInfrastructure.fetchTypesForTarget(query, this.getTimeFilter());
  };

  DataSource.prototype.fetchWebsites = function () {
    return this.dataSourceWebsite.getWebsites(this.getTimeFilter());
  };

  DataSource.prototype.fetchMobileapp = function () {
    return this.dataSourceMobileapp.getMobileapp(this.getTimeFilter());
  };

  DataSource.prototype.fetchMetricsForEntityType = function (target) {
    return this.dataSourceInfrastructure.fetchAvailableMetricsForEntityType(target, this.timeFilter);
  };

  DataSource.prototype.getDefaultTimeInterval = function (query) {
    var category = query.metricCategory.key;

    if (category === _GlobalVariables__WEBPACK_IMPORTED_MODULE_1__["BUILT_IN_METRICS"] || category === _GlobalVariables__WEBPACK_IMPORTED_MODULE_1__["CUSTOM_METRICS"] || category === _GlobalVariables__WEBPACK_IMPORTED_MODULE_1__["INFRASTRUCTURE_ANALYZE"]) {
      return Object(_util_rollup_granularity_util__WEBPACK_IMPORTED_MODULE_4__["getDefaultMetricRollupDuration"])(this.getTimeFilter());
    } else {
      return Object(_util_rollup_granularity_util__WEBPACK_IMPORTED_MODULE_4__["getDefaultChartGranularity"])(this.getTimeFilter().windowSize);
    }
  };

  DataSource.prototype.convertTimeShiftToMillis = function (timeShift) {
    if (!timeShift) {
      return 0;
    }

    try {
      return this.parseTimeShift(timeShift);
    } catch (e) {
      return 0;
    }
  };

  DataSource.prototype.parseTimeShift = function (timeShift) {
    var milliSeconds = 1000;

    if (timeShift.endsWith('s')) {
      return parseInt(timeShift.split('s')[0], 10) * milliSeconds;
    } else if (timeShift.endsWith('m')) {
      return parseInt(timeShift.split('m')[0], 10) * 60 * milliSeconds;
    } else if (timeShift.endsWith('h')) {
      return parseInt(timeShift.split('h')[0], 10) * 60 * 60 * milliSeconds;
    } else if (timeShift.endsWith('d')) {
      return parseInt(timeShift.split('d')[0], 10) * 60 * 60 * 24 * milliSeconds;
    } else if (timeShift.endsWith('w')) {
      return parseInt(timeShift.split('w')[0], 10) * 60 * 60 * 24 * 7 * milliSeconds;
    }

    return 0;
  };

  DataSource.prototype.applyTimeShiftOnTimeFilter = function (timeFilter, timeShift) {
    return {
      from: timeFilter.from - timeShift,
      to: timeFilter.to - timeShift,
      windowSize: timeFilter.windowSize
    };
  };

  DataSource.prototype.setPossibleTimeIntervals = function (target) {
    var category = target.metricCategory.key;

    if (category === _GlobalVariables__WEBPACK_IMPORTED_MODULE_1__["BUILT_IN_METRICS"] || category === _GlobalVariables__WEBPACK_IMPORTED_MODULE_1__["CUSTOM_METRICS"] || category === _GlobalVariables__WEBPACK_IMPORTED_MODULE_1__["INFRASTRUCTURE_ANALYZE"]) {
      this.availableTimeIntervals = this.availableRollups;
    } else {
      this.availableTimeIntervals = this.availableGranularities;
    }
  };

  DataSource.prototype.getTimeFilter = function () {
    if (!this.timeFilter || !this.timeFilter.from) {
      var now = Date.now();
      var windowSize = 6 * 60 * 60 * 1000; // 6h

      this.timeFilter = {
        from: now - windowSize,
        to: now,
        windowSize: windowSize
      };
    }

    return this.timeFilter;
  };

  DataSource.prototype.testDatasource = function () {
    return Object(_util_request_handler__WEBPACK_IMPORTED_MODULE_5__["getRequest"])(this.options, '/api/infrastructure-monitoring/monitoring-state').then(function () {
      return {
        status: 'success',
        message: 'Successfully connected to the Instana API.',
        title: 'Success'
      };
    }, function (error) {
      if (error.status === 401) {
        return {
          status: 'error',
          message: 'Unauthorized. Please verify the API Token.',
          title: 'Error'
        };
      } else {
        console.log(error);
        return {
          status: 'error',
          message: 'Error (' + error.status + ') connecting to the Instana API: ' + error.statusText,
          title: 'Error'
        };
      }
    });
  };

  return DataSource;
}(_grafana_data__WEBPACK_IMPORTED_MODULE_2__["DataSourceApi"]);



/***/ }),

/***/ "./datasources/DataSource_Application.ts":
/*!***********************************************!*\
  !*** ./datasources/DataSource_Application.ts ***!
  \***********************************************/
/*! exports provided: DataSourceApplication */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DataSourceApplication", function() { return DataSourceApplication; });
/* harmony import */ var _cache__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../cache */ "./cache.ts");
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! lodash */ "lodash");
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(lodash__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _util_time_util__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../util/time_util */ "./util/time_util.ts");
/* harmony import */ var _util_request_handler__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../util/request_handler */ "./util/request_handler.ts");
/* harmony import */ var _util_rollup_granularity_util__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../util/rollup_granularity_util */ "./util/rollup_granularity_util.ts");
/* harmony import */ var _util_analyze_util__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../util/analyze_util */ "./util/analyze_util.ts");
/* harmony import */ var _util_target_util__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../util/target_util */ "./util/target_util.ts");
/* harmony import */ var _GlobalVariables__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../GlobalVariables */ "./GlobalVariables.ts");
/* harmony import */ var _lists_default_metric_catalog__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../lists/default_metric_catalog */ "./lists/default_metric_catalog.ts");
/* harmony import */ var _util_queryInterval_check__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../util/queryInterval_check */ "./util/queryInterval_check.ts");
/* harmony import */ var _util_instana_version__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../util/instana_version */ "./util/instana_version.ts");












var DataSourceApplication =
/** @class */
function () {
  function DataSourceApplication(options) {
    this.instanaOptions = options;
    this.applicationsCache = new _cache__WEBPACK_IMPORTED_MODULE_0__["default"]();
    this.miscCache = new _cache__WEBPACK_IMPORTED_MODULE_0__["default"]();
  }

  DataSourceApplication.prototype.runQuery = function (target, timeFilter) {
    var _this = this; // do not try to execute to big queries


    if (Object(_util_queryInterval_check__WEBPACK_IMPORTED_MODULE_9__["isInvalidQueryInterval"])(timeFilter.windowSize, Object(_util_time_util__WEBPACK_IMPORTED_MODULE_2__["hoursToMs"])(this.instanaOptions.queryinterval_limit_app_calls))) {
      throw new Error('Limit for maximum selectable windowsize exceeded, max is: ' + this.instanaOptions.queryinterval_limit_app_calls + ' hours');
    } // avoid invalid calls


    if (!target || !target.metric || !target.metric.key || !target.group || !target.group.key) {
      return Promise.resolve(Object(_util_target_util__WEBPACK_IMPORTED_MODULE_6__["emptyResultData"])(target.refId));
    }

    return this.fetchAnalyzeMetricsForApplication(target, timeFilter).then(function (response) {
      target.showWarningCantShowAllResults = response.data.canLoadMore;
      return Object(_util_analyze_util__WEBPACK_IMPORTED_MODULE_5__["readItemMetrics"])(target, response, _this.buildAnalyzeApplicationLabel);
    });
  };

  DataSourceApplication.prototype.getApplications = function (timeFilter) {
    var key = Object(_util_time_util__WEBPACK_IMPORTED_MODULE_2__["getTimeKey"])(timeFilter);
    var applications = this.applicationsCache.get(key);

    if (applications) {
      return applications;
    }

    var windowSize = Object(_util_time_util__WEBPACK_IMPORTED_MODULE_2__["getWindowSize"])(timeFilter);
    var page = 1;
    var pageSize = 200;
    applications = this.paginateApplications([], windowSize, timeFilter.to, page, pageSize, _GlobalVariables__WEBPACK_IMPORTED_MODULE_7__["PAGINATION_LIMIT"]).then(function (response) {
      var allResults = lodash__WEBPACK_IMPORTED_MODULE_1___default.a.flattenDeep(lodash__WEBPACK_IMPORTED_MODULE_1___default.a.map(response, function (pageSet) {
        return pageSet.items;
      }));

      return lodash__WEBPACK_IMPORTED_MODULE_1___default.a.orderBy(lodash__WEBPACK_IMPORTED_MODULE_1___default.a.compact(allResults).map(function (entry) {
        return {
          key: entry.id,
          label: entry.label,
          boundaryScope: entry.boundaryScope
        };
      }), [function (application) {
        return application.label.toLowerCase();
      }], ['asc']);
    });
    this.applicationsCache.put(key, applications, 600000);
    return applications;
  };

  DataSourceApplication.prototype.paginateApplications = function (results, windowSize, to, page, pageSize, pageLimit) {
    var _this = this;

    if (page > pageLimit) {
      return results;
    }

    var queryParameters = 'windowSize=' + windowSize + '&to=' + to + '&page=' + page + '&pageSize=' + pageSize;
    return Object(_util_request_handler__WEBPACK_IMPORTED_MODULE_3__["getRequest"])(this.instanaOptions, '/api/application-monitoring/applications?' + queryParameters).then(function (response) {
      results.push(response.data);

      if (page * pageSize < response.data.totalHits) {
        page++;
        return _this.paginateApplications(results, windowSize, to, page, pageSize, pageLimit);
      } else {
        return results;
      }
    });
  };

  DataSourceApplication.prototype.getApplicationTags = function (timeFilter) {
    var _this = this;

    var applicationTags = this.miscCache.get('applicationTags');

    if (applicationTags) {
      return applicationTags;
    }

    return Object(_util_instana_version__WEBPACK_IMPORTED_MODULE_10__["default"])(this.instanaOptions).then(function (version) {
      if (version >= 191) {
        applicationTags = _this.getCatalog(timeFilter).then(function (catalog) {
          return _this.mapCatalogResponse(catalog.data.tags);
        });
      } else {
        applicationTags = _this.getCatalogFromDeprecatedEndpoint().then(function (tagsResponse) {
          return _this.mapCatalogResponse(tagsResponse.data);
        });
      }

      _this.miscCache.put('applicationTags', applicationTags);

      return applicationTags;
    });
  };

  DataSourceApplication.prototype.getCatalog = function (timeFilter) {
    var endpoint = '/api/application-monitoring/catalog?dataSource=CALLS&useCase=FILTERING&from=' + timeFilter.from;
    return Object(_util_request_handler__WEBPACK_IMPORTED_MODULE_3__["getRequest"])(this.instanaOptions, endpoint);
  };

  DataSourceApplication.prototype.getCatalogFromDeprecatedEndpoint = function () {
    return Object(_util_request_handler__WEBPACK_IMPORTED_MODULE_3__["getRequest"])(this.instanaOptions, '/api/application-monitoring/catalog/tags');
  };

  DataSourceApplication.prototype.mapCatalogResponse = function (catalog) {
    return catalog.map(function (entry) {
      return {
        key: entry.name,
        label: entry.name,
        type: entry.type,
        canApplyToSource: entry.canApplyToSource,
        canApplyToDestination: entry.canApplyToDestination
      };
    });
  };

  DataSourceApplication.prototype.getApplicationMetricsCatalog = function () {
    return _lists_default_metric_catalog__WEBPACK_IMPORTED_MODULE_8__["default"];
  };

  DataSourceApplication.prototype.fetchAnalyzeMetricsForApplication = function (target, timeFilter) {
    var _this = this;

    var windowSize = Object(_util_time_util__WEBPACK_IMPORTED_MODULE_2__["getWindowSize"])(timeFilter);
    var tagFilters = [];
    return Promise.resolve(this.getApplicationTags(timeFilter)).then(function (applicationTags) {
      if (target.entity.key) {
        tagFilters.push({
          name: 'application.name',
          operator: 'EQUALS',
          value: target.entity.label,
          entity: target.applicationCallToEntity ? target.applicationCallToEntity : 'DESTINATION'
        });
      }

      lodash__WEBPACK_IMPORTED_MODULE_1___default.a.forEach(target.filters, function (filter) {
        if (filter.isValid) {
          var tagFilter = Object(_util_analyze_util__WEBPACK_IMPORTED_MODULE_5__["createTagFilter"])(filter);

          var tag_1 = lodash__WEBPACK_IMPORTED_MODULE_1___default.a.find(applicationTags, ['key', filter.tag.key]);

          if (tag_1.canApplyToDestination || tag_1.canApplyToSource) {
            tagFilter['entity'] = _this.getTagEntity(filter.entity, tag_1);
          }

          tagFilters.push(tagFilter);
        }
      });

      if (!target.timeInterval) {
        target.timeInterval = Object(_util_rollup_granularity_util__WEBPACK_IMPORTED_MODULE_4__["getDefaultChartGranularity"])(windowSize);
      }

      var metric = {
        metric: target.metric.key,
        aggregation: target.aggregation && target.aggregation.key ? target.aggregation.key : 'SUM',
        granularity: target.timeInterval.key
      };
      var group = {
        groupbyTag: target.group.key
      };

      var tag = lodash__WEBPACK_IMPORTED_MODULE_1___default.a.find(applicationTags, ['key', target.group.key]);

      if (tag.canApplyToDestination || tag.canApplyToSource) {
        group['groupbyTagEntity'] = target.callToEntity;
      }

      if (target.group.type === 'KEY_VALUE_PAIR' && target.groupbyTagSecondLevelKey) {
        group['groupbyTagSecondLevelKey'] = target.groupbyTagSecondLevelKey;
      }

      var includeSynthetic = false;
      target.filters.map(function (filter) {
        if (filter.tag.key === 'call.is_synthetic') {
          includeSynthetic = filter.booleanValue;
        }
      });
      var data = {
        group: group,
        timeFrame: {
          to: timeFilter.to,
          windowSize: Object(_util_time_util__WEBPACK_IMPORTED_MODULE_2__["atLeastGranularity"])(windowSize, metric.granularity)
        },
        metrics: [metric],
        includeSynthetic: includeSynthetic,
        tagFilterExpression: {
          type: 'EXPRESSION',
          logicalOperator: 'AND',
          elements: tagFilters
        }
      };
      return Object(_util_request_handler__WEBPACK_IMPORTED_MODULE_3__["postRequest"])(_this.instanaOptions, '/api/application-monitoring/analyze/call-groups?fillTimeSeries=true', data, false, 5);
    });
  };

  DataSourceApplication.prototype.getTagEntity = function (selectedEntity, tag) {
    if (selectedEntity === 'DESTINATION' && tag.canApplyToDestination) {
      return 'DESTINATION';
    }

    if (selectedEntity === 'SOURCE' && tag.canApplyToSource) {
      return 'SOURCE';
    }

    return tag.canApplyToDestination ? 'DESTINATION' : 'SOURCE';
  };

  DataSourceApplication.prototype.fetchApplicationMetrics = function (target, timeFilter) {
    // avoid invalid calls
    if (!target || !target.metric || !target.metric.key) {
      return Promise.resolve(Object(_util_target_util__WEBPACK_IMPORTED_MODULE_6__["emptyResultData"])(target.refId));
    }

    var windowSize = Object(_util_time_util__WEBPACK_IMPORTED_MODULE_2__["getWindowSize"])(timeFilter);

    if (!target.timeInterval) {
      target.timeInterval = Object(_util_rollup_granularity_util__WEBPACK_IMPORTED_MODULE_4__["getDefaultChartGranularity"])(windowSize);
    }

    var metric = {
      metric: target.metric.key,
      aggregation: target.aggregation && target.aggregation.key ? target.aggregation.key : 'SUM',
      granularity: target.timeInterval.key
    };
    var data = {
      timeFrame: {
        to: timeFilter.to,
        windowSize: Object(_util_time_util__WEBPACK_IMPORTED_MODULE_2__["atLeastGranularity"])(windowSize, metric.granularity)
      },
      metrics: [metric]
    };

    if (target.entity.key !== null) {
      data['applicationId'] = target.entity.key;
      data['applicationBoundaryScope'] = target.applicationBoundaryScope;
    }

    return Object(_util_request_handler__WEBPACK_IMPORTED_MODULE_3__["postRequest"])(this.instanaOptions, '/api/application-monitoring/metrics/applications?fillTimeSeries=true', data);
  };

  DataSourceApplication.prototype.buildAnalyzeApplicationLabel = function (target, item, key, index) {
    if (target.labelFormat) {
      var label = target.labelFormat;
      label = lodash__WEBPACK_IMPORTED_MODULE_1___default.a.replace(label, '$label', item.name);
      label = lodash__WEBPACK_IMPORTED_MODULE_1___default.a.replace(label, '$application', target.entity.label);
      label = lodash__WEBPACK_IMPORTED_MODULE_1___default.a.replace(label, '$metric', target.metric.label);
      label = lodash__WEBPACK_IMPORTED_MODULE_1___default.a.replace(label, '$key', key);
      label = lodash__WEBPACK_IMPORTED_MODULE_1___default.a.replace(label, '$index', '' + index + 1);
      label = lodash__WEBPACK_IMPORTED_MODULE_1___default.a.replace(label, '$timeShift', target.timeShift);
      return label;
    }

    if (target.entity.label === _GlobalVariables__WEBPACK_IMPORTED_MODULE_7__["ALL_APPLICATIONS"]) {
      return target.timeShift ? item.name + ' - ' + key + ' - ' + target.timeShift : item.name + ' - ' + key;
    }

    return target.timeShift && target.timeShiftIsValid ? item.name + ' (' + target.entity.label + ')' + ' - ' + key + ' - ' + target.timeShift : item.name + ' (' + target.entity.label + ')' + ' - ' + key;
  };

  DataSourceApplication.prototype.buildApplicationMetricLabel = function (target, item, key, index) {
    if (target.labelFormat) {
      var label = target.labelFormat;
      label = lodash__WEBPACK_IMPORTED_MODULE_1___default.a.replace(label, '$label', item.application.label);
      label = lodash__WEBPACK_IMPORTED_MODULE_1___default.a.replace(label, '$application', target.entity.label);
      label = lodash__WEBPACK_IMPORTED_MODULE_1___default.a.replace(label, '$metric', target.metric.label);
      label = lodash__WEBPACK_IMPORTED_MODULE_1___default.a.replace(label, '$key', key);
      label = lodash__WEBPACK_IMPORTED_MODULE_1___default.a.replace(label, '$index', '' + index + 1);
      label = lodash__WEBPACK_IMPORTED_MODULE_1___default.a.replace(label, '$timeShift', target.timeShift);
      return label;
    }

    if (target.entity.label === _GlobalVariables__WEBPACK_IMPORTED_MODULE_7__["ALL_APPLICATIONS"]) {
      return target.timeShift ? item.application.label + ' - ' + key + ' - ' + target.timeShift : item.application.label + ' - ' + key;
    }

    return target.timeShift && target.timeShiftIsValid ? item.application.label + ' (' + target.entity.label + ')' + ' - ' + key + ' - ' + target.timeShift : item.application.label + ' (' + target.entity.label + ')' + ' - ' + key;
  };

  return DataSourceApplication;
}();



/***/ }),

/***/ "./datasources/DataSource_Endpoint.ts":
/*!********************************************!*\
  !*** ./datasources/DataSource_Endpoint.ts ***!
  \********************************************/
/*! exports provided: DataSourceEndpoint */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DataSourceEndpoint", function() { return DataSourceEndpoint; });
/* harmony import */ var _cache__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../cache */ "./cache.ts");
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! lodash */ "lodash");
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(lodash__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _util_time_util__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../util/time_util */ "./util/time_util.ts");
/* harmony import */ var _util_request_handler__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../util/request_handler */ "./util/request_handler.ts");
/* harmony import */ var _GlobalVariables__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../GlobalVariables */ "./GlobalVariables.ts");
/* harmony import */ var _util_target_util__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../util/target_util */ "./util/target_util.ts");
/* harmony import */ var _util_rollup_granularity_util__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../util/rollup_granularity_util */ "./util/rollup_granularity_util.ts");








var DataSourceEndpoint =
/** @class */
function () {
  function DataSourceEndpoint(options) {
    this.instanaOptions = options;
    this.endpointsCache = new _cache__WEBPACK_IMPORTED_MODULE_0__["default"]();
  }

  DataSourceEndpoint.prototype.getEndpointsOfService = function (target, timeFilter) {
    var applicationId = '';

    if (target.entity && target.entity.key) {
      applicationId = target.entity.key;
    }

    var serviceId = '';

    if (target.service) {
      serviceId = target.service.key;
    }

    var key = Object(_util_time_util__WEBPACK_IMPORTED_MODULE_2__["getTimeKey"])(timeFilter) + applicationId + serviceId + target.applicationBoundaryScope;
    var endpoints = this.endpointsCache.get(key);

    if (endpoints) {
      return endpoints;
    }

    var windowSize = Object(_util_time_util__WEBPACK_IMPORTED_MODULE_2__["getWindowSize"])(timeFilter);
    var page = 1;
    var pageSize = 200;
    endpoints = this.paginateEndpoints([], applicationId, serviceId, windowSize, target.applicationBoundaryScope, timeFilter.to, page, pageSize, _GlobalVariables__WEBPACK_IMPORTED_MODULE_4__["PAGINATION_LIMIT"]).then(function (response) {
      var allResults = lodash__WEBPACK_IMPORTED_MODULE_1___default.a.flattenDeep(lodash__WEBPACK_IMPORTED_MODULE_1___default.a.map(response, function (pageSet) {
        return pageSet.items;
      }));

      return lodash__WEBPACK_IMPORTED_MODULE_1___default.a.orderBy(lodash__WEBPACK_IMPORTED_MODULE_1___default.a.compact(allResults).map(function (entry) {
        return {
          key: entry.id,
          label: entry.label
        };
      }), [function (endpoint) {
        return endpoint.label.toLowerCase();
      }], ['asc']);
    });
    this.endpointsCache.put(key, endpoints, 600000);
    return endpoints;
  };

  DataSourceEndpoint.prototype.paginateEndpoints = function (results, applicationId, serviceId, windowSize, applicationBoundaryScope, to, page, pageSize, pageLimit) {
    var _this = this;

    if (page > pageLimit) {
      return results;
    }

    var queryParameters = 'windowSize=' + windowSize + '&to=' + to + '&page=' + page + '&pageSize=' + pageSize;

    if (applicationBoundaryScope === 'ALL' || applicationBoundaryScope === 'INBOUND') {
      queryParameters += '&applicationBoundaryScope=' + applicationBoundaryScope;
    }

    var url = '/api/application-monitoring/applications;id=' + (applicationId ? applicationId : '') + '/services;id=' + (serviceId ? serviceId : '') + '/endpoints?' + queryParameters;
    return Object(_util_request_handler__WEBPACK_IMPORTED_MODULE_3__["getRequest"])(this.instanaOptions, url).then(function (response) {
      results.push(response.data);

      if (page * pageSize < response.data.totalHits) {
        page++;
        return _this.paginateEndpoints(results, applicationId, serviceId, windowSize, applicationBoundaryScope, to, page, pageSize, pageLimit);
      } else {
        return results;
      }
    });
  };

  DataSourceEndpoint.prototype.fetchEndpointMetrics = function (target, timeFilter) {
    // avoid invalid calls
    if (!target || !target.metric || !target.metric.key) {
      return Promise.resolve(Object(_util_target_util__WEBPACK_IMPORTED_MODULE_5__["emptyResultData"])(target.refId));
    }

    var windowSize = Object(_util_time_util__WEBPACK_IMPORTED_MODULE_2__["getWindowSize"])(timeFilter);

    if (!target.timeInterval) {
      target.timeInterval = Object(_util_rollup_granularity_util__WEBPACK_IMPORTED_MODULE_6__["getDefaultChartGranularity"])(windowSize);
    }

    var metric = {
      metric: target.metric.key,
      aggregation: target.aggregation && target.aggregation.key ? target.aggregation.key : 'SUM',
      granularity: target.timeInterval.key
    };
    var data = {
      endpointId: target.endpoint.key,
      timeFrame: {
        to: timeFilter.to,
        windowSize: Object(_util_time_util__WEBPACK_IMPORTED_MODULE_2__["atLeastGranularity"])(windowSize, metric.granularity)
      },
      metrics: [metric]
    };

    if (target.entity && target.entity.key) {
      data['applicationId'] = target.entity.key; // only set applicationBoundaryScope when an application is selected

      data['applicationBoundaryScope'] = target.applicationBoundaryScope;
    }

    if (target.service && target.service.key) {
      data['serviceId'] = target.service.key;
    }

    return Object(_util_request_handler__WEBPACK_IMPORTED_MODULE_3__["postRequest"])(this.instanaOptions, '/api/application-monitoring/metrics/endpoints?fillTimeSeries=true', data);
  };

  DataSourceEndpoint.prototype.buildEndpointMetricLabel = function (target, item, key, index) {
    if (target.labelFormat) {
      var label = target.labelFormat;
      label = lodash__WEBPACK_IMPORTED_MODULE_1___default.a.replace(label, '$label', item.endpoint.label);
      label = lodash__WEBPACK_IMPORTED_MODULE_1___default.a.replace(label, '$endpoint', target.endpoint.label);
      label = lodash__WEBPACK_IMPORTED_MODULE_1___default.a.replace(label, '$service', target.service.label);
      label = lodash__WEBPACK_IMPORTED_MODULE_1___default.a.replace(label, '$application', target.entity.label);
      label = lodash__WEBPACK_IMPORTED_MODULE_1___default.a.replace(label, '$metric', target.metric.label);
      label = lodash__WEBPACK_IMPORTED_MODULE_1___default.a.replace(label, '$key', key);
      label = lodash__WEBPACK_IMPORTED_MODULE_1___default.a.replace(label, '$index', '' + index + 1);
      label = lodash__WEBPACK_IMPORTED_MODULE_1___default.a.replace(label, '$timeShift', target.timeShift);
      return label;
    }

    if (target.endpoint.label === _GlobalVariables__WEBPACK_IMPORTED_MODULE_4__["ALL_ENDPOINTS"]) {
      return target.timeShift ? item.endpoint.label + ' - ' + key + ' - ' + target.timeShift : item.endpoint.label + ' - ' + key;
    }

    return target.timeShift && target.timeShiftIsValid ? item.endpoint.label + ' (' + target.endpoint.label + ')' + ' - ' + key + ' - ' + target.timeShift : item.endpoint.label + ' (' + target.endpoint.label + ')' + ' - ' + key;
  };

  return DataSourceEndpoint;
}();



/***/ }),

/***/ "./datasources/DataSource_MobileApp.ts":
/*!*********************************************!*\
  !*** ./datasources/DataSource_MobileApp.ts ***!
  \*********************************************/
/*! exports provided: DataSourceMobileApp */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DataSourceMobileApp", function() { return DataSourceMobileApp; });
/* harmony import */ var _util_time_util__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../util/time_util */ "./util/time_util.ts");
/* harmony import */ var _util_analyze_util__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../util/analyze_util */ "./util/analyze_util.ts");
/* harmony import */ var _util_request_handler__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../util/request_handler */ "./util/request_handler.ts");
/* harmony import */ var _cache__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../cache */ "./cache.ts");
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! lodash */ "lodash");
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(lodash__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _util_target_util__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../util/target_util */ "./util/target_util.ts");
/* harmony import */ var _util_rollup_granularity_util__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../util/rollup_granularity_util */ "./util/rollup_granularity_util.ts");
/* harmony import */ var _util_queryInterval_check__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../util/queryInterval_check */ "./util/queryInterval_check.ts");









var DataSourceMobileApp =
/** @class */
function () {
  function DataSourceMobileApp(options) {
    this.instanaOptions = options;
    this.MobileAppCache = new _cache__WEBPACK_IMPORTED_MODULE_3__["default"]();
    this.miscCache = new _cache__WEBPACK_IMPORTED_MODULE_3__["default"]();
  }

  DataSourceMobileApp.prototype.runQuery = function (target, timeFilter) {
    var _this = this;

    if (Object(_util_queryInterval_check__WEBPACK_IMPORTED_MODULE_7__["isInvalidQueryInterval"])(timeFilter.windowSize, Object(_util_time_util__WEBPACK_IMPORTED_MODULE_0__["hoursToMs"])(this.instanaOptions.queryinterval_limit_mobileapp_metrics))) {
      throw new Error('Limit for maximum selectable windowsize exceeded, max is: ' + this.instanaOptions.queryinterval_limit_mobileapp_metrics + ' hours');
    } // avoid invalid calls


    if (!target || !target.metric || !target.metric.key || !target.group || !target.group.key || !target.entity || !target.entity.key) {
      return Promise.resolve(Object(_util_target_util__WEBPACK_IMPORTED_MODULE_5__["emptyResultData"])(target.refId));
    }

    return this.fetchAnalyzeMetricsForMobileapp(target, timeFilter).then(function (response) {
      return Object(_util_analyze_util__WEBPACK_IMPORTED_MODULE_1__["readItemMetrics"])(target, response, _this.buildAnalyzeMobileAppLabel);
    });
  };

  DataSourceMobileApp.prototype.getMobileapp = function (timeFilter) {
    var key = Object(_util_time_util__WEBPACK_IMPORTED_MODULE_0__["getTimeKey"])(timeFilter);
    var mobileapps = this.MobileAppCache.get(key);

    if (mobileapps) {
      return mobileapps;
    }

    mobileapps = Object(_util_request_handler__WEBPACK_IMPORTED_MODULE_2__["getRequest"])(this.instanaOptions, '/api/mobile-app-monitoring/config').then(function (mobileappsResponse) {
      return mobileappsResponse.data.map(function (mobile) {
        return {
          key: mobile.name,
          label: mobile.name
        };
      });
    });
    this.MobileAppCache.put(key, mobileapps, 600000);
    return mobileapps;
  };

  DataSourceMobileApp.prototype.getMobileappTags = function () {
    var mobileappTags = this.miscCache.get('mobileappTags');

    if (mobileappTags) {
      return mobileappTags;
    }

    mobileappTags = Object(_util_request_handler__WEBPACK_IMPORTED_MODULE_2__["getRequest"])(this.instanaOptions, '/api/mobile-app-monitoring/catalog/tags').then(function (tagsResponse) {
      return tagsResponse.data.map(function (entry) {
        return {
          key: entry.name,
          label: entry.name,
          type: entry.type
        };
      });
    });
    this.miscCache.put('mobileappTags', mobileappTags);
    return mobileappTags;
  };

  DataSourceMobileApp.prototype.getMobileappMetricsCatalog = function () {
    var _this = this;

    var mobileappCatalog = this.miscCache.get('mobileappCatalog');

    if (mobileappCatalog) {
      return mobileappCatalog;
    }

    mobileappCatalog = Object(_util_request_handler__WEBPACK_IMPORTED_MODULE_2__["getRequest"])(this.instanaOptions, '/api/mobile-app-monitoring/catalog/metrics').then(function (catalogResponse) {
      return catalogResponse.data.map(function (entry) {
        return {
          key: entry.metricId,
          label: entry.label,
          aggregations: entry.aggregations ? _this.transformAggregations(entry.aggregations.sort()) : [],
          beaconTypes: entry.beaconTypes ? _this.transformBeaconTypes(entry.beaconTypes) : ['sessionStart', 'crash', 'httpRequest', 'custom', 'viewChange']
        };
      });
    });
    this.miscCache.put('mobileappCatalog', mobileappCatalog);
    return mobileappCatalog;
  };

  DataSourceMobileApp.prototype.transformBeaconTypes = function (beaconTypes) {
    if (beaconTypes.includes('sessionStart')) {
      var result = lodash__WEBPACK_IMPORTED_MODULE_4___default.a.remove(beaconTypes, function (type) {
        return type !== 'sessionStart';
      });

      result.push('session_start');
      return result;
    }

    if (beaconTypes.includes('httpRequest')) {
      var result = lodash__WEBPACK_IMPORTED_MODULE_4___default.a.remove(beaconTypes, function (type) {
        return type !== 'httpRequest';
      });

      result.push('http_request');
      return result;
    }

    if (beaconTypes.includes('viewChange')) {
      var result = lodash__WEBPACK_IMPORTED_MODULE_4___default.a.remove(beaconTypes, function (type) {
        return type !== 'viewChange';
      });

      result.push('view_change');
      return result;
    }

    return beaconTypes;
  };

  DataSourceMobileApp.prototype.transformAggregations = function (aggregations) {
    return lodash__WEBPACK_IMPORTED_MODULE_4___default.a.map(aggregations, function (a) {
      return {
        key: a,
        label: a
      };
    });
  };

  DataSourceMobileApp.prototype.fetchAnalyzeMetricsForMobileapp = function (target, timeFilter) {
    var windowSize = Object(_util_time_util__WEBPACK_IMPORTED_MODULE_0__["getWindowSize"])(timeFilter);
    var tagFilters = [{
      name: 'mobileBeacon.mobileApp.name',
      operator: 'EQUALS',
      value: target.entity.key
    }];

    lodash__WEBPACK_IMPORTED_MODULE_4___default.a.forEach(target.filters, function (filter) {
      if (filter.isValid) {
        tagFilters.push(Object(_util_analyze_util__WEBPACK_IMPORTED_MODULE_1__["createTagFilter"])(filter));
      }
    });

    if (!target.timeInterval) {
      target.timeInterval = Object(_util_rollup_granularity_util__WEBPACK_IMPORTED_MODULE_6__["getDefaultChartGranularity"])(windowSize);
    }

    var metric = {
      metric: target.metric.key,
      aggregation: target.aggregation.key ? target.aggregation.key : 'SUM',
      granularity: target.timeInterval.key
    };
    var group = {
      groupbyTag: target.group.key
    };

    if (target.group.type === 'KEY_VALUE_PAIR' && target.groupbyTagSecondLevelKey) {
      group['groupbyTagSecondLevelKey'] = target.groupbyTagSecondLevelKey;
    }

    var data = {
      group: group,
      timeFrame: {
        to: timeFilter.to,
        windowSize: Object(_util_time_util__WEBPACK_IMPORTED_MODULE_0__["atLeastGranularity"])(windowSize, metric.granularity)
      },
      tagFilters: tagFilters,
      type: target.entityType.key,
      metrics: [metric]
    };
    return Object(_util_request_handler__WEBPACK_IMPORTED_MODULE_2__["postRequest"])(this.instanaOptions, '/api/mobile-app-monitoring/analyze/beacon-groups?fillTimeSeries=true', data, false, 5);
  };

  DataSourceMobileApp.prototype.buildAnalyzeMobileAppLabel = function (target, item, key, index) {
    if (target.labelFormat) {
      var label = target.labelFormat;
      label = lodash__WEBPACK_IMPORTED_MODULE_4___default.a.replace(label, '$label', item.name);
      label = lodash__WEBPACK_IMPORTED_MODULE_4___default.a.replace(label, '$mobileapp', target.entity.label);
      label = lodash__WEBPACK_IMPORTED_MODULE_4___default.a.replace(label, '$type', target.entityType.label);
      label = lodash__WEBPACK_IMPORTED_MODULE_4___default.a.replace(label, '$metric', target.metric.label);
      label = lodash__WEBPACK_IMPORTED_MODULE_4___default.a.replace(label, '$key', key);
      label = lodash__WEBPACK_IMPORTED_MODULE_4___default.a.replace(label, '$index', '' + index + 1);
      label = lodash__WEBPACK_IMPORTED_MODULE_4___default.a.replace(label, '$timeShift', target.timeShift);
      return label;
    }

    return target.timeShift && target.timeShiftIsValid ? item.name + ' (' + target.entity.label + ')' + ' - ' + key + ' - ' + target.timeShift : item.name + ' (' + target.entity.label + ')' + ' - ' + key;
  };

  return DataSourceMobileApp;
}();



/***/ }),

/***/ "./datasources/DataSource_Service.ts":
/*!*******************************************!*\
  !*** ./datasources/DataSource_Service.ts ***!
  \*******************************************/
/*! exports provided: DataSourceService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DataSourceService", function() { return DataSourceService; });
/* harmony import */ var _cache__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../cache */ "./cache.ts");
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! lodash */ "lodash");
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(lodash__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _util_time_util__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../util/time_util */ "./util/time_util.ts");
/* harmony import */ var _util_request_handler__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../util/request_handler */ "./util/request_handler.ts");
/* harmony import */ var _util_rollup_granularity_util__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../util/rollup_granularity_util */ "./util/rollup_granularity_util.ts");
/* harmony import */ var _GlobalVariables__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../GlobalVariables */ "./GlobalVariables.ts");
/* harmony import */ var _util_target_util__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../util/target_util */ "./util/target_util.ts");








var DataSourceService =
/** @class */
function () {
  function DataSourceService(options) {
    this.instanaOptions = options;
    this.servicesCache = new _cache__WEBPACK_IMPORTED_MODULE_0__["default"]();
  }

  DataSourceService.prototype.getServicesOfApplication = function (target, timeFilter) {
    var applicationId = '';

    if (target.entity && target.entity.key) {
      applicationId = target.entity.key;
    }

    var key = Object(_util_time_util__WEBPACK_IMPORTED_MODULE_2__["getTimeKey"])(timeFilter) + applicationId + target.applicationBoundaryScope;
    var services = this.servicesCache.get(key);

    if (services) {
      return services;
    }

    var windowSize = Object(_util_time_util__WEBPACK_IMPORTED_MODULE_2__["getWindowSize"])(timeFilter);
    var page = 1;
    var pageSize = 200;
    services = this.paginateServices([], applicationId, windowSize, timeFilter.to, target.applicationBoundaryScope, page, pageSize, _GlobalVariables__WEBPACK_IMPORTED_MODULE_5__["PAGINATION_LIMIT"]).then(function (response) {
      var allResults = lodash__WEBPACK_IMPORTED_MODULE_1___default.a.flattenDeep(lodash__WEBPACK_IMPORTED_MODULE_1___default.a.map(response, function (pageSet) {
        return pageSet.items;
      }));

      return lodash__WEBPACK_IMPORTED_MODULE_1___default.a.orderBy(lodash__WEBPACK_IMPORTED_MODULE_1___default.a.compact(allResults).map(function (entry) {
        return {
          key: entry.id,
          label: entry.label
        };
      }), [function (service) {
        return service.label.toLowerCase();
      }], ['asc']);
    });
    this.servicesCache.put(key, services, 600000);
    return services;
  };

  DataSourceService.prototype.paginateServices = function (results, applicationId, windowSize, to, applicationBoundaryScope, page, pageSize, pageLimit) {
    var _this = this;

    if (page > pageLimit) {
      return results;
    }

    var queryParameters = 'windowSize=' + windowSize + '&to=' + to + '&page=' + page + '&pageSize=' + pageSize;

    if (applicationBoundaryScope === 'ALL' || applicationBoundaryScope === 'INBOUND') {
      queryParameters += '&applicationBoundaryScope=' + applicationBoundaryScope;
    }

    var url = '/api/application-monitoring/applications;id=' + (applicationId ? applicationId : '') + '/services?' + queryParameters;
    return Object(_util_request_handler__WEBPACK_IMPORTED_MODULE_3__["getRequest"])(this.instanaOptions, url).then(function (response) {
      results.push(response.data);

      if (page * pageSize < response.data.totalHits) {
        page++;
        return _this.paginateServices(results, applicationId, windowSize, to, applicationBoundaryScope, page, pageSize, pageLimit);
      } else {
        return results;
      }
    });
  };

  DataSourceService.prototype.fetchServiceMetrics = function (target, timeFilter) {
    // avoid invalid calls
    if (!target || !target.metric || !target.metric.key) {
      return Promise.resolve(Object(_util_target_util__WEBPACK_IMPORTED_MODULE_6__["emptyResultData"])(target.refId));
    }

    var windowSize = Object(_util_time_util__WEBPACK_IMPORTED_MODULE_2__["getWindowSize"])(timeFilter);

    if (!target.timeInterval) {
      target.timeInterval = Object(_util_rollup_granularity_util__WEBPACK_IMPORTED_MODULE_4__["getDefaultChartGranularity"])(windowSize);
    }

    var metric = {
      metric: target.metric.key,
      aggregation: target.aggregation && target.aggregation.key ? target.aggregation.key : 'SUM',
      granularity: target.timeInterval.key
    };
    var data = {
      timeFrame: {
        to: timeFilter.to,
        windowSize: Object(_util_time_util__WEBPACK_IMPORTED_MODULE_2__["atLeastGranularity"])(windowSize, metric.granularity)
      },
      metrics: [metric]
    };

    if (target.entity && target.entity.key) {
      data['applicationId'] = target.entity.key; // only set applicationBoundaryScope when an application is selected

      data['applicationBoundaryScope'] = target.applicationBoundaryScope;
    }

    if (target.service && target.service.key) {
      data['serviceId'] = target.service.key;
    }

    return Object(_util_request_handler__WEBPACK_IMPORTED_MODULE_3__["postRequest"])(this.instanaOptions, '/api/application-monitoring/metrics/services?fillTimeSeries=true', data);
  };

  DataSourceService.prototype.buildServiceMetricLabel = function (target, item, key, index) {
    if (target.labelFormat) {
      var label = target.labelFormat;
      label = lodash__WEBPACK_IMPORTED_MODULE_1___default.a.replace(label, '$label', item.service.label);
      label = lodash__WEBPACK_IMPORTED_MODULE_1___default.a.replace(label, '$service', target.service.label);
      label = lodash__WEBPACK_IMPORTED_MODULE_1___default.a.replace(label, '$application', target.entity.label);
      label = lodash__WEBPACK_IMPORTED_MODULE_1___default.a.replace(label, '$metric', target.metric.label);
      label = lodash__WEBPACK_IMPORTED_MODULE_1___default.a.replace(label, '$key', key);
      label = lodash__WEBPACK_IMPORTED_MODULE_1___default.a.replace(label, '$index', index + 1 + '');
      label = lodash__WEBPACK_IMPORTED_MODULE_1___default.a.replace(label, '$timeShift', target.timeShift);
      return label;
    }

    if (target.service.key === null) {
      return target.timeShift ? item.service.label + ' - ' + key + ' - ' + target.timeShift : item.service.label + ' - ' + key;
    }

    return target.timeShift && target.timeShiftIsValid ? item.service.label + ' (' + target.service.label + ')' + ' - ' + key + ' - ' + target.timeShift : item.service.label + ' (' + target.service.label + ')' + ' - ' + key;
  };

  return DataSourceService;
}();



/***/ }),

/***/ "./datasources/DataSource_Slo.ts":
/*!***************************************!*\
  !*** ./datasources/DataSource_Slo.ts ***!
  \***************************************/
/*! exports provided: DataSourceSlo */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DataSourceSlo", function() { return DataSourceSlo; });
/* harmony import */ var _util_target_util__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../util/target_util */ "./util/target_util.ts");
/* harmony import */ var _util_request_handler__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../util/request_handler */ "./util/request_handler.ts");
/* harmony import */ var _util_time_util__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../util/time_util */ "./util/time_util.ts");
/* harmony import */ var _cache__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../cache */ "./cache.ts");
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! lodash */ "lodash");
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(lodash__WEBPACK_IMPORTED_MODULE_4__);






var DataSourceSlo =
/** @class */
function () {
  function DataSourceSlo(options) {
    this.instanaOptions = options;
    this.sliReportsCache = new _cache__WEBPACK_IMPORTED_MODULE_3__["default"]();
  }

  DataSourceSlo.prototype.getConfiguredSLIs = function () {
    var sliReports = this.sliReportsCache.get('sliReports');

    if (sliReports) {
      return sliReports;
    }

    sliReports = Object(_util_request_handler__WEBPACK_IMPORTED_MODULE_1__["getRequest"])(this.instanaOptions, '/api/settings/sli').then(function (response) {
      return lodash__WEBPACK_IMPORTED_MODULE_4___default.a.map(response.data, function (r) {
        return {
          key: r.id,
          label: r.sliName
        };
      });
    });
    this.sliReportsCache.put('sliReports', sliReports);
    return sliReports;
  };

  DataSourceSlo.prototype.runQuery = function (target, timeFilter) {
    var _this = this; //avoid involid calls


    if (!target || !target.sloReport || !target.sloReport.key || !target.sloSpecific || !target.sloSpecific.key || !target.sloValue) {
      return Promise.resolve(Object(_util_target_util__WEBPACK_IMPORTED_MODULE_0__["emptyResultData"])(target.refId));
    }

    var endpoint = '/api/sli/report/' + target.sloReport.key + '?from=' + timeFilter.from + '&to=' + timeFilter.to + '&slo=' + target.sloValue;
    return Object(_util_request_handler__WEBPACK_IMPORTED_MODULE_1__["getRequest"])(this.instanaOptions, endpoint).then(function (response) {
      return _this.extractSpecificValueFromSLI(target, response.data, timeFilter);
    });
  };

  DataSourceSlo.prototype.extractSpecificValueFromSLI = function (target, sliResult, timeFilter) {
    if (target.sloSpecific.key === 'SLI') {
      return [Object(_util_target_util__WEBPACK_IMPORTED_MODULE_0__["buildTimeSeries"])(target.sloSpecific.label, target.refId, this.buildResultArray(sliResult.sli, timeFilter.to))];
    } else if (target.sloSpecific.key === 'Remaining Error Budget') {
      return [Object(_util_target_util__WEBPACK_IMPORTED_MODULE_0__["buildTimeSeries"])(target.sloSpecific.label, target.refId, this.buildResultArray(sliResult.errorBudgetRemaining, timeFilter.to))];
    } else if (target.sloSpecific.key === 'Timeseries') {
      return this.buildViolationDistributionTimeSeries(target, sliResult.violationDistribution, timeFilter);
    }

    return [Object(_util_target_util__WEBPACK_IMPORTED_MODULE_0__["emptyResultData"])(target.refId)];
  };

  DataSourceSlo.prototype.buildResultArray = function (result, timestamp) {
    return [[result, timestamp]];
  };

  DataSourceSlo.prototype.buildViolationDistributionTimeSeries = function (target, series, timeFilter) {
    if (!series) {
      // Handle the case where series is undefined or null
      return [];
    }

    var greens = [];
    var reds = [];
    var greys = [];
    var granularity = Object(_util_time_util__WEBPACK_IMPORTED_MODULE_2__["getWindowSize"])(timeFilter) / Object.keys(series).length;

    lodash__WEBPACK_IMPORTED_MODULE_4___default.a.forEach(series, function (value, index) {
      if (value === 1) {
        greens.push([1, timeFilter.from + index * granularity]);
      } else if (value === 0) {
        greys.push([1, timeFilter.from + index * granularity]);
      } else if (value === -1) {
        reds.push([1, timeFilter.from + index * granularity]);
      }
    });

    var result = [];
    result.push(Object(_util_target_util__WEBPACK_IMPORTED_MODULE_0__["buildTimeSeries"])('No violation', target.refId, greens));
    result.push(Object(_util_target_util__WEBPACK_IMPORTED_MODULE_0__["buildTimeSeries"])('Violation', target.refId, reds));
    result.push(Object(_util_target_util__WEBPACK_IMPORTED_MODULE_0__["buildTimeSeries"])('No data', target.refId, greys));
    return result;
  };

  return DataSourceSlo;
}();



/***/ }),

/***/ "./datasources/DataSource_Slo2.ts":
/*!****************************************!*\
  !*** ./datasources/DataSource_Slo2.ts ***!
  \****************************************/
/*! exports provided: DataSourceSlo2 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DataSourceSlo2", function() { return DataSourceSlo2; });
/* harmony import */ var _util_target_util__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../util/target_util */ "./util/target_util.ts");
/* harmony import */ var _cache__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../cache */ "./cache.ts");
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! lodash */ "lodash");
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(lodash__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _util_request_handler__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../util/request_handler */ "./util/request_handler.ts");
/* harmony import */ var _util_time_util__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../util/time_util */ "./util/time_util.ts");






var DataSourceSlo2 =
/** @class */
function () {
  function DataSourceSlo2(options) {
    this.instanaOptions = options;
    this.sloReportsCache = new _cache__WEBPACK_IMPORTED_MODULE_1__["default"]();
  }

  DataSourceSlo2.prototype.getSLOConfigurations = function () {
    var sloReports = this.sloReportsCache.get('sloReports');

    if (sloReports) {
      return sloReports;
    }

    sloReports = Object(_util_request_handler__WEBPACK_IMPORTED_MODULE_3__["getRequest"])(this.instanaOptions, '/api/settings/slo').then(function (response) {
      return lodash__WEBPACK_IMPORTED_MODULE_2___default.a.map(response.data.items, function (r) {
        return {
          key: r.id,
          label: r.name
        };
      });
    });
    this.sloReportsCache.put('sloReports', sloReports);
    return sloReports;
  };

  DataSourceSlo2.prototype.runQuery = function (target, timeFilter) {
    var _this = this; // avoid invalid calls


    if (!target || !target.slo2Report || !target.slo2Report.key || !target.slo2Specific || !target.slo2Specific.key) {
      return Promise.resolve(Object(_util_target_util__WEBPACK_IMPORTED_MODULE_0__["emptyResultData"])(target.refId));
    }

    var endpoint = '/api/slo/report/' + target.slo2Report.key + '?from=' + Math.floor(timeFilter.from / 6000) * 6000 + '&to=' + Math.floor(timeFilter.to / 6000) * 6000;
    return Object(_util_request_handler__WEBPACK_IMPORTED_MODULE_3__["getRequest"])(this.instanaOptions, endpoint).then(function (response) {
      return _this.extractSpecificValueFromSLI(target, response.data, timeFilter);
    });
  };

  DataSourceSlo2.prototype.extractSpecificValueFromSLI = function (target, sloResult, timeFilter) {
    if (target.slo2Specific.key === 'Status') {
      return [Object(_util_target_util__WEBPACK_IMPORTED_MODULE_0__["buildTimeSeries"])(target.slo2Specific.label, target.refId, this.buildResultArray(sloResult.sli, timeFilter.to))];
    } else if (target.slo2Specific.key === 'Service Level Target') {
      return [Object(_util_target_util__WEBPACK_IMPORTED_MODULE_0__["buildTimeSeries"])(target.slo2Specific.label, target.refId, this.buildResultArray(sloResult.slo, timeFilter.to))];
    } else if (target.slo2Specific.key === 'Total Error Budget') {
      return [Object(_util_target_util__WEBPACK_IMPORTED_MODULE_0__["buildTimeSeries"])(target.slo2Specific.label, target.refId, this.buildResultArray(sloResult.totalErrorBudget, timeFilter.to))];
    } else if (target.slo2Specific.key === 'Remaining Error Budget') {
      return [Object(_util_target_util__WEBPACK_IMPORTED_MODULE_0__["buildTimeSeries"])(target.slo2Specific.label, target.refId, this.buildResultArray(sloResult.errorBudgetRemaining, timeFilter.to))];
    } else if (target.slo2Specific.key === 'Spended Error Budget') {
      return [Object(_util_target_util__WEBPACK_IMPORTED_MODULE_0__["buildTimeSeries"])(target.slo2Specific.label, target.refId, this.buildResultArray(sloResult.errorBudgetSpent, timeFilter.to))];
    } else if (target.slo2Specific.key === 'Timeseries') {
      return this.buildViolationDistributionTimeSeries(target, sloResult.violationDistribution, timeFilter);
    } else if (target.slo2Specific.key === 'Error Chart') {
      return this.buildChart('Error budget spent', target, sloResult.errorChart, timeFilter);
    } else if (target.slo2Specific.key === 'Error Accumulation Chart') {
      return this.buildChart('Error Accumulation', target, sloResult.errorAccumulationChart, timeFilter);
    } else if (target.slo2Specific.key === 'Error Budget Remain Chart') {
      return this.buildChart('Error Budget Remain Chart', target, sloResult.errorBudgetRemainChart, timeFilter);
    }

    return [Object(_util_target_util__WEBPACK_IMPORTED_MODULE_0__["emptyResultData"])(target.refId)];
  };

  DataSourceSlo2.prototype.buildResultArray = function (result, timestamp) {
    return [[result, timestamp]];
  };

  DataSourceSlo2.prototype.buildViolationDistributionTimeSeries = function (target, series, timeFilter) {
    var greens = [];
    var reds = [];
    var greys = [];
    var granularity = Object(_util_time_util__WEBPACK_IMPORTED_MODULE_4__["getWindowSize"])(timeFilter) / Object.keys(series).length;
    var startTS = Math.floor(timeFilter.from / granularity) * granularity;

    lodash__WEBPACK_IMPORTED_MODULE_2___default.a.forEach(series, function (value, index) {
      if (value === 1) {
        greens.push([1, startTS + index * granularity]);
      } else if (value === 0) {
        greys.push([1, startTS + index * granularity]);
      } else if (value === -1) {
        reds.push([1, startTS + index * granularity]);
      }
    });

    var result = [];
    result.push(Object(_util_target_util__WEBPACK_IMPORTED_MODULE_0__["buildTimeSeries"])('No violation', target.refId, greens));
    result.push(Object(_util_target_util__WEBPACK_IMPORTED_MODULE_0__["buildTimeSeries"])('Violation', target.refId, reds));
    result.push(Object(_util_target_util__WEBPACK_IMPORTED_MODULE_0__["buildTimeSeries"])('No data', target.refId, greys));
    return result;
  };

  DataSourceSlo2.prototype.buildChart = function (name, target, series, timeFilter) {
    var greens = [];
    var granularity = Object(_util_time_util__WEBPACK_IMPORTED_MODULE_4__["getWindowSize"])(timeFilter) / Object.keys(series).length;
    var startTS = Math.floor(timeFilter.from / granularity) * granularity;

    lodash__WEBPACK_IMPORTED_MODULE_2___default.a.forEach(series, function (value, index) {
      greens.push([value, startTS + index * granularity]);
    });

    var result = [];
    result.push(Object(_util_target_util__WEBPACK_IMPORTED_MODULE_0__["buildTimeSeries"])(name, target.refId, greens));
    return result;
  };

  return DataSourceSlo2;
}();



/***/ }),

/***/ "./datasources/DataSource_Website.ts":
/*!*******************************************!*\
  !*** ./datasources/DataSource_Website.ts ***!
  \*******************************************/
/*! exports provided: DataSourceWebsite */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DataSourceWebsite", function() { return DataSourceWebsite; });
/* harmony import */ var _cache__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../cache */ "./cache.ts");
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! lodash */ "lodash");
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(lodash__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _util_time_util__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../util/time_util */ "./util/time_util.ts");
/* harmony import */ var _util_request_handler__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../util/request_handler */ "./util/request_handler.ts");
/* harmony import */ var _util_rollup_granularity_util__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../util/rollup_granularity_util */ "./util/rollup_granularity_util.ts");
/* harmony import */ var _util_analyze_util__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../util/analyze_util */ "./util/analyze_util.ts");
/* harmony import */ var _util_target_util__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../util/target_util */ "./util/target_util.ts");
/* harmony import */ var _util_queryInterval_check__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../util/queryInterval_check */ "./util/queryInterval_check.ts");









var DataSourceWebsite =
/** @class */
function () {
  function DataSourceWebsite(options) {
    this.instanaOptions = options;
    this.websitesCache = new _cache__WEBPACK_IMPORTED_MODULE_0__["default"]();
    this.miscCache = new _cache__WEBPACK_IMPORTED_MODULE_0__["default"]();
  }

  DataSourceWebsite.prototype.runQuery = function (target, timeFilter) {
    var _this = this;

    if (Object(_util_queryInterval_check__WEBPACK_IMPORTED_MODULE_7__["isInvalidQueryInterval"])(timeFilter.windowSize, Object(_util_time_util__WEBPACK_IMPORTED_MODULE_2__["hoursToMs"])(this.instanaOptions.queryinterval_limit_website_metrics))) {
      throw new Error('Limit for maximum selectable windowsize exceeded, max is: ' + this.instanaOptions.queryinterval_limit_website_metrics + ' hours');
    } // avoid invalid calls


    if (!target || !target.metric || !target.metric.key || !target.group || !target.group.key || !target.entity || !target.entity.key) {
      return Promise.resolve(Object(_util_target_util__WEBPACK_IMPORTED_MODULE_6__["emptyResultData"])(target.refId));
    }

    return this.fetchAnalyzeMetricsForWebsite(target, timeFilter).then(function (response) {
      return Object(_util_analyze_util__WEBPACK_IMPORTED_MODULE_5__["readItemMetrics"])(target, response, _this.buildAnalyzeWebsiteLabel);
    });
  };

  DataSourceWebsite.prototype.getWebsites = function (timeFilter) {
    var key = Object(_util_time_util__WEBPACK_IMPORTED_MODULE_2__["getTimeKey"])(timeFilter);
    var websites = this.websitesCache.get(key);

    if (websites) {
      return websites;
    }

    websites = Object(_util_request_handler__WEBPACK_IMPORTED_MODULE_3__["getRequest"])(this.instanaOptions, '/api/website-monitoring/config').then(function (websitesResponse) {
      return websitesResponse.data.map(function (website) {
        return {
          key: website.name,
          label: website.name
        };
      });
    });
    this.websitesCache.put(key, websites, 600000);
    return websites;
  };

  DataSourceWebsite.prototype.getWebsiteTags = function () {
    var websiteTags = this.miscCache.get('websiteTags');

    if (websiteTags) {
      return websiteTags;
    }

    websiteTags = Object(_util_request_handler__WEBPACK_IMPORTED_MODULE_3__["getRequest"])(this.instanaOptions, '/api/website-monitoring/catalog/tags').then(function (tagsResponse) {
      return tagsResponse.data.map(function (entry) {
        return {
          key: entry.name,
          label: entry.name,
          type: entry.type
        };
      });
    });
    this.miscCache.put('websiteTags', websiteTags);
    return websiteTags;
  };

  DataSourceWebsite.prototype.getWebsiteMetricsCatalog = function () {
    var _this = this;

    var websiteCatalog = this.miscCache.get('websiteCatalog');

    if (websiteCatalog) {
      return websiteCatalog;
    }

    websiteCatalog = Object(_util_request_handler__WEBPACK_IMPORTED_MODULE_3__["getRequest"])(this.instanaOptions, '/api/website-monitoring/catalog/metrics').then(function (catalogResponse) {
      return catalogResponse.data.map(function (entry) {
        return {
          key: entry.metricId,
          label: entry.label,
          aggregations: entry.aggregations ? _this.transformAggregations(entry.aggregations.sort()) : [],
          beaconTypes: entry.beaconTypes ? _this.transformBeaconTypes(entry.beaconTypes) : ['pageLoad', 'resourceLoad', 'httpRequest', 'error', 'custom', 'pageChange']
        };
      });
    });
    this.miscCache.put('websiteCatalog', websiteCatalog);
    return websiteCatalog;
  };

  DataSourceWebsite.prototype.transformBeaconTypes = function (beaconTypes) {
    if (beaconTypes.includes('pageChange')) {
      var result = lodash__WEBPACK_IMPORTED_MODULE_1___default.a.remove(beaconTypes, function (type) {
        return type !== 'pageChange';
      });

      result.push('page_change');
      return result;
    }

    return beaconTypes;
  };

  DataSourceWebsite.prototype.transformAggregations = function (aggregations) {
    return lodash__WEBPACK_IMPORTED_MODULE_1___default.a.map(aggregations, function (a) {
      return {
        key: a,
        label: a
      };
    });
  };

  DataSourceWebsite.prototype.fetchAnalyzeMetricsForWebsite = function (target, timeFilter) {
    var windowSize = Object(_util_time_util__WEBPACK_IMPORTED_MODULE_2__["getWindowSize"])(timeFilter);
    var tagFilters = [{
      name: 'beacon.website.name',
      operator: 'EQUALS',
      value: target.entity.key
    }];

    lodash__WEBPACK_IMPORTED_MODULE_1___default.a.forEach(target.filters, function (filter) {
      if (filter.isValid) {
        tagFilters.push(Object(_util_analyze_util__WEBPACK_IMPORTED_MODULE_5__["createTagFilter"])(filter));
      }
    });

    if (!target.timeInterval) {
      target.timeInterval = Object(_util_rollup_granularity_util__WEBPACK_IMPORTED_MODULE_4__["getDefaultChartGranularity"])(windowSize);
    }

    var metric = {
      metric: target.metric.key,
      aggregation: target.aggregation.key ? target.aggregation.key : 'SUM',
      granularity: target.timeInterval.key
    };
    var group = {
      groupbyTag: target.group.key
    };

    if (target.group.type === 'KEY_VALUE_PAIR' && target.groupbyTagSecondLevelKey) {
      group['groupbyTagSecondLevelKey'] = target.groupbyTagSecondLevelKey;
    }

    var data = {
      group: group,
      timeFrame: {
        to: timeFilter.to,
        windowSize: Object(_util_time_util__WEBPACK_IMPORTED_MODULE_2__["atLeastGranularity"])(windowSize, metric.granularity)
      },
      tagFilters: tagFilters,
      type: target.entityType.key,
      metrics: [metric]
    };
    return Object(_util_request_handler__WEBPACK_IMPORTED_MODULE_3__["postRequest"])(this.instanaOptions, '/api/website-monitoring/analyze/beacon-groups?fillTimeSeries=true', data, false, 5);
  };

  DataSourceWebsite.prototype.buildAnalyzeWebsiteLabel = function (target, item, key, index) {
    if (target.labelFormat) {
      var label = target.labelFormat;
      label = lodash__WEBPACK_IMPORTED_MODULE_1___default.a.replace(label, '$label', item.name);
      label = lodash__WEBPACK_IMPORTED_MODULE_1___default.a.replace(label, '$website', target.entity.label);
      label = lodash__WEBPACK_IMPORTED_MODULE_1___default.a.replace(label, '$type', target.entityType.label);
      label = lodash__WEBPACK_IMPORTED_MODULE_1___default.a.replace(label, '$metric', target.metric.label);
      label = lodash__WEBPACK_IMPORTED_MODULE_1___default.a.replace(label, '$key', key);
      label = lodash__WEBPACK_IMPORTED_MODULE_1___default.a.replace(label, '$index', '' + index + 1);
      label = lodash__WEBPACK_IMPORTED_MODULE_1___default.a.replace(label, '$timeShift', target.timeShift);
      return label;
    }

    return target.timeShift && target.timeShiftIsValid ? item.name + ' (' + target.entity.label + ')' + ' - ' + key + ' - ' + target.timeShift : item.name + ' (' + target.entity.label + ')' + ' - ' + key;
  };

  return DataSourceWebsite;
}();



/***/ }),

/***/ "./datasources/Datasource_Infrastructure.ts":
/*!**************************************************!*\
  !*** ./datasources/Datasource_Infrastructure.ts ***!
  \**************************************************/
/*! exports provided: DataSourceInfrastructure */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DataSourceInfrastructure", function() { return DataSourceInfrastructure; });
/* harmony import */ var _GlobalVariables__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../GlobalVariables */ "./GlobalVariables.ts");
/* harmony import */ var _util_time_util__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../util/time_util */ "./util/time_util.ts");
/* harmony import */ var _util_request_handler__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../util/request_handler */ "./util/request_handler.ts");
/* harmony import */ var _cache__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../cache */ "./cache.ts");
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! lodash */ "lodash");
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(lodash__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _util_target_util__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../util/target_util */ "./util/target_util.ts");
/* harmony import */ var _util_rollup_granularity_util__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../util/rollup_granularity_util */ "./util/rollup_granularity_util.ts");
/* harmony import */ var _util_queryInterval_check__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../util/queryInterval_check */ "./util/queryInterval_check.ts");
/* harmony import */ var _lists_max_metrics__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../lists/max_metrics */ "./lists/max_metrics.ts");










var DataSourceInfrastructure =
/** @class */
function () {
  function DataSourceInfrastructure(options) {
    this.timeToLiveSnapshotInfoCache = 4000000; // set to 1,11 hour

    this.instanaOptions = options;
    this.snapshotCache = new _cache__WEBPACK_IMPORTED_MODULE_3__["default"]();
    this.snapshotInfoCache = new _cache__WEBPACK_IMPORTED_MODULE_3__["default"]();
    this.catalogCache = new _cache__WEBPACK_IMPORTED_MODULE_3__["default"]();
    this.typeCache = new _cache__WEBPACK_IMPORTED_MODULE_3__["default"]();
    this.miscCache = new _cache__WEBPACK_IMPORTED_MODULE_3__["default"]();
  }

  DataSourceInfrastructure.prototype.runQuery = function (target, timeFilter) {
    var _this = this; // do not try to execute to big queries


    if (Object(_util_queryInterval_check__WEBPACK_IMPORTED_MODULE_7__["isInvalidQueryInterval"])(timeFilter.windowSize, Object(_util_time_util__WEBPACK_IMPORTED_MODULE_1__["hoursToMs"])(this.instanaOptions.queryinterval_limit_infra))) {
      throw new Error('Limit for maximum selectable windowsize exceeded, max is: ' + this.instanaOptions.queryinterval_limit_infra + ' hours');
    }

    if (target.tagFilterExpression || target.metricCategory.key === _GlobalVariables__WEBPACK_IMPORTED_MODULE_0__["INFRASTRUCTURE_ANALYZE"] && target.metric.key && target.group.key && target.entity.key) {
      return this.fetchAnalyzeEntities(target, timeFilter);
    } // do not try to retrieve data without selected metric


    if ((!target.metric || !target.metric.key) && !target.showAllMetrics && !target.freeTextMetrics) {
      return Promise.resolve(Object(_util_target_util__WEBPACK_IMPORTED_MODULE_5__["emptyResultData"])(target.refId));
    } // for every target, fetch snapshots in the selected timeframe that satisfy the lucene query.


    return this.fetchSnapshotsForTarget(target, timeFilter).then(function (snapshots) {
      if (target.showAllMetrics) {
        // only available for custom metrics
        return _this.fetchMultipleMetricsForSnapshots(target, snapshots, timeFilter, target.allMetrics);
      } else if (target.freeTextMetrics) {
        // only available for custom metrics
        var metrics = _this.extractMetricsFromText(target.freeTextMetrics);

        return _this.fetchMultipleMetricsForSnapshots(target, snapshots, timeFilter, metrics);
      } else {
        return _this.fetchMetricsForSnapshots(target, snapshots, timeFilter, target.metric);
      }
    });
  };

  DataSourceInfrastructure.prototype.extractMetricsFromText = function (freeText) {
    var metricsString = freeText.replace(/\s/g, '').split(',');
    var metrics = [];

    lodash__WEBPACK_IMPORTED_MODULE_4___default.a.each(metricsString, function (metricString) {
      return metrics.push(JSON.parse('{ "key": "' + metricString + '"}'));
    });

    if (metrics.length > 4) {
      metrics = metrics.slice(0, 4); // API supports up to 4 metrics at once
    }

    return metrics;
  };

  DataSourceInfrastructure.prototype.fetchMultipleMetricsForSnapshots = function (target, snapshots, timeFilter, metrics) {
    var _this = this;

    var resultPromises = [];

    lodash__WEBPACK_IMPORTED_MODULE_4___default.a.forEach(metrics, function (metric) {
      resultPromises.push(_this.fetchMetricsForSnapshots(target, snapshots, timeFilter, metric));
    });

    return Promise.all(resultPromises).then(function (allResults) {
      var allMetrics = [];
      allResults.forEach(function (result) {
        return result.forEach(function (s) {
          return allMetrics.push(s);
        });
      });
      return allMetrics;
    });
  };

  DataSourceInfrastructure.prototype.fetchMetricsForSnapshots = function (target, snapshots, timeFilter, metric) {
    var _this = this;

    var maxValues = [];
    var snapshotPromises = snapshots.map(function (snapshot) {
      var snapshotId = snapshot.snapshotId; // Call fetchMetricsForSnapshot for each snapshot

      return _this.fetchMetricsForSnapshot(target, [snapshotId], timeFilter, metric).then(function (response) {
        if (!response.data) {
          return [];
        }

        var timeseries = _this.readTimeSeries(response.data.items, target.aggregation, timeFilter);

        return lodash__WEBPACK_IMPORTED_MODULE_4___default.a.flatten(response.data.items.map(function (item) {
          return lodash__WEBPACK_IMPORTED_MODULE_4___default.a.map(item.metrics, function (value, key) {
            var result = {
              target: item.label,
              datapoints: lodash__WEBPACK_IMPORTED_MODULE_4___default.a.map(value, function (metric) {
                return [metric[1], metric[0]];
              }),
              refId: target.refId,
              key: target.stableHash
            };

            if (target.displayMaxMetricValue) {
              var maxValue = _this.getMaxMetricValue(target.metric, snapshots);

              maxValues.push(_this.buildMaxMetricTarget(target, timeseries, maxValue, result.target));
              result.datapoints = _this.convertRelativeToAbsolute(result.datapoints, maxValue);
            }

            return result;
          });
        }));
      });
    }); // Wait for all promises to complete and flatten the results

    return Promise.all(snapshotPromises).then(function (allResults) {
      return lodash__WEBPACK_IMPORTED_MODULE_4___default.a.flatten(allResults);
    });
  };

  DataSourceInfrastructure.prototype.getMaxMetricValue = function (metric, snapshot) {
    var maxMetrics = _lists_max_metrics__WEBPACK_IMPORTED_MODULE_8__["default"];
    return snapshot.response.data.data[lodash__WEBPACK_IMPORTED_MODULE_4___default.a.find(maxMetrics, function (m) {
      return m.key === metric.key;
    }).value];
  };

  DataSourceInfrastructure.prototype.buildMaxMetricTarget = function (target, timeseries, maxValue, resultLabel) {
    var datapoints = lodash__WEBPACK_IMPORTED_MODULE_4___default.a.map(timeseries, function (series) {
      return [maxValue, series.timestamp];
    });

    var maxLabel = this.convertMetricNameToMaxLabel(target.metric);
    return {
      target: resultLabel + ' ' + maxLabel,
      datapoints: datapoints,
      refId: target.refId,
      key: target.stableHash + maxLabel
    };
  };

  DataSourceInfrastructure.prototype.convertMetricNameToMaxLabel = function (metric) {
    var maxMetrics = _lists_max_metrics__WEBPACK_IMPORTED_MODULE_8__["default"];
    return lodash__WEBPACK_IMPORTED_MODULE_4___default.a.find(maxMetrics, function (m) {
      return m.key === metric.key;
    }).label;
  };

  DataSourceInfrastructure.prototype.convertRelativeToAbsolute = function (datapoints, maxValue) {
    return lodash__WEBPACK_IMPORTED_MODULE_4___default.a.map(datapoints, function (datapoint) {
      if (datapoint[0]) {
        return [datapoint[0] * maxValue, datapoint[1]];
      }

      return [null, datapoint[1]];
    });
  };

  DataSourceInfrastructure.prototype.getEntityTypes = function () {
    var entityTypes = this.typeCache.get('entityTypes');

    if (entityTypes) {
      return entityTypes;
    }

    entityTypes = Object(_util_request_handler__WEBPACK_IMPORTED_MODULE_2__["getRequest"])(this.instanaOptions, '/api/infrastructure-monitoring/catalog/plugins').then(function (typesResponse) {
      var result = typesResponse.data.map(function (entry) {
        return {
          key: entry.plugin,
          label: entry.label
        };
      });
      result.push({
        key: 'regionEntity',
        label: 'Region'
      });
      return lodash__WEBPACK_IMPORTED_MODULE_4___default.a.sortBy(result, 'label');
    });
    this.typeCache.put('entityTypes', entityTypes);
    return entityTypes;
  };

  DataSourceInfrastructure.prototype.fetchTypesForTarget = function (query, timeFilter) {
    var fetchSnapshotTypesUrl = "/api/snapshots/types" + ("?q=" + encodeURIComponent(query.entityQuery)) + ("&from=" + timeFilter.from) + ("&to=" + timeFilter.to) + (this.instanaOptions.showOffline ? "" : "&time=" + timeFilter.to);
    return Object(_util_request_handler__WEBPACK_IMPORTED_MODULE_2__["getRequest"])(this.instanaOptions, fetchSnapshotTypesUrl);
  };

  DataSourceInfrastructure.prototype.fetchAvailableMetricsForEntityType = function (target, timeFilter) {
    var windowSize = Object(_util_time_util__WEBPACK_IMPORTED_MODULE_1__["getWindowSize"])(timeFilter);
    target.timeInterval = Object(_util_rollup_granularity_util__WEBPACK_IMPORTED_MODULE_6__["getDefaultChartGranularity"])(windowSize);
    var data = {
      tagFilterExpression: {
        type: 'EXPRESSION',
        logicalOperator: 'AND',
        elements: []
      },
      timeFrame: {
        to: timeFilter.to,
        windowSize: Object(_util_time_util__WEBPACK_IMPORTED_MODULE_1__["atLeastGranularity"])(windowSize, target.timeInterval.key)
      },
      query: '',
      type: target.entity.key
    };
    var metricFortarget = Object(_util_request_handler__WEBPACK_IMPORTED_MODULE_2__["postRequest"])(this.instanaOptions, '/api/infrastructure-monitoring/analyze/metrics', data).then(function (metricResponse) {
      var result = [];
      metricResponse.data.metrics.map(function (metric) {
        return result.push({
          key: metric.id,
          label: metric.label,
          description: metric.description,
          aggregations: [{
            key: 'MAX',
            label: 'MAX'
          }, {
            key: 'MEAN',
            label: 'MEAN'
          }, {
            key: 'MIN',
            label: 'MIN'
          }, {
            key: 'P25',
            label: 'P25'
          }, {
            key: 'P50',
            label: 'P50'
          }, {
            key: 'P75',
            label: 'P75'
          }, {
            key: 'P90',
            label: 'P90'
          }, {
            key: 'P95',
            label: 'P95'
          }, {
            key: 'P98',
            label: 'P98'
          }, {
            key: 'P99',
            label: 'P99'
          }]
        });
      });
      return lodash__WEBPACK_IMPORTED_MODULE_4___default.a.sortBy(result, 'label');
    });
    return metricFortarget;
  };

  DataSourceInfrastructure.prototype.fetchAnalyzeEntities = function (target, timeFilter) {
    var windowSize = Object(_util_time_util__WEBPACK_IMPORTED_MODULE_1__["getWindowSize"])(timeFilter);
    var tagFilters = [];

    if (!target.timeInterval) {
      target.timeInterval = Object(_util_rollup_granularity_util__WEBPACK_IMPORTED_MODULE_6__["getDefaultChartGranularity"])(windowSize);
    }

    if (target.timeInterval.key < 60000) {
      target.timeInterval.key = 60000;
    }

    lodash__WEBPACK_IMPORTED_MODULE_4___default.a.forEach(target.filters, function (filter) {
      tagFilters.push(filter);
    });

    var metric = {
      metric: target.metric.key,
      aggregation: target.aggregation && target.aggregation.key ? target.aggregation.key : 'SUM',
      granularity: target.timeInterval.key
    };
    var payload = {
      tagFilterExpression: {
        elements: tagFilters,
        type: 'EXPRESSION',
        logicalOperator: 'AND'
      },
      pagination: {
        retrievalSize: 200
      },
      groupBy: [target.groupbyTagSecondLevelKey],
      type: target.entity.key,
      metrics: [metric],
      timeFrame: {
        to: timeFilter.to,
        windowSize: Object(_util_time_util__WEBPACK_IMPORTED_MODULE_1__["atLeastGranularity"])(windowSize, metric.granularity)
      }
    };
    return Object(_util_request_handler__WEBPACK_IMPORTED_MODULE_2__["postRequest"])(this.instanaOptions, '/api/infrastructure-monitoring/analyze/entity-groups', payload).then(function (res) {
      var result = [];

      if (!res.data && res.errors.length >= 1) {
        throw new Error(res.errors[0].message || res.errors[0]);
      }

      res.data.items.forEach(function (entity) {
        for (var metric in entity.metrics) {
          result.push({
            target: entity.tags[target.groupbyTagSecondLevelKey] + ' - ' + metric,
            datapoints: entity.metrics[metric] ? entity.metrics[metric].map(function (datapoint) {
              return [datapoint[1], datapoint[0]];
            }) : [],
            refId: target.refId,
            key: target.stableHash
          });
        }
      });
      return result;
    });
  };

  DataSourceInfrastructure.prototype.getMetricsCatalog = function (plugin, metricCategory) {
    var key = plugin.key + '|' + metricCategory;
    var metrics = this.catalogCache.get(key);

    if (metrics) {
      return metrics;
    }

    var filter = metricCategory === _GlobalVariables__WEBPACK_IMPORTED_MODULE_0__["CUSTOM_METRICS"] ? 'custom' : 'builtin';
    metrics = Object(_util_request_handler__WEBPACK_IMPORTED_MODULE_2__["getRequest"])(this.instanaOptions, "/api/infrastructure-monitoring/catalog/metrics/" + plugin.key + "?filter=" + filter).then(function (catalogResponse) {
      return catalogResponse.data.map(function (entry) {
        return {
          key: entry.metricId,
          label: entry.label,
          description: entry.metricId,
          aggregations: [{
            key: 'MEAN',
            label: 'MEAN'
          }, {
            key: 'SUM',
            label: 'SUM'
          }],
          entityType: entry.pluginId
        };
      });
    });
    this.catalogCache.put(key, metrics);
    return metrics;
  };

  DataSourceInfrastructure.prototype.fetchSnapshotsForTarget = function (target, timeFilter) {
    var _this = this;

    var windowSize = Object(_util_time_util__WEBPACK_IMPORTED_MODULE_1__["getWindowSize"])(timeFilter);
    target.timeInterval = Object(_util_rollup_granularity_util__WEBPACK_IMPORTED_MODULE_6__["getDefaultChartGranularity"])(windowSize);
    var query = this.buildQuery(target);
    var key = this.buildSnapshotCacheKey(query, timeFilter);
    var snapshots = this.snapshotCache.get(key);

    if (snapshots) {
      return snapshots;
    }

    var fetchSnapshotContextsUrl = "/api/infrastructure-monitoring/snapshots" + ("?plugin=" + target.entityType.key) + '&size=100' + ("&query=" + target.entityQuery) + ("&windowSize=" + Object(_util_time_util__WEBPACK_IMPORTED_MODULE_1__["atLeastGranularity"])(windowSize, target.timeInterval.key)) + ("&to=" + timeFilter.to) + ("&offline=" + this.instanaOptions.showOffline);
    snapshots = Object(_util_request_handler__WEBPACK_IMPORTED_MODULE_2__["getRequest"])(this.instanaOptions, fetchSnapshotContextsUrl).then(function (contextsResponse) {
      return Promise.all(contextsResponse.data.items.map(function (_a) {
        var snapshotId = _a.snapshotId,
            host = _a.host;

        var snapshotInfo = _this.snapshotInfoCache.get(snapshotId);

        if (snapshotInfo) {
          return snapshotInfo;
        }

        var fetchSnapshotUrl = "/api/infrastructure-monitoring/snapshots/" + snapshotId + ("?to=" + timeFilter.to + "&windowSize=" + Object(_util_time_util__WEBPACK_IMPORTED_MODULE_1__["atLeastGranularity"])(windowSize, target.timeInterval.key)); // @see SnapshotApiResource#getSnapshot

        snapshotInfo = Object(_util_request_handler__WEBPACK_IMPORTED_MODULE_2__["getRequest"])(_this.instanaOptions, fetchSnapshotUrl, true).then(function (snapshotResponse) {
          // check for undefined because the fetchSnapshotContexts is buggy
          if (snapshotResponse !== undefined) {
            return {
              snapshotId: snapshotId,
              host: host,
              response: _this.reduceSnapshot(snapshotResponse)
            };
          }

          return null;
        });

        _this.snapshotInfoCache.put(snapshotId, snapshotInfo, _this.timeToLiveSnapshotInfoCache);

        return snapshotInfo;
      }));
    }).then(function (response) {
      // undefined items need to be removed, because the fetchSnapshotContexts is buggy in the backend, maybe can be removed in the future
      return lodash__WEBPACK_IMPORTED_MODULE_4___default.a.compact(response);
    });
    this.snapshotCache.put(key, snapshots);
    return snapshots;
  };

  DataSourceInfrastructure.prototype.buildQuery = function (target) {
    // check for entity.pluginId or entity.selfType, because otherwise the backend has a problem with `AND entity.pluginId`
    if (("" + target.entityQuery).includes('entity.pluginId:') || ("" + target.entityQuery).includes('entity.selfType:')) {
      return encodeURIComponent("" + target.entityQuery);
    } else {
      return encodeURIComponent(target.entityQuery + " AND entity.pluginId:" + target.entityType.key);
    }
  };

  DataSourceInfrastructure.prototype.buildSnapshotCacheKey = function (query, timeFilter) {
    return query + _GlobalVariables__WEBPACK_IMPORTED_MODULE_0__["SEPARATOR"] + Object(_util_time_util__WEBPACK_IMPORTED_MODULE_1__["getTimeKey"])(timeFilter);
  };

  DataSourceInfrastructure.prototype.reduceSnapshot = function (snapshotResponse) {
    // reduce data to used label formatting values
    snapshotResponse.data = lodash__WEBPACK_IMPORTED_MODULE_4___default.a.pick(snapshotResponse.data, ['id', 'label', 'plugin', 'data']);
    return snapshotResponse;
  };

  DataSourceInfrastructure.prototype.readTimeSeries = function (values, aggregation, timeFilter) {
    if (aggregation && aggregation.key === 'SUM') {
      return this.correctMeanToSum(values, timeFilter);
    }

    return values;
  };

  DataSourceInfrastructure.prototype.correctMeanToSum = function (values, timeFilter) {
    var secondMultiplier = parseInt(Object(_util_rollup_granularity_util__WEBPACK_IMPORTED_MODULE_6__["getDefaultMetricRollupDuration"])(timeFilter).key, 10) / 1000;
    return lodash__WEBPACK_IMPORTED_MODULE_4___default.a.map(values, function (value) {
      return {
        value: value.value ? value.value * secondMultiplier : null,
        timestamp: value.timestamp
      };
    });
  };

  DataSourceInfrastructure.prototype.fetchMetricsForSnapshot = function (target, snapshotIds, timeFilter, metric) {
    var windowSize = Object(_util_time_util__WEBPACK_IMPORTED_MODULE_1__["getWindowSize"])(timeFilter);
    target.timeInterval = Object(_util_rollup_granularity_util__WEBPACK_IMPORTED_MODULE_6__["getDefaultChartGranularity"])(windowSize);
    var data = {
      metrics: [metric.key],
      query: target.entityQuery,
      plugin: target.entityType.key,
      rollup: target.timeInterval.key,
      snapshotIds: snapshotIds,
      timeFrame: {
        to: timeFilter.to,
        windowSize: Object(_util_time_util__WEBPACK_IMPORTED_MODULE_1__["atLeastGranularity"])(windowSize, target.timeInterval.key)
      }
    };
    return Object(_util_request_handler__WEBPACK_IMPORTED_MODULE_2__["postRequest"])(this.instanaOptions, '/api/infrastructure-monitoring/metrics' + ("?offline=" + this.instanaOptions.showOffline), data);
  };

  DataSourceInfrastructure.prototype.getHostSuffix = function (host) {
    if (host) {
      return ' (on host "' + host + '")';
    }

    return '';
  };

  DataSourceInfrastructure.prototype.buildLabel = function (snapshotResponse, host, target, index, metric) {
    if (target.labelFormat) {
      var label = target.labelFormat;
      label = lodash__WEBPACK_IMPORTED_MODULE_4___default.a.replace(label, '$label', snapshotResponse.label);
      label = lodash__WEBPACK_IMPORTED_MODULE_4___default.a.replace(label, '$plugin', snapshotResponse.plugin); // not documented

      label = lodash__WEBPACK_IMPORTED_MODULE_4___default.a.replace(label, '$snapshot', snapshotResponse.snapshotId); // not documented

      label = lodash__WEBPACK_IMPORTED_MODULE_4___default.a.replace(label, '$host', host ? host : 'unknown');
      label = lodash__WEBPACK_IMPORTED_MODULE_4___default.a.replace(label, '$pid', lodash__WEBPACK_IMPORTED_MODULE_4___default.a.get(snapshotResponse, ['data', 'pid'], ''));
      label = lodash__WEBPACK_IMPORTED_MODULE_4___default.a.replace(label, '$type', lodash__WEBPACK_IMPORTED_MODULE_4___default.a.get(snapshotResponse, ['data', 'type'], ''));
      label = lodash__WEBPACK_IMPORTED_MODULE_4___default.a.replace(label, '$name', lodash__WEBPACK_IMPORTED_MODULE_4___default.a.get(snapshotResponse, ['data', 'name'], ''));
      label = lodash__WEBPACK_IMPORTED_MODULE_4___default.a.replace(label, '$service', lodash__WEBPACK_IMPORTED_MODULE_4___default.a.get(snapshotResponse, ['data', 'service_name'], ''));

      if (target.freeTextMetrics) {
        label = lodash__WEBPACK_IMPORTED_MODULE_4___default.a.replace(label, '$metric', metric.key);
      } else {
        label = lodash__WEBPACK_IMPORTED_MODULE_4___default.a.replace(label, '$metric', lodash__WEBPACK_IMPORTED_MODULE_4___default.a.get(target, ['metric', 'key'], 'n/a'));
      }

      label = lodash__WEBPACK_IMPORTED_MODULE_4___default.a.replace(label, '$index', index + 1);
      label = lodash__WEBPACK_IMPORTED_MODULE_4___default.a.replace(label, '$timeShift', target.timeShift);
      return label;
    }

    return target.timeShift && target.timeShiftIsValid ? snapshotResponse.label + this.getHostSuffix(host) + ' - ' + target.timeShift : snapshotResponse.label + this.getHostSuffix(host);
  };

  return DataSourceInfrastructure;
}();



/***/ }),

/***/ "./instana-grafana.css":
/*!*****************************!*\
  !*** ./instana-grafana.css ***!
  \*****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var api = __webpack_require__(/*! ../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js */ "../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js");
            var content = __webpack_require__(/*! !../node_modules/css-loader/dist/cjs.js??ref--8-1!../node_modules/postcss-loader/src??ref--8-2!../node_modules/sass-loader/dist/cjs.js!./instana-grafana.css */ "../node_modules/css-loader/dist/cjs.js?!../node_modules/postcss-loader/src/index.js?!../node_modules/sass-loader/dist/cjs.js!./instana-grafana.css");

            content = content.__esModule ? content.default : content;

            if (typeof content === 'string') {
              content = [[module.i, content, '']];
            }

var options = {};

options.insert = "head";
options.singleton = false;

var update = api(content, options);

var exported = content.locals ? content.locals : {};



module.exports = exported;

/***/ }),

/***/ "./lists/aggregation_function.ts":
/*!***************************************!*\
  !*** ./lists/aggregation_function.ts ***!
  \***************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ([{
  label: 'SUM'
}, {
  label: 'MEAN'
}, {
  label: 'MIN'
}, {
  label: 'MAX'
}]);

/***/ }),

/***/ "./lists/apply_call_to_entities.ts":
/*!*****************************************!*\
  !*** ./lists/apply_call_to_entities.ts ***!
  \*****************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = (['DESTINATION', 'SOURCE']);

/***/ }),

/***/ "./lists/beacon_types_mobile_app.ts":
/*!******************************************!*\
  !*** ./lists/beacon_types_mobile_app.ts ***!
  \******************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ([{
  key: 'session_start',
  label: 'Session Starts'
}, {
  key: 'view_change',
  label: 'View Transitions'
}, {
  key: 'crash',
  label: 'Crashes'
}, {
  key: 'http_request',
  label: 'HTTP Requests'
}, {
  key: 'custom',
  label: 'Custom Events'
}]);

/***/ }),

/***/ "./lists/beacon_types_website.ts":
/*!***************************************!*\
  !*** ./lists/beacon_types_website.ts ***!
  \***************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ([{
  key: 'pageLoad',
  label: 'Page Loads'
}, {
  key: 'page_change',
  label: 'Page Transitions'
}, {
  key: 'resourceLoad',
  label: 'Resources'
}, {
  key: 'httpRequest',
  label: 'HTTP Requests'
}, {
  key: 'error',
  label: 'Errors'
}, {
  key: 'custom',
  label: 'Custom Events'
}]);

/***/ }),

/***/ "./lists/default_metric_catalog.ts":
/*!*****************************************!*\
  !*** ./lists/default_metric_catalog.ts ***!
  \*****************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ([{
  key: 'calls',
  label: 'Call count',
  description: 'calls',
  aggregations: [{
    key: 'SUM',
    label: 'SUM'
  }]
}, {
  key: 'latency',
  label: 'Call latency',
  description: 'latency',
  aggregations: [{
    key: 'MAX',
    label: 'MAX'
  }, {
    key: 'MEAN',
    label: 'MEAN'
  }, {
    key: 'MIN',
    label: 'MIN'
  }, {
    key: 'P25',
    label: 'P25'
  }, {
    key: 'P50',
    label: 'P50'
  }, {
    key: 'P75',
    label: 'P75'
  }, {
    key: 'P90',
    label: 'P90'
  }, {
    key: 'P95',
    label: 'P95'
  }, {
    key: 'P98',
    label: 'P98'
  }, {
    key: 'P99',
    label: 'P99'
  }]
}, {
  key: 'errors',
  label: 'Error rate',
  description: 'errors',
  aggregations: [{
    key: 'MEAN',
    label: 'MEAN'
  }]
}, {
  key: 'services',
  label: 'Service Count',
  description: 'services',
  aggregations: [{
    key: 'DISTINCT_COUNT',
    label: 'DISTINCT_COUNT'
  }]
}]);

/***/ }),

/***/ "./lists/granularities.ts":
/*!********************************!*\
  !*** ./lists/granularities.ts ***!
  \********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
// accoring to metrics/BaseGranularity.java
/* harmony default export */ __webpack_exports__["default"] = ([{
  value: 1,
  label: '1s'
}, {
  value: 5,
  label: '5s'
}, {
  value: 10,
  label: '10s'
}, {
  value: 60,
  label: '1min'
}, {
  value: 60 * 5,
  label: '5min'
}, {
  value: 60 * 10,
  label: '10min'
}, {
  value: 60 * 30,
  label: '30min'
}, {
  value: 60 * 60,
  label: '1h'
}, {
  value: 60 * 60 * 4,
  label: '4h'
}, {
  value: 60 * 60 * 6,
  label: '6h'
}, {
  value: 60 * 60 * 8,
  label: '8h'
}, {
  value: 60 * 60 * 12,
  label: '12h'
}, {
  value: 60 * 60 * 24,
  label: '1d'
}, {
  value: 60 * 60 * 24 * 5,
  label: '5d'
}, {
  value: 60 * 60 * 24 * 10,
  label: '10d'
}]);

/***/ }),

/***/ "./lists/max_metrics.ts":
/*!******************************!*\
  !*** ./lists/max_metrics.ts ***!
  \******************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ([{
  key: 'cpu.used',
  value: 'cpu.count',
  label: 'cpu.max' // label that shall be shown as target in graph

}, {
  key: 'memory.used',
  value: 'memory.total',
  label: 'memory.max'
}, {
  key: 'openFiles.used',
  value: 'openFiles.max',
  label: 'openFiles.max'
}]);

/***/ }),

/***/ "./lists/metric_categories.ts":
/*!************************************!*\
  !*** ./lists/metric_categories.ts ***!
  \************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/**
 * Do not remove the commented stuff.
 */
/* harmony default export */ __webpack_exports__["default"] = ([{
  label: 'Infrastructure built-in metrics',
  key: 0
}, {
  label: 'Infrastructure custom metrics',
  key: 1
}, {
  label: 'Infrastructure Analyze',
  key: 8
}, {
  // replaces Application metrics(4) & Service metrics(5) & Endpoint metrics(6)
  label: 'Application/service/endpoint metrics',
  key: 4
}, {
  label: 'Analyze application calls',
  key: 2
}, {
  label: 'Analyze website',
  key: 3
}, {
  label: 'Analyze mobile app',
  key: 9
}, {
  label: 'Service Level Objectives (Beta)',
  key: 10
}, {
  label: 'Service Level Objectives Widgets',
  key: 7
}]);

/***/ }),

/***/ "./lists/operators.ts":
/*!****************************!*\
  !*** ./lists/operators.ts ***!
  \****************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ([// STRING
{
  key: 'EQUALS',
  label: 'equals',
  type: 'STRING'
}, {
  key: 'NOT_EQUAL',
  label: 'does not equal',
  type: 'STRING'
}, {
  key: 'CONTAINS',
  label: 'contains',
  type: 'STRING'
}, {
  key: 'NOT_CONTAIN',
  label: 'does not contain',
  type: 'STRING'
}, {
  key: 'NOT_EMPTY',
  label: 'is present',
  type: 'STRING'
}, {
  key: 'IS_EMPTY',
  label: 'is not present',
  type: 'STRING'
}, {
  key: 'STARTS_WITH',
  label: 'starts with',
  type: 'STRING'
}, {
  key: 'ENDS_WITH',
  label: 'ends with',
  type: 'STRING'
}, {
  key: 'NOT_STARTS_WITH',
  label: 'does not start with',
  type: 'STRING'
}, {
  key: 'NOT_ENDS_WITH',
  label: 'does not end with',
  type: 'STRING'
}, // NUMBER
{
  key: 'EQUALS',
  label: '=',
  type: 'NUMBER'
}, {
  key: 'NOT_EQUAL',
  label: '!=',
  type: 'NUMBER'
}, {
  key: 'LESS_THAN',
  label: '<',
  type: 'NUMBER'
}, {
  key: 'GREATER_THAN',
  label: '>',
  type: 'NUMBER'
}, {
  key: 'IS_EMPTY',
  label: 'is empty',
  type: 'NUMBER'
}, {
  key: 'NOT_EMPTY',
  label: 'is not empty',
  type: 'NUMBER'
}, {
  key: 'LESS_OR_EQUAL_THAN',
  label: 'less or equal than',
  type: 'NUMBER'
}, {
  key: 'GREATER_OR_EQUAL_THAN',
  label: 'greater or equal than',
  type: 'NUMBER'
}, // BOOLEAN
{
  key: 'EQUALS',
  label: 'is',
  type: 'BOOLEAN'
}, // KEY_VALUE_PAIR
{
  key: 'EQUALS',
  label: 'equals',
  type: 'KEY_VALUE_PAIR'
}, {
  key: 'NOT_EQUAL',
  label: 'does not equal',
  type: 'KEY_VALUE_PAIR'
}, {
  key: 'CONTAINS',
  label: 'contains',
  type: 'KEY_VALUE_PAIR'
}, {
  key: 'NOT_CONTAIN',
  label: 'does not contain',
  type: 'KEY_VALUE_PAIR'
}, {
  key: 'NOT_EMPTY',
  label: 'is present',
  type: 'KEY_VALUE_PAIR'
}, {
  key: 'IS_EMPTY',
  label: 'is not present',
  type: 'KEY_VALUE_PAIR'
}, {
  key: 'STARTS_WITH',
  label: 'starts with',
  type: 'KEY_VALUE_PAIR'
}, {
  key: 'ENDS_WITH',
  label: 'ends with',
  type: 'KEY_VALUE_PAIR'
}, {
  key: 'IS_BLANK',
  label: 'is blank',
  type: 'KEY_VALUE_PAIR'
}, {
  key: 'NOT_BLANK',
  label: 'is not blank',
  type: 'KEY_VALUE_PAIR'
}, // STRING_SET
{
  key: 'EQUALS',
  label: 'equals',
  type: 'STRING_SET'
}, {
  key: 'NOT_EQUAL',
  label: 'does not equal',
  type: 'STRING_SET'
}, {
  key: 'CONTAINS',
  label: 'contains',
  type: 'STRING_SET'
}, {
  key: 'NOT_CONTAIN',
  label: 'does not contain',
  type: 'STRING_SET'
}, {
  key: 'NOT_EMPTY',
  label: 'is present',
  type: 'STRING_SET'
}, {
  key: 'IS_EMPTY',
  label: 'is not present',
  type: 'STRING_SET'
}]);

/***/ }),

/***/ "./lists/rollups.ts":
/*!**************************!*\
  !*** ./lists/rollups.ts ***!
  \**************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ([{
  availableFor: 1000 * 60 * 60 * 24,
  rollup: 1000,
  label: '1s'
}, {
  availableFor: 1000 * 60 * 60 * 24,
  rollup: 1000 * 5,
  label: '5s'
}, {
  availableFor: 1000 * 60 * 60 * 24 * 31,
  rollup: 1000 * 60,
  label: '1min'
}, {
  availableFor: 1000 * 60 * 60 * 24 * 31 * 3,
  rollup: 1000 * 60 * 5,
  label: '5min'
}, {
  availableFor: 1000 * 60 * 60 * 24 * 31 * 12,
  rollup: 1000 * 60 * 60,
  label: '1h'
}]);

/***/ }),

/***/ "./lists/slo2_specifics.ts":
/*!*********************************!*\
  !*** ./lists/slo2_specifics.ts ***!
  \*********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ([{
  key: 'Status',
  label: 'Status'
}, {
  key: 'Service Level Target',
  label: 'Service Level Target'
}, {
  key: 'Total Error Budget',
  label: 'Total Error Budget'
}, {
  key: 'Remaining Error Budget',
  label: 'Remaining Error Budget'
}, {
  key: 'Spended Error Budget',
  label: 'Spended Error Budget'
}, {
  key: 'Timeseries',
  label: 'Violation Distribution'
}, {
  key: 'Error Chart',
  label: 'Error Chart'
}, {
  key: 'Error Accumulation Chart',
  label: 'Error Accumulation Chart'
}, {
  key: 'Error Budget Remain Chart',
  label: 'Error Budget remain Chart'
}]);

/***/ }),

/***/ "./lists/slo_specifics.ts":
/*!********************************!*\
  !*** ./lists/slo_specifics.ts ***!
  \********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ([{
  key: 'SLI',
  label: 'SLI'
}, {
  key: 'Remaining Error Budget',
  label: 'Remaining Error Budget'
}, {
  key: 'Timeseries',
  label: 'Timeseries'
}]);

/***/ }),

/***/ "./migration.ts":
/*!**********************!*\
  !*** ./migration.ts ***!
  \**********************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! lodash */ "lodash");
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(lodash__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _lists_metric_categories__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./lists/metric_categories */ "./lists/metric_categories.ts");
/* harmony import */ var GlobalVariables__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! GlobalVariables */ "./GlobalVariables.ts");
// can be removed once mixpanel shows no old plugins around



/* harmony default export */ __webpack_exports__["default"] = (function (target) {
  // 1.3.1 towards 2.0.0
  if (target.entityType && typeof target.entityType === 'string') {
    target.entityType = {
      key: target.entityType,
      label: target.entityType
    };
  } // 2.3.1 towards 2.4.0


  if (target.filter && target.filter !== '') {
    if (!target.customFilters) {
      target.customFilters = [];
      target.customFilters.push({
        value: target.filter
      });
    }
  } // 2.4.2 towards 2.4.3


  if (target.timeInterval) {
    if (target.timeInterval.value) {
      target.timeInterval = {
        key: target.timeInterval.value,
        label: target.timeInterval.label
      };
    } else if (target.timeInterval.rollup) {
      target.timeInterval = {
        key: target.timeInterval.rollup,
        label: target.timeInterval.label
      };
    }
  } //2.4.4 towards 2.5.0


  if (target.metricCategory === '5') {
    //old service metric view
    target.metricCategory = '4';
    target.service = {}; //because target.service does not exist yet.

    target.service.key = target.entity.key;
    target.service.label = target.entity.label;

    if (target.selectedApplication && target.selectedApplication.key) {
      target.entity.key = target.selectedApplication.key;
      target.entity.label = target.selectedApplication.label;
    } else {
      target.entity.key = null;
      target.entity.label = 'Test';
    }
  } //2.4.4 towards 2.5.0


  if (target.metricCategory === '6') {
    //old endpoint metric view
    target.metricCategory = '4';
    target.endpoint = {}; //because target.endpoint does not exist yet.

    target.endpoint.key = target.entity.key;

    if (target.selectedApplication && target.selectedApplication.key) {
      target.entity.key = target.selectedApplication.key;
      target.entity.label = target.selectedApplication.label;
    } else {
      target.entity.key = null;
      target.entity.label = 'Test';
    }
  } //2.7.3 towards 3.0 (Angular to React Migration)


  if (target.aggregation && typeof target.aggregation === 'string') {
    target.aggregation ? target.aggregation = {
      key: target.aggregation,
      label: target.aggregation
    } : target.aggregation = {};
    target.aggregationFunction ? target.aggregationFunction = {
      key: target.aggregationFunction.label,
      label: target.aggregationFunction.label
    } : target.aggregationFunction = {};
  }

  if (target.customFilters && target.customFilters.length > 0 && target.customFilters[0].value) {
    target.customFilters = lodash__WEBPACK_IMPORTED_MODULE_0___default.a.map(target.customFilters, function (cf) {
      return cf.value;
    });
  }

  if (target.metricCategory.key !== GlobalVariables__WEBPACK_IMPORTED_MODULE_2__["INFRASTRUCTURE_ANALYZE"] && target.filters && target.filters.length > 0 && !target.filters[0].tag.key && !target.filters[0].tag.label) {
    lodash__WEBPACK_IMPORTED_MODULE_0___default.a.forEach(target.filters, function (filter) {
      filter.tag.label = filter.tag.key;
    });
  }

  if (target.group && target.group.key && !target.group.label) {
    target.group.label = target.group.key;
  }

  if (target.metricCategory && typeof target.metricCategory === 'string') {
    target.metricCategory = lodash__WEBPACK_IMPORTED_MODULE_0___default.a.find(_lists_metric_categories__WEBPACK_IMPORTED_MODULE_1__["default"], function (category) {
      return category.key === parseInt(target.metricCategory, 10);
    });
  } //3.0.1 towards 3.1.0


  if (target.callToEntity && target.callToEntity.key) {
    target.callToEntity = target.callToEntity.key;
  }

  if (target.applicationCallToEntity && target.applicationCallToEntity.key) {
    target.applicationCallToEntity = target.applicationCallToEntity.key;
  }

  if (target.filters && target.filters.length > 0) {
    target.filters.forEach(function (filter) {
      if (filter.entity && filter.entity.key) {
        filter.entity = filter.entity.key;
      }
    });
  }
});

/***/ }),

/***/ "./module.ts":
/*!*******************!*\
  !*** ./module.ts ***!
  \*******************/
/*! exports provided: plugin */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "plugin", function() { return plugin; });
/* harmony import */ var _grafana_data__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @grafana/data */ "@grafana/data");
/* harmony import */ var _grafana_data__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_grafana_data__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _datasources_DataSource__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./datasources/DataSource */ "./datasources/DataSource.ts");
/* harmony import */ var _components_ConfigEditor__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./components/ConfigEditor */ "./components/ConfigEditor.tsx");
/* harmony import */ var _components_QueryEditor__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./components/QueryEditor */ "./components/QueryEditor.tsx");




var plugin = new _grafana_data__WEBPACK_IMPORTED_MODULE_0__["DataSourcePlugin"](_datasources_DataSource__WEBPACK_IMPORTED_MODULE_1__["DataSource"]).setConfigEditor(_components_ConfigEditor__WEBPACK_IMPORTED_MODULE_2__["ConfigEditor"]).setQueryEditor(_components_QueryEditor__WEBPACK_IMPORTED_MODULE_3__["QueryEditor"]);

/***/ }),

/***/ "./util/aggregation_util.ts":
/*!**********************************!*\
  !*** ./util/aggregation_util.ts ***!
  \**********************************/
/*! exports provided: aggregateTarget */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "aggregateTarget", function() { return aggregateTarget; });
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! lodash */ "lodash");
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(lodash__WEBPACK_IMPORTED_MODULE_0__);

function aggregateTarget(data, target) {
  var targetLabel = buildAggregationLabel(target);
  data = lodash__WEBPACK_IMPORTED_MODULE_0___default.a.filter(data, function (d) {
    return d.target !== targetLabel;
  }); // filter out any previously calculated aggregations

  var concatedTargetData = concatTargetData(data);

  var dataGroupedByTimestamp = lodash__WEBPACK_IMPORTED_MODULE_0___default.a.groupBy(concatedTargetData, function (d) {
    return d[1];
  });

  var aggregatedData = aggregateDataOfTimestamp(dataGroupedByTimestamp, target.aggregationFunction.label);
  aggregatedData = lodash__WEBPACK_IMPORTED_MODULE_0___default.a.sortBy(aggregatedData, [function (datapoint) {
    return datapoint[1];
  }]);
  return buildResult(aggregatedData, target.refId, targetLabel);
}

function concatTargetData(data) {
  var result = [];

  lodash__WEBPACK_IMPORTED_MODULE_0___default.a.each(data, function (entry) {
    result = lodash__WEBPACK_IMPORTED_MODULE_0___default.a.concat(result, entry.datapoints);
  });

  return result;
}

function aggregateDataOfTimestamp(dataGroupedByTimestamp, aggregationLabel) {
  var result = [];

  lodash__WEBPACK_IMPORTED_MODULE_0___default.a.each(dataGroupedByTimestamp, function (timestampData, timestamp) {
    var valuesOfTimestamp = lodash__WEBPACK_IMPORTED_MODULE_0___default.a.map(timestampData, function (datapoint) {
      return datapoint[0];
    });

    var aggregatedValue = aggregate(aggregationLabel, valuesOfTimestamp);
    result.push([aggregatedValue, parseInt(timestamp, 10)]);
  });

  return result;
}

function aggregate(aggregation, data) {
  if (aggregation.toLowerCase() === 'sum') {
    return lodash__WEBPACK_IMPORTED_MODULE_0___default.a.sum(data);
  } else if (aggregation.toLowerCase() === 'mean') {
    return lodash__WEBPACK_IMPORTED_MODULE_0___default.a.mean(data);
  } else if (aggregation.toLowerCase() === 'min') {
    return lodash__WEBPACK_IMPORTED_MODULE_0___default.a.min(data);
  } else if (aggregation.toLowerCase() === 'max') {
    return lodash__WEBPACK_IMPORTED_MODULE_0___default.a.max(data);
  } else {
    //apply not aggregation
    return data;
  }
}

function buildResult(aggregatedData, refId, target) {
  return {
    datapoints: aggregatedData,
    refId: refId,
    target: target
  };
}

function buildAggregationLabel(target) {
  if (target.showAllMetrics) {
    if (target.allMetrics.length > 1) {
      if (target.customFilters && target.customFilters.length > 0) {
        var label_1 = '';

        lodash__WEBPACK_IMPORTED_MODULE_0___default.a.each(target.customFilters, function (filter, index) {
          label_1 += filter;

          if (index !== target.customFilters.length - 1) {
            label_1 += '.';
          }
        });

        label_1 = label_1 + ' (' + target.aggregationFunction.label + ')';
        return label_1;
      } else {
        return target.aggregationFunction.label;
      }
    } else {
      return target.allMetrics[0].key + ' (' + target.aggregationFunction.label + ')';
    }
  } else {
    return target.metric.key + ' (' + target.aggregationFunction.label + ')';
  }
}

/***/ }),

/***/ "./util/analyze_util.ts":
/*!******************************!*\
  !*** ./util/analyze_util.ts ***!
  \******************************/
/*! exports provided: createTagFilter, readItemMetrics */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "createTagFilter", function() { return createTagFilter; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "readItemMetrics", function() { return readItemMetrics; });
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! lodash */ "lodash");
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(lodash__WEBPACK_IMPORTED_MODULE_0__);

function createTagFilter(filter) {
  var tagFilter = {
    name: filter.tag.key,
    operator: filter.operator.key,
    value: filter.stringValue
  };

  if ('NUMBER' === filter.tag.type) {
    if (filter.numberValue !== null) {
      tagFilter.value = filter.numberValue;
    }
  } else if ('BOOLEAN' === filter.tag.type) {
    tagFilter.value = filter.booleanValue;
  }

  return tagFilter;
}
function readItemMetrics(target, response, getLabel) {
  if (!response.data) {
    return response;
  } // as we map two times we need to flatten the result


  return lodash__WEBPACK_IMPORTED_MODULE_0___default.a.flatten(response.data.items.map(function (item, index) {
    return lodash__WEBPACK_IMPORTED_MODULE_0___default.a.map(item.metrics, function (value, key) {
      return {
        target: getLabel(target, item, key, index),
        datapoints: lodash__WEBPACK_IMPORTED_MODULE_0___default.a.map(value, function (metric) {
          return [metric[1], metric[0]];
        }),
        refId: target.refId,
        key: target.stableHash
      };
    });
  }));
}

/***/ }),

/***/ "./util/delta_util.ts":
/*!****************************!*\
  !*** ./util/delta_util.ts ***!
  \****************************/
/*! exports provided: generateStableHash, hasIntersection, appendData, getDeltaRequestTimestamp */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "generateStableHash", function() { return generateStableHash; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "hasIntersection", function() { return hasIntersection; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "appendData", function() { return appendData; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getDeltaRequestTimestamp", function() { return getDeltaRequestTimestamp; });
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! lodash */ "lodash");
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(lodash__WEBPACK_IMPORTED_MODULE_0__);
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }


var omitLabels = ['refId', 'pluginId', 'showWarningCantShowAllResults', 'timeShiftIsValid', 'useFreeTextMetrics', 'showGroupBySecondLevel', 'canShowAllMetrics', 'timeFilter', 'stableHash'];
function generateStableHash(obj) {
  var pseudoHash = lodash__WEBPACK_IMPORTED_MODULE_0___default.a.omit(obj, omitLabels);

  pseudoHash = lodash__WEBPACK_IMPORTED_MODULE_0___default.a.mapValues(pseudoHash, function (value) {
    // to reduce overhead of interface Selectable
    if (value != null && _typeof(value) === 'object' && 'key' in value) {
      value = value.key;
    }

    return value;
  });
  return JSON.stringify(pseudoHash);
}
/* Check if two time filters are overlapping.

Return true when:
a)
  from |-------------------| to (t2)
              from |--------------------| to (t1)
b)
  from |-------------------| to (t2)
  from |-------------------| to (t1)
c)
  from |-------------------| to (t2)
              from |-------| to (t1)

Returns false when:
d)
  from |-------------------| to (t2)
                      from |-------| to (t1)
e)
  from |-------------------| to (t2)
       from |--------| to (t1)
f)
     from |-------------------| to (t2)
from |----------------------------------------| to (t1)
g)
                from |-------------------| to (t2)
  from |--------------------| to (t1)
h)
                from |-------------------| to (t2)
  from |-------------| to (t1)
i)
                from |-------------------| to (t2)
  from |--------| to (t1)
j)
  from |-------------------| to (t2)
                        from |----------| to (t1)
k)
  from |-------------------| to (t2)
  from |----------| to (t1)
*/

function hasIntersection(t1, t2) {
  return t1.from < t2.to && t1.from >= t2.from && t1.to >= t2.to;
}
/*
  Appends new found items to already existing data in cache.
  Also removes old data accordingly (e.g. if 4 new datapoints were added,
  the corresponding oldest four datapoints are removed).
*/

function appendData(newDeltaData, cachedData) {
  lodash__WEBPACK_IMPORTED_MODULE_0___default.a.each(newDeltaData, function (deltaData) {
    var matchingCachedDataIndex = lodash__WEBPACK_IMPORTED_MODULE_0___default.a.findIndex(cachedData, function (o) {
      return o.key === deltaData.key && o.target === deltaData.target;
    });

    if (cachedData[matchingCachedDataIndex] && deltaData.datapoints) {
      // const size = matchingCachedData.datapoints.length;
      var datapoints = deltaData.datapoints.concat(cachedData[matchingCachedDataIndex].datapoints);
      datapoints = lodash__WEBPACK_IMPORTED_MODULE_0___default.a.sortedUniqBy(datapoints.sort(function (a, b) {
        return a[1] - b[1];
      }), function (a) {
        return a[1];
      });
      cachedData[matchingCachedDataIndex].datapoints = lodash__WEBPACK_IMPORTED_MODULE_0___default.a.takeRight(datapoints, 800);
      cachedData[matchingCachedDataIndex].target = deltaData.target;
    } else {
      cachedData.push(deltaData);
    }
  });

  return cachedData;
}
function getDeltaRequestTimestamp(series, fromDefault, timeInterval) {
  // we do not apply any delta for requests that contain a one second granularity (application requests)
  if (timeInterval.key === '1') {
    return fromDefault;
  } // the found series can have multiple results, it's ok just to use the first one
  // because data is written in batches and we know that once there is a datapoint
  // for a series, the other series' datapoints are up-to-date as well.


  var length = series[0].datapoints.length;

  if (length < 2) {
    return fromDefault;
  }

  var penultimate = length - 2;
  return series[0].datapoints[penultimate][1];
}

/***/ }),

/***/ "./util/instana_version.ts":
/*!*********************************!*\
  !*** ./util/instana_version.ts ***!
  \*********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return getVersion; });
/* harmony import */ var _cache__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../cache */ "./cache.ts");
/* harmony import */ var _request_handler__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./request_handler */ "./util/request_handler.ts");


var versionCache = new _cache__WEBPACK_IMPORTED_MODULE_0__["default"]();
/*
  Get version of current Instana backend and cache it for 10 minutes.
  This should be the ONLY way to retrieve any information about the Instana backend version.
 */

function getVersion(options) {
  var cachedVersion = versionCache.get('version');

  if (cachedVersion) {
    return Promise.resolve(cachedVersion);
  }

  return Object(_request_handler__WEBPACK_IMPORTED_MODULE_1__["getRequest"])(options, '/api/instana/version').then(function (result) {
    if (result.data && result.data.imageTag) {
      var majorVersion = parseInt(result.data.imageTag.split('.', 2)[1], 10) || null;

      if (majorVersion) {
        versionCache.put(options.url, majorVersion, 600000);
      }

      return majorVersion;
    }

    return null;
  }, function (error) {
    return null;
  });
}

/***/ }),

/***/ "./util/proxy_check.ts":
/*!*****************************!*\
  !*** ./util/proxy_check.ts ***!
  \*****************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! lodash */ "lodash");
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(lodash__WEBPACK_IMPORTED_MODULE_0__);
 // check grafana version (5.3+)

/* harmony default export */ __webpack_exports__["default"] = (function () {
  var version = lodash__WEBPACK_IMPORTED_MODULE_0___default.a.get(window, ['grafanaBootData', 'settings', 'buildInfo', 'version'], '3.0.0');

  var versions = lodash__WEBPACK_IMPORTED_MODULE_0___default.a.split(version, '.', 2).map(function (v) {
    return parseInt(v, 10);
  });

  return version[0] >= 6 || versions[0] >= 5 && versions[1] >= 3;
});

/***/ }),

/***/ "./util/queryInterval_check.ts":
/*!*************************************!*\
  !*** ./util/queryInterval_check.ts ***!
  \*************************************/
/*! exports provided: isInvalidQueryInterval */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isInvalidQueryInterval", function() { return isInvalidQueryInterval; });
/**
 * Util method to validate query intervals which are too big.
 *
 * @param windowSize in ms
 * @param queryIntervalLimit in ms
 */
function isInvalidQueryInterval(windowSize, queryIntervalLimit) {
  if (queryIntervalLimit) {
    if (queryIntervalLimit > 0) {
      return windowSize > queryIntervalLimit;
    }

    return false;
  }

  return false;
}

/***/ }),

/***/ "./util/request_handler.ts":
/*!*********************************!*\
  !*** ./util/request_handler.ts ***!
  \*********************************/
/*! exports provided: getRequest, postRequest, instanaUrl */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getRequest", function() { return getRequest; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "postRequest", function() { return postRequest; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "instanaUrl", function() { return instanaUrl; });
/* harmony import */ var _grafana_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @grafana/runtime */ "@grafana/runtime");
/* harmony import */ var _grafana_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_grafana_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! lodash */ "lodash");
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(lodash__WEBPACK_IMPORTED_MODULE_1__);


var getRequest = function getRequest(options, endpoint, swallowError, maxRetries) {
  if (swallowError === void 0) {
    swallowError = false;
  }

  if (maxRetries === void 0) {
    maxRetries = 1;
  }

  var request = {
    method: 'GET',
    url: options.url + endpoint
  };
  return doRequest(options, request, swallowError, maxRetries);
};
var postRequest = function postRequest(options, endpoint, data, swallowError, maxRetries) {
  if (swallowError === void 0) {
    swallowError = false;
  }

  if (maxRetries === void 0) {
    maxRetries = 0;
  }

  var request = {
    method: 'POST',
    url: options.url + endpoint,
    data: data
  };
  return doRequest(options, request, swallowError, maxRetries);
};

function doRequest(options, request, swallowError, maxRetries) {
  return Object(_grafana_runtime__WEBPACK_IMPORTED_MODULE_0__["getBackendSrv"])().datasourceRequest(request)["catch"](function (error) {
    var _a, _b;

    if (error.status === 429) {
      // if the error was caused by a concurrent execution limit, we will retry
      if (maxRetries > 0 && ((_a = error.data) === null || _a === void 0 ? void 0 : _a.errors) && error.data.errors[0] && error.data.errors[0].includes('concurrent')) {
        var backoff_1 = maxRetries >= 4 ? 10000 : (4 - maxRetries) * 20000; // something between 10 and 60 seconds

        return new Promise(function (resolve) {
          return setTimeout(resolve, backoff_1);
        }).then(function () {
          return doRequest(options, request, swallowError, maxRetries - 1);
        });
      }

      throw new Error('API limit is reached.');
      return;
    }

    if (swallowError && (error.status >= 400 || error.status < 500)) {
      console.log(error);
      return;
    }

    if (maxRetries > 0 && error.status >= 500) {
      return doRequest(options, request, swallowError, maxRetries - 1);
    } // in order to display a reasonable error message text inside ui


    if (!error.statusText && ((_b = error.data) === null || _b === void 0 ? void 0 : _b.errors) && error.data.errors[0]) {
      throw new Error(error.data.errors[0]);
    }

    throw error;
  });
}

function instanaUrl(instanceSettings) {
  if (instanceSettings.jsonData.useProxy) {
    return lodash__WEBPACK_IMPORTED_MODULE_1___default.a.trimEnd(instanceSettings.url, '/ ') + '/instana'; // to match proxy route in plugin.json
  } else {
    return lodash__WEBPACK_IMPORTED_MODULE_1___default.a.trimEnd(instanceSettings.jsonData.url, '/ ');
  }
}

/***/ }),

/***/ "./util/rollup_granularity_util.ts":
/*!*****************************************!*\
  !*** ./util/rollup_granularity_util.ts ***!
  \*****************************************/
/*! exports provided: getDefaultChartGranularity, getPossibleGranularities, getDefaultMetricRollupDuration, getPossibleRollups */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getDefaultChartGranularity", function() { return getDefaultChartGranularity; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getPossibleGranularities", function() { return getPossibleGranularities; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getDefaultMetricRollupDuration", function() { return getDefaultMetricRollupDuration; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getPossibleRollups", function() { return getPossibleRollups; });
/* harmony import */ var _lists_granularities__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../lists/granularities */ "./lists/granularities.ts");
/* harmony import */ var _time_util__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./time_util */ "./util/time_util.ts");
/* harmony import */ var _lists_rollups__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../lists/rollups */ "./lists/rollups.ts");



var MAX_DATAPOINTS_ANALYZE = 600;
var MAX_DATAPOINTS_INFRASTRUCTURE = 800;
var UI_DATAPOINTS_ANALYZE = 80;

function currentTime() {
  return Date.now();
}

function getDefaultChartGranularity(windowSize) {
  return getPossibleGranularities(windowSize, UI_DATAPOINTS_ANALYZE)[0];
}
function getPossibleGranularities(windowSize, maxValues) {
  if (maxValues === void 0) {
    maxValues = MAX_DATAPOINTS_ANALYZE;
  }

  var possibleGranularities = _lists_granularities__WEBPACK_IMPORTED_MODULE_0__["default"].filter(function (granularity) {
    return windowSize / 1000 / granularity.value <= maxValues && granularity.value * 1000 <= windowSize;
  }); // window sizes of this length and up have a granularity of at least 1h

  if (windowSize > 48000001) {
    possibleGranularities = possibleGranularities.filter(function (granularity) {
      return granularity.value >= 3600;
    });
  }

  if (windowSize >= 1800000) {
    possibleGranularities = possibleGranularities.filter(function (granularity) {
      return granularity.value >= 60;
    });
  }

  if (possibleGranularities.length > 0) {
    return possibleGranularities.map(function (granularity) {
      return {
        key: granularity.value.toString(),
        label: granularity.label
      };
    });
  }

  return [{
    key: _lists_granularities__WEBPACK_IMPORTED_MODULE_0__["default"][_lists_granularities__WEBPACK_IMPORTED_MODULE_0__["default"].length - 1].value.toString(),
    label: _lists_granularities__WEBPACK_IMPORTED_MODULE_0__["default"][_lists_granularities__WEBPACK_IMPORTED_MODULE_0__["default"].length - 1].label
  }];
}
function getDefaultMetricRollupDuration(timeFilter) {
  return getPossibleRollups(timeFilter)[0];
}
function getPossibleRollups(timeFilter) {
  // Ignoring time differences for now since small time differences
  // can be accepted. This time is only used to calculate the rollup.
  var now = currentTime();
  var windowSize = Object(_time_util__WEBPACK_IMPORTED_MODULE_1__["getWindowSize"])(timeFilter);
  var possibleRollups = _lists_rollups__WEBPACK_IMPORTED_MODULE_2__["default"].filter(function (rollupDefinition) {
    return timeFilter.from >= now - rollupDefinition.availableFor;
  }).filter(function (rollUp) {
    return windowSize >= rollUp.rollup && windowSize / rollUp.rollup <= MAX_DATAPOINTS_INFRASTRUCTURE;
  });

  if (possibleRollups.length > 0) {
    return possibleRollups.map(function (rollup) {
      return {
        key: rollup.rollup.toString(),
        label: rollup.label
      };
    });
  }

  return [{
    key: _lists_rollups__WEBPACK_IMPORTED_MODULE_2__["default"][_lists_rollups__WEBPACK_IMPORTED_MODULE_2__["default"].length - 1].rollup.toString(),
    label: _lists_rollups__WEBPACK_IMPORTED_MODULE_2__["default"][_lists_rollups__WEBPACK_IMPORTED_MODULE_2__["default"].length - 1].label
  }];
}

/***/ }),

/***/ "./util/target_util.ts":
/*!*****************************!*\
  !*** ./util/target_util.ts ***!
  \*****************************/
/*! exports provided: emptyResultData, buildTimeSeries */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "emptyResultData", function() { return emptyResultData; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "buildTimeSeries", function() { return buildTimeSeries; });
function emptyResultData(refId) {
  return {
    target: refId,
    datapoints: []
  };
}
function buildTimeSeries(label, refId, datapoints) {
  return {
    target: label,
    refId: refId,
    datapoints: datapoints
  };
}

/***/ }),

/***/ "./util/time_util.ts":
/*!***************************!*\
  !*** ./util/time_util.ts ***!
  \***************************/
/*! exports provided: readTime, getWindowSize, getTimeKey, hoursToMs, atLeastGranularity */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "readTime", function() { return readTime; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getWindowSize", function() { return getWindowSize; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getTimeKey", function() { return getTimeKey; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "hoursToMs", function() { return hoursToMs; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "atLeastGranularity", function() { return atLeastGranularity; });
/* harmony import */ var _GlobalVariables__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../GlobalVariables */ "./GlobalVariables.ts");

function readTime(time) {
  var from = new Date(time.from.valueOf()).getTime();
  var to = new Date(time.to.valueOf()).getTime();
  return {
    from: from,
    to: to,
    windowSize: to - from
  };
}
function getWindowSize(timeFilter) {
  return timeFilter.to - timeFilter.from;
}
function getTimeKey(timeFilter) {
  // time might be part of a cache key as this can cause different results
  return msToMin(timeFilter.from) + _GlobalVariables__WEBPACK_IMPORTED_MODULE_0__["SEPARATOR"] + msToMin(timeFilter.to);
}

function msToMin(time) {
  return time / 60000; // Avoid rounding to retain precision
}

function hoursToMs(hours) {
  if (hours > 0) {
    return hours * 60 * 60 * 1000; // Direct conversion without rounding
  }

  return 0;
}
function atLeastGranularity(windowSize, granularity) {
  // Ensure windowSize is not smaller than granularity
  var granularityInMs = granularity * 1000;
  return windowSize >= granularityInMs ? windowSize : granularityInMs;
}

/***/ }),

/***/ "@grafana/data":
/*!********************************!*\
  !*** external "@grafana/data" ***!
  \********************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE__grafana_data__;

/***/ }),

/***/ "@grafana/runtime":
/*!***********************************!*\
  !*** external "@grafana/runtime" ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE__grafana_runtime__;

/***/ }),

/***/ "@grafana/ui":
/*!******************************!*\
  !*** external "@grafana/ui" ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE__grafana_ui__;

/***/ }),

/***/ "lodash":
/*!*************************!*\
  !*** external "lodash" ***!
  \*************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_lodash__;

/***/ }),

/***/ "react":
/*!************************!*\
  !*** external "react" ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_react__;

/***/ })

/******/ })});;
//# sourceMappingURL=module.js.map