import { baseInit } from './baseInit'
import { toArray} from '../util/index'

export function AoyC(){
	if(this instanceof AoyC){
		const arg = toArray(arguments);
		this._init(arg);
	}	
}

export function init(){
	baseInit(AoyC)
	return new AoyC();
}


// if(isBrowser) window.Aoy = Aoy;