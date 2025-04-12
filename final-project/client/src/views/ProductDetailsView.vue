<template>
    <div class="detail-main" v-if="isLoading">
        <loading-spinner id="spinner" v-bind:spin="isLoading"/>
    </div>
    <div class="detail-main" v-else>
        <header class="detail-header">
            <h1 class="detail-top-name">{{ product.name }}</h1>
            <div class="detail-head-blank"></div>
            <div class="detail-button">
                <button type="button" v-show="isLoggedIn" class="cart-button" @click="putProductInCart">
                <font-awesome-icon
                v-bind:class="{ 'detail-cart-icon': true}"
                icon="fa-solid fa-cart-plus"
                title="Add to Cart"
                />
                Add to Cart

                </button>
            </div>
            
        </header>

        <h2 class="detail-desc">{{ product.description }}</h2>

        <section class="detail-info">
            <h3 class="detail-sku-price">{{ product.product_sku }}</h3>
            <h3 class="detail-sku-price">${{ product.price }}</h3>
        </section>
        
        <h3 class="detail-name">{{ product.name }}</h3>
        <img class="detail-img" :src="product.image_name"/>
        
    </div>
    

</template>

<script>

    import ProductService from '../services/ProductService';
    import LoadingSpinner from '../components/LoadingSpinner.vue'
    import ProductCard from '../components/ProductCard.vue';
    import CartService from '../services/CartService';

    export default{
        components:{
            ProductCard,
            LoadingSpinner
        },

        data(){
            return{
                productId: this.$route.params.id,
                product: {},
                postInfo: {
                    productId: null,
                    quantity: 1
                },
                showDesc: true,
                isLoading : true,
            }
        },
        computed:{
            isLoggedIn() {
                return this.$store.state.token.length > 0;
            },
        },

        methods: {
            getProduct(){
                ProductService.get(this.productId)
                .then((resp) => {
                    this.product = resp.data;
                    this.isLoading = false;
                })
                .catch((error) => {
                    console.error("Error fetching product", error);
                    this.isLoading = false;
                });
            },

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


        },

        created(){
            this.getProduct();
        }
    }
</script>

<style>
    .detail-main {
        margin: 10px;
        height: 80vh; 
        overflow-y: auto; 
    }

    .detail-header{
        display: flex;
    }

    .detail-top-name{
        font-size: x-large;
    }

    .detail-button{
        display: flex;
        align-items: center;
    }

    .detail-head-blank{
        flex-grow: 1;
    }

    .detail-desc{
        font-size: large;
    }

    .detail-info{
        display: flex;
        column-gap: 10px;
    }

    .detail-sku-price{
        font-weight: 100;
        font-size: medium;
    }

    .detail-name{
        font-weight: 100;
    }

</style>