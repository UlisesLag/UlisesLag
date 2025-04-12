<template>
    <ul>
        <li class="table-sku">{{ product.product_sku }}</li>
        <li></li>
        <li class="table-name"><router-link class="table-link" :to="{name: 'productDetails', params: {id: product.product_id}}" >{{ product.name }}</router-link></li>
        <li class="table-price">{{ product.price }}</li>
        <li>
            <font-awesome-icon v-show="showCartIcon" @click="putProductInCart()"
                v-bind:class="{ 'cart-icon': true}"
                icon="fa-solid fa-cart-plus"
                title="Add to Cart"
            />
        </li>

        
    </ul>
</template>

<script>
    import CartService from '../services/CartService';
    export default {
        props: {
            product: {
                type: Object,
                required: true, 
            },
            showCartIcon: {
                type: Boolean
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

    .table-price{
        flex-shrink: 1;
        text-align: left;
    }

    .table-name{
        flex-grow: 1;
        text-align: center;
    }

    .cart-icon:hover {
        color: blue;
        background-color: rgba(255, 255, 255, 0.7);
        cursor: pointer;
    }
</style>