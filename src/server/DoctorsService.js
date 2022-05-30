import api from "./api";

export default {
  getDoctors(page = 1) {
    return api.get('/client/doctor/', { params: { page } });
  },
  storeDoctors(firstname, id, location, phone) {
    return api.post('/client/doctor/', { firstname, id, location, phone });
  },
  putDoctors(id, firstname, location, phone) {
    return api.put(`/client/doctor/${id}/`, { firstname, location, phone })
  },
  searchDoctors(search) {
    return api.get(`/client/doctor/`, { params: {search} })
  }
}