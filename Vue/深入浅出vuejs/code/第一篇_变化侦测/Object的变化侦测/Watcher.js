// watcher是一个中介角色，数据发生变化时通知watcher，watcher通知其他地方
// 下面是watcher一个经典使用方式：
// vm.$watch('a.b.c',function(newVal,oldVal){
//   ...
// })
// 这段代码表示触发data选项中的a.b.c时，执行后面的回调函数
// 把watcher实例添加到data.a.b.c的Dep容器中就可以实现
export default class Watcher{
  constructor(vm,expOrFn,cb){
    this.vm = vm;
    // 执行this.getter()，可以读取data.a.b.c的内容
    this.getter = parsePath(expOrFn);
    this.cb = cb;
    this.value = this.get();
  }
  get(){
    window.target = this;
    let value = this.getter.call(this.vm,this.vm);
    window.target = undefined;
    return value;
  }
  update(){
    const oldValue = this.value;
    this.value = this.get();
    this.cb.call(this.vm,this.value,oldValue);
  }
}