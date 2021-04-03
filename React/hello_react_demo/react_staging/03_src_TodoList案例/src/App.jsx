import React, { Component } from 'react'
import Header from './components/Header'
import Footer from './components/Footer'
import List from './components/List'
import './App.css'

export default class App extends Component {
    state={
        todos:[
            {
                id: '001',
                name: '吃饭',
                done: true
            },
            {
                id: '002',
                name: '睡觉',
                done: true
            },
            {
                id: '003',
                name: '写代码',
                done: false
            },
            {
                id: '004',
                name: '逛街',
                done: true
            },
        ]
    }
    addTodo = (todoObj)=>{
        this.setState({
            todos: [todoObj,...this.state.todos]
        })
    }
    updateTodo = (id,done)=>{
        const todo = this.state.todos.filter(item => item.id === id)[0]
        todo.done = done
        this.setState({
            todos: this.state.todos
        })
    }
    deleteTodo = (id)=>{
        const index = this.state.todos.findIndex(item => item.id === id);
        this.state.todos.splice(index,1)
        this.setState({
            todos: this.state.todos
        })
    }
    checkAllTodo = (flag)=>{
        const {todos} = this.state
        const newTodos = todos.map(todoObj=>{
            return {...todoObj,done:flag ? true : false}
        })
        this.setState({
            todos: newTodos
        })
    }
    clearDone = ()=>{
        const {todos} = this.state
        const newTodos = todos.filter( item => !item.done)
        this.setState({
            todos: newTodos
        })
    }
    render() {
        return (
            <div className="todo-container">
                <div className="todo-wrap">
                    <Header addTodo={this.addTodo}></Header>    
                    <List updateTodo={this.updateTodo} deleteTodo={this.deleteTodo} todos={this.state.todos}></List>
                    <Footer todos={this.state.todos}  clearDone={this.clearDone} checkAllTodo={this.checkAllTodo}></Footer>
                </div>
            </div>
        )
    }
}
