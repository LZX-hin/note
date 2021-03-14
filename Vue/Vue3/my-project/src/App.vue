<template>
  <div class="todo-container">
    <div class="todo-wrap">
      <Header :addTodo="addTodo"/>
      <List :todos="todos" :deleteTodo="deleteTodo" :updateTodo="updateTodo"/>
      <Footer :todos="todos" :checkAll="checkAll" :clearAllCompletedTodos="clearAllCompletedTodos"/>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, reactive, toRefs, watch } from "vue";
import Header from "./components/Header.vue";
import List from "./components/List.vue";
import Footer from "./components/Footer.vue";
import { Todo } from "./types/todo";
import {saveTodos,readTodos} from './utils/localStorageUtils';
export default defineComponent({
  name: "App",
  components: {
    Header,
    List,
    Footer,
  },
  setup() {
    // const state = reactive<{ todos: Todo[] }>({
    //   todos: [
    //     { id: 1, title: "奔驰", isCompleted: false },
    //     { id: 2, title: "宝马", isCompleted: true },
    //     { id: 3, title: "奥迪", isCompleted: false },
    //   ],
    // });
    const state = reactive<{todos: Todo[]}>({
      todos: []
    })
    // 界面加载完毕后过了一会在读取数据
    onMounted(()=>{
      setTimeout(()=>{
        state.todos = readTodos();
      },1000)
    })
    // 添加数据
    const addTodo = (todo: Todo) => {
      state.todos.unshift(todo);
    };
    // 删除数据
    const deleteTodo = (index: number) => {
      state.todos.splice(index,1);
    }
    // 修改todos中某个todo的选中状态
    const updateTodo = (todo: Todo, isCompleted: boolean) => {
      // 因为todos中的每个todo对象都是一个proxy对象，所以这里直接修改todo就可以更新
      // 因此我认为传到Item.vue组件中的todo和当前todos中的todo是引用同一个proxy对象，所以这里直接修改这个todo就可以，而不用通过todos找到该todo再去修改
      todo.isCompleted = isCompleted;
    }
    // 全选或全不选
    const checkAll = (isCompleted: boolean) => {
      state.todos.forEach(item => {
        item.isCompleted = isCompleted;
      })
    }
    // 清理所有选中的数据
    const clearAllCompletedTodos = () => {
      state.todos = state.todos.filter(todo => !todo.isCompleted)
    }
    // 监视操作：如果todos数组的数据变化了，直接存储到本地缓存
    watch(()=>state.todos,saveTodos,{deep:true})
    return {
      ...toRefs(state),
      addTodo,
      deleteTodo,
      updateTodo,
      checkAll,
      clearAllCompletedTodos
    };
  },
});
</script>

<style scoped>
/*app*/
.todo-container {
  width: 600px;
  margin: 0 auto;
}
.todo-container .todo-wrap {
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 5px;
}
</style>
