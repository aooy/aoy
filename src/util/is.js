function judge(o){
	return Object.prototype.toString.call(o);
}

export function isArray(arr){
	return judge(arr) === '[object Array]';
}

export function isObject(o){
	return judge(o) === '[object Object]';
}

export function isFunction(f){
	return typeof f === 'function';
}	

export function isString(s){
	return typeof s === 'string';
}

export function isNumber(n){
	return typeof n === 'number';
}

export function existLetter(s, l){
	return s.indexOf(l) > -1;
}

export let isBrowser = true;
try{
	isBrowser = typeof window !== 'undefined' && isObject(window) !== '[object Object]';
}catch(e){
	isBrowser = false;
}





