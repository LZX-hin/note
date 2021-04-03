import React, { Component } from 'react'
import axios from 'axios'
import PubSub from 'pubsub-js'

export default class Search extends Component {
    search = ()=>{
        const {keyWordElement:{value:keyWord}} = this
        // 通过PubSub发布消息
        PubSub.publish('atguigu',{isFirst:false,isLoading:true})
        axios.get(`/api1/search/users?q=${keyWord}`).then(r => {
            // 通过PubSub发布消息
            PubSub.publish('atguigu',{isLoading:false,users:r.data.items})
        },err => {
            PubSub.publish('atguigu',{isLoading:false,err:err.message})
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
