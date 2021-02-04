import proxyData from './proxy';
import observe from './observe';

function initState(vm){
  var options = vm.$options;
  if(options.data){
    initData(vm);
  }
}

function initData(vm){
  var data = vm.$options.data;
  data = vm._data = typeof data === 'function' ? data.call(vm) : data || {};
  for(let key in data){
    // 给data中的属性进行数据代理，代理给vm实例，可以直接通过vm访问data中的属性了
    proxyData(vm, '_data', key)
  }
  observe(vm._data);
}

export {
  initState
}