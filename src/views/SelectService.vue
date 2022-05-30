<template>
  <div class="chekAnalis">
    <div v-for="(patient, index) in patients" :key="index">
      {{ patient.name }}
    </div>
    <form action="" @submit.prevent="setData">
      <vue-collapsible-panel-group accordion>
        <vue-collapsible-panel
          v-for="category in categories"
          :key="category.id"
          :expanded="true"
        >
          <template #title>
            <b class="category_name bold">{{ category.name }}</b>
          </template>
          <template #content>
            <div
              class="select_service category"
              v-for="service in category.service"
              :key="service.id"
            >
              <label :for="service.id">
                <div class="service_name">
                  {{ service.name }}
                </div>
              </label>
              <div class="service_price">
                <b> {{ service.price }}</b>
                <input
                  :id="service.id"
                  type="checkbox"
                  class="custom-checkbox"
                  :value="service.id"
                  v-model="checkAnalis"
                  @change="selectService($event, service)"
                />
              </div>
            </div>
            <!-- <button @click="uncheck">Uncheck</button> -->
          </template>
        </vue-collapsible-panel>
      </vue-collapsible-panel-group>
      <div class="result_flex">
        <div class="results_">
          <div
            class="results_category"
            v-for="selectedService in selectedServices"
            :key="selectedService.id"
          >
            <span v-if="selectedService.name.length < 18">
              {{ selectedService.name }}</span
            >
            <span v-else>
              {{ selectedService.name.substring(0, 25) + ".." }}</span
            >

            <div class="xicon">
              <span @click="unSelectService(selectedService)">
                <img
                  class="close"
                  src="../assets/image/close.png"
                  alt=""
                  srcset=""
              /></span>
            </div>
          </div>
        </div>
      </div>
      <div class="total_price_section">
        <div class="total">
            <div>
              <span> Итого:</span>
            </div>
            <div>
              <b> {{ totalprice }}</b>
          </div>
        </div>
        <div>
          <div class="login_button">
            <button type="submit">
              <span v-if="isLoading">Сохранить...</span>
              <span v-else>Сохранить</span>
            </button>
          </div>
        </div>
      </div>
    </form>
  </div>
</template>

<script>
import {
  VueCollapsiblePanelGroup,
  VueCollapsiblePanel,
} from "@dafcoe/vue-collapsible-panel";
import "@dafcoe/vue-collapsible-panel/dist/vue-collapsible-panel.css";
import CategoryService from "@/server/CategoryService.js";
import OrdersService from "@/server/OrdersService.js";
import { mapGetters } from "vuex";
import PatientsService from "@/server/PatientsService.js";

export default {
  name: "SelectService",
  components: {
    VueCollapsiblePanelGroup,
    VueCollapsiblePanel,
  },
  data() {
    return {
      selectedServices: [],
      checkAnalis: [],
      isLoading: false,
      answer: null,
      selectedService: ""
    };
  },
  methods: {
    selectService(event, service) {
      if (event.target.checked) {
        this.selectedServices.push(service);
      } else {
        let index = this.selectedServices.indexOf(service);
        if (index !== -1) {
          this.selectedServices.splice(index, 1);
        }
      }
    },
    unSelectService(service) {
      let index = this.selectedServices.indexOf(service);
      if (index !== -1) {
        this.selectedServices.splice(index, 1);
      }
      let analysIndex = this.checkAnalis.indexOf(service.id);
      console.log(analysIndex);
      if (index !== -1) {
        this.checkAnalis.splice(analysIndex, 1);
      }
    },
    createOrder(patient_id) {
      OrdersService.createOrder(patient_id, this.checkAnalis)
        .then((response) => {
          this.answer = [response.data.file, response.data.p_file];
          console.log(response.data);
          this.answer.forEach((element) => {
            OrdersService.downloadResultsCassa(element)
              .then((response) => {
                const blob = new Blob([response.data], {
                  type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
                });
                const link = document.createElement("a");
                link.href = URL.createObjectURL(blob);
                link.download = element.split(["/"]).reverse()[0];
                link.target = "_blank";
                link.click();
                URL.revokeObjectURL(link.href);
                this.$store.dispatch("clearCreatingPatient");
                this.$router.push({ name: "Patient" });
              })
              .catch((error) => console.log(error));
          });
        })

        .catch((error) => {
          console.log(error);
          this.isLoading = false;
        });
    },
    setData() {
      this.isLoading = true;
      let currentPatient = this.$store.getters.getCurrentCreatingPatient;
      let patient_id = this.$route.query.patient_id;
      if (patient_id == null) {
        PatientsService.storePatients(
          currentPatient.firstname,
          currentPatient.secondname,
          currentPatient.birth,
          currentPatient.doctor_id,
          currentPatient.phone,
          currentPatient.gender
        ).then((response) => {
          patient_id = response.data.id;
          console.log(patient_id);
          this.createOrder(patient_id);
        });
      } else {
        this.createOrder(patient_id);
      }
    },
  },
  computed: {
    totalprice() {
      return this.selectedServices.reduce(
        (partialSum, service) => partialSum + service.price,
        0
      );
    },
     ...mapGetters({
      categories: "serviceCategories", // STEP 5
    }),
  },
  created() {
    CategoryService.getCategory()
      .then((response) => {
        this.$store.commit('setServiceCategories', response.data)
      })
      .catch((error) => {
        console.log(error);
      });
  },
};
</script>