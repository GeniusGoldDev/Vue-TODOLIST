<template>
  <v-container fluid>
    <v-row justify="center" align="center" style="min-height: 100vh;">
      <v-col cols="12" md="6">
        <v-card>
          <v-card-title class="headline">Register</v-card-title>
          <v-card-text>
            <v-form @submit.prevent="register">
              <v-text-field
                v-model="username"
                label="Username"
                required
                outlined
              ></v-text-field>

              <v-text-field
                v-model="password"
                label="Password"
                type="password"
                required
                outlined
              ></v-text-field>

              <v-btn color="primary" type="submit" class="mt-4">Register</v-btn>
            </v-form>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import axios from 'axios';

export default {
  name: 'UserRegister',
  data() {
    return {
      username: '',
      password: '',
    };
  },
  methods: {
    register() {
      axios.post('http://localhost:3000/register', { username: this.username, password: this.password })
        .then(() => {
          this.$router.push('/login'); // Redirect to login page
        })
        .catch(error => {
          console.error(error);
        });
    },
  },
};
</script>

<style scoped>
.v-card {
  padding: 20px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
}
</style>
