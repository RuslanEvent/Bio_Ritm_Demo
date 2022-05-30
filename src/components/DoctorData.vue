<template>
  <div class="client_data ">
    <div class="client_data_name">
      <div class="client_name">
        <div v-if="editMode">
          <input placeholder="Имя" class="changes" type="text" v-model="firstname" />
        </div>
        <b v-else class="bold">{{ firstname }}</b>
      </div>
      <div class="client_phone">
        <span>Номер:</span>
        <div v-if="editMode">
          <input placeholder="Фамилия" class="changes" type="text" v-model="phone" />
        </div>
        <b v-else class="bold"> {{ phone }}</b>
      </div>
    </div>
    <div class="client_data_date">
      <div v-if="editMode">
        <input placeholder="Локация" class="changes" type="text" v-model="location" />
      </div>
      <div v-else class="client_date">
        {{ location }}</div>
      <div class="client_null"></div>
    </div>
    <div class="client_data_id">
      <div class="client_null"></div>
      <div class="client_id">
       <button class="edit" v-if="saveMode" @click="enableEditMode">
          <div>
         <img src="../assets/image/edit.png" alt="" srcset="">
         </div>
        </button>
        <button class="saves" v-if="editMode" @click="saveDoctor">
          Сохранить
        </button>
        <span id="client_id">{{ doctor.id }} </span>
        <!-- <span id="client_status"></span> -->
      </div>
    </div>
  </div>
</template>
<script>
import DoctorsService from "@/server/DoctorsService.js";
export default {
  name: "DoctorData",
  props: {
    doctor: Object,
  },
  data() {
    return {
      saveMode: true,
      editMode: false,
      phone: this.doctor.phone,
      firstname: this.doctor.firstname,
      location: this.doctor.location,
    };
  },
  methods: {
    enableEditMode() {
      this.editMode = true;
      this.saveMode = false;
    },
    saveDoctor() {
      this.saveMode = true;
      this.editMode = false;
      DoctorsService.putDoctors(
        this.doctor.id,
        this.firstname,
        this.location,
        this.phone
      ).then(() => {});
    },
  },
};
</script>