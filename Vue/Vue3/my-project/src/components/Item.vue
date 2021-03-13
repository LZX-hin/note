<template>
  <li @mouseenter="mouseHandler(true)" @mouseleave="mouseHandler(false)" :style="{backgroundColor: bgColor,color:myColor}">
    <label>
      <input type="checkbox" v-model="todo.isCompleted"/>
      <span>{{todo.title}}</span>
    </label>
    <button class="btn btn-danger" v-show="isShow">删除</button>
  </li>
</template>

<script lang="ts">
import { computed, defineComponent,ref } from "vue";
import {Todo} from '../types/todo';
export default defineComponent({
  name: "Item",
  props: {
    todo: Object as () => Todo
  },
  setup(props,context){
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
    const isCompleted = computed({
      get(){
        if(props.todo){
          return props.todo.isCompleted
        }
        return false
      },
      set(newValue: any){
        // if(props.todo?.isCompleted){
        //   props.todo.isCompleted = newValue;
        // }
        context.emit('update:todo',newValue)
      }
    })
    return {
      mouseHandler,
      bgColor,
      myColor,
      isShow,
      isCompleted
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
