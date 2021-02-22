// 样式资源、字体图标资源要想让webpack打包，都要在入口文件引入
import '../css/index.less';
import '../css/iconfont.css';
import print from './print';

console.log('index.js被加载了')

// print();

function add(x,y){
  return (x+y)
};
console.log(add(1,3))

// 一旦module.hot，说明开启了HMR功能  --> 让HMR生效
if(module.hot){
  // 方法会监听print.js的变化，一旦发生变化，其他模块不会重新打包构建，
  // 但是会执行后面的回调函数
  module.hot.accept('./print.js',function(){
    print();
  })
}