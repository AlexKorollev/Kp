import VueRouter from 'vue-router'
import Home from './pages/Home'
import LogIn from './pages/LogIn'
import Admin from './pages/Admin'
import SignUp from './pages/SignUp'
import Registration from './pages/Registration'
import ListOfRecords from './pages/ListOfRecords'
import ListOfCalls from './pages/ListOfCalls'
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
    },
    {
      path: '/login', 
      component: LogIn,
    },
    {
      path: '/sign-up', 
      component: SignUp
    },
    {
      path: '/registration', 
      component: Registration,
    },
    {
      path: '/list-of-records', 
      component: ListOfRecords,
    },
    {
      path: '/list-of-calls', 
      component: ListOfCalls,
    }
  ],
  mode: 'history'
})