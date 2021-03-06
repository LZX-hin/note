import defineReactive from './reactive';
import { arrMethods } from './array';
import observeArr from './observeArr';

function Observer(data){
  if(Array.isArray(data)){
    data.__proto__ = arrMethods;
    // 如果这里还是数组
    observeArr(data);
  }else{
    this.walk(data);
  }
}

Observer.prototype.walk = function (data){
  var keys = Object.keys(data);

  for(let i=0;i<keys.length;i++){
    let key = keys[i];
    let value = data[key];
    defineReactive(data, key, value);
  }
}

// 观察过程中如果属性是对象，用Object.defineProperty()来观察
// 而如果是数组的话就要自己写方法来观察了

export default Observer