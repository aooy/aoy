import { isObject, error, api, warn } from '../util/index'
import { patch } from '../vdom/index'
export function injectStore(store, key, data, context){
	let archiver;
	if(isObject(data)){
		store[key] = data;
		archiver = new Archiver(data,key,context);
		for(let k in data){
			archiver(k);
		}
	}else{
		error('Data parameter must be a object');
		return;
	}
	return data;
}

function Archiver(data, sname, context) {
  let c;
  let storage = {};
  let cm = context.componentManage;
  let des  = function(key){
	  return {
	  		  get: function() {
			      console.log('get:'+key+';sname:'+sname+';store', context)
			      return storage[key];
			    },
			  set: function(value) {
			      console.log('set'+key+';sname:'+sname)
			      storage[key] = value;
			      if(c = cm[sname]){
			   			c.forEach(function(v, i){
			   				let newVn = v.render();
			   				patch(v.vdom, newVn);
			   				v.vdom = newVn;
			   			});
			      	console.log('有组件依赖此属性',cm[sname])
			      }
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









