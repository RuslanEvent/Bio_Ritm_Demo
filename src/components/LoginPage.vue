<template>
  <div class="login_home">
    <div class="login_page_crm">
      <div class="login_crm">
        <div class="login_logo login_log">
          <img src="../assets/image/logo.png" alt="" srcset="" />
        </div>
        <div class="login_intro">Войдите в профиль</div>
        <form action="" @submit.prevent="onSubmit">
          <div class="login_login loginput">
            <input type="text" v-model="username" placeholder="Логин" />
          </div>
          <div class="login_password loginput">
            <input type="password" v-model="password" placeholder="Пароль" />
          </div>
          <div class="error" v-if="errorr">
            <p>Не верный логин или пароль</p>
          </div>
          <div v-if="isLoading">
            <img
              class="loader"
              src="../assets/image/loader.gif"
              alt=""
              srcset=""
            />
          </div>
          <div v-else class="login_button">
            <button type="submit" @click="none">
              <span>Войти</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>
<style scoped>
.submit {
  display: flex;
  justify-content: center;
  align-items: center;
  background: #fff !important;
}
.loader {
  width:96px;
}
</style>
<script>
import AuthService from "@/server/AuthService.js";
export default {
  name: "LoginPage",
  data() {
    return {
      username: "",
      password: "",
      errorr: false,
      isLoading: false,
    };
  },

  methods: {
    onSubmit() {
      this.isLoading = true;
      this.errorr = false;
      this.$store
        .dispatch("userLogin", {
          username: this.username,
          password: this.password,
        })
        .then((response) => {
          this.isLoading = false;
          if (response.data.role === "admin") {
            this.$router.push({ name: "Admin" });
          }
          if (response.data.role === "reception") {
            this.$router.push({ name: "Reception" });
          }
          if (response.data.role === "laboratory1") {
            this.$router.push({ name: "Process" });
          }
          if (response.data.role === "laboratory2") {
            this.$router.push({ name: "Process" });
          }
         
        })
        .catch((error) => {
          const response = error.response;
          if (response && response.status == 400) {
            this.errorr = true;
            this.isLoading = false;
            console.log("Неверный Логин, ну или пароль :)");
          }
           if(response && response.status == 403) {
              AuthService.autherror().then();
              console.log('trash');
              this.$router.push({ name: "Admin" });
          }
        });
    },
  },
};
</script>

