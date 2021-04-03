import React, { Component } from 'react'
import './index.css'

export default class Item extends Component {
    render() {
        const {todo} = this.props
        return (
            <li>
                <label>
                    <input type="checkbox" defaultChecked={todo.done}/>
                    <span>{todo.name}</span> 
                </label>
                <button className="btn btn-dander" style={{ display: 'none' }}>删除</button>
            </li>
        )
    }
}
