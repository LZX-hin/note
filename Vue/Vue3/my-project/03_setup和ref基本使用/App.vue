<template>
  <h2>setup和ref基本使用</h2>
  <h3>{{count}}</h3>
  <button @click="updateCount">更新数据</button>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
export default defineComponent({
  name: 'App',
  // 需求：页面打开后可以直接看到一个数据，点击按钮后，该数据可以发生变化

  // 方法一：vue2方式实现
  // data(){
  //   return {
  //     count: 0
  //   }
  // },
  // methods: {
  //   updateCount(){
  //     this.count++;
  //   }
  // }

  // 方法二：vue3方式实现
  // setup()是组合API的入口函数（程序一执行就会先进入setup()）
  setup(){
    // let count = 0; // 这样的数据不是响应式数据，即model层更改不会同步到页面

    // ref()是一个函数，作用：定义一个响应式的数据
    // 1.ref()返回的是一个ref对象，对象中有一个value属性，如果需要对数据进行操作，需要使用该ref对象调用
    //   value属性的方式进行数据的操作
    // 2.html模板中是不需要使用.value的写法了
    // 3.一般用来定义一个基本数据类型的响应式数据
    // 4.ref()返回的是Ref类型
    const count = ref(0)
    function updateCount(){
      count.value++;
    }
    return {
      count,
      updateCount
    }
  }
});
</script>
