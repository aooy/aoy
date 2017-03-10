import { isObject, error } from '../util/index'

export function injectStore(store, key, data){
	if(isObject(data)){
		store[key] = data;
		const archiver = new Archiver(data);
		for(let key in data){
			archiver(key);
		}
	}else{
		error('Data parameter must be a object');
		return;
	}
}

function Archiver(data) {
  let storage = Object.create(null);
  //let archive = [];
  this.getStore = function() { return storage; };
  return function(key){
  		storage[key] = data[key];
	  	Object.defineProperty(data, key, {
		    get: function() {
		      console.log('get')
		      return storage[key];
		    },
		    set: function(value) {
		      console.log('set')
		      storage[key] = value;
		    }
		  });
		}
}









