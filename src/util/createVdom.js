import  { isString, isObject, isArray, createEle} from './index'
import { Vdom } from '../vdom/index'

function parseQuery(vdom, query){
	let k,
		state = 0,
		j = 0;
	for(let i = 0, len = query.length; i < len; i++){
		let char = query[i];
			if(char === '.' || char === '#' || (k = i === len-1)){
				if(state === 0){
					vdom.tagName = query.substring(j, !k ? i : len);
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
		}
		i++;
	}
	//createEle(vd);// create true dom
	console.log(vd)
	return vd;
}