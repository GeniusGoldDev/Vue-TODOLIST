<template>
    <div>
      <input type="checkbox" :checked="todo.completed" @change="toggle" />
      <span :class="{ completed: todo.completed }">{{ todo.title }}</span>
      <button @click="deleteTodo">Delete</button>
    </div>
  </template>
  
  <script>
  export default {
    props: ['todo'],
    methods: {
      deleteTodo() {
        this.$emit('delete', this.todo.id);
      },
      toggle() {
        this.$emit('toggle', this.todo);
      },
    },
  };
  </script>
  
  <style scoped>
  .completed {
    text-decoration: line-through;
  }
  </style>
  