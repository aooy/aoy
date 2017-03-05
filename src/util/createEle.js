import { api } from './index'
export function createEle(vdom){
	let i, e;
	if( i = vdom.tagName ) e = api.createElement(i);
	if( (i = vdom.class).length > 0 ) api.addClass(e, i);
	if( (i = vdom.children).length > 0 ) api.appendChildren(e, i);
	vdom.el = e;
}