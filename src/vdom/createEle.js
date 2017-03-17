import { api, isObject, isString } from '../util/index'

export function createEle (vdom) {
	let i, e 
	if( !vdom.el && (i = vdom.text)) {
		e = vdom.el = api.createTextNode(i)
		return vdom
	} 
	if ( (i = vdom.tagName) && vdom.el === null) {
		e = vdom.el = api.createElement(i)
	}else if (vdom.el.nodeType === 1) {
		e = vdom.el
	}
	updateEle(e, vdom)
	return vdom
}

export function updateEle (e ,vdom, oldVdom) {
	let i
	if( (i = vdom.className).length > 0 ) api.setClass(e, i)
	if( (i = vdom.data) !== null ) api.setAttrs(e, i)
	if( (i = vdom.id) !== null ) api.setId(e, i)
	if( (i = vdom.children) !== null && !oldVdom) api.appendChildren(e, i)
}
