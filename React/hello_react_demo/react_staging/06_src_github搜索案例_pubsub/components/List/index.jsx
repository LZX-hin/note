import React, { Component } from 'react'
import './index.css'
import PubSub from 'pubsub-js'

export default class List extends Component {
    state = {
        users:[],
        isFirst: true, // 是否为第一次打开页面
        isLoading: false, // 是否为加载中
        err: '', // 储存错误信息
    }
    componentDidMount(){
        this.token = PubSub.subscribe('atguigu',(msg,stateObj)=>{
            this.setState(stateObj)
        })
    }
    // 在List组件卸载前取消订阅消息
    componentWillUnmount(){
        PubSub.unsubscribe(this.token)
    }
    render() {
        const {users,isFirst,isLoading,err} = this.state
        return (
            <div className="row">
                {
                    isFirst ? <h2>欢迎使用，输入关键字，随后点击搜索</h2> : 
                    isLoading ? <h2>Loading...</h2> :
                    err ? <h2 style={{color: 'red'}}>{err.message}</h2> :
                    users.map(userObj => {
                        return (
                            <div className="card" key={userObj.id}>
                                <a href={userObj.html_url} target="_blank" rel="noreferrer">
                                    <img src={userObj.avatar_url} style={{ width: '100px' }} alt="head_portrait" />
                                </a>
                                <p className="card-text">{userObj.login}</p>
                            </div>
                        )
                    })
                }
            </div>
        )
    }
}
