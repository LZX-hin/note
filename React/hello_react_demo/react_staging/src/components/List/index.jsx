import React, { Component } from 'react'
import Item from '../Item'
import './index.css'

export default class List extends Component {
    render() {
        const {todos} = this.props
        return (
            <div className="todo-main">
                {
                    todos.map((todo)=>{
                        return <Item key={todo.id} todo={todo}/>
                    })
                }
            </div>
        )
    }
}
