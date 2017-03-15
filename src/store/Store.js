import { toArray, isString, isObject, error, api } from '../util/index'
import { injectStore } from './index'


export function Store(){
	let mainStore = {};
	this.componentManage = {};
	this.add = function(){
		const arg = toArray(arguments);
		let subStore;
		if(arg.length > 0){
		  const iskey = isString(arg[0]);
		  const isdata = isObject(arg[1]);
		  const iskeyobj = isObject(arg[0]);

		  if(iskey && isdata){
		  		subStore = injectStore(mainStore, arg[0], arg[1], this);
			}else if(iskeyobj){	
				subStore = injectStore(mainStore, '_DEFAULT', arg[0], this);
			}else{
				error('Missing key or data parameter');
			}
		}
		return subStore;
	};

	this.get = function(key){
		if(key === undefined){
			key = '_DEFAULT';
		}
		return mainStore[key];
	};

	this.getMainStore = function(){
		return mainStore;
	};

	this.remove = function(key){
		if(key === undefined){
			key = '_DEFAULT';
		}
		delete mainStore[key];
	};
}










