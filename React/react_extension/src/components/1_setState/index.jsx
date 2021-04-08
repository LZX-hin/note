import React, { Component } from 'react'

export default class Demo extends Component {
  state = {
    count: 0
  }
  increment = ()=>{
    // 1. 对象式的setState
    // this.setState({
    //   count: ++this.state.count
    // },()=>{// 触发时机：在react调用render()更新页面后触发
    //   // react中setState驱动页面更新是异步的，这个回调就好比Vue中的$nextTick()
    //   console.log('回调中的state',this.state.count)
    // })
    // console.log(this.state.count)

    // 2. 函数式的setState
    this.setState((state,props)=>({
      count: state.count+1
    }))
  }
  render() {
    return (
      <div>
        <h1>当前求和为：{this.state.count}</h1>
        <button onClick={this.increment}>+1</button>
      </div>
    )
  }
}
