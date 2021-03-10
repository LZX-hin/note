<template>
  <h2>计算属性和监听</h2>
  <fieldset>
    <legend>姓名操作</legend>
    姓氏：<input type="text" placeholder="请输入姓氏" v-model="user.firstName" /><br />
    名字：<input type="text" placeholder="请输入名字" v-model="user.lastName" /><br />
  </fieldset>
  <fieldset>
    <legend>计算属性和监听的演示</legend>
    姓名：<input type="text" placeholder="请输入姓名" v-model="fullName1" /><br />
    姓名：<input type="text" placeholder="请输入姓名" v-model="fullName2"/><br />
    姓名：<input type="text" placeholder="请输入姓名" v-model="fullName3" /><br />
  </fieldset>
</template>

<script lang="ts">
import {computed, defineComponent, reactive, watch, ref, watchEffect} from "vue"
export default defineComponent({
  setup(){
    const user = reactive({
      firstName: '东方',
      lastName: '不败'
    })
    // 通过计算属性的方式，实现第一个姓名的显示

    // Vue3中的计算属性computed()
    // 计算属性中如果只传入一个回调函数，表示的是get
    // 返回的是一个ref类型的对象
    // get
    const fullName1 = computed(()=>{
      return user.firstName + '_' + user.lastName;
    })
    // get + set
    const fullName2 = computed({
      get(){
        return user.firstName + '_' + user.lastName;
      },
      set(val: string){
        const names = val.split('_');
        user.firstName = names[0];
        user.lastName = names[1];
      }
    })

    // 监听watch --- 监听指定数据
    const fullName3 = ref('');
    watch(user,({firstName, lastName})=>{
      fullName3.value = firstName + '_' + lastName;
    },{
      immediate: true,
      deep: true
    })

    // watch --- 可以监听多个属性
    watch([fullName2, fullName3], ()=>{
      console.log('111111')
    })

    // 注意watch()指定监听数据的时候，监听ref数据和reactive数据 写法是不一样的
    // 监听ref数据，指定的时候直接写ref数据就可以了，
    // 监听reactive数据，指定的时候要通过函数返回这个reactive数据
    // 例子：监听reactive数据user中的firstName
    watch(()=>user.firstName,()=>{
      console.log('2222')
    })

    // 监听watchEffect -- 更加智能的监听，接受一个回调函数，immediate和deep都默认为true
    // watchEffect()的回调不用参数，会直接监听到在回调中使用到的数据
    // watchEffect(()=>{
    //   fullName3.value = user.firstName + '_' + user.lastName;
    // })

    // 监听fullName3的数据，改变firstName和lastName
    watchEffect(()=>{
      const names = fullName3.value.split('_');
      user.firstName = names[0];
      user.lastName = names[1];
    })

    return {
      user,
      fullName1,
      fullName2,
      fullName3
    }
  }
})
</script>

<style lang="less" scoped>

</style>
