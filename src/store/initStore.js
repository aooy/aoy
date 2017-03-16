import { isObject, warn } from '../util/index'
import { injectStore, Store } from './index'
import { AoyC } from '../instance/Aoy'

export function initStore(){
	let STORE = new Store();
	let archiver;
	if(this instanceof AoyC && !this._FINALSTORE){
		Object.defineProperty(this, 'store', {
			set: function(value){
				warn('Not allowed to modify store');
			},
			get: function(){
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






