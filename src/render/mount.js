import { createVdom, createEle, patch }  from '../vdom/index'
import { api, isFunction } from '../util/index'
export function mount(parent,component){
	let i;
	if((i = component.willMount) && isFunction(i)){
		i.call(component);
	}
	const vnode = component.render();
	const d = createEle(vnode);
	if((i = component.didMount) && isFunction(i)){
		i.call(component);
	}
	component.vdom = vnode;
	api.appendChild(parent, d.el);

}