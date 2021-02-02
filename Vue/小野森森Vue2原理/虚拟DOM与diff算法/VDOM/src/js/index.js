import { createElement, render, renderDOM } from './virtualDom';
import domDiff from './domDiff';

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
const rDom = render(vDom1)
renderDOM(rDom,document.getElementById('app'));
console.log(vDom1)
console.log(vDom2)

const patches = domDiff(vDom1,vDom2);
console.log(patches)