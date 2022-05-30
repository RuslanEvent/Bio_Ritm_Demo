<template>
  <div class="admin_navigation_caontainer">
    <div class="admin_navigation">
      <div class="admin_navigation_add roght">
        <div
          v-if="
            $store.getters.currentRole == 'admin' ||
            $store.getters.currentRole == 'reception'
          "
        >
          <router-link :to="{ name: 'AddClients' }" @click="smth = false"
            >Добавить клиента</router-link
          >
        </div>
        <div
          v-if="
            $store.getters.currentRole == 'admin' ||
            $store.getters.currentRole == 'reception'
          "
        >
          <router-link to="/reception/selectService" @click="smth = false"
            >Выбор услуги</router-link
          >
        </div>
        <div
          v-if="
            $store.getters.currentRole == 'admin' ||
            $store.getters.currentRole == 'reception'
          "
        >
          <router-link to="/reception/patient" @click="smth = true">
            Пациенты</router-link
          >
        </div>
      </div>
    </div>
  </div>
  <router-view></router-view>
</template>
<script>
export default {
  name: "ClientsNavigation",
  components: {},
  data() {
    return {
      smth: false,
    };
  },
  methods: {
    onAdmin() {
      this.$router.push({ name: "Admin" });
    },
  },
};
</script>
<style scoped>
.admin_navigation {
  display: flex;
  justify-content: center !important;
}
</style>