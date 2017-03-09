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
		this.attr = [];
}

function sameVnode(oldVnode, vnode){
	return vnode.key === oldVnode.key && vnode.sel === oldVnode.sel;
}
function createKeyToOldIdx(children, beginIdx, endIdx) {
    var i, map = {}, key, ch;
    for (i = beginIdx; i <= endIdx; ++i) {
        ch = children[i];
        if (ch != null) {
            key = ch.key;
            if (key !== null)
                { map[key] = i; }
        }
    }
    return map;
}
function removeVnodes(parentElm, vnodes, startIdx, endIdx) {
        for (; startIdx <= endIdx; ++startIdx) {
            var ch = vnodes[startIdx];
            if (ch != null) {
                    api$$1.removeChild(parentElm, ch.el);
            }
        }
    }
function addVnodes(parentElm, before, vnodes, startIdx, endIdx) {
        for (; startIdx <= endIdx; ++startIdx) {
            var ch = vnodes[startIdx];
            if (ch != null) {
                api$$1.insertBefore(parentElm, createElm(ch, insertedVnodeQueue), before);
            }
        }
    }    
function patchVnode(oldVnode, vnode){
	var el = vnode.el = oldVnode.el;
    var i, oldCh = oldVnode.children, ch = vnode.children;
    if (oldVnode === vnode) { return; }
    if(oldVnode.text && vnode.text && oldVnode.text !== vnode.text){
    	api$$1.setTextContent(el, vnode.text);
    }
    //update class attr	
    updateEle(el, vnode, oldVnode);
    if(ch && ch[0].text && ch.length === 1){
    	//it's childern only a textNode
    	if(!oldCh || oldCh.length !== ch.length || oldCh[0].text !== ch[0].text){
    		api$$1.removeChild(el, oldCh[0].el);
    		api$$1.appendChild(el, createEle(ch[0]).el);
    	}
    }else{
    	if(oldCh && ch && oldCh !== ch){
	    	updateChildren(el, oldCh, ch);
	    }else if(ch){
	    	createEle(vnode); //create el's children dom
	    }else if(oldCh){
	    	api$$1.removeChildren(el);
	    }
    }
}

function updateChildren(parentElm, oldCh, newCh){
	var oldStartIdx = 0, newStartIdx = 0;
    var oldEndIdx = oldCh.length - 1;
    var oldStartVnode = oldCh[0];
    var oldEndVnode = oldCh[oldEndIdx];
    var newEndIdx = newCh.length - 1;
    var newStartVnode = newCh[0];
    var newEndVnode = newCh[newEndIdx];
    var oldKeyToIdx;
    var idxInOld;
    var elmToMove;
    var before;
    while (oldStartIdx <= oldEndIdx && newStartIdx <= newEndIdx) {
            if (oldStartVnode == null) {
                oldStartVnode = oldCh[++oldStartIdx]; // Vnode might have been moved left
            }
            else if (oldEndVnode == null) {
                oldEndVnode = oldCh[--oldEndIdx];
            }
            else if (newStartVnode == null) {
                newStartVnode = newCh[++newStartIdx];
            }
            else if (newEndVnode == null) {
                newEndVnode = newCh[--newEndIdx];
            }
            else if (sameVnode(oldStartVnode, newStartVnode)) {
                patchVnode(oldStartVnode, newStartVnode);
                oldStartVnode = oldCh[++oldStartIdx];
                newStartVnode = newCh[++newStartIdx];
            }
            else if (sameVnode(oldEndVnode, newEndVnode)) {
                patchVnode(oldEndVnode, newEndVnode);
                oldEndVnode = oldCh[--oldEndIdx];
                newEndVnode = newCh[--newEndIdx];
            }
            else if (sameVnode(oldStartVnode, newEndVnode)) {
                patchVnode(oldStartVnode, newEndVnode);
                api$$1.insertBefore(parentElm, oldStartVnode.el, api$$1.nextSibling(oldEndVnode.el));
                oldStartVnode = oldCh[++oldStartIdx];
                newEndVnode = newCh[--newEndIdx];
            }
            else if (sameVnode(oldEndVnode, newStartVnode)) {
                patchVnode(oldEndVnode, newStartVnode);
                api$$1.insertBefore(parentElm, oldEndVnode.el, oldStartVnode.el);
                oldEndVnode = oldCh[--oldEndIdx];
                newStartVnode = newCh[++newStartIdx];
            }
            else {
                if (oldKeyToIdx === undefined) {
                    oldKeyToIdx = createKeyToOldIdx(oldCh, oldStartIdx, oldEndIdx);
                }
                idxInOld = oldKeyToIdx[newStartVnode.key];
                if (!idxInOld) {
                    api$$1.insertBefore(parentElm, createEle(newStartVnode).el, oldStartVnode.el);
                    newStartVnode = newCh[++newStartIdx];
                }
                else {
                    elmToMove = oldCh[idxInOld];
                    if (elmToMove.sel !== newStartVnode.sel) {
                        api$$1.insertBefore(parentElm, createEle(newStartVnode).el, oldStartVnode.el);
                    }
                    else {
                        patchVnode(elmToMove, newStartVnode);
                        oldCh[idxInOld] = null;
                        api$$1.insertBefore(parentElm, elmToMove.el, oldStartVnode.el);
                    }
                    newStartVnode = newCh[++newStartIdx];
                }
            }
        }
        if (oldStartIdx > oldEndIdx) {
            before = newCh[newEndIdx + 1] == null ? null : newCh[newEndIdx + 1].el;
            addVnodes(parentElm, before, newCh, newStartIdx, newEndIdx);
        }
        else if (newStartIdx > newEndIdx) {
            removeVnodes(parentElm, oldCh, oldStartIdx, oldEndIdx);
        }
}

function patch$$1(oldVnode, vnode){
	
	if(sameVnode(oldVnode, vnode)){
		patchVnode(oldVnode, vnode);
	}else{
		var oEl = oldVnode.el;
		var parentEle = api$$1.parentNode(oEl);
		createEle(vnode);
		if(parentEle !== null){
			api$$1.insertBefore(parentEle, vnode.el, api$$1.nextSibling(oEl));
			api$$1.removeChild(parentEle, oldVnode.el);
			oldVnode = null;
		}
	}
	return vnode;
}

function parseQuery(vdom, query){
	var k,
		state = 0,
		j = 0;
	vdom.sel = query;
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
	for(var k in v){
		if(k === 'class'){
			var i = v[k].split(' ');
			for(var j = 0; j < i.length; j++){
				vdom.className.push(i[j]);
			}
		}else if(k === 'key'){
			vdom.key = v[k];
		}else if(k !== 'style'){
			vdom.attr.push(k);	
		}
	}
	vdom.data = v;
}

function parseChindren(vdom, v){
	var a = [];
	if(isString(v)) { v = [v]; }
	for(var i = 0; i < v.length; i++){
		if(!(v[i] instanceof Vdom)){
			a.push(createVdomTxt$$1(v[i]));
		}else{
			a.push(v[i]);
		}
	}
	vdom.children = a;
}
function createVdomTxt$$1(str){
	var vd = new Vdom();
	if(isString(str)){
		vd.text = str;
	}
	return vd;
}
function createVdom$$1(arg){
	var i=0,
		vd = new Vdom();

	while(i < arg.length){
		var v = arg[i];
		if(i === 0 && isString(v)){
			// div#id.classA
			parseQuery(vd, v);
		}else if(i != 0){
			if(isObject(v)){
				// class style clickEvent .ect
				parseData(vd, v);
			}else if(isArray(v) || isString(v)){
				// childern
				parseChindren(vd, v);
			}
		}
		i++;
	}
	console.log(vd);
	return vd;
}

function createEle(vdom){
	var i, e; 
	if( !vdom.el && (i = vdom.text)){
		e = vdom.el = api$$1.createTextNode(i);
		return vdom;
	} 
	if( (i = vdom.tagName) && vdom.el === null){
		e = vdom.el = api$$1.createElement(i);
	}else if(vdom.el.nodeType === 1){
		e = vdom.el;
	}
	updateEle(e, vdom);
	return vdom;
}

function updateEle(e ,vdom, oldVdom){
	var i;
	if( (i = oldVdom) && i.attr.length > 0 ) { api$$1.removeAttrs(i); }
	if( (i = vdom.className).length > 0 ) { api$$1.setClass(e, i); }
	if( (i = vdom.data) !== null ) { api$$1.setAttrs(e, i); }
	if( (i = vdom.id) !== null ) { api$$1.setId(e, i); }
	if( (i = vdom.children) !== null && !oldVdom) { api$$1.appendChildren(e, i); }
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
	api$$1.removeAttribute = function(ele, key){
		ele.removeAttribute(key);
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
	api$$1.setTextContent = function(ele, txt){
		ele.textContent = txt;
	};
	api$$1.setId = function(ele, id){
		ele.id = id;
	};
	api$$1.replaceChild = function(parent, newChild, oldChild){
		parent.replaceChild(newChild, oldChild);
	};
	api$$1.appendChildren = function(ele, children){
		var this$1 = this;

		if(ele && isArray(children)){
			for(var i = 0; i < children.length; i++){
				var c = (void 0);
				if(children[i] instanceof Vdom){
					c = children[i].el || createEle(children[i]).el;
				}
				this$1.appendChild(ele, c);
			}
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
					}
				}else{
					this$1.setAttribute(ele, k, s);
				}
			}
		}
	};
	api$$1.removeAttrs = function(vn){
		var this$1 = this;

		if(vn.attr.length > 0){
			for(var i = 0; i < vn.attr.length; i++){
				this$1.removeAttribute(vn.el, vn.attr[i]);
			}
		}
	};
	api$$1.removeChildren = function(ele){
		var this$1 = this;

		var i, ch = ele.childNodes;
		while(ch[0]){
			this$1.removeChild(ele, ch[0]);
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
			return createVdom$$1.call(this, arg);
		}	
	};
	window.mount = function(parent,vdom){
		var d = createEle(vdom);
		//document.body.appendChild(d.el)
		api$$1.appendChild(parent, d.el);
	};
	window.patch = patch$$1;
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
//# sourceMappingURL=aoy.js.map
