import React, { Component } from 'react'
import PropTypes from 'prop-types'
import './index.css'

export default class Item extends Component {
    static propTypes = {
        updateTodo: PropTypes.func.isRequired,
        todo: PropTypes.object.isRequired
    }
    state={
        mouse:false
    }
    handleMouse = (flag)=>{
        this.setState({
            mouse:flag
        })
    }
    handleCheck = (id,e)=>{
        this.props.updateTodo(id,e.target.checked)
    }
    handleDelete = (id) => {
        if(window.confirm('确定删除吗')){
            this.props.deleteTodo(id)
        }
    }
    render() {
        const {todo} = this.props
        return (
            <li style={{backgroundColor: this.state.mouse ? '#ddd' : '#fff'}} onMouseLeave={()=>{this.handleMouse(false)}} onMouseEnter={()=>{this.handleMouse(true)}}>
                <label>
                    <input type="checkbox" checked={todo.done} onChange={(e)=>{this.handleCheck(todo.id,e)}}/>
                    <span>{todo.name}</span> 
                </label>
                <button onClick={()=>{this.handleDelete(todo.id)}} className="btn btn-danger" style={{ display: this.state.mouse ? 'block' : 'none' }}>删除</button>
            </li>
        )
    }
}
