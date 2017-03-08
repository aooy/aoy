import { api, isArray} from '../util/index'
import { createEle, updateEle } from './index'

function sameVnode(oldVnode, vnode){
	return vnode.tagName === oldVnode.tagName;
}
function createKeyToOldIdx(children, beginIdx, endIdx) {
    var i, map = {}, key, ch;
    for (i = beginIdx; i <= endIdx; ++i) {
        ch = children[i];
        if (ch != null) {
            key = ch.key;
            if (key !== undefined)
                map[key] = i;
        }
    }
    return map;
}
function removeVnodes(parentElm, vnodes, startIdx, endIdx) {
        for (; startIdx <= endIdx; ++startIdx) {
            var ch = vnodes[startIdx];
            if (ch != null) {
                    api.removeChild(parentElm, ch.el);
            }
        }
    }
function addVnodes(parentElm, before, vnodes, startIdx, endIdx) {
        for (; startIdx <= endIdx; ++startIdx) {
            var ch = vnodes[startIdx];
            if (ch != null) {
                api.insertBefore(parentElm, createElm(ch, insertedVnodeQueue), before);
            }
        }
    }    
function patchVnode(oldVnode, vnode){
	const el = vnode.el = oldVnode.el;
    let i, oldCh = oldVnode.children, ch = vnode.children;
    if (oldVnode === vnode) return;
    if(oldVnode.text && vnode.text && oldVnode.text !== vnode.text){
    	api.setTextContent(el, vnode.text);
    }
    //update class attr	
    updateEle(el, vnode, oldVnode)
    if(ch && ch[0].text && ch.length === 1){
    	//it's childern only a textNode
    	if(!oldCh || oldCh.length !== ch.length || oldCh[0].text !== ch[0].text){
    		api.removeChild(el, oldCh[0].el);
    		api.appendChild(el, createEle(ch[0]).el);
    	}
    }else{
    	if(oldCh && ch && oldCh !== ch){
	    	updateChildren(el, oldCh, ch);
	    }else if(ch){
	    	createEle(vnode); //create el's children dom
	    }else if(oldCh){
	    	api.removeChildren(el);
	    }
    }
}

function updateChildren(parentElm, oldCh, newCh){
	let oldStartIdx = 0, newStartIdx = 0;
    let oldEndIdx = oldCh.length - 1;
    let oldStartVnode = oldCh[0];
    let oldEndVnode = oldCh[oldEndIdx];
    let newEndIdx = newCh.length - 1;
    let newStartVnode = newCh[0];
    let newEndVnode = newCh[newEndIdx];
    let oldKeyToIdx;
    let idxInOld;
    let elmToMove;
    let before;
    while (oldStartIdx <= oldEndIdx && newStartIdx <= newEndIdx) {
            if (oldStartVnode == null) {
                oldStartVnode = oldCh[++oldStartIdx]; // Vnode might have been moved left
            }
            else if (oldEndVnode == null) {
                oldEndVnode = oldCh[--oldEndIdx];
            }
            else if (newStartVnode == null) {
                newStartVnode = newCh[++newStartIdx];
            }
            else if (newEndVnode == null) {
                newEndVnode = newCh[--newEndIdx];
            }
            else if (sameVnode(oldStartVnode, newStartVnode)) {
                patchVnode(oldStartVnode, newStartVnode);
                oldStartVnode = oldCh[++oldStartIdx];
                newStartVnode = newCh[++newStartIdx];
            }
            else if (sameVnode(oldEndVnode, newEndVnode)) {
                patchVnode(oldEndVnode, newEndVnode);
                oldEndVnode = oldCh[--oldEndIdx];
                newEndVnode = newCh[--newEndIdx];
            }
            else if (sameVnode(oldStartVnode, newEndVnode)) {
                patchVnode(oldStartVnode, newEndVnode);
                api.insertBefore(parentElm, oldStartVnode.el, api.nextSibling(oldEndVnode.el));
                oldStartVnode = oldCh[++oldStartIdx];
                newEndVnode = newCh[--newEndIdx];
            }
            else if (sameVnode(oldEndVnode, newStartVnode)) {
                patchVnode(oldEndVnode, newStartVnode);
                api.insertBefore(parentElm, oldEndVnode.el, oldStartVnode.el);
                oldEndVnode = oldCh[--oldEndIdx];
                newStartVnode = newCh[++newStartIdx];
            }
            else {
                if (oldKeyToIdx === undefined) {
                    oldKeyToIdx = createKeyToOldIdx(oldCh, oldStartIdx, oldEndIdx);
                }
                idxInOld = oldKeyToIdx[newStartVnode.key];
                if (!idxInOld) {
                    api.insertBefore(parentElm, createEle(newStartVnode).el, oldStartVnode.el);
                    newStartVnode = newCh[++newStartIdx];
                }
                else {
                    elmToMove = oldCh[idxInOld];
                    if (elmToMove.sel !== newStartVnode.sel) {
                        api.insertBefore(parentElm, createEle(newStartVnode).el, oldStartVnode.el);
                    }
                    else {
                        patchVnode(elmToMove, newStartVnode);
                        oldCh[idxInOld] = undefined;
                        api.insertBefore(parentElm, elmToMove.el, oldStartVnode.el);
                    }
                    newStartVnode = newCh[++newStartIdx];
                }
            }
        }
        if (oldStartIdx > oldEndIdx) {
            before = newCh[newEndIdx + 1] == null ? null : newCh[newEndIdx + 1].el;
            addVnodes(parentElm, before, newCh, newStartIdx, newEndIdx);
        }
        else if (newStartIdx > newEndIdx) {
            removeVnodes(parentElm, oldCh, oldStartIdx, oldEndIdx);
        }
}

export function patch(oldVnode, vnode){
	
	if(sameVnode(oldVnode, vnode)){
		patchVnode(oldVnode, vnode);
	}else{
		const oEl = oldVnode.el;
		let parentEle = api.parentNode(oEl);
		createEle(vnode);
		if(parentEle !== null){
			api.insertBefore(parentEle, vnode.el, api.nextSibling(oEl));
			api.removeChild(parentEle, oldVnode.el);
			oldVnode = null;
		}
	}
	return vnode;
}























