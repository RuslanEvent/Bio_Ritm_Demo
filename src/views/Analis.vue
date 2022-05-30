<template>
  <div class="admin_page">
    <div class="container">
      <UserNavbar />
      <div id="admin_navigation">
        <!-- <ClientsNavigation /> -->
      </div>
    </div>
  </div>
  <div class="container">
    <div class="class_gray">
      <div>
        <div class="temp">
          <div class="tablo" v-if="results.patient_id != null">
            {{ results.patient_id.firstname }}
            {{ results.patient_id.secondname }}
          </div>
          <div class="three_b">
            <button class="custom_button category" @click="back">Назад</button>
            <button class="custom_button category" @click="saveResults">
              Сохранить
            </button>
            <button
              class="custom_button category"
              @click="downloadResults"
              :disabled="downloadDisbled"
            >
              Скачать
            </button>
          </div>
        </div>
      </div>
      <div
        class="order_results"
        v-for="result in results.results"
        :key="result.service_id.id"
      >
        <table class="tablos">
          <tr>
            <th></th>
            <th>
              <h3>{{ result.service_id.name }}</h3>
            </th>
            <th></th>
          </tr>
        </table>
        <div class="s">
          <table class="tablos">
            <tr>
              <th>Название</th>
              <th>Норма</th>
              <th class="centerr">Результат</th>
            </tr>
          </table>
        </div>
        <div class="order_table_results">
          <table class="tablos">
            <tr v-for="paramResult in result.result" :key="paramResult.id">
              <td>{{ paramResult.param_id.name }}</td>
              <td>
                <pre>{{ paramResult.param_id.norm }}</pre>
              </td>
              <td class="centerr">
                <input
                  class="results_params"
                  placeholder="результат"
                  type="text"
                  v-model="paramResult.res"
                  v-text="resilt"
                />
              </td>
            </tr>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>
<style scoped>
.tablos {
  width: 100%;
  max-width: 1200px;
  margin: auto;
}
.order_results {
  text-align: left;
}
.order_table_results {
  background: #d9f2ff;
}
.tablos th {
  width: 33.33%;
  font-weight: bold;
}
h3 {
  font-weight: bold;
}
.centerr {
  text-align: center;
}
</style>
<script>
// import ClientsNavigation from "@/components/ClientsNavigation.vue";

import UserNavbar from "@/components/UserNavbar.vue";
import OrdersService from "@/server/OrdersService.js";
export default {
  name: "Analis",
  components: {
    // ClientsNavigation,
    UserNavbar,
  },
  data() {
    return {
      results: {},
      isActive: true,
      resilt: "",
    };
  },
  computed: {
    downloadDisbled() {
      return this.results.result_file == null;
    },
  },
  methods: {
    back() {
      this.$router.push({ name: "Process" });
    },
    saveResults() {
      console.log(this.results.results);
      let data = this.results.results.map((result) => {
        let data = result.result.map((el) => {
          return {
            id: el.id,
            res: el.res,
          };
        });
        return data;
      });
      data = [].concat.apply([], data);
      OrdersService.putResults(this.$route.params.id, data).then(
          (response) => {
            // console.log(response.data);
            this.results = response.data[0]; // TODO: костыль
            // console.log(this.results);
          }
        );
    },
    downloadResults() {
      OrdersService.downloadResults(this.results.result_file)
        .then((response) => {
          const blob = new Blob([response.data], { type: "application/pdf" });
          const link = document.createElement("a");
          link.href = URL.createObjectURL(blob);
          link.download = this.results.result_file.split(["/"]).reverse()[0];

          link.target = "_blank";
          link.click();
          URL.revokeObjectURL(link.href);
        })
        .catch((error) => console.log(error));
    },
  },
  created() {
    OrdersService.getResults(this.$route.params.id).then((response) => {
      this.results = response.data;
    });
  },
};
</script>