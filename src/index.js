import { baseInit } from './instance/baseInit'
import { isBrowser, toArray} from './util/index'
export function Aoy(){
	if(this instanceof Aoy){
		const arg = toArray(arguments);
		this._init(arg);
	}	
}

baseInit(Aoy)

if(isBrowser) window.Aoy = Aoy;