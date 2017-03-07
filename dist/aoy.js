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
/******/ 	return __webpack_require__(__webpack_require__.s = 11);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _console = __webpack_require__(4);

Object.keys(_console).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _console[key];
    }
  });
});

var _is = __webpack_require__(6);

Object.keys(_is).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _is[key];
    }
  });
});

var _help = __webpack_require__(5);

Object.keys(_help).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _help[key];
    }
  });
});

var _api = __webpack_require__(3);

Object.keys(_api).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _api[key];
    }
  });
});

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _vnode = __webpack_require__(10);

Object.keys(_vnode).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _vnode[key];
    }
  });
});

var _diff = __webpack_require__(9);

Object.keys(_diff).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _diff[key];
    }
  });
});

var _createVdom = __webpack_require__(8);

Object.keys(_createVdom).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _createVdom[key];
    }
  });
});

var _createEle = __webpack_require__(7);

Object.keys(_createEle).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _createEle[key];
    }
  });
});

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.baseInit = baseInit;

var _index = __webpack_require__(0);

var _index2 = __webpack_require__(1);

function baseInit(Aoy) {
	Aoy.prototype._init = function (arg) {
		if (arg.length === 0) {
			(0, _index.warn)('初始化参数不能为空');
			return;
		}
		if ((0, _index.isArray)(arg) && arg.length > 0) {
			var op = parseOption.call(this, arg);
		}
	};
	window.el = function () {
		var arg = (0, _index.toArray)(arguments);

		if (arg.length === 0) {
			(0, _index.error)('el初始化参数不能为空');
			return;
		}
		if ((0, _index.isArray)(arg) && arg.length > 0) {
			return _index2.createVdom.call(this, arg);
		}
	};
	window.mount = function (parent, vdom) {
		var d = (0, _index2.createEle)(vdom);
		//document.body.appendChild(d.el)
		_index.api.appendChild(parent, d.el);
	};
	window.patch = _index2.patch;
}

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.api = undefined;

var _index = __webpack_require__(0);

var _index2 = __webpack_require__(1);

var api = exports.api = Object.create(null);

if (_index.isBrowser) {
	api.createElement = function (tag) {
		return document.createElement(tag);
	};
	api.createTextNode = function (txt) {
		return document.createTextNode(txt);
	};
	api.appendChild = function (parent, child) {
		return parent.appendChild(child);
	};
	api.setAttribute = function (ele, key, value) {
		ele.setAttribute(key, value);
	};
	api.parentNode = function (node) {
		return node.parentNode;
	};
	api.insertBefore = function (parent, newNode, rf) {
		return parent.insertBefore(newNode, rf);
	};
	api.nextSibling = function (el) {
		return el.nextSibling;
	};
	api.removeChild = function (parent, rc) {
		return parent.removeChild(rc);
	};
	api.appendChildren = function (ele, children) {
		if (ele && (0, _index.isArray)(children)) {
			for (var i = 0; i < children.length; i++) {
				var c = void 0;
				if (children[i] instanceof _index2.Vdom) {
					c = children[i].el || (0, _index2.createEle)(children[i]).el;
				} else if ((0, _index.isString)(children[i])) {
					c = this.createTextNode(children[i]);
				}

				this.appendChild(ele, c);
			}
		} else if (ele && (0, _index.isString)(children)) {
			this.appendChild(ele, this.createTextNode(children));
		}
	};
	api.setClass = function (ele, c) {
		if (ele && (0, _index.isArray)(c)) {
			var k = '';
			for (var i = 0; i < c.length; i++) {
				//ele.classList.add(c[i]);
				if (i !== c.length - 1) {
					k += c[i] + ' ';
				} else {
					k += c[i];
				}
			}
			ele.className = k;
		}
	};
	api.setAttrs = function (ele, a) {
		if (ele && (0, _index.isObject)(a)) {
			for (var k in a) {
				if (k === 'class') continue;
				var s = a[k];
				if (k === 'style' && (0, _index.isObject)(s)) {
					for (var j in s) {
						ele.style[j] = s[j];
						console.log(j, s[j]);
					}
				} else {
					this.setAttribute(ele, k, s);
				}
			}
		}
	};
	api.removeChildren = function (ele) {
		var i = void 0,
		    ch = ele.childNodes;
		while (ch[0]) {
			this.removeChild(ele, ch[0]);
		}
	};
} else {
	(0, _index.error)("There is not in browser's env");
}

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.error = error;
exports.warn = warn;
function error(info) {
	var context = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;

	if (typeof console !== 'undeifine') {
		console.error(info);
	}
}
function warn(info) {
	var context = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;

	if (typeof console !== 'undeifine') {
		console.warn(info);
	}
}

/***/ }),
/* 5 */
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
/* 6 */
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
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.createEle = createEle;

var _index = __webpack_require__(0);

function createEle(vdom) {
	var i = void 0,
	    e = void 0;
	if ((i = vdom.tagName) && vdom.el === null) e = _index.api.createElement(i);
	if (vdom.el && vdom.el.nodeType === 1) e = vdom.el; // if exist el, update el
	if ((i = vdom.className).length > 0) _index.api.setClass(e, i);
	if ((0, _index.isObject)(i = vdom.data) > 0) _index.api.setAttrs(e, i);
	if ((i = vdom.children) !== null) _index.api.appendChildren(e, i);
	if ((0, _index.isString)(vdom)) return _index.api.createTextNode(vdom); //textNode
	vdom.el = e;

	return vdom;
}

/***/ }),
/* 8 */
/***/ (function(module, exports) {

throw new Error("Module build failed: SyntaxError: Unexpected token, expected ; (8:6)\n\n\u001b[0m \u001b[90m  6 | \u001b[39m\t\tstate \u001b[33m=\u001b[39m \u001b[35m0\u001b[39m\u001b[33m,\u001b[39m\n \u001b[90m  7 | \u001b[39m\t\tj \u001b[33m=\u001b[39m \u001b[35m0\u001b[39m\u001b[33m,\u001b[39m\n\u001b[31m\u001b[1m>\u001b[22m\u001b[39m\u001b[90m  8 | \u001b[39m\t\tvdom\u001b[33m.\u001b[39msel \u001b[33m=\u001b[39m query\u001b[33m;\u001b[39m\n \u001b[90m    | \u001b[39m\t\t    \u001b[31m\u001b[1m^\u001b[22m\u001b[39m\n \u001b[90m  9 | \u001b[39m\t\u001b[36mfor\u001b[39m(let i \u001b[33m=\u001b[39m \u001b[35m0\u001b[39m\u001b[33m,\u001b[39m len \u001b[33m=\u001b[39m query\u001b[33m.\u001b[39mlength\u001b[33m;\u001b[39m i \u001b[33m<\u001b[39m len\u001b[33m;\u001b[39m i\u001b[33m++\u001b[39m){\n \u001b[90m 10 | \u001b[39m\t\tlet char \u001b[33m=\u001b[39m query[i]\u001b[33m;\u001b[39m\n \u001b[90m 11 | \u001b[39m\t\t\t\u001b[36mif\u001b[39m(char \u001b[33m===\u001b[39m \u001b[32m'.'\u001b[39m \u001b[33m||\u001b[39m char \u001b[33m===\u001b[39m \u001b[32m'#'\u001b[39m \u001b[33m||\u001b[39m (k \u001b[33m=\u001b[39m i \u001b[33m===\u001b[39m len\u001b[33m-\u001b[39m\u001b[35m1\u001b[39m)){\u001b[0m\n");

/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.patch = patch;

var _index = __webpack_require__(0);

var _index2 = __webpack_require__(1);

function sameNode(oldVnode, vnode) {
	return vnode.tagName === oldVnode.tagName;
}

function patchNode(oldVnode, vnode) {
	var el = vnode.el = oldVnode.el;
	var i = void 0,
	    oldCh = oldVnode.children,
	    ch = vnode.children;
	if (oldVnode === vnode) return;
	//update class attr	
	_index.api.setClass(el, vnode.className);
	_index.api.setAttrs(el, vnode.data);
	if (oldCh && ch && oldCh !== ch) {
		updateChildren(el, oldCh, ch);
	} else if (ch) {
		(0, _index2.createEle)(vnode); //create el children
	} else if (oldCh) {
		_index.api.removeChildren(el);
	}
}

function updateChildren(oldch, ch) {}

function patch(oldVnode, vnode) {

	if (sameNode(oldVnode, vnode)) {
		patchNode(oldVnode, vnode);
	} else {
		var oEl = oldVnode.el;
		var parentEle = _index.api.parentNode(oEl);
		(0, _index2.createEle)(vnode);
		if (parentEle !== null) {
			_index.api.insertBefore(parentEle, vnode.el, _index.api.nextSibling(oEl));
			_index.api.removeChild(parentEle, oldVnode.el);
			oldVnode = null;
		}
	}
	return vnode;
}

/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
		value: true
});
exports.Vdom = Vdom;
function Vdom() {
		this.tagName = null;
		this.sel = null;
		this.id = null;
		this.className = [];
		this.children = null;
		this.el = null;
		this.data = null;
		this.key = null;
		this.text = null;
}

/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.Aoy = Aoy;

var _baseInit = __webpack_require__(2);

var _index = __webpack_require__(0);

function Aoy() {
	if (this instanceof Aoy) {
		var arg = (0, _index.toArray)(arguments);
		this._init(arg);
	}
}

(0, _baseInit.baseInit)(Aoy);

if (_index.isBrowser) window.Aoy = Aoy;

/***/ })
/******/ ]);
//# sourceMappingURL=aoy.js.map