import { createVdom, createEle, patch }  from '../vdom/index'
import { api, isFunction } from '../util/index'
export function mount (parent,component) {
	const vnode = component.render()
	const d = createEle(vnode)
	component.vdom = vnode
	api.appendChild(parent, d.el)
}
