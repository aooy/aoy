import { baseInit } from './instance/baseInit'
import { isBrowser, toArray} from './util/index'
export function Mdom(){
	if(this instanceof Mdom){
		const arg = toArray(arguments);
		this._init(arg);
	}	
}

baseInit(Mdom)

if(isBrowser) window.Mdom = Mdom;