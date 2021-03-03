// 递归遍历 侦测所有data中的属性

// 通过封装一个Observer类来实现
export class Observer {
  constructor(value) {
    this.value = value;
    if (!Array.isArray(value)) {
      this.walk(value)
    }
  }
  walk(obj) {
    // 将对象上的每个属性都进行数据劫持
    const keys = Object.keys(obj);
    for (let i = 0; i < keys.length; i++) {
      defineReactive(obj, keys[i], obj[keys[i]]);
    }
  }
}