import Vue from 'vue'
import Vuelidate from 'vuelidate'
import axios from 'axios';
import Vuex from 'vuex';
import App from './App.vue'
import VueRouter from 'vue-router'
import router from './routes'
import store from './store';

Vue.use(Vuelidate);
Vue.use(axios);
Vue.use(VueRouter);
Vue.use(Vuex);
new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})