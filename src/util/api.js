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
	api.appendChildren = function(ele, children){
		if(ele && isArray(children)){
			for(let i = 0; i < children.length; i++){
				let c;
				if(children[i] instanceof Vdom){
					c = children[i].el || createEle(children[i]).el;
				}else if(isString(children[i])){
					c = this.createTextNode(children[i]);
				}
				
				this.appendChild(ele, c);
			}
		}else if(ele && isString(children)){
			this.appendChild(ele, this.createTextNode(children));
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
						console.log(j,s[j])
					}
				}else{
					this.setAttribute(ele, k, s);
				}
			}
		}
	};
}else{
	error("There is not in browser's env");
}













