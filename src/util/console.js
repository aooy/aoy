export function error(info, context=null){
	if(typeof console !== 'undeifine'){
		console.error(info)
	}
}