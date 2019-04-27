import Vue from 'vue'
import axios from 'axios';
import Vuex from 'vuex';
import VueRouter from 'vue-router'
import FlagIcon from 'vue-flag-icon';
import App from './App.vue'
import router from './routes'
import store from './store';
import "materialize-css"
import "materialize-css/dist/css/materialize.min.css"

Vue.config.productionTip = false;
Vue.use(FlagIcon);
Vue.use(axios);
Vue.use(VueRouter);
Vue.use(Vuex);

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
