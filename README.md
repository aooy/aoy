# aoy [![Build Status](https://travis-ci.org/aooy/aoy.svg?branch=master)](https://travis-ci.org/aooy/aoy) [![Coverage Status](https://coveralls.io/repos/github/aooy/aoy/badge.svg?branch=master)](https://coveralls.io/github/aooy/aoy?branch=master) [![NPM version](https://badge.fury.io/js/npm.svg)](https://github.com/aooy/aoy) [![MIT Licence](https://badges.frapsoft.com/os/mit/mit.svg?v=103)](https://github.com/aooy/aoy)
Tiny JavaScript MVVM library with Virtual DOM. It has only ~600 lines of code.

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





