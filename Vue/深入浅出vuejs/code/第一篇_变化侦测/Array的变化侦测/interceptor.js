const arrayProto = Array.prototype;
export const arrayMethods = Object.create(arrayProto);

;[
  'push',
  'pop',
  'unshift',
  'shift',
  'splice',
  'sort',
  'reverse'
].forEach(function(method){
  // 缓存原生方法
  const original = arrayProto[method];
  Object.defineProperty(arrayMethods, method, {
    value: function mutator(...args){
      return original.apply(this, args);
    },
    enumerable: false,
    writable: true,
    configurable: true
  })
})