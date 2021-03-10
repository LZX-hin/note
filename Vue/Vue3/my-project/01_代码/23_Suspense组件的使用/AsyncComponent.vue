<template>
  <h2>AsyncComponent子级组件</h2>
  <h3>{{msg}}</h3>
</template>

<script lang="ts">
import {defineComponent} from "vue"
export default defineComponent({
  name: 'AsyncComponent子级组件',
  setup(){
    return new Promise((resolve,reject)=>{
      setTimeout(()=>{
        resolve({
          msg: 'hello world'
        })
      },2000)
    })
  }
})
</script>

<style lang="less" scoped>

</style>
