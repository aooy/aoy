import  { isString, isObject, isArray} from './index'
import { Vdom } from '../vdom'

function parseQuery(query, vdom){
	let k,
		state = 0,
		j = 0;
	for(let i = 0, len = query.length; i < len; i++){
		let char = query[i];
			if(char === '.' || char === '#' || (k = i === len-1)){
				if(state === 0){
					vdom.tagName = query.substring(j, !k ? i : len);
				}else if(state === 1){
					vdom.class.push(query.substring(j, !k ? i : len));
				}else if(state === 2){
					vdom.id = query.substring(j, !k ? i : len);
				}
				state = (char === '.') ? 1 : (char === '#')? 2 : 3;
				j = i+1;
			}		

	}
	
}

export function createVdom(arg){
	
	let i=0,
		vd = Object.create(Vdom);

	while(i < arg.length){
		let v = arg[i];
		
		if(i === 0 && isString(v)){
			// div#id.classA
			vd.sel = v;
			parseQuery(v, vd)
		}else if(i != 0 && isObject(v)){
			// class style click
			vd.data = v;
		}else if(i != 0 && isArray(v)){
			// childern
			vd.childern = v;
		}

		i++;
	}
	console.log(vd)
	return vd;
}