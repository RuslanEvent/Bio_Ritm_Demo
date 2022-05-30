<template @click.prevent="Edit">
  <div class="admin_nav">
    <router-link to="/admin">
      <div class="admin_nav_logo">
        <img src="../assets/image/logo.png" alt="" srcset="" />
      </div>
    </router-link>
    <div class="admin_nav_search">
      <div class="nav_search">
        <input
          type="text"
          v-model="search"
          @input="onChange"
          placeholder="Поиск"
        />
      </div>
    </div>
    <div class="admin_nav_login">
      <div
        class="nav_login_img"
        v-if="$store.getters.currentUser.photo != null"
      >
        <img
          class="admin_nav_logo"
          :src="
            'http://rm.bioritm.org' + $store.getters.currentUser.photo.photo
          "
          alt=""
          srcset=""
        />
      </div>
      <div class="nav_login_daga">
        <div class="nav_login_name">
          <div>
            <b>
              {{ $store.getters.currentUser.first_name }}
              {{ $store.getters.currentUser.last_name }}</b
            >
          </div>

          <div></div>
        </div>
        <div class="nav_login_status">{{ $store.getters.currentRole }}</div>
      </div>

      <div class="nav_drop_down">
        <Dropdown />
      </div>
    </div>
    <div class="admin_nav_burger">
      <Slide :closeOnNavigation="true">
        <div class="slide_open">
          <div class="slide_open_photo">
            <div
              class="nav_login_img"
              v-if="$store.getters.currentUser.photo != null"
            >
              <img
                class="admin_nav_logo"
                :src="
                  'http://rm.bioritm.org' +
                  $store.getters.currentUser.photo.photo
                "
                alt=""
                srcset=""
              />
            </div>
          </div>
          <div class="slide_open_fio">
            <div class="nav_login_daga">
              <div class="nav_login_name">
                <div>
                  <b>
                    {{ $store.getters.currentUser.first_name }}
                    {{ $store.getters.currentUser.last_name }}</b
                  >
                </div>

                <div></div>
              </div>
              <div class="nav_login_status">
                {{ $store.getters.currentRole }}
              </div>
            </div>
          </div>
        </div>
        <div class="burder_nav">
          <router-link
            class="profil"
            v-if="$store.getters.currentRole == 'admin'"
            :to="{ name: 'EditUsers' }"
            >Редактировать</router-link
          >

            <router-link @click="onLogout" :to="{ name: 'EditUsers' }">
            Выход
          </router-link>
        </div>
        <div class="burder_nav">
        
        </div>
      </Slide>
    </div>
  </div>
</template>

<script>
import Dropdown from "@/components/Dropdown.vue";
import DoctorsService from "@/server/DoctorsService.js";
import CategoryService from "@/server/CategoryService.js";
import OrdersService from "@/server/OrdersService.js";
import PatientsService from "@/server/PatientsService.js"; // STEP 8
import _debounce from "lodash/debounce";
import { Slide } from "vue3-burger-menu";
export default {
  name: "UserNavbar",
  components: {
    Dropdown,
    Slide,
  },
  methods: {
    data() {
      return {
        search: null,
      };
    },
    onLogout() {
      this.$store.dispatch("userLogout").then(() => {
        this.$router.push({ name: "Login" });
      });
    },
    onChange: _debounce(function () {
      // console.log(event.target.value)
      let currentRouteName = this.$route.name;
      if (currentRouteName == "Doctor") {
        DoctorsService.searchDoctors(this.search).then((response) => {
          this.$store.commit("setDoctors", response.data.data);
        });
      }
      if (currentRouteName == "Client") {
        // STEP 9
        PatientsService.searchPatients(this.search).then((response) => {
          this.$store.commit("setPatients", response.data);
        });
      }
       if (currentRouteName == "Patient") {
        // STEP 9
        PatientsService.searchPatients(this.search).then((response) => {
          this.$store.commit("setPatients", response.data);
        });
      }
      if (currentRouteName == "SelectService") {
        // STEP 9
        CategoryService.searchCategories(this.search).then((response) => {
          let categories = response.data;
          this.$store.commit("setServiceCategories", []);
          let store = this.$store;
          setTimeout(function () {
            store.commit("setServiceCategories", categories);
          }, 300);
        });
      }
      
      if (currentRouteName == "Process") {
        OrdersService.searchOrders(this.search).then((response) => {
          this.$store.commit("setOrders", response.data);
        });
      }
      console.log(this.$route);
    }, 600),
  },
};
</script>