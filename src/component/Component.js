import { isObject } from '../util/index'

export function Component(op){
	//let origin = {};
	if(isObject(op)){
		//Object.assign(origin, op);
		for(let k in op){
			this[k] = op[k]
		}
	}
	//return origin;
}