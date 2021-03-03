import { createElement, render, renderDOM } from './virtualDom';
import domDiff from './domDiff';
import doPatch from './doPatch';

// 1、创建虚拟DOM
const vDom1 = createElement('ul',{
  class: 'list',
  style: 'width: 300px; height: 300px; background-color: orange'
},[
  createElement('li',{
    class: 'item',
    'data-index': 0
  },[
    createElement('p',{
      class: 'text'
    },[
      '第1个列表项'
    ])
  ]),
  createElement('li',{
    class: 'item',
    'data-index': 1
  },[
    createElement('p',{
      class: 'text'
    },[
      createElement('span',{
        class: 'title'
      },[])
    ])
  ]),
  createElement('li',{
    class: 'item',
    'data-index': 2
  },[
    '第3个列表项'
  ])
])

const vDom2 = createElement('ul',{
  class: 'list-wrap',
  style: 'width: 300px; height: 300px; background-color: orange'
},[
  createElement('li',{
    class: 'item',
    'data-index': 0
  },[
    createElement('p',{
      class: 'title'
    },[
      '特殊列表项'
    ])
  ]),
  createElement('li',{
    class: 'item',
    'data-index': 1
  },[
    createElement('p',{
      class: 'text'
    },[])
  ]),
  createElement('div',{
    class: 'item',
    'data-index': 2
  },[
    '第3个列表项'
  ])
])

// rDom --> 真实dom节点
// vDom --> 虚拟dom节点

// 2、通过render()方法得出真实DOM rdom
const rDom = render(vDom1)
// 3、通过renderDOM()方法将真实DOM挂载到页面上
renderDOM(rDom,document.getElementById('app'));
// 4、通过domDiff()方法，对比新旧虚拟DOM生成patch补丁
const patches = domDiff(vDom1,vDom2);
// 5、给真实DOM打上补丁
doPatch(rDom,patches);


// Diff算法是深度优先遍历的，也就是说如果节点还有子节点会优先去处理子节点，而不是这个节点的兄弟节点