import axios from "axios"

class ApiHelper{
    constructor(){
        this.baseUrl = "http://localhost:5500/api"
    }

    fetchProduct(){
        return axios.get(`${this.baseUrl}/product`)
    }
   fetchInnerProduct(){
    return axios.get(`${this.baseUrl}/innerProduct/insertInner`)
   } 

    fetchProductById(id){
        return axios.get(`${this.baseUrl}/product/${id}`)
    }
    FetchCart(proid){
        return axios.post(`${this.baseUrl}/product/cart/`,{proid})
    }

    userLogin(loginDetails){
        return axios.post(`${this.baseUrl}/user/login`,loginDetails)
    }
    userRegister(RegisterDetails){
        return axios.post(`${this.baseUrl}/user/register`, RegisterDetails)
    }

}

const apiHelper = new ApiHelper()

export default apiHelper