<template>
  <div class="home">
    
    
    <div id="heading-line">
      <h1 class="product">
        Products     
        <loading-spinner id="spinner" v-bind:spin="isLoading" />
      </h1>

      <div id="search">

        <font-awesome-icon
          v-bind:class="{ 'view-icon': true, active: cardView }"
          v-on:click="cardView = true"
          icon="fa-solid fa-grip"
          title="View tiles"
        />
        <font-awesome-icon
          v-bind:class="{ 'view-icon': true, active: !cardView }"
          v-on:click="cardView = false"
          icon="fa-solid fa-table"
          title="View table"
        />

        <input id="search-input" type="text" placeholder="Search.. " name="search" v-model="searchInput">

      </div>

      <p class="home-des" v-if="isLoggedIn">Welcome <b>{{ this.$store.state.user.name }}</b> 
        to my products page!! Please feel welcome to browse and buy any product you like!
      </p>

      <p class="home-des" v-if="!isLoggedIn">
        Welcome! You may browse anonymously as much as you wish,<br />
        but you must
        <router-link v-bind:to="{ name: 'login' }">Login</router-link> to add
        items to your shopping cart.
      </p>

    </div>
      
    <products-list v-bind:products="search" v-bind:is-table="cardView" v-bind:show-cart-icon="isLoggedIn"/>
  

    <div v-show="showStuff">
      <h2>Loading spinner demonstration</h2>
      <p>
        This is a demonstration of how you can show or hide a "spinner" icon to
        let the user know something is happening. Before calling an API, you'd set
        the data property <code>isLoading</code> to <code>true</code>. When the
        call completes, set it to <code>false</code>.
      </p>
      <p>
        For this demonstration, clicking the checkbox below sets
        <code>isLoading</code> to <code>true</code>, so it simulates what the user
        would see when your app is accessing an API.
      </p>
      <input type="checkbox" name="loading" id="loading" v-model="isLoading" /> Is
        Loading
      
      <h2>Font-awesome demonstration</h2>
      <p>
      This code shows you how you can include Font-awesome icons on your page. Below are two icons: 
      one to indicate a "tile" view of products, and another to indicate a "table" view. There's also a little bit
      of styling to get you started, but you can style it your own way. And there's a property to track which view is "active".
      </p>
      <font-awesome-icon
        v-bind:class="{ 'view-icon': true, active: cardView }"
        v-on:click="cardView = true"
        icon="fa-solid fa-grip"
        title="View tiles"
      />
      <font-awesome-icon
        v-bind:class="{ 'view-icon': true, active: !cardView }"
        v-on:click="cardView = false"
        icon="fa-solid fa-table"
        title="View table"
      />
      </div>
    



  </div>
</template>

<script>
  import LoadingSpinner from "../components/LoadingSpinner.vue";
  import ProductService from "../services/ProductService.js";
  import ProductsList from "../components/ProductsList.vue";


  export default {
    components: {
      LoadingSpinner,
      ProductsList,
    },
    data() {
      return {
        products: [],
        filteredProducts: [],
        isLoading: true,
        showStuff: false,
        cardView: true,
        searchInput: ""
      };
    },

    computed: {
      isLoggedIn() {
        return this.$store.state.token.length > 0;
      },

      search(){
        if(this.searchInput.length === 0){
          return this.products;
        }

        const searchTerm = this.searchInput.toLocaleLowerCase();
        const searchList = this.products.filter((product)=> {
          return product.name.toLowerCase().includes(searchTerm);
        });

        if(searchList.length === 0){
          return this.products;
        }

        return searchList;

      }
    },

    methods: {
      getProducts() {
        ProductService.list()
          .then((resp) => {
            this.products = resp.data;
            this.isLoading = false;
          })
          .catch((error) => {
            console.error("Error fetching products: ", error);
            this.isLoading = false;
          });
      },
    },

    created() {
      this.getProducts();
    },
};
</script>

<style scoped>
#spinner {
  color: green;
  text-align: center;
}

.view-icon {
  font-size: 1.2rem;
  margin-right: 7px;
  padding: 3px;
  color: #444;
  border-radius: 3px;
}

.view-icon.active {
  background-color: lightgreen;
}

.view-icon:not(.active) {
  font-size: 1.2rem;
  margin-right: 7px;
  cursor: pointer;
}

.view-icon:not(.active):hover {
  color: blue;
  background-color: rgba(255, 255, 255, 0.7);
}

#heading-line {
  display: grid;
  column-gap: 20px;
  grid-template-columns: 1fr 1fr 1fr;
  grid-template-areas: 
  "header search search"
  "description description description";
}

.product {
  grid-area: header;
  font-size: 50px;
  text-align: left;
  margin: 10px;
}

#search {
  padding-top: 20px;
  padding-right: 5px;
  text-align: right;
  grid-area: search;
} 

.home-des {
  grid-area: description;
  font-size: 30;
  text-align: left;
  margin-left: 12px;
}

.home {
    margin: 10px;
    height: 80vh; 
    overflow-y: auto; 
    
}
</style>