/*
  该文件专门为Count组件生成action对象
*/
import { INCREMENT, DECREMENT } from './constant'

// 同步action，就是指action的值为object一般对象
const createIncrementAction = (data) => ({ type: INCREMENT, data })
const createDecrementAction = (data) => ({ type: DECREMENT, data })

// 异步action，就是指action的值为一个function函数，异步action中，一般都会调用同步action，异步action不是必须要用的
const createIncrementAsyncAction = (data, time) => {
  return (dispatch) => {
    setTimeout(() => {
      dispatch(createIncrementAction(data))
    }, time);
  }
}

export {
  createIncrementAction,
  createDecrementAction,
  createIncrementAsyncAction
}