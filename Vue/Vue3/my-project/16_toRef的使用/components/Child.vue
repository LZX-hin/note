<template>
  <h2>Child子组件</h2>
  <h3>age:{{age}}</h3>
  <h3>length: {{length}}</h3>
</template>

<script lang="ts">
import { defineComponent, computed, Ref, toRef } from "vue"
function useGetLength(age: Ref){ // 这里限制了age只能是ref对象
  return computed(()=>{
    return age.value.length
  })
}
export default defineComponent({
  props: {
    age: {
      type: Number,
      required: true
    }
  },
  setup(props) {
    console.log(props.age)
    // props中的age是一个普通的number类型的值
    // 但是useGetLength()方法限制了参数要为一个ref对象，所以这里使用toRef(props,'age')是将这个age转换成一个ref对象
    const length = useGetLength(toRef(props, 'age'))
    return {
      length
    }
  }
})
</script>

<style lang="less" scoped>
</style>
