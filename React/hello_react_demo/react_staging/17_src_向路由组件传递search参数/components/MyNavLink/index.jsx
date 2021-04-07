import React, { Component } from 'react'
import {NavLink} from 'react-router-dom'

export default class MyNavLink extends Component {
    render() {
        // 1. 直接通过在NavLink标签中使用{...this.props}把props中的属性属性值一个个传到NavLink标签中
        // 2. 在NavLink中，使用属性children="xxx"，这个xxx就相当于NavLink标签的子节点，比如children="About"，那么About就是标签的文本节点
        //    也就是说标签体内容是一个特殊的标签属性
        return (
            <NavLink activeClassName="atguigu" className="list-group-item" {...this.props}/>
        )
    }
}
