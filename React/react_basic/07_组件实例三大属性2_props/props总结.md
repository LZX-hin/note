## 组件三大属性之props总结

### 理解
  props可以理解为外部传到组件实例中的数据

### 使用方式
  1) 在组件标签上一个个的传
    ReactDOM.render(<Person name="jerry" age={18}/>,document.getElementById('test'))
  2) 先定义好一个对象，然后通过{...obj}方式在组件标签上传
    const obj = {name:'jerry',age:18}
    ReactDOM.render(<Person {...obj}/>,document.getElementById('test))
    #### 注意：
      a. 这里的{...obj}的{}是jsx中写js表达式的语法，而不是对象的{}，所以实际的js是...obj
      b. 而原生es6中...是不能展开对象的，react之可以这么写是因为react.js和babel

### props的限制（数据类型、是否必传）和默认值
  1) 限制：在类中通过static关键字声明propTypes={...}
      a. 用PropTypes来写限制，比如name为限制字符串：name:PropTypes.string，必传就是name:PropTypes.string.isRequired
      b. 注意如果是限制函数，要写成PropTypes.func
  2) 默认值：在类中通过static关键字声明defaultProps={...}
      a. 如name的默认值为'tom'：name: 'tom'

### props与构造器constructor
  1) 首先，react官网说只有两种情况使用构造器。一个是要给this.state初始化state，第二个是给事件处理函数绑定实例，但是这两个有简洁写法
  2) 除了以上两种情况，实际开发中都尽量不要写构造器
  3) 如果是写了构造器，则需要给constructor()传入props参数，然后给super()传入props

### 函数式组件中使用props
  在函数式组件中也可以用props，通过函数参数props获取到props，如果要写限制props和props默认值，可以在外部Fn.propTypes={...}和Fn.defaultProps={...}来写