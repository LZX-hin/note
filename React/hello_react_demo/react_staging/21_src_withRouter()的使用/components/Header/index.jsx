import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'

class Header extends Component {
  back = () => {
    this.props.history.goBack()
  }
  forward = ()=>{
    this.props.history.gaForward()
  }
  go = ()=>{
    this.props.history.go(-2)
  }
  render() {
    console.log(this.props)
    return (
      <div className="page-header">
        <h2>React Router Demo</h2>
        <button onClick={this.back}>回退</button>&nbsp;
        <button onClick={this.forward}>前进</button>
        <button onClick={this.go}>go</button>
      </div>
    )
  }
}
// withRouter()可以加工一般组件，让一般组件内部都可以使用路由api
// withRouter()返回值是一个新组件
export default withRouter(Header)
