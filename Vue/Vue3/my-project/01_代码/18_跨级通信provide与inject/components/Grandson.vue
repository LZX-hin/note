<template>
  <h3 :style="{color}">Grandson孙子组件</h3>
</template>

<script lang="ts">
import { defineComponent, inject } from "vue"
export default defineComponent({
  name: 'Grandson',
  setup(){
    // inject --- 注入数据
    const color = inject('color')
    return{
      color
    }
  }
})
</script>

<style lang="less" scoped>
</style>
