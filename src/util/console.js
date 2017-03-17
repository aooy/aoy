export function error (info) {
	if (typeof console !== 'undeifine') {
		console.error(info)
	}
}
export function warn (info) {
	if (typeof console !== 'undeifine') {
		console.warn(info)
	}
}