import React, { PureComponent } from 'react'
import './index.css'

export default class Parent extends PureComponent {
  state = {
    carName: 'bmw',
    students: ['小刘', '小张', '小红']
  }
  changeCar = () => {
    // 1.正常写法，页面正常更新
    // 这种写法this.setState()里面的对象和this.state是完全两个不同的对象，react监测到state变化了，就调用render更新页面
    this.setState({
      carName: 'audi'
    })

    // 2.错误写法，页面没有更新
    // 原因：obj和this.state引用的是同一个对象，react监测不了state变化了，所以就不调用render更新页面
    // const obj = this.state
    // obj.carName = 'audi'
    // this.setState(obj)
  }
  addStudent = () => {
    // 正确写法
    //1.
    // this.setState({
    //   students: [...this.state.students,'小陈']
    // })
    //2.
    // const students = JSON.parse(JSON.stringify(this.state.students))
    // students.push('小陈');
    // this.setState({
    //   students
    // })

    // 错误写法
    // 原因：在this.setState()中对象中的students和外面解构获取的students是同一个数组，因此react监测不了两者的变化，不会调用render更新页面
    // const {students} = this.state;
    // students.unshift('小陈');
    // this.setState({
    //   students
    // })
  }
  // shouldComponentUpdate(nextProps,nextState){
  //   // console.log('父组件旧的state',this.state)
  //   // console.log('父组件新的state',nextState)
  //   return !(this.state.carName === nextState.carName)
  // }

  render() {
    const { carName } = this.state
    console.log('Parent调用render')
    return (
      <div className="parent">
        <h3>我是Parent组件</h3>
        <span>学生：{this.state.students}</span>&nbsp;
        <span>我的车名字是：{carName}</span><br />
        <button onClick={this.changeCar}>点我换车</button>
        <button onClick={this.addStudent}>点我添加学生</button>
        <Child carName='奥拓'></Child>
      </div>
    )
  }
}

class Child extends PureComponent {
  // shouldComponentUpdate(nextProps,nextState){
  //   console.log('子组件旧的state',this.state)
  //   console.log('子组件新的state',nextState)
  //   console.log('子组件旧的props',this.props)
  //   console.log('子组件新的props',nextProps)
  //   return !(this.props.carName === nextProps.carName)
  // }
  render() {
    console.log('Child调用render')
    return (
      <div className="child">
        <h3>我是Child组件</h3>
        <span>我接到的车是：{this.props.carName}</span>
      </div>
    )
  }
}
