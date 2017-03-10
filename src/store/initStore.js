import { isObject, warn } from '../util/index'
import { injectStore, Store } from './index'

export function initStore(){
	let STORE = new Store();
	let archiver;
	if(this instanceof Aoy && !this._FINALSTORE){
		Object.defineProperty(this, 'store', {
			set: function(value){
				warn('Not allowed to modify store');
			},
			get: function(){
				console.log('get:取得store')
				return STORE;
			}
		})
		Object.defineProperty(this, '_FINALSTORE', {
			value: true
		})
	}else{
		warn('Not Aoy instance or Already init store');
	}
	//return STORE;
	return this;
}






