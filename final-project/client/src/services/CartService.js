import axios from "axios";

const http = axios.create({
    baseURL: "http://localhost:9000/"
});

export default {
    get(){
        return http.get('/cart')
    },

    post(item){
        return http.post('/cart/items', item)
    },

    delete(id){
        return http.delete(`/cart/items/${id}`);
    },

    clear(){
      return http.delete('/cart');
    } 

}       