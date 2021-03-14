<template>
  <div class="todo-footer">
    <label>
      <input type="checkbox" v-model="isCheckAll"/>
    </label>
    <span> <span>已完成{{count}}</span> / 全部{{todos.length}} </span>
    <button class="btn btn-danger" @click="clearAllCompletedTodos">清除已完成任务</button>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent } from "vue";
import {Todo} from '../types/todo';
export default defineComponent({
  name: "Footer",
  props: {
    todos: {
      type: Array as () => Todo[],
      required: true
    },
    checkAll: {
      type: Function,
      required: true
    },
    clearAllCompletedTodos: {
      type: Function,
      required: true
    }
  },
  setup(props){
    const count = computed(()=>{
      return props.todos.filter(item => item.isCompleted).length
    })
    const isCheckAll = computed({
      get(){
        const hadCheckedCount = props.todos.filter(item => item.isCompleted).length;
        if(hadCheckedCount === props.todos.length){
          return true
        }else{
          return false;
        }
      },
      set(val){
        props.checkAll(val);
      }
    })
    return {
      count,
      isCheckAll
    }
  }
});
</script>

<style scoped>
/*footer*/
.todo-footer {
  height: 40px;
  line-height: 40px;
  padding-left: 6px;
  margin-top: 5px;
}

.todo-footer label {
  display: inline-block;
  margin-right: 20px;
  cursor: pointer;
}

.todo-footer label input {
  position: relative;
  top: -1px;
  vertical-align: middle;
  margin-right: 5px;
}

.todo-footer button {
  float: right;
  margin-top: 5px;
}

</style>
