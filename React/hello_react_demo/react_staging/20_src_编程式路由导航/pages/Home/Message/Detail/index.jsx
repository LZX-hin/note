import React, { Component } from 'react'
import qs from 'querystring'

const data = [
  {id: '01', content: '你好，北京'},
  {id: '02', content: '你好，广州'},
  {id: '03', content: '你好，深圳'}
]
export default class Detail extends Component {
  render() {
    // console.log(this.props)

    // 接收params参数
    // const {id,title} = this.props.match.params

    // 接收search参数
    // const {search} = this.props.location
    // const {id,title} = qs.parse(search.slice(1))

    // 接收state参数
    const {id,title} = this.props.location.state || {}

    const findResult = data.find(item => item.id == id) || {}
    return (
      <ul>
        <li>ID: {id}</li>
        <li>TITLE: {title}</li>
        <li>CONTENT: {findResult.content}</li>
      </ul>
    )
  }
}
