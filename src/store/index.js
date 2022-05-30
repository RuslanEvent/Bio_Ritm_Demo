import { createStore } from "vuex";
import AuthService from "@/server/AuthService.js";
import api from "../server/api";
if (!checkLocalStorageRecordForNull(localStorage.accessToken)) {
  api.defaults.headers.common['Authorization'] = `Token ${localStorage.accessToken}`
}

function checkLocalStorageRecordForNull(record) {
  return record === undefined || record == null || record === 'null'
}

export default createStore({
  state: {
    accessToken: checkLocalStorageRecordForNull(localStorage.accessToken) ? null : localStorage.accessToken,
    user: checkLocalStorageRecordForNull(localStorage.user) ? null : JSON.parse(localStorage.user),
    role: checkLocalStorageRecordForNull(localStorage.role) ? null : localStorage.role,
    currentCreatingPatient: null,
    doctors: [],
    serviceCategories: [],
    categories: [],
    orders:[],
    patients:[] // STEP 1
  },
  mutations: {
    updateStorage(state, { access, user, role }) {
      state.accessToken = access
      state.user = user
      state.role = role
      localStorage.accessToken = access
      localStorage.user = JSON.stringify(user)
      localStorage.role = role
    },
    destroyToken(state) {
      state.accessToken = null
      state.user = null
      state.role = null
      localStorage.accessToken = null
      localStorage.user = null
      localStorage.role = null
    },
    saveCreatingPatient(state, data) {
      state.currentCreatingPatient = data
    },
    updateCurrentUser(state, data) {
      state.user = data;
      localStorage.user = JSON.stringify(data)
    },
    clearCreatingPatient(state) {
      state.currentCreatingPatient = null
    },
    setDoctors(state, doctors) {
      state.doctors = doctors
    },
    setPatients(state, patients) {
      state.patients = patients // STEP 2
    },
    setCategories(state, categories) {
      state.categories = categories
    },
    setOrders(state, orders) {
      state.orders = orders;
    },
    setServiceCategories(state, categories) {
      state.serviceCategories = categories
    }
  },
  getters: {
    isLoggedIn (state) {
      return state.accessToken != null;
    },
    currentRole (state) {
      return state.role
    },
    getCurrentCreatingPatient(state) {
      return state.currentCreatingPatient
    },
    currentUser (state) {
      return state.user;
    },
    doctors (state) {
      return state.doctors 
    },
    patients(state) {
      return state.patients //STAP 3
    },
    categories(state) {
      return state.categories
    },
    orders(state) {
      return state.orders
    },
    serviceCategories(state) {
      return state.serviceCategories
    }
  },
  actions: {
    userLogin(context, usercredentials) {
      return new Promise((resolve, reject) => {
        AuthService.login(usercredentials.username, usercredentials.password)
          .then(response => {
            context.commit('updateStorage', {
              access: response.data.token,
              user: response.data.user_data,
              role: response.data.role
            })
            api.defaults.headers.common['Authorization'] = `Token ${response.data.token}`
            resolve(response)
          }).catch(error => {
            reject(error)
          })
      })
    },
    userLogout(context) {
      return new Promise((resolve, reject) => {
        AuthService.logout()
          .then(response => {
            context.commit('destroyToken')
            api.defaults.headers.common['Authorization'] = '';
            resolve(response)
          }).catch(error => {
            reject(error)
          })
      })
    },
    saveCreatingPatient(context, data) {
      context.commit('saveCreatingPatient', data)
    },
    updateCurrentUser(context, data) {
      context.commit('updateCurrentUser', data)
    },
    clearCreatingPatient(context) {
      context.commit('clearCreatingPatient')
    }
  },
  modules: {},
});
