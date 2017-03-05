/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
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
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
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
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 5);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.isArray = isArray;
exports.isObject = isObject;
exports.isFunction = isFunction;
exports.isString = isString;
exports.isNumber = isNumber;
exports.existLetter = existLetter;
function judge(o) {
	return Object.prototype.toString.call(o);
}

function isArray(arr) {
	return judge(arr) === '[object Array]';
}

function isObject(o) {
	return judge(o) === '[object Object]';
}

function isFunction(f) {
	return typeof f === 'function';
}

function isString(s) {
	return typeof s === 'string';
}

function isNumber(n) {
	return typeof n === 'number';
}

function existLetter(s, l) {
	return s.indexOf(l) > -1;
}

var isBrowser = exports.isBrowser = true;
try {
	exports.isBrowser = isBrowser = typeof window !== 'undefined' && isObject(window) !== '[object Object]';
} catch (e) {
	exports.isBrowser = isBrowser = false;
}

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.error = error;
function error(info) {
	var context = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;

	if (typeof console !== 'undeifine') {
		console.error(info);
	}
}

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.baseInit = baseInit;

var _util = __webpack_require__(3);

function baseInit(Mdom) {
	Mdom.prototype._init = function (arg) {
		if (arg.length === 0) {
			(0, _util.error)('初始化参数不能为空');
			return;
		}
		if ((0, _util.isArray)(arg) && arg.length > 0) {
			var op = parseOption.call(this, arg);
		}
	};
	window.el = function () {
		var arg = (0, _util.toArray)(arguments);

		if (arg.length === 0) {
			(0, _util.error)('初始化参数不能为空');
			return;
		}
		if ((0, _util.isArray)(arg) && arg.length > 0) {
			return _util.createVdom.call(this, arg);
		}
	};
}

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _console = __webpack_require__(1);

Object.keys(_console).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _console[key];
    }
  });
});

var _createVdom = __webpack_require__(7);

Object.keys(_createVdom).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _createVdom[key];
    }
  });
});

var _is = __webpack_require__(0);

Object.keys(_is).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _is[key];
    }
  });
});

var _help = __webpack_require__(6);

Object.keys(_help).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _help[key];
    }
  });
});

/***/ }),
/* 4 */,
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.Mdom = Mdom;

var _baseInit = __webpack_require__(2);

var _util = __webpack_require__(3);

function Mdom() {
	if (this instanceof Mdom) {
		var arg = (0, _util.toArray)(arguments);
		this._init(arg);
	}
}

(0, _baseInit.baseInit)(Mdom);

if (_util.isBrowser) window.Mdom = Mdom;

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.toArray = toArray;
function toArray(arr) {
	return [].slice.call(arr);
}

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.createVdom = createVdom;

var _index = __webpack_require__(3);

var _vdom = __webpack_require__(9);

function parseQuery(query, vdom) {
	var k = void 0,
	    state = 0,
	    j = 0;
	for (var i = 0, len = query.length; i < len; i++) {
		var char = query[i];
		if (char === '.' || char === '#' || (k = i === len - 1)) {
			if (state === 0) {
				vdom.tagName = query.substring(j, !k ? i : len);
			} else if (state === 1) {
				vdom.class.push(query.substring(j, !k ? i : len));
			} else if (state === 2) {
				vdom.id = query.substring(j, !k ? i : len);
			}
			state = char === '.' ? 1 : char === '#' ? 2 : 3;
			j = i + 1;
		}
	}
}

function createVdom(arg) {

	var i = 0,
	    vd = Object.create(_vdom.Vdom);

	while (i < arg.length) {
		var v = arg[i];

		if (i === 0 && (0, _index.isString)(v)) {
			// div#id.classA
			vd.sel = v;
			parseQuery(v, vd);
		} else if (i != 0 && (0, _index.isObject)(v)) {
			// class style click
			vd.data = v;
		} else if (i != 0 && (0, _index.isArray)(v)) {
			// childern
			vd.childern = v;
		}

		i++;
	}
	console.log(vd);
	return vd;
}

/***/ }),
/* 8 */,
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});
var Vdom = exports.Vdom = {
	tagName: null,
	sel: null,
	id: null,
	class: [],
	children: [],
	el: null
};

/***/ })
/******/ ]);
//# sourceMappingURL=Mdom.js.map