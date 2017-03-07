import  { isString, isObject, isArray, isNumber, api } from '../util/index'
import { Vdom, createEle  } from './index'

function parseQuery(vdom, query){
	let k,
		state = 0,
		j = 0;
	vdom.sel = query;
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
function parseChindren(vdom, v){
	let a = [];
	for(let i = 0; i < v.length; i++){
		if(!(v[i] instanceof Vdom)){
			a.push(createVdomTxt(v[i]));
		}else{
			a.push(v[i]);
		}
	}
	vdom.children = a;
}
export function createVdomTxt(str){
	let vd = new Vdom();
	if(isString(str)){
		vd.text = str;
		vd.el = api.createTextNode(str);
	}
	return vd;
}
export function createVdom(arg){
	let i=0,
		vd = new Vdom();

	while(i < arg.length){
		let v = arg[i];
		if(i === 0 && isString(v)){
			// div#id.classA
			parseQuery(vd, v);
		}else if(i != 0){
			if(isObject(v)){
				// class style clickEvent .ect
				parseData(vd, v);
			}else if(isArray(v)){
				// childern
				parseChindren(vd, v);
			}else if(isString(v)){
				//only textNode
				parseChindren(vd, [v]);
				vd.text = v;
			}
		}
		i++;
	}
	//createEle(vd);// create true dom
	console.log(vd)
	return vd;
}