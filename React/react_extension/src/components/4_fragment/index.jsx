import React, { Component,Fragment } from 'react'

export default class Demo extends Component {
  render() {
    return (
      <Fragment>
        {/* 
          1.Fragment组件用于替代根标签div，使根标签不用渲染出来
          2.Fragment组件可以传递两个数据，一个是key，另一个是children
          3.其实jsx中的这个跟标签用空标签也可以，就是<></>，但是空标签和<Fragment><Fragment/>的区别是一个不可以传数据，一个可以传数据
        */}
        <input type="text"/>
        <input type="text"/>
      </Fragment>
    )
  }
}