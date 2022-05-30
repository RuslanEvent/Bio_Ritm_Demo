import { createApp } from "vue";
import { Slide } from 'vue3-burger-menu';
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "@/assets/css/style.css";
import "@/assets/js/js.js";
import VueCollapsiblePanel from '@dafcoe/vue-collapsible-panel'
import Datepicker from '@vuepic/vue-datepicker';
import '@vuepic/vue-datepicker/dist/main.css';

createApp(App)
    .use(store)
    .use(Slide)
    .use(router)
    .use(VueCollapsiblePanel)
    .component('Datepicker', Datepicker)
    .mount("#app");

