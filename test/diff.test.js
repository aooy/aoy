import { expect } from 'chai'
import sinon from 'sinon';
import jsdom from 'jsdom'

import { init } from '../src/index'
import { createEle, patch, updateChildren, patchVnode } from '../src/vdom/index'
import { mount } from '../src/render/index'
import { api } from '../src/util/index'

let doc = jsdom.jsdom('<body></body>');
let window = doc.defaultView;
let document = window.document;

describe('patch function test: ', function() {
   	let aoy = init();
   	let store = aoy.store;
   	let el = aoy.el;

	api.createElement = function(tag){
		return document.createElement(tag);
	};
	api.createTextNode = function(tag){
		return document.createTextNode(tag);
	};
	function autoPatch(oldnode, newnode, ecpStr){
		document.body.innerHTML = '';
		createEle(oldnode);
		document.body.appendChild(oldnode.el);
		patch(oldnode, newnode);
		expect(document.body.innerHTML).to.be.equal(ecpStr);
	}
	it('oldnode\'s children is empty, newnode\' length greater than 0',function(){
		let oldnode = el('div.a');
		let newnode = el('div.a',[el('div.b')]);
 		autoPatch(oldnode,newnode,'<div class="a"><div class="b"></div></div>')
 	})

	it('newnode\'s children is empty, oldnode\' length greater than 0', function(){
		let oldnode = el('div#a',['1111',el('span','im span'),el('p','im p')]);
		let newnode = el('div#a',{'data-e':2});
		autoPatch(oldnode,newnode,'<div id="a"></div>');
		expect(newnode.el['data-e']).to.be.equal(2);
	});

	it('Node is not worth comparing',function(){
		let oldnode = el('div.a',{'data-e':1});
		let newnode = el('div#b',{'data-e':1},[el('div.b')]);
		autoPatch(oldnode,newnode,'<div id="b"><div class="b"></div></div>')
		oldnode = el('p.a');
		newnode = el('div#b',[el('div.b')]);
		autoPatch(oldnode,newnode,'<div id="b"><div class="b"></div></div>')
	});

	it('The new node has only one text node',function(){
		let oldnode = el('div#a',{'data-e':1},222);
		let newnode = el('div#b',{'data-e':1},[111]);
		autoPatch(oldnode,newnode,'<div id="b">111</div>');
		oldnode = el('div#a',{'data-e':1},'222');
		newnode = el('div#b',{'data-e':1},333);
		autoPatch(oldnode,newnode,'<div id="b">333</div>');
		oldnode = el('div#a',{'data-e':1},['222']);
		newnode = el('div#b',{'data-e':1},444);
		autoPatch(oldnode,newnode,'<div id="b">444</div>');
		oldnode = el('div#a',{'data-e':1},[111,el('div',222)]);
		newnode = el('div#b',{'data-e':1},[111,el('div',444)]);
		autoPatch(oldnode,newnode,'<div id="b">111<div>444</div></div>');
	});

	it('a: The new node child node confusion sort', function(){
		let oldnode = el('div#a',{'data-e':1},[el('p','im p'),el('span','im span'),el('a','im a')]);
		let newnode = el('div#a',{'data-e':2},[111]);
		autoPatch(oldnode,newnode,'<div id="a">111</div>');
	});

	it('b: The new node child node confusion sort', function(){
		let oldnode = el('div#a',{'data-e':1},[el('p','im p'),el('span','im span'),el('a','im a')]);
		let newnode = el('div#a',{'data-e':2},['1111',el('span','im span'),el('p','im p')]);
		autoPatch(oldnode,newnode,'<div id="a">1111<span>im span</span><p>im p</p></div>');
	});

	it('c: The new node child node confusion sort', function(){
		let oldnode = el('div#a',['2222',el('span','im span'),el('p','im p')]);
		let newnode = el('div#a',{'data-e':2},['1111',el('span','im span'),el('b','im b')]);
		autoPatch(oldnode,newnode,'<div id="a">1111<span>im span</span><b>im b</b></div>');
	});

	it('Deep level comparison', function(){
		let oldnode = el('div#b1',[el('div#b2',[el('div#b3',[el('div',['lv4old',el('p','im p'),el('span','im span')]), 'lv2'])]),el('p','im p')]);
		let newnode = el('div#b1',['lv1',el('div#b2',[el('div#b3',[el('div',['lv4new',el('p','im p'),el('span','im span')])])])]);
		autoPatch(oldnode,newnode,'<div id="b1">lv1<div id="b2"><div id="b3"><div>lv4new<p>im p</p><span>im span</span></div></div></div></div>');
	});
	it('Check if key is correct', function(){
		doc = jsdom.jsdom('<body></body>');
		window = doc.defaultView;
		document = window.document;
		let oldnode = el('ul',	[
			  	el('li',{key: 'c'},'c'),
			  	el('li',{key: 'b'},'b'),
			 	el('li',{key: 'a'},'a'),
			 	el('li','nokey'),
			 	el('li',{key: 'e'},'e')
			  ]);
		
		let newnode = el('ul',[
			  	el('li',{key: 'f'},'f'),
			  	el('li',{key: 'e'},'e'),
			  	el('li',{key: 'd'},'d'),
			  	el('li',{key: 'b'},'b')
			  ]);
		createEle(oldnode);
		let e = oldnode.el.children[4].el;
		document.body.appendChild(oldnode.el);
		patch(oldnode, newnode);
		expect(newnode.el.children[1].el).to.be.equal(e);
	})

	it('a: Comparison of nodes with key', function(){
		let oldnode = el('ul',	[
			  	el('li',{key: 'c'},'c'),
			  	el('li',{key: 'b'},'b'),
			 	el('li',{key: 'a'},'a'),
			 	el('li','nokey'),
			 	el('li',{key: 'e'},'e')
			  ]);
		let newnode = el('ul',{style:{width:'100px'}},[
			 	el('li','nokey'),
			  	el('li',{key: 'c'},'c'),
			  	el('li',{key: 'b'},'b'),
			 	el('li',{key: 'a'},'a'),
			 	el('li',{key: 'e'},'e')
			  ]);
		autoPatch(oldnode,newnode,'<ul style="width: 100px;"><li>nokey</li><li>c</li><li>b</li><li>a</li><li>e</li></ul>');
	});	
	it('b: Comparison of nodes with key', function(){
		let oldnode = el('ul',	[
			  	el('li',{key: 'c'},'c'),
			  	el('li',{key: 'b'},'b'),
			 	el('li',{key: 'a'},'a'),
			 	el('li','nokey'),
			 	el('li',{key: 'e'},'e')
			  ]);
		let newnode = el('ul',{style:{width:'100px'}},[
			  	el('li',{key: 'c'},'c'),
			  	el('li',{key: 'e'},'e'),
			  	el('li',{key: 'a'},'a'),
			  	el('li',{key: 'b'},'b')
			  ]);
		autoPatch(oldnode,newnode,'<ul style="width: 100px;"><li>c</li><li>e</li><li>a</li><li>b</li></ul>');
	});	
	it('c: Comparison of nodes with key', function(){
		let oldnode = el('ul',	[
			  	el('li',{key: 'c'},'c'),
			  	el('li',{key: 'b'},'b'),
			 	el('li',{key: 'a'},'a'),
			 	el('li','nokey'),
			 	el('li',{key: 'e'},'e')
			  ]);
		let newnode = el('ul',[
			  	el('li',{key: 'f'},'f'),
			  	el('li',{key: 'e'},'e'),
			  	el('li',{key: 'd'},'d'),
			  	el('li',{key: 'b'},'b')
			  ]);
		autoPatch(oldnode,newnode,'<ul><li>f</li><li>e</li><li>d</li><li>b</li></ul>');
	});

	it('d: Comparison of nodes with key', function(){
		let oldnode = el('ul',	[
			  	el('li',{key: 'c'},'c'),
			  	el('li',{key: 'b'},'b'),
			 	el('li',{key: 'a'},'a'),
			 	el('li','nokey'),
			 	el('li',{key: 'e'},'e')
			  ]);
		let newnode = el('ul',[
			  	el('a','f'),
			  	el('span','e'),
			  	el('li','d'),
			  	el('li','b')
			  ]);
		autoPatch(oldnode,newnode,'<ul><a>f</a><span>e</span><li>d</li><li>b</li></ul>');
	});

	it('e: Comparison of nodes with key', function(){
		let oldnode = el('ul',	[
			  	el('li',{key: 'c'},'c'),
			  	el('li',{key: 'b'},'b'),
			 	el('li',{key: 'a'},'a'),
			 	el('li','nokey'),
			 	el('li',{key: 'e'},'e')
			  ]);
		let newnode = el('ul',[
			  	el('a','f'),
			  	el('li',{key: 'b'},'b'),
			 	el('li',{key: 'a'},'a'),
			  	el('li','d')
			  ]);
		autoPatch(oldnode,newnode,'<ul><a>f</a><li>b</li><li>a</li><li>d</li></ul>');
	});

	it('diff child\'s tag patch', function(){
		let oldnode = el('div',	[
			  	el('li',[el('span','1')])
			  ]);
		let newnode = el('div',[
			  	el('li',[el('div',22)])
			  ]);
		autoPatch(oldnode,newnode,'<div><li><div>22</div></li></div>');
	});

})























