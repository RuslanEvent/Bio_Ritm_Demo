<template>
  <div class="add_clients">
    <form action="" @submit.prevent="addClient">
      <span v-if="id_not_find">Проверьте все поля!</span>
      <div class="add_clients_inputs">
        <div class="clients_name">
          <div class="name_input">
            <span>Имя</span>
            <input
              class="addcheck"
              type="text"
              placeholder="Имя"
              v-model="firstname"
            />
          </div>
          <div class="second_name_input">
            <span>Фамилия</span>
            <input
              class="addcheck"
              type="text"
              placeholder="Фамилия"
              v-model="secondname"
            />
          </div>
        </div>
        <div class="clients_second_name">
          <div class="data_input">
            <span>Год Рождения</span>
            <input class="addcheck" type="text" v-model="birth" maxlength="4" />
          </div>
          <div class="id_doctor">
            <span>Код врача</span>
            <input
              class="addcheck"
              type="text"
              v-model="doctor_id"
              maxlength="6"
            />
          </div>
        </div>
        <div class="clients_phone">
          <div class="phone_input">
            <span>Ваш телефон</span>
            <input
              class="addcheck"
              type="text"
              v-model="phone"
              @input="onChange"
              maxlength="12"
              @keypress="isNumber($event)"
            />
          </div>
          <div class="gender_inp">
            <span>Пол</span>
            <select class="addcheck" name="" id="" v-model="gender">
              <option value="male">Мужчина</option>
              <option value="female">Женщина</option>
            </select>
          </div>
        </div>
        <div class="select_service">
          <input type="submit" class="storeclient" />
        </div>
      </div>
    </form>
    <router-link
      class="back_admin"
      v-if="$store.getters.currentRole == 'admin'"
      :to="{ name: 'Admin' }"
      >To Admin</router-link
    >
  </div>
</template>

<script>
export default {
  name: "AddClient",
  data() {
    return {
      firstname: "",
      secondname: "",
      birth: "",
      doctor_id: "",
      maxLen: 4,
      phone: "998",
      gender: "",
      id_not_find: false,
      max: 6,
    };
  },

  methods: {
    addClient() {
      if (
        (this.firstname == "",
        this.secondname == "",
        this.birth == "",
        this.doctor_id == "",
        this.phone == "",
        this.gender == "")
      ) {
        this.id_not_find = true;
        return;
      }
      this.$store.dispatch("saveCreatingPatient", {
        firstname: this.firstname,
        secondname: this.secondname,
        birth: this.birth,
        doctor_id: this.doctor_id,
        phone: this.phone,
        gender: this.gender,
      });
      this.$router.push({ name: "SelectService" });
      // this.$router.push({ name: "SelectService", query: {patient_id} })
    },
    onChange() {
      if (this.phone.length < 3) {
        this.phone = "998";
      }
    },
    isNumber: function (evt) {
      evt = evt ? evt : window.event;
      var charCode = evt.which ? evt.which : evt.keyCode;
      if (
        charCode > 31 &&
        (charCode < 48 || charCode > 57) &&
        charCode !== 46
      ) {
        evt.preventDefault();
      } else {
        return true;
      }
    },
  },

  created() {
    let currentPatient = this.$store.getters.getCurrentCreatingPatient;
    if (currentPatient != null) {
      this.firstname = currentPatient.firstname;
      this.secondname = currentPatient.secondname;
      this.birth = parseInt(currentPatient.birth);
      this.doctor_id = currentPatient.doctor_id;
      this.phone = currentPatient.phone;
      this.gender = currentPatient.gender;
    }
  },
};
</script>