<template>
  <div class="client_data">
    <div class="client_data_name">
      <div class="client_name">
        <div v-if="editMode">
          <input
            class="changes"
            type="text"
            placeholder="Имя"
            v-model="firstname"
          />
          <input
            class="changes"
            type="text"
            placeholder="Фамилия"
            v-model="secondname"
          />
        </div>
        <b v-else @click="selectService" class="bold"> {{ firstname }} {{ secondname }} </b>
      </div>
      <div class="client_phone">
        <span v-if="nubers">Номер: &nbsp;</span>
        <div v-if="editMode">
          <input
            class="changes"
            type="text"
            placeholder="Телефон"
            v-model="phone"
          />
        </div>
        <b class="bold" v-else> {{ phone }}</b>
      </div>
    </div>
    <div class="client_data_date">
      <div v-if="editMode">
        <input class="changes" type="text" placeholder="Дата" v-model="birth" />
      </div>
      <div v-else class="client_date">{{ birth }}</div>
      <div class="client_null"></div>
    </div>
    <div class="client_data_id">
      <div class="client_null"></div>
      <div class="client_id">
        <button class="edit" v-if="saveMode" @click="enableEditMode">
          <div>
            <img src="../assets/image/edit.png" alt="" srcset="" />
          </div>
        </button>
        <button class="saves" v-if="editMode" @click="saveDoctor">
          Сохранить
        </button>
        <span id="client_id">{{ patient.p_id }}</span>
        <span :style="{ backgroundColor: activeColor }" id="client_status">{{
          status
        }}</span>
      </div>
    </div>
  </div>
</template>

<script>
import Patients from "@/server/PatientsService.js";
export default {
  name: "Client",
  props: {
    patient: Object,
  },
  data() {
    if (this.patient.order_status == "pending") {
      return {
        nubers: true,
        saveMode: true,
        editMode: false,
        events: null,
        id: this.patient.id,
        firstname: this.patient.firstname,
        secondname: this.patient.secondname,
        phone: this.patient.phone,
        birth: this.patient.birth,
        status: "В ожидании",
        activeColor: "#FFD9D1",
        fontSize: 30,
      };
    }
     if (this.patient.order_status == "progress") {
      return {
        nubers: true,
        saveMode: true,
        editMode: false,
        events: null,
        id: this.patient.id,
        firstname: this.patient.firstname,
        secondname: this.patient.secondname,
        phone: this.patient.phone,
        birth: this.patient.birth,
        status: "В процессе",
        activeColor: "#FFF5D1",
        fontSize: 30,
      };
    }
     if (this.patient.order_status == "finished") {
      return {
        nubers: true,
        saveMode: true,
        editMode: false,
        events: null,
        id: this.patient.id,
        firstname: this.patient.firstname,
        secondname: this.patient.secondname,
        phone: this.patient.phone,
        birth: this.patient.birth,
        status: "Завершен",
        activeColor: "#D1FFD7",
        fontSize: 30,
      };
    }
    return {
      nubers: true,
      saveMode: true,
      editMode: false,
      events: null,
      id: this.patient.id,
      firstname: this.patient.firstname,
      secondname: this.patient.secondname,
      phone: this.patient.phone,
      birth: this.patient.birth,
      status: this.patient.order_status,
    };
  },
  computed: {
    classObject() {
      return {};
    },
  },
  methods: {
    enableEditMode() {
      this.editMode = true;
      this.saveMode = false;
      this.nubers = false;
    },
    selectService() {
      this.$router.push({
        name: "SelectService",
        query: { patient_id: this.id },
      });
    },
    saveDoctor() {
      this.saveMode = true;
      this.editMode = false;
      this.nubers = true;
      Patients.putPatients(
        this.patient.id,
        this.firstname,
        this.secondname,
        this.phone,
        this.birth
      ).then(() => {});
    },
  },
};
</script>