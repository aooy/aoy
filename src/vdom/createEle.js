import { api, isObject, isString } from '../util/index'
export function createEle(vdom){
	let i, e;
	if( (i = vdom.tagName) && vdom.el === null) e = api.createElement(i);
	if( vdom.el && vdom.el.nodeType === 1 ) e = vdom.el; // if exist el, update el
	if( (i = vdom.className).length > 0 ) api.setClass(e, i);
	if( isObject(i = vdom.data) > 0 ) api.setAttrs(e, i);
	if( (i = vdom.children) !== null ) api.appendChildren(e, i);
	if( isString(vdom)) return api.createTextNode(vdom); //textNode
	vdom.el = e;

	return vdom;
}