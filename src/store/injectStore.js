import { isObject, error, api, warn } from '../util/index'

let sid = -1;
export function injectStore(store, key, data){
	let archiver;
	if(isObject(data)){
		if(store.hasOwnProperty(key)) sid++;
		store[key] = data;
		archiver = new Archiver(data, sid);
		for(let key in data){
			archiver(key);
		}
	}else{
		error('Data parameter must be a object');
		return;
	}
	return data;
}

function Archiver(data) {
  let storage = {};
  let des  = function(key){
	  return {
	  		  get: function() {
			      console.log('get:'+key)
			      return storage[key];
			    },
			  set: function(value) {
			      console.log('set'+key)
			      storage[key] = value;
			    }
	  		};
  }
  api.defineProperty(data, 'set', {
  	value: function(){
  		let o;
  		if(isObject(o = arguments[0])){
  			for(let k in o){
  				if(!storage.hasOwnProperty(k)){
  					console.log('new key')
  					api.defineProperty(data, k, des(k));
  				}
  				storage[k] = o[k];
  			}
  		}else{
  			error("set function's parameter must be a object");
  		}
  	}
  });
  return function(key){
  		storage[key] = data[key];
	  	api.defineProperty(data, key, des(key));
	}
}









