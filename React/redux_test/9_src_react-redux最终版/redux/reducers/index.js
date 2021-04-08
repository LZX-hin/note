/*
  该文件用于汇总所有的reducer为一个总的reducer
*/

import count from './count'
import persons from './person'
import {combineReducers} from 'redux'

// 合并多个reducers，变成一个总的reducer
const allReducers = combineReducers({
  count,
  persons
})

export default allReducers