import { baseInit } from './baseInit'
import { toArray} from '../util/index'

export function AoyC(){
	if(this instanceof AoyC){
		this._init();
	}	
}

export function init(){
	baseInit(AoyC)
	return new AoyC();
}


// if(isBrowser) window.Aoy = Aoy;