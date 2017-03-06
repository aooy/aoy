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
function warn(info, context){
	if ( context === void 0 ) context=null;

	if(typeof console !== 'undeifine'){
		console.warn(info);
	}
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

function Vdom(){
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

function parseQuery(vdom, query){
	var k,
		state = 0,
		j = 0;
	for(var i = 0, len = query.length; i < len; i++){
		var char = query[i];
			if(char === '.' || char === '#' || (k = i === len-1)){
				if(state === 0){
					vdom.tagName = query.substring(j, !k ? i : len).toUpperCase();
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
			if(v.length === 1 && isString(v[0])) { vd.text = v[0]; }
		}else if(i != 0 && isString(v)){
			//textNode
			vd.children = v;
			vd.text = v;
		}
		i++;
	}
	//createEle(vd);// create true dom
	console.log(vd);
	return vd;
}

function createEle(vdom){
	var i, e;
	if( (i = vdom.tagName) && vdom.el === null) { e = api$$1.createElement(i); }
	if( vdom.el && vdom.el.nodeType === 1 ) { e = vdom.el; } // if exist el, update el
	if( (i = vdom.className).length > 0 ) { api$$1.setClass(e, i); }
	if( isObject(i = vdom.data) > 0 ) { api$$1.setAttrs(e, i); }
	if( (i = vdom.children) !== null ) { api$$1.appendChildren(e, i); }
	if( isString(vdom)) { return api$$1.createTextNode(vdom); } //textNode
	vdom.el = e;

	return vdom;
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
				var c = (void 0);
				if(children[i] instanceof Vdom){
					c = children[i].el || createEle(children[i]).el;
				}else if(isString(children[i])){
					c = this$1.createTextNode(children[i]);
				}
				
				this$1.appendChild(ele, c);
			}
		}else if(ele && isString(children)){
			this.appendChild(ele, this.createTextNode(children));
		}
	};
	api$$1.setClass = function(ele, c){
		if(ele && isArray(c)){
			var k = '';
			for(var i = 0; i < c.length; i++){
				//ele.classList.add(c[i]);
				if(i !== c.length-1){
					k += c[i] + ' ';
				}else{
					k += c[i];
				}
			}
			ele.className = k;
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
						console.log(j,s[j]);
					}
				}else{
					this$1.setAttribute(ele, k, s);
				}
			}
		}
	};
}else{
	error("There is not in browser's env");
}

function baseInit(Aoy){
	Aoy.prototype._init = function(arg){
		if(arg.length === 0){
			warn('初始化参数不能为空');
			return;
		}
		if(isArray(arg) && arg.length > 0) {
			var op = parseOption.call(this,arg);
		}	
	};
	window.el = function(){
		var arg = toArray(arguments);

		if(arg.length === 0){
			error('el初始化参数不能为空');
			return;
		}
		if(isArray(arg) && arg.length > 0) {
			return createVdom$$1.call(this,arg);
		}	
	};
	window.mount = function(parent ,vdom){
		var d = createEle(vdom);
		document.body.appendChild(d.el);
		//api.appendChild(parent, d.el);
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
