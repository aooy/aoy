import { expect } from 'chai'
import { api } from '../src/util/index'
import { createVdom, Vdom, el, createVdomTxt, createEle, updateEle } from '../src/vdom/index'

import sinon from 'sinon';

let oldDocument = global.document;
global.document = {};
global.window = {}; 
describe('createVdom function test: ', function() {

  	it('return Vdom instanceof',function(){
  		expect(el('div')).to.be.instanceof(Vdom);
  	});

  	it('Vdom\'s tagName test',function(){
  		let vdom = el('div');
  		expect(vdom.tagName).to.be.equal("DIV");

  		vdom = el('DIv');
  		expect(vdom.tagName).to.be.equal("DIV");
  	});

  	it('test Vdom\'s id and class',function(){

  		let vdom = el('div#a');
  		expect(vdom.id).to.be.equal('a');
  		
  		vdom = el('div.a.b');
  		expect(vdom.className).to.be.an('array');
  		expect(vdom.className[0]).to.be.equal('a');
  		expect(vdom.className[1]).to.be.equal('b');
  		expect(vdom.className).to.have.lengthOf(2);


  	});

  	it('test Vdom\'s data attr',function(){

  		let vdom = el('input',{'data-e': 1, style:{width: '100px'}, value:'123'});
  		expect(vdom.data).to.be.an('object');
  		expect(vdom.data['data-e']).to.be.equal(1);
  		expect(vdom.data['style']['width']).to.be.equal('100px');

  	});

	it('create Vdom\'s children\'param is a string',function(){

	  		let vdom = el('div','123');
	  		expect(vdom.children[0].text).to.be.equal('123');

	  		vdom = el('div',['123']);
	  		expect(vdom.children[0].text).to.be.equal('123');

	  });

  	it('create Vdom\'s children\'attr is a array',function(){

  		let vdom = el('div','123');
  		expect(vdom.children).to.be.a('array');

  		vdom = el('div',123);
  		expect(vdom.children).to.be.a('array');

  		vdom = el('div',['123',123]);
  		expect(vdom.children).to.be.a('array');

  		vdom = el('div',['123',el('a')]);
  		expect(vdom.children).to.be.a('array');

  		vdom = el('div',['123',el('a',123,el('a',[123]))]);
  		expect(vdom.children).to.be.a('array');

  	});


  	it('create Vdom\'s children\'param is a number',function(){

  		let vdom = el('div',123);
  		expect(vdom.children[0].text).to.be.equal(123);

  		vdom = el('div',[123]);
  		expect(vdom.children[0].text).to.be.equal(123);
  	});

  	it('create Vdom\'s children\'param are number and string',function(){

  		let vdom = el('div',[123,'456',el('span')]);
  		expect(vdom.children[0].text).to.be.equal(123);
  		expect(vdom.children[1].text).to.be.equal('456');
  		expect(vdom.children[2].text).to.be.null;
  		expect(vdom.children[2].tagName).to.be.equal('SPAN');
  		expect(vdom.children).to.have.lengthOf(3);

  	});

  	it('create Vdom\'s children\'param is a vdom',function(){

  		let vdom = el('div',[el('span'),el('div'),el('a')]);
  		expect(vdom.children[0].tagName).to.be.equal('SPAN');
  		expect(vdom.children).to.have.lengthOf(3);

  	});

  	it('create Multi parameter\'s Vdom',function(){

  		let vdom = el('div',{'data-e': 1, style:{width: '100px'}, value:'123'} ,[123,el('div'),el('a')]);
  		expect(vdom.children[0].tagName).to.be.null;
  		expect(vdom.data['data-e']).to.be.equal(1);
  		expect(vdom.children).to.have.lengthOf(3);

  	});

  	it('create Multilevel Vdom',function(){

  		let vdom = el('div',[el('p',[el('span',[el('a',{href:'#'})])])]);
  		expect(vdom.children[0].children[0].children[0].tagName).to.be.equal('A');

  	});

});


describe('createVdomTxt function test: ', function() {
    it('return Vdom instanceof',function(){
      expect(createVdomTxt('123')).to.be.instanceof(Vdom);
      expect(createVdomTxt(123)).to.be.instanceof(Vdom);
    });
    it('test Vdom\'text attr',function(){
      expect(createVdomTxt('123').text).to.be.equal('123');
      expect(createVdomTxt(123).text).to.be.equal(123);
    });
});
 


describe('createEle function test: ', function() {


    it('use createEle fn to create text dom',function(){
      // let spy0 = sinon.spy();
      // let spy3 = sinon.spy();
      // let spy2 = document.createTextNode = sinon.spy();
      // let spy1 = document.createElement = sinon.stub().returns({
      //   setAttribute: {},
      //   appendChild: {},
      //   style: {}
      // });
      let vdom = {
            el: null,
            text: '123',
            tagName:null
      };
      let spy0 = api.createTextNode = sinon.spy();
      //expect(createEle(vdom0)).to.be.instanceof(Vdom);
      let dom = createEle(vdom);
      expect(spy0.calledWith('123')).to.be.ok;

      let spy1 = api.createTextNode = sinon.stub().returns({
        nodeType: 3
      });
      dom = createEle(vdom);
      expect(dom.el.nodeType).to.be.equal(3);

    });

    it('use createEle fn with vdom\' tagName create text dom',function(){
        let vdom = {
            el: null,
            text: null,
            tagName: 'DIV',
            className: [],
            id: null
        };  
        let spy0 = document.createElement = sinon.spy();  
        let spy1 = api.createElement = sinon.spy();  
        let spy2 = api.setClass = sinon.spy();
        let spy3 = api.setAttrs = sinon.spy();
        let spy4 = api.setId = sinon.spy();
        let spy5 = api.appendChildren = sinon.spy();
        let dom = createEle(vdom);
        expect(spy1.calledWith('DIV')).to.be.ok;
    })

    it('test updateEle fn',function(){
        let e = {};
        let vdom = {
            el: {},
            text: null,
            tagName: 'DIV',
            className: ['a','b'],
            id: 'myid',
            data: {'data-i': 1}
        };  
        let oldvdom = {
            el: {},
            text: null,
            tagName: 'DIV',
            className: [],
            id: null
        };
        let spy0 = api.setClass = sinon.spy();
        let spy1 = api.setAttrs = sinon.spy();
        let spy2 = api.setId = sinon.spy();
        let spy3 = api.appendChildren = sinon.spy();
        updateEle(e, vdom , oldvdom);

    })

});










