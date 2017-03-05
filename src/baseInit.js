import { parseOption }  from '../util/index.js'


export function baseInit(Mdom){
	Mdom.prototype._init = function(option){
		const op = parseOption(option);

	}
}