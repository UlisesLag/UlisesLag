<template>
  <div id="cart-app">
    

    <header>
        <img src="img/logo_400x70.png">
      </header>

      <nav>
        <ul>
          <li><router-link class="link" v-bind:to="{name: 'products'}" exact>Home</router-link></li>
          <li><router-link class="link" v-bind:to="{name: 'cart'}" exact>Cart</router-link></li>
          <li class="blank-link"></li>
          <li>
            <div 
              v-bind:class="notificationClass" 
              v-show="notification" 
              v-on:click="clearNotification">
              {{ notification?.message }}
            </div>
          </li>
          <li class="blank-link-two"></li>
          <li>
              <router-link class="link" v-bind:to="{ name: 'logout' }" v-if="$store.state.token">
                Logout
              </router-link>
              <router-link class="link" v-bind:to="{ name: 'login' }" v-else>Login</router-link>


          </li>
        </ul>
      </nav>
    <main>
      <router-view />
    </main>
    <footer>© 2025 All rights reserved </footer>
  </div>
</template>

<script>
export default {
  computed: {
    notification() {
      return this.$store.state.notification;
    },
    notificationClass() {
      return {
        'status-message': true,
        error: this.notification?.type?.toLowerCase() === 'error',
        success: this.notification?.type?.toLowerCase() === 'success'
      };
    }
  },
  methods: {
    clearNotification() {
      this.$store.commit('CLEAR_NOTIFICATION');
    }
  }
};
</script>

<style scoped>
  header {
    text-align: center;
    background-color: antiquewhite;
    margin-top: 10px;
    margin-left: 10px;
    margin-right: 10px;
    padding: 5px;
  }

  nav {
    margin: 10px;
    padding: 10px;
    height: 60px;
    background-color: rgb(218, 186, 146);
    align-items: center;
  }

  nav ul {
    display: flex;
    justify-content: center; 
    align-content: center;
    padding: 0; 
    list-style: none;
    
  }

  .blank-link{
    flex-grow: 2;
  }

  .blank-link-two{
    flex-grow: 3;
  }


  footer {
    background-color: antiquewhite;
    margin: 10px;
    padding: 10px;
    bottom: 10px;
  }

  #message-text {
    text-align: center;
  }

  .link {
    padding: 26px;
    padding-bottom: 27px;
    font-size: 20px;
    color: black;
    text-decoration: none;
    text-align: center;
  }

  .router-link-exact-active {
    background-color: antiquewhite;
  }

  .link:hover {
    font-weight: bold;
}
</style>