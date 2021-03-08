<template>
  <h2>响应式数据的判断</h2>
</template>

<script lang="ts">
import { defineComponent, ref, isRef, isReactive, reactive, isReadonly, readonly, isProxy } from "vue"
export default defineComponent({
  setup() {
    // isRef: 检查一个值是否为一个ref对象
    // isReactive: 检查一个值是否是由reactive()创建的proxy对象
    // isReadonly: 检查一个值是否是由readonly()创建的只读proxy
    // isProxy: 检查一个值是否是由reactive()或readonly()创建的proxy对象

    console.log(isRef((ref({})))) // true
    console.log(isReactive(reactive({}))) // true
    console.log(isReadonly(readonly({}))) // true
    console.log(isProxy(readonly({}))) // true
    console.log(isProxy(reactive({}))) // true
    return{

    }
  }
})
</script>

<style lang="less" scoped>
</style>
