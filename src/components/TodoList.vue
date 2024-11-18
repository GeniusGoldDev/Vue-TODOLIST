<template>
  <div>
    <h1>To Do List</h1>
    <input v-model="newTodo" @keyup.enter="addTodo" placeholder="Add a new task" />
    <button type="button" @click="addTodo">Add</button>
    <ul>
      <li v-for="todo in todos" :key="todo.id">
        <TodoItem :todo="todo" @delete="deleteTodo" @toggle="toggleTodo" />
      </li>
    </ul>
  </div>
</template>

<script>
import axios from 'axios';
import TodoItem from './TodoItem.vue';

export default {
  components: {
    TodoItem,
  },
  data() {
    return {
      todos: [],
      newTodo: '',
    };
  },
  methods: {
    fetchTodos() {
      axios.get('http://localhost:3000/todos').then(response => {
        this.todos = response.data;
      });
    },
    addTodo() {
      if (this.newTodo.trim()) {
        axios.post('http://localhost:3000/todos', { title: this.newTodo }).then(response => {
          this.todos.push(response.data);
          this.newTodo = ''; // Clear the input field after adding
        });
      }
    },
    deleteTodo(id) {
      axios.delete(`http://localhost:3000/todos/${id}`).then(() => {
        this.todos = this.todos.filter(todo => todo.id !== id);
      });
    },
    toggleTodo(todo) {
      const updatedTodo = { ...todo, completed: !todo.completed };
      axios.put(`http://localhost:3000/todos/${todo.id}`, updatedTodo).then(() => {
        const index = this.todos.indexOf(todo);
        this.todos.splice(index, 1, updatedTodo);
      });
    },
  },
  mounted() {
    this.fetchTodos();
  },
};
</script>
