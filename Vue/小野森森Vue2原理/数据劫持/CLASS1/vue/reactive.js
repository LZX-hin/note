// 这个js文件是用来观察对象的变化
import observe from './observe';

function defineReactive(data, key, value){
  observe(value);
  Object.defineProperty(data, key, {
    get(){
      console.log('响应式数据，获取：',value);
      return value
    },
    set(newVal){
      if(newVal === value){
        console.log('响应式数据，修改：',newVal);
        // 如果newVal是个对象，就要观察这个对象
        observe(newVal);
        value = newVal;
      }
    }
  })
}

export default defineReactive;