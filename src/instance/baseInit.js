import { createVdom, isArray, error, toArray}  from '../util/index'

export function baseInit(Mdom){
	Mdom.prototype._init = function(arg){
		if(arg.length === 0){
			error('初始化参数不能为空')
			return;
		}
		if(isArray(arg) && arg.length > 0) {
			const op = parseOption.call(this,arg)
		}	
	}
	window.el = function(){
		const arg = toArray(arguments);

		if(arg.length === 0){
			error('初始化参数不能为空')
			return;
		}
		if(isArray(arg) && arg.length > 0) {
			return createVdom.call(this,arg);
		}	
		 
	}
}