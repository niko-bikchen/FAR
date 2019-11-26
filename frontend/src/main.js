import Vue from "vue";
import App from "./App.vue";
import axios from "axios";
import router from "./router";
import store from "./store";
import vuetify from "./plugins/vuetify";
import "@babel/polyfill";
import "roboto-fontface/css/roboto/roboto-fontface.css";
import "@mdi/font/css/materialdesignicons.css";

axios.defaults.baseURL =
  "https://3e08d6c3-afce-4714-88eb-adb4e86b07ae.mock.pstmn.io/";

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount("#app");
