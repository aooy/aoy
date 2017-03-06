import  { isString, isObject, isArray } from '../util/index'
import { Vdom, createEle  } from './index'

function parseQuery(vdom, query){
	let k,
		state = 0,
		j = 0;
	for(let i = 0, len = query.length; i < len; i++){
		let char = query[i];
			if(char === '.' || char === '#' || (k = i === len-1)){
				if(state === 0){
					vdom.tagName = query.substring(j, !k ? i : len).toUpperCase();
				}else if(state === 1){
					vdom.className.push(query.substring(j, !k ? i : len));
				}else if(state === 2){
					vdom.id = query.substring(j, !k ? i : len);
				}
				state = (char === '.') ? 1 : (char === '#')? 2 : 3;
				j = i+1;
			}		

	}
	
}
function parseData(vdom, v){
	let i;
	vdom.data = v;
	if((i = v.class) != null && i.length > 0){
		i.split(' ').forEach(function(v, j){
			vdom.className.push(v);
		});
	}
}
export function createVdom(arg){
	let i=0,
		vd = new Vdom;

	while(i < arg.length){
		let v = arg[i];
		if(i === 0 && isString(v)){
			// div#id.classA
			vd.sel = v;
			parseQuery(vd, v)
		}else if(i != 0 && isObject(v)){
			// class style clickEvent
			parseData(vd, v)
		}else if(i != 0 && isArray(v)){
			// childern
			vd.children = v;
			if(v.length === 1 && isString(v[0])) vd.text = v[0];
		}else if(i != 0 && isString(v)){
			//textNode
			vd.children = v;
			vd.text = v;
		}
		i++;
	}
	//createEle(vd);// create true dom
	console.log(vd)
	return vd;
}