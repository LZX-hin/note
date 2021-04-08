import React, { Component } from 'react'
import { connect } from 'react-redux'
import {increment, decrement, incrementAsync} from '../../redux/actions/count'

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
        <h2>我是Count组件</h2>
        <h4>当前求和为：{this.props.count}，下方组件人数为：{this.props.persons}</h4>
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
  state=>({count:state.count,persons:state.persons.length}),
  {
    increment,
    decrement,
    incrementAsync,
  }
)(Count)