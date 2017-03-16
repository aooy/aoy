import { isArray, error, toArray, api, warn }  from '../util/index'
import { createVdom, createEle, patch, el }  from '../vdom/index'
import { injectStore, initStore, connect, dependent } from '../store/index'
import { createComponent } from '../component/index'
import { mount } from '../render/index'
export function baseInit(Aoy){
	Aoy.prototype._init = function(arg){

		this.dependManage = Object.create(null);
		this._initStore();
	}
	
	Aoy.prototype._initStore = initStore;

	Aoy.prototype.createComponent = createComponent;

	Aoy.prototype.connect = connect;

	Aoy.prototype._dependent = dependent;

	Aoy.prototype.mount = mount;

	Aoy.prototype.el = el;

	Aoy.prototype.patch = patch;

}




