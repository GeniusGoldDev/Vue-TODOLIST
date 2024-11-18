<template>
    <div>
      <h2>Login</h2>
      <input v-model="username" placeholder="Username" />
      <input type="password" v-model="password" placeholder="Password" />
      <button @click="login">Login</button>
    </div>
</template>
  
  <script>
  import axios from 'axios';
  
  export default {
    data() {
      return {
        username: '',
        password: '',
      };
    },
    methods: {
      login() {
        axios.post('http://localhost:3000/login', { username: this.username, password: this.password })
          .then(response => {
            localStorage.setItem('token', response.data.token);
            this.$router.push('/'); // Redirect to home or todo list page
          })
          .catch(error => {
            console.error(error);
          });
      },
    },
  };
  </script>
  