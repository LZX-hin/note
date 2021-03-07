<template>
  <h2>toRefs的使用</h2>
  <!-- <h3>name: {{state.name}}</h3> -->
  <!-- <h3>age: {{state.age}}</h3> -->
  <h3>name: {{name}}</h3>
  <h3>age: {{age}}</h3>
</template>

<script lang="ts">
import {defineComponent, reactive, toRefs} from "vue"
export default defineComponent({
  name: 'App',
  setup(){
    const state = reactive({
      name: '小强',
      age: 20
    })
    // toRef可以为一个响应式对象（reactive包裹的对象）的某个属性创建一个ref，用法是 toRef(reactive对象, property)
    // toRefs可以为一个响应式对象（reactive包裹的对象）的所有属性创建一个ref，用法是 toRefs(reactive对象)
    // 注意这两个方法创建出来的ref数据都是保持着对原来的对象属性的连接的，操作会互相影响
    const state2 = toRefs(state)
    // 定时器更新数据（如果数据变化了，页面也会跟着更新，肯定是响应式数据）
    setInterval(()=>{
      state2.name.value += '==='
    },2000)
    return {
      // state
      // ...state, // 不是响应式的数据了
      ...state2
    }
  }
})
</script>

<style lang="less" scoped>

</style>