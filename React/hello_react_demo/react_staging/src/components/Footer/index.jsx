import React, { Component } from 'react'
import './index.css'

export default class Footer extends Component {
    handleCheckAll =(e)=>{
        console.log(e.target.checked)
        this.props.checkAllTodo(e.target.checked)
    }
    handleClearAllDone=()=>{
        this.props.clearDone()
    }
    render() {
        const {todos} = this.props
        // 已完成个数
        const doneCount = todos.filter(item => item.done).length
        // 总数
        const total = todos.length
        return (
            <div className="todo-footer">
                <label>
                    <input type="checkbox" onChange={e=>{this.handleCheckAll(e)}} checked={doneCount === total && total!==0 ? true : false}/>
                </label>
                <span>
                    <span>已完成{doneCount}</span> / 全部{total}
                </span>
                <button onClick={this.handleClearAllDone} className="btn btn-danger">清除已完成任务</button>
            </div>
        )
    }
}
