<template>
  <div class="center_add_doc"></div>
  <div class="client_data_Date">
    <div id="client_data_wrap" v-if="doctors != null">
      <DoctorData v-for="doctor in doctors" :key="doctor.id" :doctor="doctor" />
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
</template>

<script>
import DoctorData from "@/components/DoctorData.vue";
import DoctorsService from "@/server/DoctorsService.js";
import VPagination from "@hennge/vue3-pagination";
import { mapGetters } from "vuex";
import "@hennge/vue3-pagination/dist/vue3-pagination.css";
export default {
  name: "Doctor",
  components: {
    DoctorData,
    VPagination,
  },
  data() {
    return {
      page: 1,
      total_pages: 0,
    };
  },
  methods: {
    updateHandler() {
      DoctorsService.getDoctors(this.page)
        .then((response) => {
          this.$store.commit("setDoctors", response.data.data);
          this.total_pages = response.data.total_pages;
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
  computed: {
    ...mapGetters({
      doctors: "doctors",
    }),
  },
  created() {
    DoctorsService.getDoctors()
      .then((response) => {
        this.$store.commit("setDoctors", response.data.data);
        this.total_pages = response.data.total_pages;
      })
      .catch((error) => {
        console.log(error);
      });
  },
};
</script>