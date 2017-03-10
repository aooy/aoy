import { isArray, error, toArray, api, warn }  from '../util/index'
import { createVdom, createEle, patch }  from '../vdom/index'
import { injectStore, initStore } from '../store/index'

export function baseInit(Aoy){
	Aoy.prototype._init = function(arg){
		this._initStore();
		if(arg.length === 0){
			//warn('初始化参数不能为空')
			return;
		}
		if(isArray(arg) && arg.length > 0) {
			const op = parseOption.call(this,arg)
		}	
	}

	Aoy.prototype._initStore = initStore;

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
		api.appendChild(parent, d.el);
	}
	window.patch = patch;

}




