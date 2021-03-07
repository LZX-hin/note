<template>
  <h2>reactive和ref细节问题</h2>
  <h3>m1:{{m1}}</h3>
  <h3>m2:{{m2}}</h3>
  <h3>m3:{{m3}}</h3>
  <hr>
  <button @click="update">更新数据</button>
</template>

<script lang="ts">
import {defineComponent,ref,reactive} from "vue"
export default defineComponent({
  name: 'App',
  // 正常来说，用ref处理基本数据类型，用reactive处理引用数据类型或深嵌套对象，不建议用ref处理对象
  // 如果用ref来处理对象/数组，内部会将对象/数组（如果里面属性值也是对象/数组，也会）转换成Proxy对象
  // ref内部：通过给value属性添加getter/setter实现对数据劫持
  // reactive内部：通过Proxy实现对对象内部所有数据的劫持，并通过Reflect操作对象内部数据

  setup(){
    const m1 = ref('abc');
    const m2 = reactive({
      name: '小明',
      wife: {
        name: '小红'
      }
    });
    // ref也可以传入对象吗
    const m3 = ref({
      name: '小明',
      wife: {
        name: '小红'
      }
    });
    const update = ()=>{
      m1.value += '===';
      m2.wife.name += '===';
      // m3.value.name += '===';
      m3.value.wife.name += '===';
      console.log(m3.value.wife)
    }
    return {
      m1,
      m2,
      m3,
      update
    }
  }
})
</script>

<style lang="less" scoped>

</style>