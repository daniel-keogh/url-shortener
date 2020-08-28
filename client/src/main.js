import Vue from "vue";
import App from "./App.vue";

import Buefy from "buefy";
import "buefy/dist/buefy.css";

import VueClipboard from "vue-clipboard2";

import axios from "axios";

axios.defaults.baseURL = "http://localhost:5000";

Vue.use(Buefy);
Vue.use(VueClipboard);

Vue.config.productionTip = false;

new Vue({
  render: h => h(App)
}).$mount("#app");
