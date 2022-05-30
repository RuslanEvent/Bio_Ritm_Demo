<template>
  <div class="analistic_page">
    <div class="analistic_page_left">
      <span>Гонорар</span>
      <div class="datepiker">
        <Datepicker v-model="date" range></Datepicker>
      </div>
      <div class="down_gon">
      <button class="analistic_button" @click="downloadExcel">
        Скачать гонорар
      </button>
      </div>
    </div>
    <div class="analistic_page_right">
      <span>Все скачанные гонорары</span>
      <div class="list_gonarar" v-for="file in files" :key="file">
        <div class="check_gonarar">
          <div class="name_gonarar">
            <pre> {{ file.split("/")[3] }}</pre>
          </div>
          <div class="line_gonorar"><hr class="hrr" /></div>
          <div class="icons_gonorar">
            <a
              :href="'http://rm.bioritm.org/api/' + file"
              class="download_gonarar"
            >
              <img class="img_gonorar" src="../assets/image/import.png" />
            </a>
            <div class="delete_gonarar" @click="deleteFile(file.split('/')[3])">
              <img class="img_gonorar" src="../assets/image/trash.png" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div class="dnos">
    <div class="storage" v-if="storage != null">
      <div>
        Место на диске : <span>{{ storage.total }} Мб</span>
      </div>
      <div>
        Использовано: <span class="red"> {{ storage.used }} Мб</span>
      </div>
      <div>
        Свободно: <span class="green">{{ storage.free }} Мб</span>
      </div>
      <div class="storage ge">
        <div>Время: {{ order.time }}</div>
        <div>Количество ордеров: {{ order.items }}</div>
        <div>Общая прибыль: {{ order.cost }}</div>
      </div>
    </div>
    <div class="zips">
      <div>
        <button class="download_zip" @click="downloadZip">
          Скачать файлы c сервера
        </button>
      </div>
      <div>
        <button class="download_zip" @click="deleteZip">
          Удалить файлы c сервера
        </button>
      </div>
    </div>
  </div>
</template>
<style scoped>
.ge {
  display: flex;
  flex-direction: column;
}
</style>
<script>
import AnalyticsService from "../server/AnalyticsService.js";
export default {
  data() {
    return {
      date: null,
      props: {
        storage: Object,
      },
      files: [],
      storage: null,
      order: [],
    };
  },
  methods: {
    // downloadExcel() {
    //   let start = this.date[0].toISOString();
    //   let end = this.date[1].toISOString();
    //   AnalyticsService.downloadExcel(start, end).then((response) => {
    //     const blob = new Blob([response.data.file], {
    //       type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    //     });
    //     const link = document.createElement("a");
    //     link.href = URL.createObjectURL(blob);
    //     link.download = "download";
    //     link.target = "_blank";
    //     link.click();
    //     URL.revokeObjectURL(link.href);
    //   });
    // },
    downloadExcel() {
      let start = this.date[0].toISOString();
      let end = this.date[1].toISOString();
      AnalyticsService.downloadExcel(start, end).then((response) => {
        const link = document.createElement("a");
        link.href = "http://rm.bioritm.org/api" + response.data.file;
        link.download = "download";
        link.target = "_blank";
        link.click();
        URL.revokeObjectURL(link.href);
      });
    },
    deleteFile(file) {
      AnalyticsService.deleteFile(file).then(() => {
        AnalyticsService.getName()
          .then((response) => {
            this.storage = response.data.storage;
            this.files = response.data.files;
          })
          .catch((error) => {
            console.log(error);
          });
      });
    },
    downloadZip() {
      AnalyticsService.downloadZip().then((response) => {
        const link = document.createElement("a");
        link.href = "http://rm.bioritm.org" + response.data.data;
        link.download = "download";
        link.target = "_blank";
        link.click();
        URL.revokeObjectURL(link.href);
      });
    },

    deleteZip() {
      let deleteZips = prompt(`Вы действительно ходите удалить?
Для подтверждения напишите слово - Удалить 
И не забудьте обновить страницу ☺`);
      if (deleteZips == "Удалить") {
        AnalyticsService.deleteZip().then();
        alert("Файлы удалены");
      } else {
        alert("Действие отменено");
      }
    },
  },

  created() {
    AnalyticsService.getName()
      .then((response) => {
        this.storage = response.data.storage;
        this.files = response.data.files;
        this.order = response.data.order.reverse()[0];
      })
      .catch((error) => {
        console.log(error);
      });
  },
};
</script>