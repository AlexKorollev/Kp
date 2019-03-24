import VueRouter from 'vue-router'
import Home from './pages/Home'
import SignUp from './pages/SignUp'
import Test from './pages/Test'
import Profile from './pages/Profile'
import User from './pages/User'
import ProfileEdit from './pages/ProfileEdit'
import store from './store'

export default new VueRouter({
  routes:[
    {
      path: '', 
      name: 'home',
      component: Home
    },
    {
      path: '/sign-up', 
      component: SignUp
    },
    {
      path: '/test',
      component: Test
    },
    {
      path: '/profile',
      component: Profile,
      beforeEnter (to, from, next) {
        store.dispatch('loginState')
        if(store.state.login) {
          next(true);
        }
        else {
          next('/?login=false');
        }
      },
    },
    {
      path: '/edit',
      component: ProfileEdit,
      beforeEnter (to, from, next) {
        store.dispatch('loginState')
        if(store.state.login) {
          next(true);
        }
        else {
          next('/?login=false');
        }
      },
    },
    {
      path: '/user/:id',
      component: User,
      beforeEnter (to, from, next) {
        store.dispatch('loginState')
        if(store.state.login) {
          next(true);
        }
        else {
          next('/?login=false');
        }
      },
    }
  ],
  mode: 'history'
})