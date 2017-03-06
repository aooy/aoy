import { api, isObject } from './index'
export function createEle(vdom){
	let i, e;
	if( i = vdom.tagName ) e = api.createElement(i);
	if( (i = vdom.className).length > 0 ) api.addClass(e, i);
	if( isObject(i = vdom.data) > 0 ) api.setAttrs(e, i);
	if( (i = vdom.children).length > 0 ) api.appendChildren(e, i);
	vdom.el = e;
}