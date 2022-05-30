import api from "./api";

export default {
  name: "AuthService",
  login(username, password) {
    return api.post('/account/login/', { username, password });
  },
  getUsers() {
    return api.get('/account/detail/');
  },
  authDjango() {
    return api.get('/autologin');
  },
  autherror() {
    return api.get('/qawsed/logout');
  },
  putUser(user_id, fisrt_name, last_name, photo, password) {
    let formData = new FormData();
    formData.append('first_name', fisrt_name);
    formData.append('last_name', last_name);
    if (photo != null && photo != undefined) {
      formData.append('photo', photo);
    }
    if (password != null && password != undefined) {
      formData.append('new_password', password);
    }
    return api.put(`/account/detail/${user_id}/`, formData);
  },
  logout() {
    return api.get('/account/logout/');
  }
}