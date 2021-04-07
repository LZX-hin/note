import React, { Component } from 'react'
import {Button} from 'antd'
import './App.less';

export default class App extends Component {
  render() {
    return (
      <div>
        App...
        <button>点我</button>
        <Button type="link">点我</Button>
      </div>
    )
  }
}
