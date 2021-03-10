<template>
  <h2>customRef的使用</h2>
  <input type="text" v-model="keyWord">
  <p>{{keyWord}}</p>
</template>

<script lang="ts">
import { defineComponent, customRef } from "vue"

/*
  customRef：自定义ref对象，接受一个回调函数作为参数，回调函数有两个参数：1.track 2.trigger，track方法表示追踪数据，trigger方法表示更新页面。在回调函数中要返回一个带有get跟set的对象
*/

// 自定义hook：延时显示输入内容
function useDebounceRef<T>(value: T,delay=200){
  let timeOutId: number
  return customRef((track, trigger)=>{
    return {
      get(){
        // 告诉Vue追踪数据
        track();
        return value;
      },
      set(newValue: T){
        clearTimeout(timeOutId)
        timeOutId = setTimeout(()=>{
          value = newValue;
          // 告诉Vue更新界面
          trigger();
        },delay)
      }
    }
  })
  
}
export default defineComponent({
  setup() {
    // const keyWord = ref('abc')
    const keyWord = useDebounceRef('abc',500)
    return {
      keyWord
    }
  }
})
</script>

<style lang="less" scoped>
</style>
