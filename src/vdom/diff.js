import  { createEle,api } from '../util/index'

function sameNode(oldVnode, vnode){
	return vnode.tagName === oldVnode.tagName;
}

export function patch(oldVnode, vnode){
	
	if(sameNode(oldVnode, vnode)){
		patchNode(oldVnode, vnode);
	}else{
		const oEl = vnode.el;
		let parentEle = api.parentNode(el);
		createEle(vnode);
		if(parentEle !== null){
			api.insertBefore(parentEle, vnode.el, api.nextSibling(oEl));
			api.removeChild(parentEle, oldVnode.el);
			oldVnode = null;
		}
	}
}

function patchNode(oldVnode, vnode){
	
}





















