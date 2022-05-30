<template>
  <div class="edit_users ">
    <div class="edit_users_intro">
      <span class="bold">Редактировать логин и пароль личных кабинетов</span>
    </div>
    <div class="edits_users_inputs">
      <div class="edits_users_all" v-for="user in users" :key="user.id">
        <div class="edit_users_intro">{{ user.username }}</div>
        <form action="" @submit.prevent="updateInputs(user)">
          <div class="inputs_users">
            <div class="username_inputs">
              <span>Имя</span>
              <input type="text" v-model="user.first_name" />
            </div>
            <div class="username_inputs">
              <span>Фамилия</span>
              <input type="text" v-model="user.last_name" />
            </div>
            <div class="username_inputs">
              <span>Новый пароль</span>
              <input type="password" v-model="user.password1" />
            </div>
            <div class="username_inputs">
              <span>Подтвердите пароль</span>
              <input type="password" v-model="user.password2" />
            </div>
          </div>
          <div class="inputs_submit">
            <input type="submit" />
          </div>
        </form>
      </div>
    </div>
  </div>
</template>
<style scoped>
.inputs_users {
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
}
.username_inputs {
  display: flex;
  flex-direction: column;
}
.edit_users_intro {
  text-align: left;
  font-size: 20px;
  margin-top: 10px;
}
.inputs_submit {
  margin-top: 20px;
}
</style>
<script>
import AuthService from "@/server/AuthService.js";
export default {
  name: "EditUsers",
  data() {
    return {
      users: [],
    };
  },
  methods: {
    updateInputs(user) {
      if (user.password1 != null) {
        if (user.password1 != user.password2) {
            console.log('Password didn\'t match')
          return;
        }
      }
      AuthService.putUser(user.id, user.first_name, user.last_name, null, user.password1).then(
        () => {}
      );
    },
  },
  created() {
    AuthService.getUsers().then((response) => {
      this.users = response.data.filter((el) => el.username != "director");
      this.users.map((el) => {
        el.password1 = null;
        el.password2 = null;
        return el;
      });
    });
  },
};
</script>
