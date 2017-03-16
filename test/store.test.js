import { expect } from 'chai'
import jsdom from 'jsdom'
import { init } from '../src/index'
import { initStore } from '../src/store/index'

describe('test store: ', function() {
	let aoy = init();
	let store = aoy.store;

	it('check _FINALSTORE param',function(){
		expect(aoy._FINALSTORE).to.be.ok;
	});

	it('test warn',function(){
		store.add(1);
		aoy.store = {};
		initStore();
	});

	it('add _DEFAULT store',function(){
		store.add({
			a:2
		});
		expect(store.get().a).to.be.equal(2);
		expect(store.get('_DEFAULT').a).to.be.equal(2);
		store.remove();
		expect(store.get('_DEFAULT')).to.be.not.ok;
	});

	it('add user-defined store',function(){
		store.add('mystore',{
			a:2
		});
		expect(store.get('mystore').a).to.be.equal(2);
	});

	it('remove store',function(){
		store.add('mystore2',{
			a:2
		});
		expect(store.get('mystore2').a).to.be.equal(2);
		store.remove('mystore2');
		expect(store.get('mystore2')).to.be.not.ok;
	});

	it('remove store',function(){
		store.add('mystore2',{
			a:2
		});
		expect(store.get('mystore2').a).to.be.equal(2);
		store.remove('mystore2');
		expect(store.get('mystore2')).to.be.not.ok;
	});

	it('getMainStore', function(){
		let i = 0, s = store.getMainStore();
		for(let k in s){
			i++;
		}	
		expect(i===1).to.be.ok;
	});

	it('test set', function(){

		store.add('forset',{
			b: 'b'
		});
		store.get('forset').set({
			a:'a'
		});
		store.get('forset').set('11');
		expect(store.get('forset').a).to.be.equal('a');

		store.get('forset').a = 'new';
		expect(store.get('forset').a).to.be.equal('new');
	});

});