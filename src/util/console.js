export function error(info, context=null){
	if(typeof console !== 'undeifine'){
		console.error(info)
	}
}
export function warn(info, context=null){
	if(typeof console !== 'undeifine'){
		console.warn(info)
	}
}