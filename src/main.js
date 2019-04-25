import Vue from 'vue'
import Vuelidate from 'vuelidate'
import axios from 'axios';
import Vuex from 'vuex';
import VueRouter from 'vue-router'
import FlagIcon from 'vue-flag-icon';
import i18n from './plugins/i18n';
import App from './App.vue'
import router from './routes'
import store from './store';

Vue.config.productionTip = false;
Vue.use(FlagIcon);
Vue.use(Vuelidate);
Vue.use(axios);
Vue.use(VueRouter);
Vue.use(Vuex);

new Vue({
  el: '#app',
  router,
  store,
  i18n,
  render: h => h(App)
})
