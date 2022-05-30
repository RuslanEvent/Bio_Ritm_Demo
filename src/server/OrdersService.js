import api from "./api";

export default {
  getOrders(status, page = 1) {
    return api.get('/order/order/', {params: {status: status, page: page}});
  },
  createOrder(patient_id, services) {
    return api.post('/order/order/', {patient_id, services});
  },
  getResults(order_id) {
    return api.get(`/order/result/${order_id}/`);
  },
  putResults(order_id, results) {
    return api.put(`/order/result/${order_id}/`, {results})
  },
  searchOrders(search) {
    return api.get(`/order/order/`, { params: {search} }) //STEP 4
  },
  downloadResults(url) {
    return api.get(url, {responseType: 'blob'});
  },
  downloadResultsCassa(url) {
    return api.get(url, {responseType: 'blob'});
  },
  downloadAllResults() {
    return new Promise((resolve, reject) => {
      api.get('/order/files/').then(response => {
        let url = response.data.file;
        resolve(this.downloadResults(url))
      }).catch(error => reject(error))
    })
  }
}