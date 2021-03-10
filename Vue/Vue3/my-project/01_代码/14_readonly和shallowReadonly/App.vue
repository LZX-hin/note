<template>
  <h2>readonly和shallowReadonly</h2>
  <h3>car:{{state2.car.name}}</h3>
  <h3>{{refState2}}</h3>
  <hr />
  <button @click="update">更新数据</button>
</template>

<script lang="ts">
import { defineComponent, reactive, readonly, shallowReadonly, ref } from "vue"
export default defineComponent({
  name: 'App',
  setup() {
    const state = reactive({
      name: '佐助',
      age: 20,
      car: {
        name: 'benz',
        color: 'red'
      }
    })
    const refState = ref<number|string>('abc')
    // readonly --- 深度只读，表示整个数据都不可修改
    // shallowReadyonly --- 如果是对象，对象的第一层属性只读，就是如果有属性值是对象，这个对象中的属性值是可操作的
    // readonly和shallowReadonly对ref数据的效果是一样的，都是xxx.value不可变
    
    // const state2 = readonly(state)
    const state2 = shallowReadonly(state)
    const refState2 = shallowReadonly(refState)
    const update = ()=>{
      state2.car.name += '==='
      refState2.value += '==='
    }
    return {
      state2,
      update,
      refState2
    }
  }
})
</script>

<style lang="less" scoped>
</style>
