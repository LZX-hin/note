<template>
  <li @mouseenter="mouseHandler(true)" @mouseleave="mouseHandler(false)" :style="{backgroundColor: bgColor,color:myColor}">
    <label>
<<<<<<< HEAD
      <input type="checkbox" v-model="isCompleted"/>
=======
      <input type="checkbox" v-model="todo.isCompleted"/>
>>>>>>> 30b2643ad17c767d4f0b82030ca5b662bd675600
      <span>{{todo.title}}</span>
    </label>
    <button class="btn btn-danger" v-show="isShow" @click="delTodo">删除</button>
  </li>
</template>

<script lang="ts">
<<<<<<< HEAD
import { defineComponent,ref,computed } from "vue";
=======
import { computed, defineComponent,ref } from "vue";
>>>>>>> 30b2643ad17c767d4f0b82030ca5b662bd675600
import {Todo} from '../types/todo';
export default defineComponent({
  name: "Item",
  props: {
    todo: {
      type: Object as () => Todo,
      required: true
    },
    deleteTodo: {
      type: Function,
      required: true
    },
    index: {
      type: Number,
      required: true
    },
    updateTodo: {
      type: Function,
      required: true
    }
  },
<<<<<<< HEAD
  setup(props){
=======
  setup(props,context){
>>>>>>> 30b2643ad17c767d4f0b82030ca5b662bd675600
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
<<<<<<< HEAD
    const delTodo = ()=>{
      if(window.confirm('确定要删除吗？')){
        props.deleteTodo(props.index);
      }
    }
    const isCompleted = computed({
      get(){
        return props.todo.isCompleted
      },
      set(val){
        props.updateTodo(props.todo, val)
=======
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
>>>>>>> 30b2643ad17c767d4f0b82030ca5b662bd675600
      }
    })
    return {
      mouseHandler,
      bgColor,
      myColor,
      isShow,
<<<<<<< HEAD
      delTodo,
=======
>>>>>>> 30b2643ad17c767d4f0b82030ca5b662bd675600
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
