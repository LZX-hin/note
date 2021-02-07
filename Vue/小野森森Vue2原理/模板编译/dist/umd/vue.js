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

  /* 

    <div id="app" style="color: red;font-size: 20px;">
      你好，{{name}}
      <span class="text" style="color: green;">{{age}}</span>
    </div>

  **/
  function parseHtmlToAst(html) {
    console.log(html);
  }

  function compileToRenderFunction(html) {
    // parseHtmlToAst()将html先转换成AST
    const ast = parseHtmlToAst(html);
    console.log(ast);
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
