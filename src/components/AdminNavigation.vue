<template>
  <div class="futture">
    <div class="admin_navigation_caontainer">
      <div
        class="admin_navigation"
        v-if="$store.getters.currentRole == 'admin'"
      >
        <div class="admin_navigation_left" v-if="isBlo">
          <div>
            <router-link v-if="isCli" :to="{ name: 'AddClients' }">
              <b class="bold">+ Добавить клиента</b>
            </router-link>

            <router-link v-else-if="isDoc" :to="{ name: 'AddDoctors' }"
              ><b class="bold">+ Добавить Врача</b>
            </router-link>
          </div>
        </div>

        <div class="admin_navigation_right">
          <router-link
            class="active"
            @click="(isDoc = false), (isCli = true), (isBlo = true)"
            to="/admin/client"
          >
            <div class="white">Клиенты</div>
          </router-link>

          <router-link
            class="active"
            @click="(isDoc = true), (isCli = false), (isBlo = true)"
            to="/admin/doctor"
          >
            <div class="white">Врачи</div>
          </router-link>

          <router-link
            class="active"
            @click="(isDoc = false), (isCli = false), (isBlo = false)"
            to="/admin/analistic"
            ><div class="white">Аналитика</div></router-link
          >

          <router-link
            class="active"
            @click="(isDoc = false), (isCli = false), (isBlo = false)"
            to="/admin/process"
            ><div class="white">Процесс</div></router-link
          >
          <router-link
            class="active"
            @click="(isDoc = false), (isCli = false), (isBlo = false)"
            to="/admin/services"
          >
            <div class="white" @click="autoLogin">Услуги</div>
          </router-link>
        </div>
      </div>
    </div>
    <div class="mobile_admin_navigation"  v-if="$store.getters.currentRole == 'admin'">
      <select name="routerLink" id="" v-on:change="changeRoute($event)">
        <option value="admin">
          <router-link
            to="/admin"
            @click="(isDoc = false), (isCli = true), (isBlo = true)"
            ><b class="bold"> Выберите список </b></router-link
          >
        </option>
        <option value="admin/client">
          <router-link
            @click="(isDoc = false), (isCli = true), (isBlo = true)"
            to="/admin/client"
            ><b class="bold"> Клиенты</b></router-link
          >
        </option>
        <option
          value="admin/doctor"
          @click="(isDoc = true), (isCli = false), (isBlo = true)"
          to="/admin/doctor"
        >
          <router-link
            @click="(isDoc = true), (isCli = false), (isBlo = true)"
            to="/admin/doctor"
            ><b class="bold"> Врачи</b></router-link
          >
        </option>
        <option value="admin/analistic">
          <router-link
            @click="(isDoc = false), (isCli = false), (isBlo = false)"
            to="/admin/analistic"
            ><b class="bold"> Аналитика</b></router-link
          >
        </option>
        <option value="admin/process">
          <router-link
            @click="(isDoc = false), (isCli = false), (isBlo = false)"
            to="/admin/process"
            ><b class="bold"> Процесс</b></router-link
          >
        </option>
        <option value="autologin" @click="autoLogin">
          <router-link
            @click="(isDoc = false), (isCli = false), (isBlo = false)"
            to="/admin/services"
            ><b class="bold"> Услуги</b></router-link
          >
        </option>
      </select>
    </div>

  </div>

  <router-view></router-view>
</template>

<script>
import AuthService from "@/server/AuthService.js";

export default {
  name: "AdminNavigation",
  data() {
    return {
      isDoc: true,
      isCli: true,
      isBlo: true,
    };
  },
  methods: {
    changeRoute(e) {
      console.log(e);
      if (e.target.value == "autologin") {
        AuthService.authDjango().then((response) => {
          if (response.status == 200) {
            window.location.href = "http://rm.bioritm.org/api/qawsed/";
          }
        });
      } else {
        this.$router.push("/" + e.target.value);
      }
    },
    autoLogin() {
      AuthService.authDjango().then((response) => {
        if (response.status == 200) {
          window.location.href = "http://rm.bioritm.org/api/qawsed/";
        }
      });
    },
  },
};
</script>