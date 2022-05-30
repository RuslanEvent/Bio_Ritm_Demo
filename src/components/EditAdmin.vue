<template>
  <div class="edit_profile">
    <form action="" @submit.prevent="updateUser">
      <div class="edit_intro">
        <span class="bold">Редактировать профиль</span>
      </div>
      <div class="edit_inputs">
        <div class="slot_1">
          <div class="edit_params">
            <span class="bold">Имя</span>
            <input
              class="edit_text"
              type="text"
              v-model="first_name"
              placeholder="Имя"
            />
          </div>

          <div class="edit_params">
            <span class="bold">Фамилия</span>
            <input
              class="edit_text"
              type="text"
              v-model="last_name"
              placeholder="Фамилия"
            />
          </div>

         <div class="inputs_submit">
            <input type="submit" value="Сохранить"/>
          </div>
        </div>
      </div>

      <div class="edit_inputs two_colums">
        <div class="slot_1">
          <div class="edit_params">
            <span class="bold">Пароль</span>
            <input  class="edit_text" type="password" placeholder="Пароль" />
          </div>

          <div class="edit_params">
            <span class="bold">Повторите пароль</span>
            <input
              class="edit_text"
              type="password"
              placeholder="Повторите пароль"
              
            />
          </div>

          <div class="drag_drop">
            <div
              class="drop display-inline align-center"
              @dragover.prevent
              @drop="onDrop"
            >
              <label v-if="!image" class="btn display-inline">
                <span>Изображение</span>
                <input type="file" name="image" @change="onChange" />
              </label>

              <div
                class="hidden display-inline align-center"
                v-else
                v-bind:class="{ image: true }"
              >
                <img :src="image" alt="" class="img" />
                <br />
                <br />

                <button class="btn" @click="removeFile">Удалить</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </form>
  </div>
</template>
<script>
import AuthService from "@/server/AuthService.js";

export default {
  data() {
    return {
      image: "",
      first_name: "",
      last_name: "",
      file: null,
      // users:[]
    };
  },
  methods: {
    onDrop: function (e) {
      e.stopPropagation();
      e.preventDefault();
      var files = e.dataTransfer.files;
      this.createFile(files[0]);
    },
    onChange(e) {
      var files = e.target.files;
      this.createFile(files[0]);
    },
    createFile(file) {
      if (!file.type.match("image.*")) {
        alert("Select an image");
        return;
      }
      // var img = new Image();
      var reader = new FileReader();
      var vm = this;

      reader.onload = function (e) {
        vm.image = e.target.result;
      };
      this.file = file;
      reader.readAsDataURL(file);
    },
    removeFile() {
      this.image = "";
    },
    updateUser() {
      let userId = this.$store.getters.currentUser.id;
      AuthService.putUser(userId, this.first_name, this.last_name, this.file)
        .then((response) => {
          this.userdata = response.data;
          console.log(response.data);
          this.$store.dispatch("updateCurrentUser", response.data);
        })
        .catch((error) => {
          console.log(error);
        });

    },
  },
};
</script>