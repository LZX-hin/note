// 引入Count的UI组件
import CountUI from '../../components/Count'
// 引入connect，用于连接UI组件与redux
import { connect } from 'react-redux'
import {createIncrementAction, createDecrementAction, createIncrementAsyncAction} from '../../redux/count_action'

// 1.mapStateToProps函数返回的是一个对象；
// 2.返回的对象中的key是作为传递给UI组件的props的key，value就作为传递给UI组件的props的value
// 3.mapStateToProps用于传递redux的状态
function mapStateToProps(state) { // 因为这个a函数是react-redux调用的，在调用时把redux里面的状态传到这个函数中了，所以可以通过参数获取到redux的状态
  return {
    count: state
  }
}
// 1.mapDispatchToProps函数返回的是一个对象；
// 2.返回的对象中的key是作为传递给UI组件的props的key，value就作为传递给UI组件的props的value
// 3.mapDispatchToProps用于传递操作redux状态的方法
function mapDispatchToProps(dispatch) { // 这里b函数会接收到一个参数
  return {
    increment: (value)=>{
      // 通知redux执行加法
      dispatch(createIncrementAction(value))
    },
    decrement: (value)=>{
      dispatch(createDecrementAction(value))
    },
    incrementAsync: (value,time)=>{
      dispatch(createIncrementAsyncAction(value,time))
    }
  }
}

// 使用connect()()创建并暴露一个Count组件的容器组件
export default connect(mapStateToProps,mapDispatchToProps)(CountUI)