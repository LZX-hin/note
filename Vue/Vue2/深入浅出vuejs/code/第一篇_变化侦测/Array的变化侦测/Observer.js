// 递归遍历 侦测所有data中的属性

import { arrayMethods } from "../interceptor";

// 判断__proto__是否可用
const hasProto = '__proto__' in {};
const arrayKeys = Object.getOwnPropertyNames(arrayMethods)

export class Observer {
  constructor(value) {
    this.value = value;
    // Array将dep存放在Observer中
    this.dep = new Dep();
    if (Array.isArray(value)) {
      const augment = hasProto ? protoAugment : copyAugment;
      augment(value,arrayMethods,arrayKeys);
    } else {
      this.walk(value);
    }
  }
  walk(obj) {
    const keys = Object.keys(obj);
    for (let i = 0; i < keys.length; i++) {
      defineReactive(obj, keys[i], obj[keys[i]]);
    }
  }
}

function protoAugment (target, src, keys){
  target.__proto__ = src;
}

function copyAugment(target,src,keys){
  for(let i=0,l=keys.length;i<l;i++){
    const key = keys[i];
    def(target,key,src[key]);
  }
}