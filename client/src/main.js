import Vue from "vue";
import App from "./App.vue";

import "./plugins/clipboard.js";
import "./plugins/buefy.js";

import axios from "axios";

axios.defaults.baseURL = "http://localhost:5000";

Vue.config.productionTip = false;

new Vue({
  render: h => h(App)
}).$mount("#app");
