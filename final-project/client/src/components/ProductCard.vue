<template>
    <div class="card">
        <h4 class="card-sku">{{ product.product_sku }}</h4>
        <h4 class="card-price">${{ product.price }}</h4>
        <router-link class="card-name" :to="{name: 'productDetails', params: {id: product.product_id}}">
            {{ product.name }}
        </router-link>
        <h3 class="card-desc" v-show="showDesc">{{ product.description }}</h3>
        <img class="card-img" :src="product.image_name">
        <font-awesome-icon v-show="showCartIcon" @click="putProductInCart"
            v-bind:class="{ 'cart-icon': true}"
            icon="fa-solid fa-cart-plus"
            title="Add to Cart"
        />
    </div>

</template>

<script>
    import CartService from '../services/CartService.js';
    export default {
        props: {
            product: {
                type: Object,
                required: true, 
            },
            showDesc: {
                type: Boolean,
            }, 
            showCartIcon: {
                type: Boolean,
            }
        },
        data(){
            return{
                postInfo: {
                    productId: null,
                    quantity: 1
                }
            }
        },
        methods: {
            putProductInCart(){
                this.postInfo.productId = this.product.product_id;

                CartService.post(this.postInfo)
                .then(resp => {
                    if(resp.status === 201){
                        this.$store.commit('SET_NOTIFICATION',
                            {
                            message: `${this.product.name} Added to Cart`,
                            type: 'success'
                            }
                        );
                    }
                })
                .catch(error => {
                    this.$store.commit('SET_NOTIFICATION',
                            {
                            message: 'Product Failed to Add to Cart',
                            type: 'failed'
                            }
                        );
                })
            }
        }
    }

</script>

<style>
    .card {
    margin: 10px;
    padding: 10px;
    border: 4px bisque solid;
    border-radius: 10px;
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-template-areas: 
    "sku price"
    "name name"
    "desc desc"
    "img img"
    "cart cart";
}

.card-sku{
    grid-area: sku;
}

.card-price{
    grid-area: price;
    align-items: right;
}

.card-name{
    grid-area: name;
}

.card-desc{
    grid-area: desc;
}

.card-img {
    grid-area: img;
}

.cart-icon{
    margin-top: 5px;
    grid-area: cart;
}

.cart-icon:hover {
    color: bisque;
    background-color: rgba(255, 255, 255, 0.7);
    cursor: pointer;
}


</style>