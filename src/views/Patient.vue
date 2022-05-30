<template>
  <div class="to_admin">
    <router-link
      class="back_admin"
      v-if="$store.getters.currentRole == 'admin'"
      :to="{ name: 'Admin' }"
      >To Admin</router-link
    >
  </div>

  <div class="admin_filter">
    <div
      class="admin_all"
      :class="{ active: date == '' }"
      @click="changeDate('')"
    >
      Все клиенты
    </div>
    <div
      class="admin_today"
      :class="{ active: date == 'today' }"
      @click="changeDate('today')"
    >
      Сегодня
    </div>
    <div
      class="admin_yestarday"
      :class="{ active: date == 'yesterday' }"
      @click="changeDate('yesterday')"
    >
      Вчера
    </div>
  </div>
  <div class="mobile_admin_navigation">
    <select name="routerLink" id="" v-on:change="changeStatus($event)">
      <option value="">
        <div
          class="admin_all"
          :class="{ active: date == '' }"
          @click="changeDate('')"
        >
          <b class="bold">Все киленты</b>
        </div>
      </option>
      <option value="today">
        <div class="admin_all" :class="{ active: date == 'today' }">
          <b class="bold"> Сегодня</b>
        </div>
      </option>
      <option value="yesterday">
        <div
          class="admin_all"
          :class="{ active: date == 'yesterday' }"
          @click="changeDate('yesterday')"
        >
          <b class="bold">Вчера</b>
        </div>
      </option>
    </select>
  </div>
  <div class="client_data_Date">
    <div id="client_data_wrap" v-if="patients != null">
      <ClientData
        v-for="patient in patients.data"
        :key="patient.id"
        :patient="patient"
      />
    </div>
  </div>
  <v-pagination
  v-if="total_pages > 1"
    v-model="page"
    :pages="total_pages"
    :range-size="1"
    active-color="#DCEDFF"
    @update:modelValue="updateHandler"
  />
  <br />
  <br />
</template>
<script>
import ClientData from "@/components/ClientData.vue";
import PatientsService from "@/server/PatientsService.js";
import VPagination from "@hennge/vue3-pagination";
import { mapGetters } from "vuex";
import "@hennge/vue3-pagination/dist/vue3-pagination.css";
export default {
  name: "Patient",
  components: {
    ClientData,
    VPagination,
  },
  data() {
    return {
      date: "",
      page: 1,
      total_pages: 0,
    };
  },
  methods: {
    changeStatus(date) {
      this.date = date.target.value;
      PatientsService.getPatients(date.target.value)
        .then((response) => {
          this.$store.commit("setPatients", response.data); //STEP 6
          this.total_pages = response.data.total_pages;
        })
        .catch((error) => {
          console.log(error);
        });
    },
    updateHandler() {
        PatientsService.getPatients(this.date, this.page)
          .then((response) => {
            this.$store.commit("setPatients", response.data);
            this.total_pages = response.data.total_pages;
          })
          .catch((error) => {
            console.log(error);
          });
    },
    changeDate(date) {
      this.date = date;
      PatientsService.getPatients(date)
        .then((response) => {
          this.patients = response.data;
          this.$store.commit("setPatients", response.data); //STEP 6
          this.total_pages = response.data.total_pages;
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
  computed: {
    ...mapGetters({
      patients: "patients", // STEP 5
    }),
  },
  created() {
    PatientsService.getPatients(this.date)
      .then((response) => {
        this.patients = response.data;
        this.$store.commit("setPatients", response.data); //STEP 7
        this.total_pages = response.data.total_pages;
      })
      .catch((error) => {
        console.log(error);
      });
  },
};
</script>