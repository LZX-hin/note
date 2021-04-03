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
                done: false
            },
        ]
    }
    addItem = (e)=>{
        if(e.keyCode === 13){
            console.log(e.target.value)
            
        }
        // this.setState({
        //     todos: this.state.todos.unshift(item)
        // })
    }
    render() {
        return (
            <div className="todo-container">
                <div className="todo-wrap">
                    <Header addItem={this.addItem}></Header>    
                    <List todos={this.state.todos}></List>
                    <Footer></Footer>
                </div>
            </div>
        )
    }
}
