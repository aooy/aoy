import { isArray, isString, api } from '../util/index'
import { Component } from '../component/index'

export function connect (component, storeName) {
	let store = this.store
	let c = store.componentManage

	let getStore = store.get
	let cid = component._UID

	let _this = this
	let depfn = function(com, key) {
		if ( c[key]) {
			c[key].push(component)
		}else {
			c[key] = [component]
		}
		_this._dependent(cid, key)
		api.defineProperty(com, key, {
				get: function() {
					return getStore(key)
				} 
			})
	}

	if (component instanceof Component) {
		if(isString(storeName)){
			depfn(component, storeName)
		}else if (isArray(storeName)){
			for(let i =0; i < storeName.length; i++ ) {
				depfn(component, storeName[i])
			}
		}
		//render vdom
		this.mount(component.el, component)
	}
}