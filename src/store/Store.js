import { toArray, isString, isObject, error } from '../util/index'
import { injectStore } from './index'


export function Store(){
	let mainStore = {};
	this.add = function(){
		const arg = toArray(arguments);
		let subStore;
		if(arg.length > 0){
		  const iskey = isString(arg[0]);
		  const isdata = isObject(arg[1]);
		  if(iskey && isdata){
		  		subStore = injectStore(mainStore, arg[0], arg[1]);
			}else if(isdata){	
				subStore = injectStore(mainStore, '_DEFAULT', arg[1]);
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

	this.set = function(){

	};

	this.remove = function(key){
		if(key === undefined){
			key = '_DEFAULT';
		}
		delete mainStore[key];
	};

	this.connect = function(){
		
	};
}










