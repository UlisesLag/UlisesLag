<template>
    <div class="cart-home">
        <CartList v-show="!isLoading" 
        v-bind:products="products" v-bind:price="price" @refresh-cart="getCart"/>
    </div>
    
</template>

<script>
    import CartService from "../services/CartService.js"
    import CartList from "../components/CartList.vue"
    export default{
        components: {
            CartList,
        },
        data(){
            return{
                isLoading: true,
                cartInfo: {},
                products: [],
                price: []
                
            }
        },
        methods:{
            getCart(){
                this.isLoading = true;
                CartService.get()
                    .then((resp) => {
                        this.cartInfo = resp.data;
                        this.isLoading = false;
                        this.getProductInfo();
                        this.getPriceInfo();
                    })
                    .catch((error) => {
                        this.$store.commit('SET_NOTIFICATION',
                            {
                            message: 'Product Failed to Add to Cart',
                            type: 'failed'
                            }
                        );
                        this.isLoading = false;
                        this.error = true;
                    })
                ;
            },
            
            getProductInfo(){
                this.products = [];
                this.cartInfo.items.forEach(element => {
                    let product = {
                        product_id: null,
                        price: null,
                        name: null,
                        quantity: null,
                        cartItemId: null
                    }

                    product.product_id = element.product.product_id;
                    product.name = element.product.name;
                    product.price = element.product.price;
                    product.quantity = element.quantity;
                    product.cartItemId = element.cartItemId;
                    this.products.push(product);
            });
            },

            getPriceInfo(){
                this.price = []; 
    
                
                const formatCurrency = (amount) => {
                    return Intl.NumberFormat('en-US', {
                    currency: 'USD',
                    style: 'currency',
                    }).format(amount);
                };
    
                let price = {
                    name: 'Item subtotal:',
                    price: formatCurrency(this.cartInfo.itemSubtotal),
                };
                this.price.push(price);

    
                price = {
                    name: 'Tax:',
                    price: formatCurrency(this.cartInfo.tax),
                };
                this.price.push(price);

                price = {
                    name: 'Total:',
                    price: formatCurrency(this.cartInfo.total),
                };
                this.price.push(price);
            },
        
        },
        created() {
            this.getCart()
        }
    }
</script>

<style>
.cart-home {
    margin: 12px;
    
    
}

</style>