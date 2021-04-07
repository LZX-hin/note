import React, { Component } from 'react'
// 引入store，用于获取redux中状态
import store from '../../redux/store'
// 引入actionCreator，专门用于创建action对象
import {createIncrementAction, createDecrementAction} from '../../redux/count_action'

export default class Count extends Component {
  state = {
    carName: 'BMW330Li'
  }
  // 方法一：在componentDidMount生命周期钩子中通过store.subscribe()监听状态变化，再调用setState()触发render执行重新渲染页面
  // 方法二：直接在index.js中通过store.subscribe()监听redux状态变化，如果变化了重新执行ReactDOM.render(xxx,document.getElementById('root'))
  
  // componentDidMount(){
  //   // 监听redux中状态的变化，只要变化就调用render()
  //   store.subscribe(()=>{ // 只要redux中任何一个状态发生改变，都会触发该回调
  //     this.setState({})
  //   })
  // }
  increment=()=>{
    const {value} = this.selectNumber;
    // 通过redux加value
    store.dispatch(createIncrementAction(+value))
  }
  decrement=()=>{
    const {value} = this.selectNumber
    store.dispatch(store.dispatch(createDecrementAction(+value)))
  }
  incrementIfOdd=()=>{
    const {value} = this.selectNumber
    const count = store.getState();
    if(count%2 != 0){
      store.dispatch(createIncrementAction(+value))
    }
  }
  incrementAsync=()=>{
    const {value} = this.selectNumber
    setTimeout(()=>{
      store.dispatch(createIncrementAction(+value))
    },500)
  }
  render() {
    return (
      <div>
        <h1>当前求和为：{store.getState()}</h1>
        <select ref={c=>this.selectNumber=c}>
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
        </select>&nbsp;
        <button onClick={this.increment}>+</button>&nbsp;
        <button onClick={this.decrement}>-</button>&nbsp;
        <button onClick={this.incrementIfOdd}>当前求和为奇数再加</button>&nbsp;
        <button onClick={this.incrementAsync}>异步加</button>&nbsp;
      </div>
    )
  }
}
