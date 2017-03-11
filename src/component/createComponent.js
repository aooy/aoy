import { isObject, api } from '../util/index'

let uid = 0;

export function createComponent(cp){
	let c;
	let _this = this;
	let cid = uid++;
	return function(){
		if(isObject(cp)){
			c = new function(){
				return cp;
			};
			api.defineProperty(c, 'store', {
				get: function(){
					console.log(cid+':')
					_this.__CALLSTORECID__ = cid;
					return _this.store;
				}
			});
			api.defineProperty(c, '_UID', {
				value: cid
			});
		}
		return c;
	}();
}











