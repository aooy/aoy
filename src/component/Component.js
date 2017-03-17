import { isObject } from '../util/index'

export function Component (op) {
  if (isObject(op)) {
    for (let k in op) {
      this[k] = op[k]
    }
  }
}
