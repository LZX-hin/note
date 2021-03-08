<template>
  <h3>Son子级组件</h3>
  <hr>
  <Grandson />
</template>

<script lang="ts">
import { defineComponent } from "vue"
import Grandson from './Grandson.vue'
export default defineComponent({
  name: 'Son',
  components: {
    Grandson
  }
})
</script>

<style lang="less" scoped>
</style>
