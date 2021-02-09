(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global = typeof globalThis !== 'undefined' ? globalThis : global || self, global.Vue = factory());
}(this, (function () { 'use strict';

  const originArrMethods = Array.prototype,
        newArrMethods = Object.create(originArrMethods);
  const ARR_METHODS = ['push', 'pop', 'shift', 'unshift', 'reverse', 'sort', 'splice'];
  ARR_METHODS.map(method => {
    newArrMethods[method] = function (...args) {
      const result = originArrMethods[methods].apply(this, args),
            ob = this.__ob__;
      let newArr;

      switch (method) {
        case 'push':
        case 'unshift':
          newArr = args;
          break;

        case 'splice':
          newArr = args.slice(2);
          break;
      }

      if (newArr) ob.observeArr(newArr);
      return result;
    };
  });

  function proxy(vm, target, key) {
    Object.defineProperty(vm, key, {
      get() {
        return vm[target][key];
      },

      set(newValue) {
        if (vm[target][key] === newValue) return;
        vm[target][key] = newValue;
      }

    });
  }

  function isObject(value) {
    return typeof value === 'object' && value !== null;
  }

  function isArray(value) {
    return Array.isArray(value);
  }

  function setConstantProperty(data, key, value) {
    Object.defineProperty(data, key, {
      enumerable: false,
      configurable: false,
      value
    });
  }

  class Observer {
    constructor(data) {
      setConstantProperty(data, '__ob__', this);

      if (isArray(data)) {
        data.__proto__ = newArrMethods;
        this.observeArr(data);
      } else {
        this.walk(data);
      }
    }

    walk(data) {
      const keys = Object.keys(data);
      keys.map(key => {
        defineReactive(data, key, data[key]);
      });
    }

    observeArr(data) {
      data.map(item => {
        observe(item);
      });
    }

  }

  function defineReactive(data, key, value) {
    observe(value);
    Object.defineProperty(data, key, {
      get() {
        console.log('响应式获取：' + value);
        return value;
      },

      set(newValue) {
        if (value === newValue) return;
        console.log('响应式设置：' + key + ' = ' + newValue);
        observe(newValue);
        value = newValue;
      }

    });
  }

  function observe(data) {
    if (!isObject(data) || data.__ob__) {
      return data;
    }

    new Observer(data);
  }

  function initState(vm) {
    const options = vm.$options;

    if (options.props) ;

    if (options.methods) ;

    if (options.data) {
      initData(vm);
    }

    if (options.computed) ;

    if (options.watch) ;
  }

  function initData(vm) {
    let data = vm.$options.data;
    vm._data = data = typeof data === 'function' ? data.call(vm) : data;

    for (let key in data) {
      proxy(vm, '_data', key);
    }

    observe(data);
  }

  // 属性匹配，可以匹配 id="app" id='app' id=app
  const attribute = /^\s*([^\s"'<>\/=]+)(?:\s*(=)\s*(?:"([^"]*)"+|'([^']*)'+|([^\s"'=<>`]+)))?/; // 标签名匹配

  const ncname = `[a-zA-Z_][\\-\\.0-9_a-zA-Z]*`; // 匹配特殊标签名，比如：<my:header></my:header>

  const qnameCapture = `((?:${ncname}\\:)?${ncname})`; // 开始标签左侧<匹配，比如：<div

  const startTagOpen = new RegExp(`^<${qnameCapture}`); // 开始标签右侧>匹配，比如：>或/>

  const startTagClose = /^\s*(\/?)>/; // 整个结束标签，比如</div>

  const endTag = new RegExp(`^<\\/${qnameCapture}[^>]*>`);
  /* 

    <div id="app" style="color: red;font-size: 20px;">
      你好，{{name}}
      <span class="text" style="color: green;">{{age}}</span>
    </div>

  **/
  // 这个文件的功能是根据html（注意这个html是个字符串来的，不是真实DOM）来生成AST
  // *** 说明：
  // string.match()方法用于匹配字符串，会返回一个数组，只要匹配到一个就会停止匹配
  // 1、通过正则来匹配开始标签的左侧<，如果匹配到，则从html中删除，并创建一个对象
  // 2、之后再判断紧接着的是不是>或者/>，如果是就代表该标签没有属性，如果不是则代表这个标签有属性
  // 3、处理属性。匹配到的属性会以一个对象形式放到数组attrs中，然后把匹配了的内容删除掉

  function parseHtmlToAst(html) {
    console.log(html); // 生成AST中三个比较重要的变量：
    // root: 作为一个AST中的根节点
    // currentParent: 当前解析到的标签的父元素
    // stack：标签栈，用来记录解析的元素，使父子元素关系比较可视化，也方便操作。索引值为0的元素为最外层元素

    let text,
        root,
        currentParent,
        stack = [];

    while (html) {
      let textEnd = html.indexOf('<');

      if (textEnd === 0) {
        // 标签
        // 开始标签
        const startTagMatch = parseStartTag();

        if (startTagMatch) {
          start(startTagMatch.tagName, startTagMatch.attrs);
          continue;
        } // 结束标签


        const endTagMatch = html.match(endTag);

        if (endTagMatch) {
          advance(endTagMatch[0].length);
          end(endTagMatch[1]);
          continue;
        }
      }

      if (textEnd > 0) {
        // 文本
        text = html.substring(0, textEnd);

        if (text) {
          advance(text.length);
          chars(text);
        }
      }
    }

    function parseStartTag() {
      const start = html.match(startTagOpen);
      let end, attr;

      if (start) {
        const match = {
          tagName: start[1],
          attrs: []
        }; // 匹配到标签之后删除

        advance(start[0].length);

        while (!(end = html.match(startTagClose)) && (attr = html.match(attribute))) {
          // 这里是处理标签的属性的
          match.attrs.push({
            name: attr[1],
            value: attr[3] || attr[4] || attr[5] // 这里是因为如果是id="app" id='app' id=app，他们的位置都不一样

          });
          advance(attr[0].length);
        }

        if (end) {
          // 到这里就是整个开始标签（包含标签和属性）都解析完了
          advance(end[0].length);
          return match;
        }
      }
    }

    function advance(n) {
      html = html.substring(n);
    } // 处理开始标签
    // stack [div,span]
    // 用stack可以方便记录低元素之间父子关系
    // 在这个stack数组中，从左往右，元素是一个个嵌套的，索引值为0的元素为最外层元素


    function start(tagName, attrs) {
      const element = createASTElement(tagName, attrs);

      if (!root) {
        root = element;
      }

      currentParent = element; // 把当前的标签节点推到stack中

      stack.push(element);
    } // 处理结束标签 
    // stack [div,span] --> 取出span --> [div]，currentParent设置为div


    function end(tagName) {
      // 取出结束标签
      const element = stack.pop(); // 取出之后把currentParent当前父亲 设置为stack中倒数第一个元素

      currentParent = stack[stack.length - 1];

      if (currentParent) {
        // 如果有currentParent，则把刚刚弹出来的标签的parent设置为currentParent
        // 比如[div,span]，把span弹出了，此时currentParent为div，然后把div设置为span的parent，合理！
        element.parent = currentParent; // 然后把element推到currentParent的children中

        currentParent.children.push(element);
      }
    } // 处理文本


    function chars(text) {
      text = text.trim();

      if (text.length > 0) {
        currentParent.children.push({
          type: 3,
          text
        });
      }
    } // 在AST中创建元素节点


    function createASTElement(tagName, attrs) {
      return {
        tag: tagName,
        type: 1,
        children: [],
        attrs,
        parent
      };
    }

    return root;
  }

  /*
    <div id="app" style="color: red;font-size: 20px;">
      你好，{{name}}
      <span class="text" style="color: green;">{{age}}</span>
    </div>

    创建元素： _c() --> createElement()
    创建文本： _v() --> createTextNode()
    解析Mustache插值： _s() --> {{name}} --> -S(name)
  **/
  // 我们要生成以下这堆东西
  // function vrender(){
  //   return `
  //     _c(
  //       "div",
  //       {
  //         "id": "app", 
  //         "style": { 
  //           "color": "red", 
  //           "font-size": "20px" 
  //         }
  //       },
  //       _v("你好，"+_s(name)),
  //       _c(
  //         "span",
  //         {
  //           "class": "text", 
  //           "style": { 
  //             "color": "green" 
  //           }
  //         },
  //         _v(_s(age))
  //       )
  //     )
  //   `;
  // }
  function formatProps(attrs) {
    let attrStr = '';

    for (let i = 0; i < attrs.length; i++) {
      let attr = attrs[i];

      if (attr.name === 'style') {
        let styleAttrs = {};
        attr.value.split(';').forEach(styleAttr => {
          let [key, value] = styleAttr.split(':');
          styleAttrs[key] = value;
        });
        attr.value = styleAttrs;
      }

      attrStr += `${attr.name}:${JSON.stringify(attr.value)},`;
    }

    console.log(`{${attrStr.slice(0, -1)}}`);
    return `{${attrStr.slice(0, -1)}}`;
  }

  function generate(el) {
    console.log(el);
    `
    _c('${el.tag}',${el.attrs.length > 0 ? `${formatProps(el.attrs)}` : 'undefined'})
  `;
  }

  function compileToRenderFunction(html) {
    // parseHtmlToAst()将html先转换成AST
    const ast = parseHtmlToAst(html);
    generate(ast);
  }

  function initMixin(Vue) {
    Vue.prototype._init = function (options) {
      const vm = this;
      vm.$options = options;
      initState(vm);

      if (vm.$options.el) {
        // 挂载函数   Vue.prototype.$mount
        vm.$mount(vm.$options.el);
      }
    };

    Vue.prototype.$mount = function (el) {
      const vm = this,
            options = vm.$options;
      el = document.querySelector(el), vm.$el = el;

      if (!options.render) {
        let template = options.template;

        if (!template && el) {
          // dom.outerHTML包含自己，而dom.innerHTML不包含自己
          template = el.outerHTML;
        }

        const render = compileToRenderFunction(template);
        options.render = render;
      } // mountComponent(vm);

    };
  }

  // import { renderMixin } from './vdom';

  function Vue(options) {
    this._init(options);
  }

  initMixin(Vue); // lifecycleMixin(Vue);

  return Vue;

})));
//# sourceMappingURL=vue.js.map
