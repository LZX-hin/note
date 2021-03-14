import {Todo} from '../types/todo'

// 保存数据到本地缓存
export function saveTodos(todos: Todo[]){
  localStorage.setItem('todos_key',JSON.stringify(todos))
}

// 读取本地缓存中的数据
export function readTodos(): Todo[]{
  return JSON.parse(localStorage.getItem('todos_key') || '[]');
}