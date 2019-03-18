<template>
  <div class="body">
    <header>
      <div @click="changeMode()" id="logo">
        <img v-if="mode=='light'" src="/src/assets/sunny.png" alt="qwe">
        <img v-else-if="mode=='dark'" src="/src/assets/moon-1.png" alt="qwe">
      </div>
      <!-- <router-link class="" :to="'/'"><img class="logo" src="/src/assets/logo.png" alt="qwe"></router-link> -->
      <Autocomplite class="autocomplite"/>
      <div class="menu"  >
        <button class="btn" v-if="getLogin"><router-link class="profile btn" :to="'/profile'">Profile</router-link></button>
        <button class="btn" @click ="logOut" v-if="getLogin"><router-link class="log-out btn" :to="'/'" >Log out</router-link></button>
        <button class="btn login" @click="openModal" v-if="!getLogin">Login</button>
        <button class="btn" v-if="!getLogin"><router-link class="sign-up btn" :to="'/sign-up'">Sign Up</router-link></button>
      </div>
      <Modal :modalOpened="modalOpened" @close="closeModal" />
    </header>
    <div>
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
import Modal from "./components/Modal"
import Autocomplite from "./components/Autocomplite"
import api from "./helpers/api"
export default { 
  components:{
    Modal,
    Autocomplite
  },
  data () {
    return {
      modalOpened: false,
    }
  },
  computed: {
    getLogin () {
      this.$store.dispatch("loginState")
      return this.$store.state.login;
    },
    getMode () {
      if ((localStorage.getItem('mode') || 'dark') === 'dark'){
        this.$store.commit("establishMode", 'dark')
        // document.querySelector('body').classList.add('dark-body')
        // document.querySelector('header').classList.add('dark-header')
        // document.querySelector('h1').classList.add('dark-title')
        // document.getElementById('logo').classList.add('dark-logo')
        // document.getElementById('single-post').classList.add('dark-single-post')
        
      }
      else{
        this.$store.commit("establishMode", 'light')
        // document.querySelector('body').classList.remove('dark-body');
        // document.querySelector('header').classList.remove('dark-header');
        // document.querySelector('h1').classList.remove('dark-title');
        // document.getElementById('logo').classList.remove('dark-logo')
        // document.getElementById('single-post').classList.remove('dark-single-post')

      }
      
    },
    mode () {
      return this.$store.state.mode;
    }
  },
  methods: {
    openModal () {
      this.modalOpened = true;
    },
    closeModal () {
      this.modalOpened = false;
    },
    logOut () {
      localStorage.removeItem(this.$store.state.STORAGE_KEY);
      this.$store.commit("changeLogin", false);
      this.$store.commit("establishQuery", '?public=true&_page=1&_limit=5&_sort=id&_order=desc')
    },
    changeMode () {
      localStorage.setItem('mode', (localStorage.getItem('mode') || 'dark') === 'dark' ? 'light' : 'dark'); 
      if(localStorage.getItem('mode') === 'dark'){
        this.$store.commit("establishMode", 'dark')
        // document.querySelector('body').classList.add('dark-body')
        // document.querySelector('header').classList.add('dark-header')
        // document.querySelector('h1').classList.add('dark-title')
        // document.getElementById('logo').classList.add('dark-logo')

      } 
      else {
        this.$store.commit("establishMode", 'light')
        // document.querySelector('body').classList.remove('dark-body')
        // document.querySelector('header').classList.remove('dark-header')
        // document.querySelector('h1').classList.remove('dark-title');
        // document.getElementById('logo').classList.remove('dark-logo')

      }
    }
  },
  mounted: function () {
    this.getMode
    if(this.$route.query.login === "false"){
      this.openModal();
      
    }
  },
  created () {
    
  }
}
</script>

<style>
*{padding:0;margin: 0;  font-family:'Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande', 'Lucida Sans', Arial, sans-serif;}
body{
  background: white;
}
.dark-body{
  background: #10171e;
}
header{
  border-bottom: 2px solid #ccc;
  border-bottom: 1px solid rgba(0,0,0,0.25);
  display:grid;
  grid-template-columns: 0.5fr 2fr 1fr;
  grid-gap:1em;
  align-items: center;
  background: #efeeee;
  padding-right: 20px;
  height: 50px;
} 
.dark-header{
  /* background: #10171e; */
  background: #1c2938;
}
#logo{
  width: 50px;
  margin-left:20px;
}
#logo img{
  width: 30px;
  vertical-align: middle;
  text-align: center;
  cursor: pointer;
}
.dark-logo{
  color:white;
}
.menu{
  display:flex;
  justify-content: space-around;
}
.btn{
  background: none;
  border:none;
  /* border-bottom:2px solid #efeeee; */
  outline: none;
  font-size: 20px;
  color:#3498db;
  white-space: nowrap;
}
.btn:hover{
  /* border-bottom: 2px solid #6b6b6b; */
  color:#3498db;
}
.sign-up,.profile,.log-out{
  justify-self: left;
  text-decoration:none;
  color: #6b6b6b;
}
.link{
  text-decoration:none;
  color: #3498db;
}
.link:active{
  color:white;
}

.router-link-exact-active{
  color: #3498db;
}
.submit-post{
  height: 45px;
  border: 2px solid #3498db;
  width:150px;
  justify-items: center;
  border-radius: 24px;
  margin: 5px 0 19px 0;
}
.submit-post:hover{
  border: 2px solid #2ecc71;
  color: #6b6b6b;
}
.submit-post:active{
  border: 2px solid #2ecc71;
  background: #2ecc71;
  color: #fff;
}
.dark-title{
  color: white;
}
@media only screen and (max-width: 950px) {
  .menu button{
    padding: 0 0 0 10px;
  }
  
}
@media only screen and (max-width: 425px){
  header{
    grid-template-columns: 0.2fr 1fr 0.8fr;
  }
  .btn{
    font-size: 15px;
  }
}
@media (prefers-color-scheme: dark) {
  header {
    background: green;
    color: yellow;
  }
}
@media (prefers-color-scheme: light) {
  header {
    background: red;
    color: black;
  }
}
</style>
