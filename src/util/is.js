function judge (o) {
	return Object.prototype.toString.call(o)
}

export function isArray (arr) {
	return judge(arr) === '[object Array]'
}

export function isObject (o) {
	return judge(o) === '[object Object]'
}

export function isFunction (f) {
	return typeof f === 'function'
}	

export function isString (s) {
	return typeof s === 'string'
}

export function isNumber (n) {
	return typeof n === 'number'
}






