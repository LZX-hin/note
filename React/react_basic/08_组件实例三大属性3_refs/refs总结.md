## 组件三大属性之refs总结

### 理解
通过refs/ref拿到真实dom
而这个refs是直接挂载在组件实例上的

### 使用方式
1) 字符串形式ref，这种是不推荐使用的，准备要放弃了
  <input ref='input1' />
2) 回调形式ref
  <input ref={c=>this.input1=c}/>
  那么这个挂在this上的input1就是这个input标签的真实dom了
3) React.createRef()，这个createRef()相当于一个容器
  给实例添加一个属性（在class中直接赋值）：
  ref1 = React.createRef()
  在jsx中：
  <input ref={this.ref1} />

### 注意：
a) 不要用字符串形式
b) 一个createRef只能放一个节点
c) react官方文档说不要过度的使用ref
  