// 这个js文件用于给真实DOM打补丁
import {
  ATTR,
  TEXT,
  REPLACE,
  REMOVE
} from './patchTypes';
import { setAttrs, render } from './virtualDom';
import Element from './Element';

let finalPatches = {};
let rnIndex = 0;

function doPatch(rDom, patches){
  // rDom是真实DOM
  // patches是补丁，是一个对象，它的结构可以参考test.js
  finalPatches = patches;
  rNodeWalk(rDom);
}

function rNodeWalk(rNode){
  const rnPatch = finalPatches[rnIndex++];
  const childNodes = Array.from(rNode.childNodes);
  childNodes.forEach(c => {
    // 递归处理子节点
    rNodeWalk(c);
  })
  if(rnPatch){
    // 如果当前节点存在补丁，则打补丁
    patchAction(rNode, rnPatch);
  }
}

function patchAction(rNode, rnPatch){
  rnPatch.forEach(p => {
    switch(p.type){
      case ATTR:
        for(let key in p.attrs){
          const value = p.attrs[key];
          if(value){
            // 如果有value，则设置新的值给该属性
            setAttrs(rNode, key, value)
          }else{
            // 如果没有，则代表该属性被删除了，就removeAttribute
            rNode.removeAttribute(key)
          }
        }
        break;
      case TEXT:
        rNode.textContent = p.text;
        break;
      case REPLACE:
        const newNode = (p.newNode instanceof Element) ? render(p.newNode) : document.createTextNode(p.newNode);
        // p.newNode如果是Element的实例，就是元素节点，就通过render方法转换成真实DOM，如果不是，就是文本节点，就通过createTextNode()创建文本
        // 此时newNode已经是一个真实DOM节点了
        rNode.parentNode.replaceChild(newNode, rNode);
        break;
      case REMOVE:
        rNode.parentNode.removeChild(rNode);
        break;
      default: 
        
        break;
    }
  })
}

export default doPatch;