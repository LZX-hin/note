<template>
  <h2>App父级组件</h2>
  <hr />
  <ModalButton />
</template>

<script lang="ts">
import {defineComponent,onMounted,ref} from "vue"
import ModalButton from './ModalButton.vue'
export default defineComponent({
  name: 'App',
  components: {
    ModalButton
  },
})
</script>

<style lang="less" scoped>

</style>
