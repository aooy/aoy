# aoy [![Build Status](https://travis-ci.org/aooy/aoy.svg?branch=master)](https://travis-ci.org/aooy/aoy) [![Coverage Status](https://coveralls.io/repos/github/aooy/aoy/badge.svg?branch=master)](https://coveralls.io/github/aooy/aoy?branch=master) [![NPM version](https://badge.fury.io/js/npm.svg)](https://github.com/aooy/aoy) [![MIT Licence](https://badges.frapsoft.com/os/mit/mit.svg?v=103)](https://github.com/aooy/aoy)
Tiny JavaScript MVVM library with Virtual DOM. It has only ~600 lines of code.

## Introduction
[一个轻量级的MVVM框架-aoy](https://github.com/aooy/blog/issues/1)

## Install

npm:

    $ npm install aoy --save

## Usage

### ES2015
```js
import { init, el } from 'aoy';

//1. init aoy.
const myAoy = init();
conse store = myAoy.store;

//2. add a store to aoy instance.
store.add('firstStore',{txt: 'this is a P'});

//3. create a component.
const myP = aoy.createComponent({
                el: document.body,
                render: function(){
                    return el('p', this.firstStore.txt);
                }
            });
            
//4. component connect to a store, view will be render immediately.
myAoy.connect(myP, 'firstStore');

//5. when u update this component's store, view will be render again.
store.get('firstStore').txt = 'change view';
```
### CommonJS
```js
var myAoy = require('aoy').init();
var el = myAoy.el;
```
### Browser globals
The dist folder contains aoy.js and aoy.min.js.
```js
<script src="path/to/aoy.js"></script>
<script>
var aoy = Aoy.init();
var store = aoy.store;
var el = aoy.el;
</script>
```
## Examples

* [simple data-binding input](https://aooy.github.io/aoy/input)
* [table sort](https://aooy.github.io/aoy/tableSort)

## Api

### aoy.init
init function returns a aoy instance.

### aoy.el(selectors, props, children])
return a Virtual DOM.
```js
var span = el('span','this is p') // render <span>this is p</span>
var p = el('div',[ span ]) // render <p><span>this is p</span></p>
var div = el('div#mydiv.classA.classB') // render <div id="mydiv" class="classA classB"></div>
```

### aoy.createComponent(descriptor)
descriptor is Object

#### descriptor.el:
it is a HTMLElement for component's parentNode.
    
#### descriptor.render:
render functon returns vnode.
    
```js
var inputStore = store.get('inputStore');
var myinput = aoy.createComponent({
	inputFn: function(){
		
	},
	render: function(){
		return el('Input', {
                        oninput: this.inputFn,
                        placeholder: this.inputStore.value,
                        type: 'text' 
				});
	}
});
```

### aoy.connect(component[,stores])
when connect function is called, Virtual DOM will be rendered immediately.
```js
var aoy.connect(mycomponent, 'a') // mycomponent denpend on a.
var aoy.connect(mycomponent, ['a', 'b']) // mycomponent denpend on a and b.
```

### store
aoy instance provides a store.
```js
var aoy = Aoy.init();
var store = aoy.store;
```

### store.add([key ,] data)
function add is used to save data.
if no key, this data's key is _DEFAULT.
```js
aoy.store.add('a',{b:1}) // a:{b:1}
aoy.store.add({b:1}) // _DEFAULT:{b:1}
```

### store.get(key) 
Return to the corresponding store's data
```js
aoy.store.add('a',{b:1})
aoy.store.get('a') // return {b: 1}
```

### sotre.set(newData)
update data.
```js
aoy.store.add('a',{b:1})

aoy.store.get('a').set({a:1, b:2}) //same: aoy.store.get('a') = {a:1, b:2}

aoy.store.get('a') // return {a:1, b:2}
```
### Note
* support IE 9 and up + all modern browsers.
* aoy only data-binding one-level key, if data has deep structure, suggest to cooperate [immutable-js](https://github.com/facebook/immutable-js/) .

## License
[MIT](https://github.com/pakastin/redom/blob/master/LICENSE)










