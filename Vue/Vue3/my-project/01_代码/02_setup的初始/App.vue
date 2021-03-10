<template>
  <div>Vue3</div>
  <!-- <div>{{a()}}</div> -->
  <!-- <div>{{number}}</div> -->
</template>

<script lang="ts">
// defineComponent方法目的是定义一个组件，可以传入一个配置对象
import { defineComponent } from 'vue';

// 暴露一个定义好的组件出去
export default defineComponent({
  name: 'App',
  // 测试代码 setup是组合API中第一个要使用的函数
  // setup(){
  //   const number = 10;
  //   function a(){
  //     return 'aaaa'
  //   }
  //   return {
  //     number,
  //     a
  //   }
  // }
});
</script>
