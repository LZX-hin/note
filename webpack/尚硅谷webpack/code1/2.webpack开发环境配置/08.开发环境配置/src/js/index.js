// 样式资源、字体图标资源要想让webpack打包，都要在入口文件引入
import '../css/index.less';
import '../css/iconfont.css';

function add(x,y){
  return (x+y)
};
console.log(add(1,2))