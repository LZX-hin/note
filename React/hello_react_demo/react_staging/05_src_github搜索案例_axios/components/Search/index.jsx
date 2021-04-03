import React, { Component } from 'react'
import axios from 'axios'

export default class Search extends Component {
    search = ()=>{
        // 连续结构赋值
        const {keyWordElement:{value}} = this
        // 发送请求前通知App组件更新状态
        this.props.updateAppState({
            isFirst: false,
            isLoading: true
        })
        axios.get(`http://localhost:3000/api1/search/users?q=${value}`).then(r=>{
            this.props.updateAppState({
                isLoading: false,
                users: r.data.items
            })
        },err => {
            this.props.updateAppState({
                isLoading: false,
                err
            })
        })
    }
    render() {
        return (
            <section className="jumbotron">
                <h3 className="jumbotron-heading">搜索github用户</h3>
                <div>
                    <input ref={c=>this.keyWordElement = c} type="text" placeholder="输入关键词点击搜索" />&nbsp;
                    <button onClick={this.search}>搜索</button>
                </div>
            </section>
        )
    }
}
