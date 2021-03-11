<template>
  <li @mouseenter="mouseHandler(true)" @mouseleave="mouseHandler(false)" :style="{backgroundColor: bgColor,color:myColor}">
    <label>
      <input type="checkbox" :value="todo.isCompleted"/>
      <span>{{todo.title}}</span>
    </label>
    <button class="btn btn-danger" v-show="isShow">删除</button>
  </li>
</template>

<script lang="ts">
import { defineComponent,ref } from "vue";
import {Todo} from '../types/todo';
export default defineComponent({
  name: "Item",
  props: {
    todo: Object as () => Todo
  },
  setup(){
    const bgColor = ref('white')
    const myColor = ref('black')
    const isShow = ref(false)
    const mouseHandler = (flag: boolean)=>{
      if(flag){
        bgColor.value = 'pink'
        myColor.value = 'green'
        isShow.value = true
      }else{
        bgColor.value = 'white'
        myColor.value = 'black'
        isShow.value = false
      }
    }
    return {
      mouseHandler,
      bgColor,
      myColor,
      isShow
    }
  }
});
</script>

<style scoped>
/*item*/
li {
  list-style: none;
  height: 36px;
  line-height: 36px;
  padding: 0 5px;
  border-bottom: 1px solid #ddd;
}

li label {
  float: left;
  cursor: pointer;
}

li label li input {
  vertical-align: middle;
  margin-right: 6px;
  position: relative;
  top: -1px;
}

li button {
  float: right;
  /* display: none; */
  margin-top: 3px;
}

li:before {
  content: initial;
}

li:last-child {
  border-bottom: none;
}
</style>
