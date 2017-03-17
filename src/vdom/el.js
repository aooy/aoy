import { toArray, isArray, error } from '../util/index'
import { createVdom } from './index'

export function el () {
		const arg = toArray(arguments)

		if (arg.length === 0) {
			error('Parameter cannot be empty')
			return false
		}
		if (isArray(arg) && arg.length > 0) {
			return createVdom.call(this, arg)
		}	
	}
	