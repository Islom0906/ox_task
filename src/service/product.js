import axios from "./axios";

const ProductService={
    async getProduct(page,size){
        const subdomain=localStorage.getItem('sub')
        return axios.get(`https://${subdomain}.ox-sys.com/variations?size=${size}&page=${page}`)
    }
}
export default ProductService