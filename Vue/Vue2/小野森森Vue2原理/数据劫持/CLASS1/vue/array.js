// 重写一下数组方法，从而可以观察数组变化
// 在Vue2里面，7个会修改原数组的数组api是经过重写的
// 这7个api重写后有两个作用：1、保留该api原本的功能 2、能够被观察到数组被更改了
import { ARR_METHODS } from './config';
import observeArr from './observeArr';

let originArrMethods = Array.prototype;
let arrMethods = Object.create(originArrMethods);

ARR_METHODS.forEach(function(m) {
  arrMethods[m] = function(){
    console.log('数组新方法',arguments)
    let args = Array.from(arguments);
    // 得出数组操作后的数组，并赋值给rt
    let rt = originArrMethods[m].apply(this, args);
    // newArr表示新添加到数组的元素（也是一个数组）
    let newArr;

    switch(m){
      case 'push':
      case 'unshift':
        newArr = args;
        break;
      case 'splice':
        newArr = args.slice(2);
        break;
      default: 

        break;
    }
    newArr && observeArr(newArr);
    return rt
  }
})

export {
  arrMethods
}
