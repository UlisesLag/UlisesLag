<template>
    <div class="cart-header">
        <h1 class="names-shopping-cart">{{ this.$store.state.user.name }}'s Shopping Cart</h1>
        <div class="cart-blank"></div>
        <div>
            <button type="button" class="delete-all-button" @click="clearCart">
                <font-awesome-icon
                v-bind:class="{ 'delete-all-icon': true}"
                icon="fa-solid fa-trash-can"
                title="Delete All Items"
                />
                Clear Cart
            </button>
        </div>
        

    </div>
    
    <ul class="users-cart">
        <li id="cart-list-header" class="cart-row">
            <h2>Qty</h2>
            <h2 class="item-grow">Product</h2>
            <h2 class="blank-grow"></h2>
            <h2>Price</h2>
            <h2>Amount</h2>
            <h2></h2>
        </li>
        <li v-for="p in products" v-bind:key="p.cartItemId" class="cart-row">
            <h2>{{ p.quantity }}</h2>
            <h2 class="item-grow">
                <router-link class="cart-product-link" :to="{name: 'productDetails', params: {id: p.product_id}}">
                    {{ p.name }}
                </router-link>
            </h2>
            <h2 class="blank-grow"></h2>
            <h2>{{ p.price }}</h2>
            <h2>{{ getAmount(p) }}</h2>
            
            <h2>
                <font-awesome-icon @click="deleteProduct(p)"
                v-bind:class="{ 'delete-item-icon': true}"
                icon="fa-solid fa-xmark"
                title="Delete Item"
                />
            </h2>
            <div></div>
        </li>
        
        
    </ul>

    <ul class="users-cart" id="no-border">
        <li v-for="p in price" v-bind:key="p.name" class="cart-row">
            <div class="blank-grow"></div>
            <h2 class="item-grow">{{ p.name }}</h2>
            <div class="blank-grow-two"></div>
            <h2>{{ p.price }}</h2>
            <div class="blank-grow"></div>
        </li>

    </ul>

    

</template>

<script>
import CartService from '../services/CartService';
export default{
    props: {
        price: {
            type: Array,
        },
        products: {
            type: Array
        }
    },
    methods: {
        getAmount(product){
            return product.price * product.quantity;
        },

        deleteProduct(product){
            CartService.delete(product.cartItemId)
            .then(resp => {
                if(resp.status === 204){
                    this.$store.commit('SET_NOTIFICATION',
                            {
                            message: `${product.name} Deleted`,
                            type: 'success'
                            }
                        );
                }
                this.$emit('refresh-cart');

            })
            .catch(error => {
                this.$store.commit('SET_NOTIFICATION',
                            {
                            message: 'Product Failed to Delete',
                            type: 'failed'
                            }
                        );
            });
        },

        clearCart(){
            CartService.clear()
            .then(resp => {
                if(resp.status === 204){
                    this.$store.commit('SET_NOTIFICATION',
                        {
                        message: `All Products Deleted`,
                        type: 'success'
                        }
                    );
                }
                this.$emit('refresh-cart');

            })
            .catch(error => {
                alert("Error deleting item");
            });

        }

    },
}
</script>

<style>
.names-shopping-cart{
    font-size: xx-large;
}

#no-border{
    border-bottom: 0px;
}

.blank-grow {
    flex-grow: 1;
}
.blank-grow-two {
    flex-grow: 4;
}

.item-grow {
    flex-grow: 0;
}

.cart-row h2{
    justify-content: end;
    margin: 10px;
    margin-left: 20px;
    margin-right: 20px;
    font-size: larger;
}

.cart-product-link{
    font-size: large;
}

.cart-row{
    display: flex;
    box-sizing: border-box;
    min-height: 100%;
    
}

.users-cart {
    display: flex;
    flex-direction: column;
    box-sizing: border-box;
    min-height: 100%;
    width: 50%;
    border-bottom: 4px solid black;
}

.cart-blank {
    flex-grow: 1;
}

.cart-header {
    display: flex;
}

.delete-item-icon:hover {
    color: blue;
    background-color: rgba(255, 255, 255, 0.7);
    cursor: pointer;
}


.delete-all-icon {
    font-size: 1.5em; /* Ensure the icon is big enough */
    color: rgb(0, 0, 0); /* Change the color if needed */
}

.delete-all-button:hover {
    cursor: pointer;
}

.cart-header div{
 display: flex;
 align-items: center;
}
</style>