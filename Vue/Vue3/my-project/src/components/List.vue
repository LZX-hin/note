<template>
  <ul class="todo-main">
    <template v-for="(todo) in todos">
      <Item v-model:todo="todo" :key="todo.id"/>
    </template>
  </ul>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import Item from './Item.vue'
export default defineComponent({
  name: "List",
  components: {
    Item
  },
  props: ['todos']
});
</script>

<style scoped>
/*main*/
.todo-main {
  margin-left: 0px;
  border: 1px solid #ddd;
  border-radius: 2px;
  padding: 0px;
}

.todo-empty {
  height: 40px;
  line-height: 40px;
  border: 1px solid #ddd;
  border-radius: 2px;
  padding-left: 5px;
  margin-top: 10px;
}
</style>
