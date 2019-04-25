import VueRouter from 'vue-router'
import Home from './pages/Home'
import Admin from './pages/Admin'
import SignUp from './pages/SignUp'
import ListOfClients from './pages/ListOfClients'
import ListOfTaxes from './pages/ListOfTaxes'
import Providers from './pages/Providers'
import ProvidersList from './pages/ProvidersList'
import Test from './pages/Test'
import store from './store'

export default new VueRouter({
  routes:[
    {
      path: '', 
      name: 'home',
      component: Home
    },
    {
      path: '/admin',
      component: Admin,
      beforeEnter (to, from, next) {
      store.dispatch('loginState')
      console.log('route adm',store.state.admin)
        if(store.state.admin === true) {
          next(true);
        }
        else {
          next('/?login=false');
        }
      },
    },
    {
      path: '/sign-up', 
      component: SignUp
    },
    {
      path: '/list-of-clients',
      component: ListOfClients
    },
    {
      path: '/list-of-taxes',
      component: ListOfTaxes
    },
    {
      path: '/providers',
      component: Providers
    },
    {
      path: '/providers-list',
      component: ProvidersList
    },
  ],
  mode: 'history'
})