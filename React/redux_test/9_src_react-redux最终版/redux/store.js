/*
  该文件专门用于暴露一个store对象，整个应用只有一个store对象
*/
// 引入createStore方法，创建redux中最核心的Store对象
import { createStore, applyMiddleware } from 'redux'
// 引入redux-thunk，用于支持异步action
import thunk from 'redux-thunk'
// 引入redux-devtools-extension
import {composeWithDevTools} from 'redux-devtools-extension'
import allReducers from './reducers/index'

export default createStore(allReducers,composeWithDevTools(applyMiddleware(thunk)))