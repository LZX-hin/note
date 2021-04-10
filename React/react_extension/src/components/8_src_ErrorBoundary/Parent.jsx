import React, { Component } from 'react'
import Child from './Child'

export default class Parent extends Component {
  state = {
    hasError: '' // 用于表示子组件是否产生错误
  }
  // 当Parent的子组件出现报错时，会触发该函数调用，并携带错误信息
  static getDerivedStateFromError(error){
    return {hasError: error}
  }
  // 如果
  componentDidCatch(){
    console.log('统计错误次数，发送给后台')
  }
  render() {
    return (
      <div>
        <h2>我是Parent组件</h2>
        {this.state.hasError ? <h2>当前网络不稳定，稍后再试</h2> : <Child></Child>}
      </div>
    )
  }
}
