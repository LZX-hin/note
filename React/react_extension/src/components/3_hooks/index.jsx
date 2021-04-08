import React from 'react'
import ReactDOM from 'react-dom'

// 1.类式组件
// class Demo extends React.Component {
//   state = {
//     count: 0
//   }
//   myRef = React.createRef()
//   add = ()=>{
//     this.setState((state)=>({
//       count: ++state.count
//     }))
//   }
//   show = ()=>{
//     alert(this.myRef.current.value)
//   }
//   componentDidMount(){
//     this.timer = setInterval(()=>{
//       this.setState(state=>({count:state.count+1}))
//     },1000)
//   }
//   componentWillUnmount(){
//     clearInterval(this.timer)
//   }
//   unmount = ()=>{
//     ReactDOM.unmountComponentAtNode(document.getElementById('root'))
//   }
//   render() {
//     return (
//       <div>
//         <input type="text" ref={this.myRef}/>
//         <h2>当前求和为：{this.state.count}</h2>
//         <button onClick={this.add}>+1</button>
//         <button onClick={this.unmount}>卸载组件</button>
//         <button onClick={this.show}>点击提示数据</button>
//       </div>
//     )
//   }
// }

// 2.函数式组件
function Demo(){
  const [count,setCount] = React.useState(0);
  const myRef = React.useRef()
  let timer = null
  React.useEffect(()=>{
    timer = setInterval(()=>{
      setCount(count=>count+1)
    },1000)
    return ()=>{ // 在React.useEffect()第一个参数（函数）中return的函数，相当于生命周期钩子componentWillUnmount()
      console.log('组件卸载')
      clearInterval(timer)
    }
  },[])
  
  function add (){
    // setCount(count+1) // 第一种写法
    setCount(count=>count+1)
  }
  function unmount(){
    ReactDOM.unmountComponentAtNode(document.getElementById('root'))
  }
  function show(){
    alert(myRef.current.value)
  }
  return (
    <div>
      <input type="text" ref={myRef}/>
      <h2>当前求和为：{count}</h2>
      <button onClick={add}>+1</button>
      <button onClick={unmount}>卸载组件</button>
      <button onClick={show}>点我提示数据</button>
    </div>
  )
}

export default Demo
