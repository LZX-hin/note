/*
  该文件专门为Count组件生成action对象
*/
import {INCREMENT,DECREMENT} from './constant'

const createIncrementAction = (data) => ({type:INCREMENT,data})
const createDecrementAction = (data) => ({type:DECREMENT,data})

export {
  createIncrementAction,
  createDecrementAction
}