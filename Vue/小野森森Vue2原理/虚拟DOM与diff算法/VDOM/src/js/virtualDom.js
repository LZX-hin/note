import Element from './Element';

// 创建虚拟节点VirtualDom
function createElement(type, props, children){
  return new Element(type, props, children);
}

// 将虚拟节点转换成真实Dom节点
function render(vDom){
  const { type, props, children } = vDom;
  const el = document.createElement(type);
  
  for(let key in props){
    setAttrs(el, key, props[key]);
  }
  children.map(c => {
    if(c instanceof Element){
      // 如果c是Element的实例，也就是节点元素，就递归处理
      c = render(c);
    }else{
      // 否则的话，就是文本节点
      c = document.createTextNode(c);
    }
    // 最后就是把这些创建出来的标签或文本添加到
    el.appendChild(c);
  })
  // 最终得到的el就是真实dom
  return el
}

// 渲染真实DOM的函数
function renderDOM(rDom, rootEL){
  rootEL.appendChild(rDom);
}

// 给节点设置属性
// 1、主要是要注意如果是input/textarea标签，设置value属性是input.value，而其他标签是用setAttribute()
// 2、如果是style属性，就是用dom.style.xxx = 'xxx'，而其他标签是setAttribute()
function setAttrs(node, prop, value){
  switch(prop){
    case 'value': 
      if(node.tagName === 'INPUT' || node.tagName === 'TEXTAREA'){
        node.value = value
      }else{
        node.setAttribute(prop, value);
      }
      break;
    case 'style':
      node.style.cssText = value;
      break;
    default: 
      node.setAttribute(prop, value);
      break;
  }
}

export {
  createElement,
  render,
  setAttrs,
  renderDOM
}