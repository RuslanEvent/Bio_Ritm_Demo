<template>
  <div class="admin_filter">
    <div
      class="admin_today"
      :class="{ active: status == 'pending' }"
      @click="changeStatus('pending')"
    >
      В ожидании
    </div>
    <div
      class="admin_today"
      :class="{ active: status == 'progress' }"
      @click="changeStatus('progress')"
    >
      В процессе
    </div>
    <div
      class="admin_yestarday"
      :class="{ active: status == 'finished' }"
      @click="changeStatus('finished')"
    >
      Завершено
    </div>
    <div @click="downloadResults">Скачать результаты</div>
  </div>
  <div class="client_table">
    <table>
      <tr>
        <th v-if="$store.getters.currentRole == 'admin'">Код</th>
        <th>ФИО</th>
        <th>Операция</th>
        <th>Сумма</th>
        <th>Анализы</th>
        <th>Статус</th>
      </tr>
      <tr
        v-for="order in orders.data"
        :key="order.id"
        @click.prevent="linkTo(order.id)"
      >
        <td v-if="$store.getters.currentRole == 'admin'">
          <!-- <router-link :to="{ name: 'Analis', params: { id: order.id } }">{{
            order.doctor_id
          }}</router-link> -->
          {{ order.doctor_id }}
        </td>
        <td>
          {{ order.patient_id.firstname }} {{ order.patient_id.secondname }}
        </td>
        <td v-if="$store.getters.currentRole == 'admin'">{{ order.id }}</td>
        <td v-else>{{ order.patient_id.p_id }}</td>
        <td>{{ order.cost }}</td>
        <td>
          <div v-if="order.services.length > 2" class="scroll">
            <span
              v-for="service in order.services"
              :key="service.id"
              v-html="
                service.name.length >= 20
                  ? service.name.substring(0, 20) + '... '
                  : service.name
              "
            ></span>
          </div>
          <div
            v-else
            style="
              overflow-y: auto;
              height: 75px;
              display: flex;
              flex-direction: column;
              justify-content: safe center;
            "
          >
            <span
              v-for="service in order.services"
              :key="service.id"
              v-html="
                service.name.length >= 20
                  ? service.name.substring(0, 20) + '... '
                  : service.name
              "
            ></span>
          </div>
        </td>
        <td v-if="order.status == 'pending'">В ожидании</td>
        <td v-else-if="order.status == 'progress'">В процессе</td>
        <td v-else-if="order.status == 'finished'">Завершен</td>
      </tr>
    </table>
  </div>
  <div
    class="client_card"
    v-for="order in orders.data"
    :key="order.id"
    @click.prevent="linkTo(order.id)"
  >
    <div class="card_simbols">
      <div class="card_simbol">
        <div class="card_name">
          <div class="card_slot bold">Код</div>
          <div class="card_slot">{{ order.doctor_id }}</div>
        </div>
        <div class="card_name">
          <div class="card_slot bold">Операция</div>
          <div class="card_slot" v-if="$store.getters.currentRole == 'admin'">{{ order.id }}</div>
          <div class="card_slot" v-else>{{ order.patient_id.p_id }}</div>
          
        </div>
        <div class="card_name bold">
          <div class="card_slot">Сумма</div>
          <div class="card_slot">{{ order.cost }}</div>
        </div>
      </div>
      <div class="card_simbol analz">
        <div class="card_name">
          <div class="card_slot bold">Анализы</div>
          <div class="card_slot widt" v-if="order.services.length < 30">
            <span
              v-for="service in order.services"
              :key="service.id"
              v-html="
                service.name.length >= 2
                  ? service.name.substring(0, 5) + '... '
                  : service.name  
              "
            >
            </span>
          </div>
        </div>
      </div>
      <div class="card_simbol">
        <div class="card_name">
          <div class="card_slot bold">ФИО</div>
          <div class="card_slot">
            {{ order.patient_id.firstname }} {{ order.patient_id.secondname }}
          </div>
        </div>
        <div class="card_name">
          <div class="card_slot bold">Статус</div>
          <div class="card_slot" style="color:red" v-if="order.status == 'pending'">
            В ожидании
          </div>
          <div class="card_slot" style="color:orange" v-else-if="order.status == 'progress'">
            В процессе
          </div>
          <div class="card_slot" style="color:green" v-else-if="order.status == 'finished'">
            Завершен
          </div>
        </div>
      </div>
    </div>
  </div>
  <v-pagination
    v-if="total_pages > 1"
    v-model="page"
    :pages="total_pages"
    :range-size="1"
    active-color="#DCEDFF"
    @update:modelValue="updateHandler"
  />
</template>
<style scoped>
</style>
<script>
import OrdersService from "@/server/OrdersService.js";
import VPagination from "@hennge/vue3-pagination";
import { mapGetters } from "vuex";
import "@hennge/vue3-pagination/dist/vue3-pagination.css";
export default {
  name: "Process",
  data() {
    return {
      status: "",
      page: 1,
      total_pages: 0,
    };
  },
  components: {
    VPagination,
  },
  methods: {
    updateHandler() {
      OrdersService.getOrders(this.status, this.page)
        .then((response) => {
          this.$store.commit("setOrders", response.data);
          this.total_pages = response.data.total_pages;
        })
        .catch((error) => {
          console.log(error);
        });
    },
    changeStatus(status) {
      this.status = status;
      OrdersService.getOrders(status)
        .then((response) => {
          this.$store.commit("setOrders", response.data); //STEP 6
          console.log(response.data);
        })
        .catch((error) => {
          console.log(error);
        });
    },
    linkTo(id) {
      this.$router.push({ name: "Analis", params: { id: id } });
    },
    downloadResults() {
      OrdersService.downloadAllResults()
        .then((response) => {
          const blob = new Blob([response.data], { type: "application/pdf" });
          const link = document.createElement("a");
          link.href = URL.createObjectURL(blob);
          link.download = Date.now();
          link.target = "_blank";
          link.click();
          URL.revokeObjectURL(link.href);
        })
        .catch((error) => console.log(error));
    },
  },
  computed: {
    ...mapGetters({
      orders: "orders", // STEP 5
    }),
  },
  created() {
    OrdersService.getOrders(this.status)
      .then((response) => {
        this.$store.commit("setOrders", response.data); //STEP 7
        this.total_pages = response.data.total_pages;
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  },
};
</script>