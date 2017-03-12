import { createVdom, createEle, patch }  from '../vdom/index'
import { api } from '../util/index'
export function mount(parent,component){
	const vnode = component.render();
	component.vdom = vnode;
	const d = createEle(vnode);
	api.appendChild(parent, d.el);
}