// 这个js文件主要是将新虚拟DOM和旧虚拟DOM作对比（diff算法）然后得出补丁patch
import {
  ATTR,
  TEXT,
  REPLACE,
  REMOVE
} from './patchTypes';

let patches = {};
let vnIndex = 0;

function domDiff(oldVDom, newVDom){
  let index = 0;
  vNodeWalk(oldVDom, newVDom, index);
  return patches;
}

function vNodeWalk(oldNode, newNode, index){
  let vnPatch = [];
  if(!newNode){
    // 这种是考虑新的dom结构中删除了该节点
    vnPatch.push({
      type: REMOVE,
      index
    })
  }else if(typeof oldNode === 'string' && typeof newNode === 'string') {
    // 如果新旧节点都是文本节点
    if(oldNode !== newNode){
      // 如果新节点与旧节点不相等，即更改了
      vnPatch.push({
        type: TEXT,
        text: newNode
      })
    }
  }else if(oldNode.type === newNode.type){
    // 如果两个节点的标签一样，就考虑他们的attribute属性更改了
    const attrPatch = attrsWalk(oldNode.props, newNode.props);
    if(Object.keys(attrPatch).length > 0){
      vnPatch.push({
        type: ATTR,
        attrs: attrPatch
      })
    }
    childrenWalk(oldNode.children, newNode.children);
  }else{
    // 这个是删除了节点
    vnPatch.push({
      type: REPLACE,
      newNode
    })
  }
  if(vnPatch.length > 0){
    patches[index] = vnPatch;
  }
}

function attrsWalk(oldAttrs, newAttrs){
  let attrPatch = {};
  for(let key in oldAttrs){
    // 考虑修改属性
    if(oldAttrs[key] !== newAttrs[key]){
      attrPatch[key] = newAttrs[key]
    }
  }
  for(let key in newAttrs){
    // 考虑添加了新属性
    if(!oldAttrs.hasOwnProperty(key)){
      attrPatch[key] = newAttrs[key]
    }
  }
  return attrPatch;
}

function childrenWalk(oldChildren, newChildren){
  oldChildren.map((c,idx) => {
    vNodeWalk(c, newChildren[idx], ++vnIndex)
  })
}

export default domDiff;