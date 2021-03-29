## 组件三大属性之state总结

### 理解
1) state是组件对象中最重要的属性，值是对象（包含多个key/value）
2) 组件被称为“状态机”，通过更新组件的state来更新对应的页面显示（重新渲染组件）

### 强烈注意
1) 组件中render方法中的this指向的是实例对象
2) 组件自定义方法中的this为undefined，如何解决？
  a. 在constructor构造器中使用bind来强制改变函数this的指向
  b. 通过赋值语句+箭头函数，如：
    class Person extends React.Component{
      getName = () => {
        console.log(this)
        ...
      }
    }
3) 状态数据（state）不能直接修改，而是要通过this.setState()来修改数据，驱动页面更新