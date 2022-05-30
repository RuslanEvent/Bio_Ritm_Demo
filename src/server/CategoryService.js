import api from "./api";

export default {
  getCategory() {
    return api.get('/service/category/');
  },
  searchCategories(search) {
    let params = {};
    if (search != '') {
      params = {search}
    }
    return api.get(`/service/category/`, { params: params}) //STEP 4
  }
}