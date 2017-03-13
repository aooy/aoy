import { isArray, isString, api } from '../util/index'
import { Component } from '../component/index'

export function connect(component, storeName){
	let c;
	let store = this.store;
	let getStore = store.get;
	let cid = component._UID;
	if( c = store.componentManage[storeName]){
		c = c.push(component);
	}else{
		store.componentManage[storeName] = [component];
	}

	let _this = this;
	let fn = function(com, key){
		_this._dependent(cid, key);
		api.defineProperty(com, key, {
				get: function(){
					return getStore(key);
				} 
			});
	};

	if(component instanceof Component){
		if(isString(storeName)){
			fn(component, storeName)
		}else if(isArray(storeName)){
			for(let i =0; i < storeName.length; i++ ){
				fn(component, storeName[i])
			}
		}
		//render vdom
		this.mount(component.el, component);
	}
}