// 这个js文件是用来观察对象的变化
import observe from './observe';

function defineReactive(data, key, value){
  observe(value);
  Object.defineProperty(data, key, {
    get(){
      return value
    },
    set(newVal){
      console.log('bbb',newVal)
    }
  })
}

export default defineReactive;