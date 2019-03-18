<template>
  <div class="body">
    <header>
      <div @click="changeMode()" id="logo">
        <img v-if="mode=='light'" src="/src/assets/sunny.png" alt="qwe">
        <img v-else-if="mode=='dark'" src="/src/assets/moon-1.png" alt="qwe">
      </div>
      <!-- <router-link class="" :to="'/'"><img class="logo" src="/src/assets/logo.png" alt="qwe"></router-link> -->
      <Autocomplite class="autocomplite"/>
      <div class="menu" v-if="getLogin">
        <button class="btn"  @click="switchMenu()" ><router-link class="profile btn" :to="'/'">Home</router-link></button>
        <button class="btn" @click="switchMenu()" ><router-link class="profile btn" :to="'/profile'">Profile</router-link></button>
        <button class="btn" @click ="logOut">Log Out</button>
      </div>
      <div class="menu" v-else>
        <button class="btn"><router-link class="profile btn" :to="'/'">Home</router-link></button>
        <button class="btn login" @click="openModal">Login</button>
        <button class="btn"><router-link class="sign-up btn" :to="'/sign-up'">Sign Up</router-link></button>
      </div>
      <div class="burger" @click="switchMenu()">
        <div class="burger-line1"></div>
        <div class="burger-line2"></div>
        <div class="burger-line3"></div>
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
import scroll from './helpers/scroll'
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
    printMode () {
      if (localStorage.getItem('mode') === 'dark'){
        this.$store.commit("establishMode","dark");
        this.activateDarkMode();
      }
      else{
        this.$store.commit("establishMode","light");
        this.activateLightMode();
      }
      
    },
    mode () {
      return this.$store.state.mode;
    },
    
  },
  methods: {
    openModal () {
      this.modalOpened = true;
      scroll.disableScroll();
    },
    closeModal () {
      this.modalOpened = false;
      scroll.enableScroll();
    },
    logOut () {
      localStorage.removeItem(this.$store.state.STORAGE_KEY);
      this.$store.commit("changeLogin", false);
      this.$store.commit("establishQuery", '?public=true&_page=1&_limit=5&_sort=id&_order=desc')
      this.$router.replace('/')
    },
    changeMode (mode) {

      localStorage.setItem('mode', (localStorage.getItem('mode') || 'dark') === 'dark' ? 'light' : 'dark')
      this.$store.commit("establishMode",localStorage.getItem('mode') || 'dark');
      if(this.mode === 'dark'){
        this.activateDarkMode()
      } 
      else {
        this.activateLightMode()
      }
    },

    activateDarkMode() {
      const rootElement = document.documentElement;
      const darkTheme = {
        '--body': '#10171e',
        '--header': '#1c2938',
        '--theme-background': 'rgb(21, 32, 43)',
        '--theme-border-bottom': '2px solid rgb(56, 68, 77)',
        '--theme-border-top': '2px solid rgb(56, 68, 77)',
        '--theme-color': '#fff',
        '--theme-posts-border': '1px solid #1C2532',
        '--theme-profile-border': '2px solid #1C2532',
        '--theme-box-shadow': '0px 3px 16px -3px black',
        '--theme-header-box-shadow': '0px 7px 16px -3px black',
        '--theme-header-background': '#1c2938',
        '--theme-modal-background': 'rgba(10,10,10,0.8)'
      }
      for(let k in darkTheme) {
        rootElement.style.setProperty(k, darkTheme[k])
      }
    },
    activateLightMode() {
      const rootElement = document.documentElement;
      const lightTheme = {
        '--body': '#fff',
        '--header': '#efeeee',
        '--theme-background': '#efeeee',
        '--theme-border-bottom': '2px solid #ccc',
        '--theme-border-top': '2px solid #ccc',
        '--theme-color': '#4e4343',
        '--theme-posts-border': '1px solid #9E9E9E',
        '--theme-profile-border': '2px solid #9E9E9E',
        '--theme-box-shadow': '0px 3px 16px -3px #797979',
        '--theme-header-box-shadow': '0px 7px 16px -3px #797979',
        '--theme-header-background': '#efeeee',
        '--theme-modal-background': 'rgba(10,10,10,0.4)'
      }
      for(let k in lightTheme) {
        rootElement.style.setProperty(k, lightTheme[k])
      }
    },

    switchMenu () {
      let menu = document.querySelector('.menu').classList.toggle('menu-active')
      let burger = document.querySelector('.burger').classList.toggle('burger-toggle')
     
    },
    
  },
  mounted () {
    this.printMode;
    if(this.$route.query.login === "false"){
      this.openModal();
      
    }
  },
}
</script>

<style>
*{padding:0;margin: 0;  font-family:'Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande', 'Lucida Sans', Arial, sans-serif;}
::-webkit-scrollbar {
   width: 12px;
   border-left: var(--theme-border-bottom);
   transition: 0.25s;
   
}

::-webkit-scrollbar-track  {
   -webkit-box-shadow: var(--theme-box-shadow) ;
   transition: 0.25s;
   
}

::-webkit-scrollbar-thumb  {
    background: var(--header);
    border: var(--theme-posts-border);
    transition: 0.25s;
 }
.scroll{
  overflow-y:scroll;
}

body{
  background: var(--body);
  transition: 0.25s;
}
header{
  border-bottom: 1px solid rgba(0,0,0,0.25);
  display:grid;
  grid-template-columns: 0.5fr 2fr 1fr;
  grid-gap:1em;
  align-items: center;
  background: var(--header);
  padding-right: 10px;
  height: 50px;
  transition: 0.25s;
}
.burger{
  display: none;
  justify-self: right;
  cursor: pointer;
}
.burger div{
  width:25px;
  height: 3px;
  margin: 5px;
  background: var(--theme-color);
  transition: all 0.3s ease;
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
.menu{
  display:flex;
  justify-content: space-around;
  align-items: flex-start;
}
.btn{
  background: none;
  border:none;
  outline: none;
  font-size: 20px;
  white-space: nowrap;
  color:#6b6b6b;
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

@media only screen and (max-width: 950px) {
  .menu button{
    padding: 0 0 0 10px;
  }
  
}
@media only screen and (max-width: 768px) {
  header{
    grid-template-columns: 1fr 10fr 1fr;
  }
  .menu{
   display: none;
  }
  .burger{
    display:block;
  }
  .burger-toggle .burger-line1{
    top: 0;
    transform: rotate(-45deg) translate(-5px,6px);
  }
  .burger-toggle .burger-line2{
    opacity: 0;
  }
  .burger-toggle .burger-line3{
    transform: rotate(45deg) translate(-5px,-6px);
  }
  .menu-active{
    position: absolute;
    right: 0;
    top: 50px;
    display: grid;
    height: auto;
    width: 50%;
    background: var(--theme-header-background);
    grid-template-columns: 1fr;
    justify-items: center;
    grid-gap:1em;
    box-shadow: var(--theme-header-box-shadow);
    padding: 10px 0;
    
  }
}
@media only screen and (max-width: 425px){
  
  .btn{
    font-size: 15px;
  }
  .menu-active{
    width: 100%;
  }
}

</style>
