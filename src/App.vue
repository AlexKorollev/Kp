<template>
  <div id="body">
    
  <ul id="slide-out" class="sidenav">
      <li v-if="getAdmin">
        <router-link :to="'/admin'">Админка</router-link>
      </li>
      <li v-if="getAdmin">
        <router-link :to="'/list-of-calls'">Кому нужно перезвонить</router-link>
      </li>
      <li v-if="(getLogin && !getAdmin)">
        <router-link  :to="'/'">Главная страница</router-link>
      </li>
      <li v-if="!getLogin">
        <router-link  :to="'/sign-up'">Зарегестрироваться</router-link>
      </li>
      <li v-if="!getLogin">
        <router-link  :to="'/login'">Войти в аккаунт</router-link>
      </li>
      <li v-if="(getLogin && !getAdmin)">
        <router-link  :to="'/registration'">Записаться</router-link>
      </li>
      <li v-if="(getLogin && !getAdmin)">
        <router-link  :to="'/list-of-records'">Мои записи</router-link>
      </li>
      <li v-if="getLogin" @click="logOut()">
        <router-link  :to="'/'">Выйти</router-link>
      </li>
    </ul>
    
    <a href="#" data-target="slide-out" class="sidenav-trigger"><i class="material-icons nav-icon">menu</i></a>
    
    <router-view></router-view>

  </div>
</template>

<script>

export default { 
  data () {
    return {
      sideNavInstance: null,
    }
  },
  computed: {
    getLogin () {
      this.$store.dispatch("loginState")
      return this.$store.state.login;
    },
    getAdmin () {
      return this.$store.state.admin
    },
    
  },
  methods: {
    
    logOut () {
      this.$store.commit("changeLogin", false);
      this.$store.commit("changeLoading", true);
      this.$store.commit("establishAdmin", false);
      localStorage.removeItem(this.$store.state.STORAGE_KEY);
      this.$router.replace('/login')
    },
  },
  mounted () {
    M.Sidenav.init(document.querySelectorAll('.sidenav'));
    this.sideNavInstance = M.Sidenav.init(document.querySelectorAll('.sidenav'));
  },
}
</script>

<style>
@import url('https://fonts.googleapis.com/css?family=Work+Sans:400');

*{padding:0;margin: 0; font-family: 'Work Sans', sans-serif;}

.nav-icon{
  font-size: 70px;
  padding: 10px;
  color: #000;
}
.cp{
  cursor: pointer;
}
.title{
  color: black;
  text-align: center;
}
.error{
  font-size: 20px;
  background: #ff5722;
  color: #fff;
}
</style>
