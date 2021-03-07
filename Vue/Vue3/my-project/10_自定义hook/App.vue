<template>
  <h2>自定义hook</h2>
  <h2>x:{{x}}, y:{{y}}</h2>
  <h3 v-if="loading">正在加载中...</h3>
  <h3 v-else-if="errorMsg">错误信息：{{errorMsg}}</h3>
  <ul v-else>
    <li>id:{{data.id}}</li>
    <li>address:{{data.address}}</li>
    <li>distance:{{data.distance}}</li>
  </ul>
  <hr />
  <ul v-for="item in data" :key="item.id">
    <li>id:{{item.id}}</li>
    <li>title:{{item.title}}</li>
    <li>price:{{item.price}}</li>
  </ul>
</template>

<script lang="ts">
import {defineComponent,watch} from "vue"
import useMousePosition from './hooks/useMousePosition';
import useRequest from './hooks/useRequest';
interface AddressData{
  id: number;
  address: string;
  distance: string;
}
interface ProductsData{
  id: string;
  title: string;
  price: number;
}
export default defineComponent({
  name: 'App',
  // 自定义hooks有点类似于Mixin，不过自定义hooks是把某个功能模块抽离到一个函数中，在使用的组件中再引用。而Mixin输出的是一个对象，对象中是每个配置，如data、methods和生命周期函数
  // hooks跟Mixin区别：Mixin是有合并策略的，也就是说当Mixin中的data中某个属性跟组件中的冲突了，要怎么怎么处理。而hooks的话因为是一个个的函数，所以里面的变量都是只在当前函数作用域中有效，不会形成冲突
  
  // 需求1：用户在页面中点击页面，把点击的位置的横纵坐标收集起来并展示
  // 需求2：封装ajax请求，这里用到了泛型<>
  setup(){
    const {x, y} = useMousePosition();
    // 发送请求
    // const {loading, data, errorMsg} = useRequest<AddressData>('/data/address.json') // 获取对象数据
    const {loading, data, errorMsg} = useRequest<ProductsData[]>('/data/products.json') // 获取数组数据

    // 监视data
    watch(data,()=>{
      if(data.value){
        console.log(data.value.length)
      }
    })
    return {
      x,
      y,
      loading,
      data,
      errorMsg
    }
  }
})
</script>

<style lang="less" scoped>

</style>
