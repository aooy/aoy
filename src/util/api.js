import { isBrowser ,error, isArray, isObject, isString } from './index'
import { Vdom, createEle } from '../vdom/index'

export let api = Object.create(null);

if(isBrowser){
	api.createElement = function(tag){
		return document.createElement(tag);
	}; 
	api.createTextNode = function(txt){
		return document.createTextNode(txt);
	};
	api.appendChild = function(parent, child){
		return parent.appendChild(child);
	};
	api.setAttribute = function(ele, key, value){
		ele.setAttribute(key, value);
	};
	api.removeAttribute = function(ele, key){
		ele.removeAttribute(key);
	};
	api.parentNode = function(node){
		return node.parentNode;
	};
	api.insertBefore = function(parent, newNode, rf){
		return parent.insertBefore(newNode, rf);
	};
	api.nextSibling = function(el){
		return el.nextSibling;
	};
	api.removeChild = function(parent, rc){
		return parent.removeChild(rc);
	};
	api.setTextContent = function(ele, txt){
		ele.textContent = txt;
	};
	api.setId = function(ele, id){
		ele.id = id;
	};
	api.replaceChild = function(parent, newChild, oldChild){
		parent.replaceChild(newChild, oldChild);
	};
	api.appendChildren = function(ele, children){
		if(ele && isArray(children)){
			for(let i = 0; i < children.length; i++){
				let c;
				if(children[i] instanceof Vdom){
					c = children[i].el || createEle(children[i]).el;
				}
				this.appendChild(ele, c);
			}
		}
	};
	api.setClass = function(ele, c){
		if(ele && isArray(c)){
			let k = '';
			for(let i = 0; i < c.length; i++){
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
	api.setAttrs = function(ele, a){
		if(ele && isObject(a)){

			for(let k in a){
				if(k === 'class') continue;
				let s = a[k];
				if(k === 'style' && isObject(s)){
					for(let j in s){
						ele.style[j] = s[j];
					}
				}else{
					ele[k] = s;
				}
			}
		}
	};
	api.removeAttrs = function(vn){
		if(vn.attr.length > 0){
			for(let i = 0; i < vn.attr.length; i++){
				this.removeAttribute(vn.el, vn.attr[i]);
			}
		}
	};
	api.removeChildren = function(ele){
		let i, ch = ele.childNodes;
		while(ch[0]){
			this.removeChild(ele, ch[0]);
		}
	};
}else{
	error("There is not in browser's env");
}













