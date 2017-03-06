(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
	typeof define === 'function' && define.amd ? define(['exports'], factory) :
	(factory((global.index = global.index || {})));
}(this, (function (exports) { 'use strict';

function error(info, context){
	if ( context === void 0 ) context=null;

	if(typeof console !== 'undeifine'){
		console.error(info);
	}
}

function Vdom(){
	return  {
		tagName: null,
		sel: null,
		id: null,
		className: [],
		children: [],
		el: null,
		key: null
	};
}

function parseQuery(vdom, query){
	var k,
		state = 0,
		j = 0;
	for(var i = 0, len = query.length; i < len; i++){
		var char = query[i];
			if(char === '.' || char === '#' || (k = i === len-1)){
				if(state === 0){
					vdom.tagName = query.substring(j, !k ? i : len);
				}else if(state === 1){
					vdom.className.push(query.substring(j, !k ? i : len));
				}else if(state === 2){
					vdom.id = query.substring(j, !k ? i : len);
				}
				state = (char === '.') ? 1 : (char === '#')? 2 : 3;
				j = i+1;
			}		

	}
	
}
function parseData(vdom, v){
	var i;
	vdom.data = v;
	if((i = v.class) != null && i.length > 0){
		i.split(' ').forEach(function(v, j){
			vdom.className.push(v);
		});
	}
}
function createVdom$$1(arg){
	var i=0,
		vd = new Vdom;

	while(i < arg.length){
		var v = arg[i];
		if(i === 0 && isString(v)){
			// div#id.classA
			vd.sel = v;
			parseQuery(vd, v);
		}else if(i != 0 && isObject(v)){
			// class style clickEvent
			parseData(vd, v);
		}else if(i != 0 && isArray(v)){
			// childern
			vd.children = v;
		}
		i++;
	}
	//createEle(vd);// create true dom
	console.log(vd);
	return vd;
}

function judge(o){
	return Object.prototype.toString.call(o);
}

function isArray(arr){
	return judge(arr) === '[object Array]';
}

function isObject(o){
	return judge(o) === '[object Object]';
}

	

function isString(s){
	return typeof s === 'string';
}





var isBrowser = true;
try{
	isBrowser = typeof window !== 'undefined' && isObject(window) !== '[object Object]';
}catch(e){
	isBrowser = false;
}

function toArray(arr){
	return [].slice.call(arr);
}

var api$$1 = Object.create(null);

if(isBrowser){
	api$$1.createElement = function(tag){
		return document.createElement(tag);
	}; 
	api$$1.createTextNode = function(txt){
		return document.createTextNode(txt);
	};
	api$$1.appendChild = function(parent, child){
		return parent.appendChild(child);
	};
	api$$1.setAttribute = function(ele, key, value){
		ele.setAttribute(key, value);
	};
	api$$1.parentNode = function(node){
		return node.parentNode;
	};
	api$$1.insertBefore = function(parent, newNode, rf){
		return parent.insertBefore(newNode, rf);
	};
	api$$1.nextSibling = function(el){
		return el.nextSibling;
	};
	api$$1.removeChild = function(parent, rc){
		return parent.removeChild(rc);
	};
	api$$1.appendChildren = function(ele, children){
		var this$1 = this;

		if(ele && isArray(children)){
			for(var i = 0; i < children.length; i++){
				var c = children[i].el ? children[i].el : this$1.createTextNode(children[i]);
				this$1.appendChild(ele, c);
			}
		}
	};
	api$$1.addClass = function(ele, c){
		if(ele && isArray(c)){
			for(var i = 0; i < c.length; i++){
				ele.classList.add(c[i]);
			}
		}
	};
	api$$1.setAttrs = function(ele, a){
		var this$1 = this;

		if(ele && isObject(a)){
			for(var k in a){
				if(k === 'class') { continue; }
				var s = a[k];
				if(k === 'style' && isObject(s)){
					for(var j in s){
						ele.style[j] = s[j];
					}
				}
				this$1.setAttribute(ele, k, s);
			}
		}
	};
}else{
	error("There is not in browser's env");
}

function baseInit(Mdom){
	Mdom.prototype._init = function(arg){
		if(arg.length === 0){
			error('初始化参数不能为空');
			return;
		}
		if(isArray(arg) && arg.length > 0) {
			var op = parseOption.call(this,arg);
		}	
	};
	window.el = function(){
		var arg = toArray(arguments);

		if(arg.length === 0){
			error('初始化参数不能为空');
			return;
		}
		if(isArray(arg) && arg.length > 0) {
			return createVdom$$1.call(this,arg);
		}	
		 
	};
}

function Aoy(){
	if(this instanceof Aoy){
		var arg = toArray(arguments);
		this._init(arg);
	}	
}

baseInit(Aoy);

if(isBrowser) { window.Aoy = Aoy; }

exports.Aoy = Aoy;

Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=vdom.js.map
