import React, { Component } from 'react'
import { connect } from 'react-redux'
import {createIncrementAction, createDecrementAction, createIncrementAsyncAction} from '../../redux/count_action'

class Count extends Component {
  state = {
    carName: 'BMW330Li'
  }
  increment=()=>{
    const {value} = this.selectNumber;
    this.props.increment(+value)
  }
  decrement=()=>{
    const {value} = this.selectNumber
    this.props.decrement(+value)
  }
  incrementIfOdd=()=>{
    const {value} = this.selectNumber
    if(this.props.count % 2 !== 0){
      this.props.increment(+value)
    }
  }
  incrementAsync=()=>{
    const {value} = this.selectNumber
    this.props.incrementAsync(+value,500)
  }
  render() {
    // console.log('UI组件接收到的props是：',this.props)
    return (
      <div>
        <h1>当前求和为：{this.props.count}</h1>
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

export default connect(
  state=>({count:state}),
  // mapDispatchToProps的一般写法
  // dispatch=>({
  //   increment: value=>dispatch(createIncrementAction(value)),
  //   decrement: value=>dispatch(createDecrementAction(value)),
  //   incrementAsync: value=>dispatch(createIncrementAsyncAction(value))
  // })

  // mapDispatchToProps的简写 
  // 对象中key是props中的key，value是一个创建并返回action对象的函数
  {
    increment: createIncrementAction,
    decrement: createDecrementAction,
    incrementAsync: createIncrementAsyncAction,
  }
)(Count)