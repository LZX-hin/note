<template>
  <div>
    Child子组件
    {{msg}}
    <button @click="changeMsg">触发父组件传进来的事件</button>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue"
export default defineComponent({
  name: 'Child',
  props: {
    msg:{
      type: String,
      default: ""
    }
  },
  // 关于setup()细节问题
  // 1. 执行时机
  // · setup()是在生命周期函数beforeCreate()之前执行的，而且只执行一次
  //   由此可以推断出：setup()执行的时候，当前组件还没创建出来，即组件实例this不可用，说明此方法中不可以调用组件的data、methods、props等...
  // · 其实所有的composition API相关回调函数中也都不可以访问组件实例this
  // 总结：在setup()中不能获取组件实例this，因此也不能获取到data、methods这些

  // 2. 返回值
  // · setup()中的返回值是一个对象，内部属性可以给模板使用
  // · setup()返回的对象中的属性和data选项中的都可以在模板中使用，setup()
  // · setup()返回的对象中的属性和data选项中的数据会合并为组件对象的属性，也就是说setup()返回的对象中的属性可以通过this.xxx来调用
  // . setup()返回的对象中的方法和data选项中的数据会合并为组件对象的方法
  // . setup()不要加上async，因为async函数返回一个promise，导致模板看不到setup()return出来的数据
  // 总结：setup()中返回的对象的属性，可以在生命周期函数中通过this.xxx来调用，跟Vue2的data(){}的属性一样

  // 3. 参数
  // · (重要)参数props：是一个对象，里面有父组件向子组件传递，并且是在子组件中使用props接收的数据
  // · (重要)参数context：是一个对象，里面有attrs对象（获取当前组件标签上的属性，但是该属性不能被props接收），emit方法（分发事件），slots对象（插槽）
  // 总结：可以通过props获取父组件传过来且在props中接收了的数据；可以通过context.attrs获取组件标签中没有被props接收的属性，相当于$attrs；可以通过context.emit()来触发父组件v-on传进来的事件，相当于Vue2的this.$emit()

  setup(props: any,context: any){
    // 参数props：是一个对象，里面有父组件向子组件传递，并且是在子组件中使用props接收的数据
    console.log(props.msg)
    // 参数context：是一个对象，里面有attrs对象（获取当前组件标签上的属性，但是该属性不能被props接收），emit方法（触发事件），slots对象（插槽）
    console.log(context)

    // console.log('子组件setup()方法执行了')
    const showMsg1 = function(){
      console.log('setup中的showMsg1方法')
    }
    function changeMsg(){
      context.emit('changeMsg','++++')
    }
    return {
      showMsg1,
      changeMsg,
    }
  },
  // beforeCreate(){
  //   // console.log('子组件的beforeCreate()执行了')
  // },
  // data(){
  //   return{
  //     count: 10
  //   }
  // },
  // mounted(){
  //   console.log(this)
  // },
  // methods:{
  //   showMsg2(){
  //     console.log('methods中的showMsg2方法')
  //   }
  // }
})
</script>

<style lang="less" scoped>
</style>
