import Observer from "./Observer";

// 用来侦测对象中属性值变化
function defineReactive(data, key, val) {
  // 递归子属性
  if(typeof val === 'object'){
    new Observer(val);
  }
  let dep = new Dep();
  Object.defineProperty(data,key,{
    enumerable: true,
    configurable: true,
    get(){
      // 只要在模板中用到了这个key，就必定触发getter，这时把依赖收集到Dep容器中
      dep.depend();
      return val;
    },
    set(newVal){
      if(val === newVal){
        return
      }
      val = newVal;
      // 当在js中修改了这个key，必定触发setter，这时让dep里面所有依赖watcher去通知更新
      dep.notify();
    }
  })
}

// 这里说的依赖（watcher），就是我们data选项中的每个属性在模板中被用到的地方，简单来说，我们修改这个属性，页面上用到这个属性的地方就得更新，而这个更新，是依赖于这个属性的
// 比如：
// <template>
//  <div>
//    {{name}}
//  </div>
// </template>
// <script>
//   data(){
//     return {
//       name: 'xiaoming'
//     }
//   },
//   methods: {
//     changeName(){
//       this.name = 'xiaohong'
//     }
//   }
// </script>

// 这里模板中用到了name的地方，就是一个依赖，然后被Dep类收集起来