<template>
    <div class="cards" v-show="isTable">
        
        <ProductCard v-for="p in products" v-bind:key="p.product_id" :product="p" :showDesc="showDesc" :show-cart-icon="showCartIcon" v-show="isTable"/>

        
    </div>

    <div class="table" v-show="!isTable">
        <ul class="row" v-show="!isTable">
            <li class="top">SKU</li>
            <li></li>
            <li></li>
            <li></li>
            <li class="top" id="table-name">NAME</li>
            <li class="top" id="table-price">PRICE</li>
            <li></li>
        </ul>
        <ProductTable class="row" v-for="p in products" v-bind:key="p.product_id" :product="p" :show-cart-icon="showCartIcon" v-show="!isTable"/>
    </div>
    
      

</template>

<script>
    import ProductCard from './ProductCard.vue';
    import ProductTable from './ProductTable.vue';
    export default{
        props: {
            products: {
                type: Array,
                required: true
            }, 
            isTable: {
                type: Boolean,
                required: true
            },
            showCartIcon: {
                type: Boolean
            }
        },
        components: {
            ProductCard,
            ProductTable
        },

        data(){
            return{
                showDesc: false
            }
            
        }
        
    }

</script>

<style>
    .cards{
        margin: 20px;
        display: flex;
        flex-wrap: wrap;
        border: 3px rgb(218, 186, 146) solid;
        justify-content: center; 
    }

    .table{
        margin: 20px;
        display: flex;
        flex-direction: column;
        border: 3px rgb(218, 186, 146) solid;
        justify-content: center; 
    }

    .row{
        margin: 20px;
        margin-right: 60px;
        list-style: none;
        display: flex;
        justify-content: space-between;
    }

    .top{
        font-weight: bold;
        font-size: x-large;
    }

    li{
        margin-left:  20px;
    }

    #table-price{
        flex-shrink: 1;
        text-align: left;
    }

    #table-name{
        flex-grow: 1;
        text-align: center;
        margin-right: 10px;
    }


</style>