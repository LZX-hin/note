import React, { Component } from 'react'
import './index.css'

// 创建context对象
const MyContext = React.createContext();

export default class A extends Component {
  state={
    username: 'Tom',
    age: 20
  }
  render() {
    const {username,age} = this.state
    return (
      <div className="parent">
        <h3>我是A组件</h3>
        <h4>我的用户名是：{username}</h4>
        <MyContext.Provider value={{username,age}}>
          <B></B>
        </MyContext.Provider>
      </div>
    )
  }
}

class B extends Component {
  // 声明接收context
  static contextType = MyContext
  render() {
    console.log(this.context)
    return (
      <div className="children"> 
        <h3>我是B组件</h3>
        <C></C>
      </div>
    )
  }
}

// class C extends Component {
//   static contextType = MyContext
//   render() {
//     console.log(this.context)
//     return (
//       <div className="grand">
//         <h3>我是C组件</h3>
//         <h4>我从A组件接收到的用户名：{this.context.name}，年龄是：{this.context.age}</h4>
//       </div>
//     )
//   }
// }

function C(){
  return (
    <div className="grand">
      <h3>我是C组件</h3>
      <h4>我从A组件接收到的用户名：
        <MyContext.Consumer>
          {
            value => `${value.username},年龄是：${value.age}`
          }
        </MyContext.Consumer>
      </h4>
    </div>
  )
}