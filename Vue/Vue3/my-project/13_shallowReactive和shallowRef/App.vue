<template>
  <h2>shallowReactive和shallowRef</h2>
  <h3>m1:{{m1}}</h3>
  <h3>m2:{{m2}}</h3>
  <h3>m3:{{m3}}</h3>
  <h3>m4:{{m4}}</h3>
  <hr />
  <button @click="update">更新数据</button>
</template>

<script lang="ts">
import { defineComponent, reactive, ref, shallowReactive, shallowRef } from "vue"
export default defineComponent({
  setup() {
    // 深度劫持（深度响应式）
    const m1 = reactive({
      name: '鸣人',
      age: 20,
      car: {
        name: 'benz',
        color: 'red'
      }
    })
    // 浅劫持，只会对对象中第一层的属性做数据劫持
    const m2 = shallowReactive({
      name: '鸣人',
      age: 20,
      car: {
        name: 'benz',
        color: 'red'
      }
    })
    // 深度劫持（深度响应式），内部将对象/数组做了reactive处理，将对象转换成proxy对象
    const m3 = ref({
      name: '鸣人',
      age: 20,
      car: {
        name: 'benz',
        color: 'red'
      }
    })
    // shallowRef()只能对基本数据类型实现数据劫持，对象/数组就不行
    const m4 = shallowRef({
      name: '鸣人',
      age: 20,
      car: {
        name: 'benz',
        color: 'red'
      }
    })
    const update = ()=>{
      // 更改m1数据 --- reactive
      // m1.name += '==='
      // m1.car.name += '==='
      // 更改m2数据 --- shallowReactive
      // m2.name += '==='
      // m2.car.name += '==='
      // 更改m3数据 --- ref
      // m3.value.name += '==='
      // m3.value.car.name += '==='
      // 更改m4数据 --- shallowRef
      // m4.value.name += '==='
      // m4.value.car.name += '==='
      // console.log(m3,m4)
    }
    return {
      m1,
      m2,
      m3,
      m4,
      update
    }
  }
})
</script>

<style lang="less" scoped>
</style>
