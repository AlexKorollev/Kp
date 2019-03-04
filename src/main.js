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
// const app = new Vue({
//   el: '#app',
//   data: {
//     currentRoute: window.location.pathname
//   },
//   computed: {
//     ViewComponent () {
//       const matchingView = routes[this.currentRoute]
//       return matchingView
//         ? require('./pages/' + matchingView + '.vue')
//         : require('./pages/404.vue')
//     }
//   },
//   render (h) {
//     return h(this.ViewComponent)
//   }
// })

// window.addEventListener('popstate', () => {
//   app.currentRoute = window.location.pathname
// })