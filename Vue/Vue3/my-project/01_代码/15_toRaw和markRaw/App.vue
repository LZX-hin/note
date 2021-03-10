<template>
  <h2>toRaw和markRaw</h2>
  <h3>state: {{state}}</h3>
  <hr>
  <button @click="testToRaw">测试toRaw</button>
  <button @click="testMarkRaw">测试markRaw</button>
</template>

<script lang="ts">
import { defineComponent, reactive, toRaw, markRaw } from "vue"
interface UserInfo{
  name: string;
  age: number;
  likes?: string[];
}
export default defineComponent({
  name: 'App',
  setup() {
    const state = reactive<UserInfo>({
      name: '小名',
      age: 20
    })
    const testToRaw = ()=>{
      // toRaw --- 把proxy对象变成普通对象，数据变化，页面不会更新
      const user = toRaw(state)
      user.name += '=='
    }
    const testMarkRaw = ()=>{
      // state.likes = ['吃','喝','玩']
      // state.likes[0] += '=='

      // markRaw --- markRaw标记的对象数据，表示该对象中的所有属性都不是响应式数据
      const likes = ['吃','喝']
      state.likes = markRaw(likes)
      setInterval(()=>{
        if(state.likes){
          state.likes[0] += '==='
          console.log('setInteval')
        }
      },1000)
    }
    return{
      state,
      testToRaw,
      testMarkRaw
    }
  }
})
</script>

<style lang="less" scoped>
</style>

