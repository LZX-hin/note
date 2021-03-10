<template>
  <h2>Child子级组件</h2>
  <h4>msg: {{msg}}</h4>
  <button @click="update">更新数据</button>
</template>

<script lang="ts">
import {defineComponent,ref, onBeforeMount, onMounted, onBeforeUpdate, onUpdated, onBeforeUnmount, onUnmounted} from "vue"
export default defineComponent({
  // 在Vue3中生命周期函数可以使用Option API和Composition API。
  // setup()中的同步代码是最先执行的（比beforeCreate还早）
  // 生命周期函数Composition API中是没有beforeCreate和created这两个阶段的，是从onBeforeMount()开始
  // 相同的生命周期函数，Composition API会比Option API要早执行，也就是说onMounted()要比mounted()早执行
  name: 'Child',
  beforeCreate(){
    console.log('Vue3 Option API中的beforeCreate')
  },
  created(){
    console.log('Vue3 Option API中的created')
  },
  beforeMount(){
    console.log('Vue3 Option API中的beforeMount')
  },
  mounted(){
    console.log('Vue3 Option API中的mounted')
  },
  beforeUpdate(){
    console.log('Vue3 Option API中的beforeUpdate')
  },
  updated(){
    console.log('Vue3 Option API中的updated')
  },
  // Vue2中的beforeDestroyed()和destroyed()在Vue3中改成了beforeUnmount()和unmounted()
  beforeUnmount(){
    console.log('Vue3 Option API中的beforeUnmount')
  },
  unmounted(){
    console.log('Vue3 Option API中的unmounted')
  },
  setup(){
    const msg = ref('abc')
    const update = ()=>{
      msg.value += '---'
    }
    console.log('Vue3中的setup方法')
    onBeforeMount(()=>{
      console.log('Vue3 Composition API中的onBeforeMount')
    })
    onMounted(()=>{
      console.log('Vue3 Composition onMounted')
    }),
    onBeforeUpdate(()=>{
      console.log('Vue3 Composition onBeforeUpdate')
    }),
    onUpdated(()=>{
      console.log('Vue3 Composition API中的onUpdated')
    }),
    onBeforeUnmount(()=>{
      console.log('Vue3 Composition API中的onBeforeUnmount')
    }),
    onUnmounted(()=>{
      console.log('Vue3 Composition API中的onUnmounted')
    })
    return {
      msg,
      update
    }
  }
})
</script>

<style lang="less" scoped>

</style>
