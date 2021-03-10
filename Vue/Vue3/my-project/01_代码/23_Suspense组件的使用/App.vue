<template>
  <h2>App父级组件：Suspense的使用</h2>
  <Suspense>
    <template v-slot:default>
      <AsyncAddress/>
    </template>
    <template v-slot:fallback>
      <h2>loading...</h2>
    </template>
  </Suspense>
</template>
 
<script lang="ts">
import {defineAsyncComponent, defineComponent} from "vue"
// import AsyncComponent from './AsyncComponent.vue';
import AsyncAddress from './AsyncAddress.vue'

// 引入组件：静态引入和动态引入
// Vue2中的动态组件引入写法（在Vue3中这种写法不行）：
// const AsyncComponent = ()=> import('./AsyncComponent.vue');
// Vue3中的动态组件引入写法：
// const AsyncComponent = defineAsyncComponent(()=>import('./AsyncComponent.vue'));
export default defineComponent({
  name: 'App',
  components: {
    AsyncAddress
  }
})
</script>

<style lang="less" scoped>

</style>
