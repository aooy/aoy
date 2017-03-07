import { isArray, error, toArray, api, warn }  from '../util/index'
import { createVdom, createEle, patch }  from '../vdom/index'
export function baseInit(Aoy){
	Aoy.prototype._init = function(arg){
		if(arg.length === 0){
			warn('初始化参数不能为空')
			return;
		}
		if(isArray(arg) && arg.length > 0) {
			const op = parseOption.call(this,arg)
		}	
	}
	window.el = function(){
		const arg = toArray(arguments);

		if(arg.length === 0){
			error('el初始化参数不能为空')
			return;
		}
		if(isArray(arg) && arg.length > 0) {
			return createVdom.call(this, arg);
		}	
	}
	window.mount = function(parent,vdom){
		const d = createEle(vdom);
		//document.body.appendChild(d.el)
		api.appendChild(parent, d.el);
	}
	window.patch = patch;
}




