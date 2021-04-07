import React, { Component } from 'react'

const data = [
  {id: '01', content: '你好，北京'},
  {id: '02', content: '你好，广州'},
  {id: '03', content: '你好，深圳'}
]
export default class Detail extends Component {
  render() {
    console.log(this.props)
    const {id,title} = this.props.match.params
    const findResult = data.find(item => item.id == id)
    return (
      <ul>
        <li>ID: {id}</li>
        <li>TITLE: {title}</li>
        <li>CONTENT:  {findResult.content}</li>
      </ul>
    )
  }
}
