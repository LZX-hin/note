import React,{useState,useEffect,useMemo} from 'react'

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
// function Demo(){
//   const [count,setCount] = React.useState(0);
//   const myRef = React.useRef()
//   let timer = null
//   React.useEffect(()=>{
//     timer = setInterval(()=>{
//       setCount(count=>count+1)
//     },1000)
//     return ()=>{ // 在React.useEffect()第一个参数（函数）中return的函数，相当于生命周期钩子componentWillUnmount()
//       console.log('组件卸载')
//       clearInterval(timer)
//     }
//   },[])
  
//   function add (){
//     // setCount(count+1) // 第一种写法
//     setCount(count=>count+1)
//   }
//   function unmount(){
//     ReactDOM.unmountComponentAtNode(document.getElementById('root'))
//   }
//   function show(){
//     alert(myRef.current.value)
//   }
//   return (
//     <div>
//       <input type="text" ref={myRef}/>
//       <h2>当前求和为：{count}</h2>
//       <button onClick={add}>+1</button>
//       <button onClick={unmount}>卸载组件</button>
//       <button onClick={show}>点我提示数据</button>
//     </div>
//   )
// }

// 自定义hook use开头的函数
// const useMousePosition = ()=>{
//   const [position,setPosition] = useState({x:0,y:0});
//   useEffect(()=>{
//     const updateMouse = (e)=>{
//       setPosition({x:e.clientX,y:e.clientY})
//     }
//     document.addEventListener('mousemove',updateMouse)
//     return ()=>{
//       document.removeEventListener('mousemove',updateMouse)
//     }
//   })
//   return position
// }

// function Demo(props){
//   const position = useMousePosition();
//   return (
//     <div>
//       <div>x:{position.x}</div>
//       <div>y:{position.y}</div>
//     </div>
//   )
// }

// function Demo(){
//   const [count,setCount] = useState(0);

//   useEffect(()=>{
//     const id = setInterval(()=>{
//       setCount(count=>count+1)
//     },1000)
//     return ()=> {
//       console.log('clearInterval')
//       clearInterval(id)
//     }
//   },[])

//   return <h1>{count}</h1>
// }

function Demo(){
  const [person1,setPerson1] = useState('Tom')
  const [person2,setPerson2] = useState('Jack')

  return (
    <>
      <button onClick={()=>{setPerson1('Tom111')}}>person1</button>
      <button onClick={()=>{setPerson2('Jack111')}}>person2</button>
      <ChildComponent name={person1}>{person2}</ChildComponent>
    </>
  )
}

// useMemo，性能优化
// 只有在useMemo()的第二个参数（也就是依赖值）发生变化时，才会重新执行useMemo()的第一个参数（回调）来重新计算
function ChildComponent({name,children}){
  function changePerson2(){
    console.log(name)
    return name+'aaaaaa'
  }
  const actionPerson = useMemo(()=>changePerson2(name),[name])
  return (
    <>
      <div>{actionPerson}</div>
      <div>{children}</div>
    </>
  )
}

export default Demo