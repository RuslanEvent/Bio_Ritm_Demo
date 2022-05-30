<template>
  <div class="add_doctor">
    <form action="" @submit.prevent="addDoctors">
      <div class="add_clients_inputs">
        <div class="clients_name">
          
          <div class="name_input">
            <span>Имя</span>
            <input class="addcheck" type="text" placeholder="Имя" v-model="firstname" />
          </div>
           <div class="doctor_id">
            <span>id</span>
            <input class="addcheck" type="text" placeholder="id" v-model="id" :maxlength="max" />
          </div>
        </div>
        <div class="clients_second_name">
          <div class="id_doctor">
            <span>Локация</span>
            <input class="addcheck" type="text" v-model="location" />
          </div>
          <div class="phone_input">
            <span>Телефон</span>
            <input class="addcheck" type="text" v-model="phone" @input="onChange"
                maxlength="12"
                @keypress="isNumber($event)"/>
          </div>
        </div>
        <div class="clients_second_name">
         
        <div class="select_service">
          <p></p>
          <input class="storeclient sendoc" type="submit" />
        </div>
        </div>
      </div>
    </form>
  </div>
</template>
<script>
import DoctorsService from "@/server/DoctorsService.js";

export default {
  name: "AddDoctor",
  data() {
    return {
      firstname: "",
      id: "",
      location: "",
      phone: "998",
      max:6,
    };
  },
  methods: {
    addDoctors() {
      DoctorsService.storeDoctors(this.firstname,this.id, this.location, this.phone )
        .then((response) => {
          this.doctors = response.data
          console.log(response.data)
          this.$router.push({ name: "Doctor" });
        })
        .catch((error) => {
          console.log(error);
        });
    },
    onChange() {
        if (this.phone.length < 3) {
            this.phone = "998";
        }
    },
    isNumber: function (evt) {
      evt = evt ? evt : window.event;
      var charCode = evt.which ? evt.which : evt.keyCode;
      if (charCode > 31 && (charCode < 48 || charCode > 57) && charCode !== 46) {
        evt.preventDefault();
      } else {
        return true;
      }
    },
  },
};
</script>