import api from "./api";

export default {
  getPatients(date, page = 1) {
    return api.get('/client/patient/', {params: {date: date, page: page}});
  },
  storePatients(firstname, secondname, birth, doctor_id, phone, gender) {
    return api.post('/client/patient/', {firstname, secondname, birth, doctor_id, phone, gender});
  },
  putPatients(id,firstname, secondname, phone, birth) {
    return api.put(`/client/patient/${id}/`, {firstname, secondname, phone, birth});
  },
  searchPatients(search) {
    return api.get(`/client/patient/`, { params: {search} }) //STEP 4
  }

}