import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Item from '../Item'
import './index.css'

export default class List extends Component {
    static propTypes = {
        updateTodo: PropTypes.func.isRequired,
        todos: PropTypes.array.isRequired
    }
    render() {
        const {todos} = this.props
        return (
            <div className="todo-main">
                {
                    todos.map((todo)=>{
                        return <Item updateTodo={this.props.updateTodo} deleteTodo={this.props.deleteTodo} key={todo.id} todo={todo}/>
                    })
                }
            </div>
        )
    }
}
