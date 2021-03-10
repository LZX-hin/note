<template>
  <h2>reactive的使用</h2>
  <h3>名字:{{user.name}}</h3>
  <h3>年龄:{{user.age}}</h3>
  <h3>媳妇:{{user.wife}}</h3>
  <h3>性别:{{user.gender}}</h3>
  <hr>
  <button @click="updateUser">更新数据</button>
</template>

<script lang="ts">
import { defineComponent, reactive, } from 'vue';
export default defineComponent({
  name: 'App',
  // 需求：显示用户的相关信息，点击按钮，可以更新用户的相关信息数据

  /*
    reactive()
    作用: 定义多个数据的响应式
    const proxy = reactive(obj): 接收一个普通对象然后返回该普通对象的响应式代理器对象
    响应式转换是“深层的”：会影响对象内部所有嵌套的属性（无论有多深的嵌套）
    内部基于 ES6 的 Proxy 实现，通过代理对象操作源对象内部数据都是响应式的
  */
  setup(){
    // 把复杂数据变成响应式数据
    // reactive()返回的是一个Proxy代理对象，被代理对象就是传入的对象
    // user对象的类型是Proxy
    
    // const obj: any = { // 这个是在使用obj.gender = '男'时不出现错误提示
    const obj: any = {
      name: '小明',
      age: 20,
      wife: {
        name: '小红',
        age: 20,
        cars: ['benz','BMW','Audi']
      }
    }
    const user = reactive<any>(obj)
    // 打印user可以看到是一个代理对象，[[Target]]这个属性指的是源对象，也就是obj
    const updateUser = ()=>{
      // user.name = '小强'
      // user.age += 2
      // user.wife.name = '小黄'
      // user.wife.cars[0] = 'TOYOTA'

      // 操作代理对象还是源对象？
      // user ---> 代理对象 ， obj ---> 源对象

      // user对象或obj对象添加一个新属性，哪一种方式会引起页面更新？
      // obj.gender = '男' // 修改源对象的数据，页面不会同步变化。
      // user.gender = '男' // 修改代理对象的数据，页面会同步变化

      // user对象或obj对象删除一个已有属性，哪一种方式会引起页面更新？
      // delete obj.age; // 页面没有同步更新，只是源对象改变了（删掉了age属性）
      delete user.age; // 页面同步更新了，源对象中删掉了age属性
      console.log(user)
      // 总结：
      // 1.如果操作代理对象，源对象中的数据也会跟着变化。
      // 2.如果修改数据想同步更新到页面，就要操作代理对象

    }
    return{
      user,
      updateUser
    }
  }
});
</script>
