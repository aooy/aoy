# aoy [![Build Status](https://travis-ci.org/aooy/aoy.svg?branch=master)](https://travis-ci.org/aooy/aoy) [![Coverage Status](https://coveralls.io/repos/github/aooy/aoy/badge.svg?branch=master)](https://coveralls.io/github/aooy/aoy?branch=master) [![NPM version](https://badge.fury.io/js/npm.svg)](https://github.com/aooy/aoy) [![MIT Licence](https://badges.frapsoft.com/os/mit/mit.svg?v=103)](https://github.com/aooy/aoy)
Tiny JavaScript MVVM library with Virtual DOM. It has only ~600 lines of code.

## Install

npm:

    $ npm install aoy --save

## Usage (ES2015 import)
```js
import { init, el } from 'aoy';
const myAoy = init();
aoy0.store.add('firstStore',{txt: 'aoy'});

const myP = aoy.createComponent({
                el: document.body,
                render: function(){
                    return el('p', this.firstStore.txt);
                }
            });
aoy0.connect(myP, 'firstStore');
```
## Using with commonjs
```js
var myAoy = require('aoy').init();
var el = myAoy.el;
```
## Browser globals
The dist folder contains vue-strap.js and vue-strap.min.js.
```js
<script src="path/to/vue.js"></script>
<script>
    var vm = new Vue({
        components: {
            alert: VueStrap.alert
        },
        el: "#app",
        data: {
            showRight: false,
            showTop: false
        }
    })
</script>
```
