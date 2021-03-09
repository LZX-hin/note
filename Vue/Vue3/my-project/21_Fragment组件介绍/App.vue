<template>
  <!-- Vue2写法：根标签 -->
  <!-- <div>
    <h2>测试1</h2>
    <h2>测试2</h2>
  </div> -->

  <!-- Vue3写法：不需要根标签 ，好处是减少标签层级，减小内存开销-->
  <h2>测试1</h2>
  <h2>测试2</h2>
</template>

<script lang="ts">
import { defineComponent } from "vue"
export default defineComponent({
  // setup() {

  // }
})
</script>

<style lang="less" scoped>
</style>
