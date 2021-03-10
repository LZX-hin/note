<template>
  <h2>toRef的使用和特点</h2>
  <h3>state: {{state}}</h3>
  <h3>age: {{age}}</h3>
  <h3>money: {{money}}</h3>
  <hr>
  <button @click="update">更新数据</button>
  <hr>
  <!-- 需要注意的是，Vue3中的ref数据在模板中使用时是省略了.value的， -->
  <!-- 所以这里传给子组件age的实际上是age.value，是一个普通值 -->
  <Child :age="age" />
</template>

<script lang="ts">
import { defineComponent, reactive, toRef, ref } from "vue"
import Child from './components/Child.vue'
export default defineComponent({
  components:{
    Child
  },
  setup() {
    const state = reactive({
      age: 5,
      money: 100
    })
    // toRef --- 把响应式数据state对象内部的属性变成一个ref对象
    // 注意toRef和ref的区别：toRef中的value是跟源响应式对象（或普通对象）中对应属性的值是同步变化的，而ref是个独立的数据，不会影响其他数据
    // 作用：
    const age = toRef(state,'age')
    const money = ref(state.money)
    console.log(age)
    console.log(money)
    const update = ()=>{
      state.age += 2
      // age.value += 3
      // money.value += 10
    }
    return {
      state,
      age,
      money,
      update
    }
  }
})
</script>

<style lang="less" scoped>
</style>
