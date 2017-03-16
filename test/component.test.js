import { expect } from 'chai'
import jsdom from 'jsdom'
import { init } from '../src/index'
import { api, warn, error, isFunction, isString, isNumber } from '../src/util/index'
import { createVdom, Vdom, el, createVdomTxt, createEle, updateEle, patch } from '../src/vdom/index'
import { mount } from '../src/render/index'
import { Component } from '../src/component'

let doc = jsdom.jsdom('<body></body>');
let window = doc.defaultView;
let document = window.document;

describe('test createComponent fn: ', function() {
	let aoy = init();
   	let store = aoy.store;
   	let el = aoy.el;
	it('createComponent', function(){
		let c = aoy.createComponent({
					myfn: function(){
						return 'myfn';
					},
					mynum: 123,
					el: document.body,
					render:function(){
						return el('div',['open']);
					}
			});
		expect(c).to.be.instanceof(Component);
		expect(c._UID).to.be.equal(0);
		expect(c.mynum).to.be.equal(123);
		expect(c.myfn()).to.be.equal('myfn');
	})
});

describe('component connect store: ', function() {
	let aoy = init();
   	let store = aoy.store;
   	let el = aoy.el;

	api.createElement = function(tag){
		return document.createElement(tag);
	};
	api.createTextNode = function(tag){
		return document.createTextNode(tag);
	};
   	it('connect a store', function(){
   		document.body.innerHTML = '';
   		store.add('a',{c: 2});
		let c = aoy.createComponent({
					el: document.body,
					fn: function(){
						return this.a.c;
					},
					render:function(){
						return el('div',this.a.c);
					}
			});
		aoy.connect(c, 'a');
		expect(c.fn()).to.be.equal(2);
		expect(document.body.innerHTML).to.be.equal('<div>2</div>');
	})
	it('connect many store', function(){
		document.body.innerHTML = '';
   		store.add('a',{c: 2});
   		store.add('b',{d: 3});
		let c = aoy.createComponent({
					el: document.body,
					fn: function(){
						return this.a.c;
					},
					render:function(){
						return el('div',[this.a.c,el('div',this.b.d)]);
					}
			});
		aoy.connect(c, ['a','b']);
		expect(c.fn()).to.be.equal(2);
		expect(document.body.innerHTML).to.be.equal('<div>2<div>3</div></div>');
	})
});

describe('basics lib use: ', function() {

   	let aoy = init();
   	let store = aoy.store;

	api.createElement = function(tag){
		return document.createElement(tag);
	};
	api.createTextNode = function(tag){
		return document.createTextNode(tag);
	};

	it('basic render use store',function(){
		document.body.innerHTML = '';
		store.add('a',{
			txt: 1111
		});
		
		let mycp = aoy.createComponent({
			el: document.body,
			render:function(){
				return aoy.el('div',this.a.txt);
			}
		});

		aoy.connect(mycp, 'a')
		expect(document.body.innerHTML).to.be.equal('<div>1111</div>')
		
 	})

	it('test data style class',function(){
		document.body.innerHTML = '';
		let mycp = aoy.createComponent({
			el: document.body,
			render:function(){
				return aoy.el('div',{style:{width:'100px'}, class:'a b'});
			}
		});
		aoy.connect(mycp);
		expect(document.body.innerHTML).to.be.equal('<div class="a b" style="width: 100px;"></div>')
	});

	it('oldnode\'s children is empty, newnode\' length greater than 0',function(){
		document.body.innerHTML = '';
		store.add('r',{
			txt1: 111,
			txt2: 222
		});

		let mycp = aoy.createComponent({
			el: document.body,
			render:function(){
				return el('div',[this.r.txt1, el('div',this.r.txt2)]);
			}
		});

		aoy.connect(mycp, 'r')
		expect(document.body.innerHTML).to.be.equal('<div>111<div>222</div></div>');
		store.get('r').set({
			txt1: 222,
			txt2: 333	
		});
		expect(document.body.innerHTML).to.be.equal('<div>222<div>333</div></div>');
 	});

 	it('a component relies on store',function(){
 		document.body.innerHTML = '';
		store.add('r',{
			txt1: 111,
			txt2: 222
		});
		store.add('r2',{
			txt3: 333,
			txt4: 444
		});

		let mycp = aoy.createComponent({
			el: document.body,
			render:function(){
				return el('div',[this.r.txt1, el('div',this.r2.txt4)]);
			}
		});

		aoy.connect(mycp, ['r','r2'])	
		expect(document.body.innerHTML).to.be.equal('<div>111<div>444</div></div>');

		store.get('r2').txt4 = 555;

		expect(document.body.innerHTML).to.be.equal('<div>111<div>555</div></div>');
		store.get('r').set({
			txt1: 666,
			txt2: 222
		});
	
		store.get('r2').set({
			txt1: 777,
			txt4: 777
		});
	
		expect(document.body.innerHTML).to.be.equal('<div>666<div>777</div></div>');
 	});
})

describe('test console:', function() {
	it('hope not error',function(){
		warn('warn');
		error('error');
	});
});

describe('test is:', function() {
	it('isFunction',function(){
		let fn = function(){};
		expect(isFunction(fn)).to.be.ok;
		let fn2 = '222';
		expect(isFunction(fn2)).to.be.not.ok;
	});
	it('isNumber',function(){
		let n = 123;
		expect(isNumber(n)).to.be.ok;
		let n2 = '222';
		expect(isNumber(n2)).to.be.not.ok;
	});
});




















