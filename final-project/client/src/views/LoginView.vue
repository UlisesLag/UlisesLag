<template>
  <div id="login">
    <form v-on:submit.prevent="login">
      <h1>Please Sign In</h1>
      <div id="fields">
        <label id="user-label" for="username">Username</label>
        <input
          type="text"
          id="username"
          placeholder="Username"
          v-model="user.username"
          required
          autofocus
        />
        <label id="pass-label" for="password">Password</label>
        <input
          type="password"
          id="password"
          placeholder="Password"
          v-model="user.password"
          required
        />
        <div><button type="submit">Sign in</button></div>
      </div>
      <hr/>
      Need an account? <router-link v-bind:to="{ name: 'register' }">Register!</router-link>
    </form>
  </div>
</template>

<script>
import authService from "../services/AuthService";

export default {
  data() {
    return {
      user: {
        username: "",
        password: "",
      },
    };
  },
  methods: {
    login() {
      authService
        .login(this.user)
        .then((response) => {
          if (response.status == 200) {
            this.$store.commit("SET_AUTH_TOKEN", response.data.token);
            this.$store.commit("SET_USER", response.data.user);
            this.$router.push("/");
          }
        })
        .catch((error) => {
          const response = error.response;
          if (!response) {
            this.$store.commit('SET_NOTIFICATION',
              {
                message: error,
                type: 'error'
              }
            );
          } else if (response.status === 401) {
            this.$store.commit('SET_NOTIFICATION',
              {
                message: "Invalid username and password!",
                type: 'error'
              }
            );
          } else {
            this.$store.commit('SET_NOTIFICATION',
              {
                message: response.message,
                type: 'error'
              }
            );
          }
        });
    },
  },
};
</script>

<style scoped>
  #login {
  height: 80vh;
  display: flex;
  justify-content: center;
  align-items: center;
}

form {
  width: 100%;
  max-width: 400px;
  height: auto;
  margin: 0 auto;
  border: 4px solid bisque;
  border-radius: 10px;
  padding: 30px;
  background-color: #fff;
}

h1 {
  text-align: center;
  font-size: 1.5em;
  margin-bottom: 20px;
}

#fields {
  display: flex;
  flex-direction: column;
}

label {
  margin-bottom: 5px;
  font-size: 0.9em;
  color: black;
}

input {
  margin-bottom: 15px;
  padding: 10px;
  font-size: 1em;
  border: 1px solid #ddd;
  border-radius: 5px;
  
}

button {
  color: black;
  border: none;
  padding: 10px 20px;
  font-size: 1.1em;
  border-radius: 5px;
  cursor: pointer;
  width: 100%;
}

button:hover {
  background-color: bisque;
}

hr {
  margin: 20px 0;
  border: 0;
  border-top: 1px solid #ddd;
}
</style>
