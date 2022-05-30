import axios from "axios";
import router from "../router";

const api = axios.create({
    baseURL: 'http://rm.bioritm.org/api',
    // baseURL: 'https://bioritm.pythonanywhere.com',
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
    }
})
api.interceptors.response.use(function (response) {
    return response
}, function (error) {
    if (error.response) {
        if(error.response.status == 401) {
            alert('Необходима авторизация');
            router.push({ name: "Login" })
        };
    }
    return Promise.reject(error)
})

export default api;