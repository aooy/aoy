import { isBrowser ,error, isArray } from './index'

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
	api.appendChildren = function(ele, children){
		if(ele && isArray(children)){
			for(let i = 0; i < children.length; i++){
				let c = children[i].el ? children[i].el : this.createTextNode(children[i]);
				this.appendChild(ele, c);
			}
		}
	};
	api.addClass = function(ele, c){
		if(ele && isArray(c)){
			for(let i = 0; i < c.length; i++){
				ele.classList.add(c[i]);
			}
		}
	};
}else{
	error('env is not in browser');
}
