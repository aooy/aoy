
import buble from 'rollup-plugin-buble';

export default {
  plugins: [
    buble()
  ],
  entry: 'src/index.js',
  dest: 'dist/vdom.js',
  format: 'umd',
  moduleName: 'index',
  sourceMap: true 
};