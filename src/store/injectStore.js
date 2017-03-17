import { isObject, error, api, warn } from '../util/index'
import { patch } from '../vdom/index'

export function injectStore (store, key, data, context) {
	let archiver
	if(isObject(data)){
		store[key] = data
		archiver = new Archiver(data,key,context)
		for(let k in data) {
			archiver(k)
		}
	}
	return data
}

function Archiver (data, sname, context) {
  let c
  let storage = {}
  let cm = context.componentManage
  let devc = function (c) {
		c.forEach( function(v, i) {
			let newVn = v.render()
			patch(v.vdom, newVn)
			v.vdom = newVn
		})
  }
  let des = function(key) {
	  return {
	  		  get: function() {
			      return storage[key]
			    },
			  set: function(value) {
			      storage[key] = value
			      if (c = cm[sname]) {
			   		 devc(c)
			      }
			    }
	  		}
  }
  api.defineProperty(data, 'set', {
  	value: function () {
  		let o
  		if (isObject(o = arguments[0])) {
  			for(let k in o){
  				if(!storage.hasOwnProperty(k)) {
  					api.defineProperty(data, k, des(k))
  				}
  				storage[k] = o[k]
  			}
  			if(c = cm[sname]) {
			   		 devc(c)
			   	}
  		}else{
  			error("set function's parameter must be a object")
  		}
  	}
  })
  return function (key) {
  		storage[key] = data[key]
	  	api.defineProperty(data, key, des(key))
	}
}









