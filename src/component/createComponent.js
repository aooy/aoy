import { isObject, api } from '../util/index'
import { Component } from './index'
let uid = 0;

export function createComponent(cp){
	let c;
	let _this = this;
	let cid = uid++;
	return function(){
		let aoy = _this;
		if(isObject(cp)){
			c = new Component(cp);
			api.defineProperty(c, 'aoy', {
				value: _this
			});
			api.defineProperty(c, '_UID', {
				value: cid
			});
		}
		return c;
	}();
}











