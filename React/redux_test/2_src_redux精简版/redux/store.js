/*
  该文件专门用于暴露一个store对象，整个应用只有一个store对象
*/

// 引入createStore方法，创建redux中最核心的Store对象
import { createStore } from 'redux'
// 引入为Count组件服务的reducer
import countReducer from './count_reducer'

export default createStore(countReducer)