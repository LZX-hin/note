<template>
  <h2>App父组件</h2>
  <h3>{{msg}}</h3>
  <button @click="msg+='---'">更新数据</button>
  <hr />
  <h2><Child :msg="msg" msg2="信息" class="child" @changeMsg="changeMsg"/></h2>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue"
import Child from './components/Child.vue'
export default defineComponent({
  name: 'App',
  components: {
    Child
  },
  setup(){
    const msg = ref('what are you doing');
    function changeMsg(value: string){
      msg.value += value
    }
    return{
      msg,
      changeMsg
    }
  }
})
</script>

<style lang="less" scoped>
</style>
