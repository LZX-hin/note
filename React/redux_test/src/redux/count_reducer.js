/*
  1.该文件用于创建一个为Count组件服务的reducer，reducer本质是一个函数
  2.reducer函数会接收到两个参数，分别为：之前的状态(preState)和动作对象(action)
*/
const initState = 0;
export default function countReducer(preState=initState,action){
  // console.log(preState)
  // 从action对象中获取type和data
  const {type,data} = action;
  // 根据type决定如何加工数据
  switch(type){
    case 'increment':
      return preState + data;
    case 'decrement':
      return preState - data;
    default: // 初始化
      return preState;
  }
}