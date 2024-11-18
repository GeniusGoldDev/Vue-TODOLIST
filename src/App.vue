<!-- <template>
  <img alt="Vue logo" src="./assets/logo.png">
  <HelloWorld msg="Welcome to Your Vue.js App"/>
</template> -->
<template>
  <REGISTER/>
</template>

<script>
// import HelloWorld from './components/TodoList.vue'
import REGISTER from './views/auth/UserRegister.vue'

export default {
  name: 'App',
  components: {
    // HelloWorld,
    REGISTER
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
