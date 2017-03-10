import { toArray, isString, isObject, error } from '../util/index'
import { injectStore } from './index'

export function Store(){
	let mainStore = {};
	this.add = function(){
		const arg = toArray(arguments);
		if(arg.length > 0){
		  const iskey = isString(arg[0]);
		  const isdata = isObject(arg[1]);
		  if(iskey && isdata){
		  		//mainStore[arg[0]] = arg[1];
		  		injectStore(mainStore, arg[0], arg[1]);
			}else if(isdata){
				//mainStore['_DEFAULT'] = arg[1];	
				injectStore(mainStore, '_DEFAULT', arg[1]);
			}else{
				error('Missing key or data parameter');
			}
		}
		
	};

	this.get = function(key){
		return mainStore[key];
	};

	this.set = function(){
		
	};

	this.remove = function(){

	};
}


