<template>
  <div id="body">
    <header>

      <div id="logo">
        <div class="toggle-btn" @click="changeMode()">
          <div class="inner-circle">
            <img v-if="mode=='light'" src="/src/assets/sunny.png" alt="qwe">
            <img v-else-if="mode=='dark'" src="/src/assets/moon-1.png" alt="qwe">
          </div>
        </div>
      </div>
      <div class="menu">
        <button class="btn" v-if="getAdmin" @click="switchMenu()"><router-link class="profile btn" :to="'/admin'">{{ $t('adminPage') }}</router-link></button>
        <button class="btn" v-if="getLogin" @click="switchMenu()"><router-link class="profile btn" :to="'/'">{{ $t('homePage') }}</router-link></button>
        <button class="btn login" @click="openModal" v-if="!getLogin">{{ $t('login') }}</button>
        <button class="btn" v-if="getLogin" @click="logOut()">{{ $t('logOut') }}</button>
        <div class="internacializaton">
          <button  v-for="(entry,index) in languages" :key="entry.title" :class="'btn language-'+(index*1+1)" @click="changeLocale(entry.language)">
            <flag :iso="entry.flag" v-bind:squared="false" />
          </button>
        </div>
      </div>
      <div class="burger" @click="switchMenu()">
        <div class="burger-line1"></div>
        <div class="burger-line2"></div>
        <div class="burger-line3"></div>
      </div>
      <Modal :modalOpened="modalOpened" @modalClose="closeModal" @menuClose="switchMenu()"/>
    </header>
    <div>
      <router-view v-if="getLogin"></router-view>
    </div>
    <a class="back_to_top" title="Наверх"><img width="35" height="35" src="/src/assets/top-arrow-.png" alt="qwe"></a>
  </div>
</template>

<script>
import Modal from "./components/Modal"
import api from "./helpers/api"
import scroll from './helpers/scroll'
import i18n from './plugins/i18n';

export default { 
  components:{
    Modal,
  },
  data () {
    return {
      modalOpened: false,
      languages: [
        { flag: 'us', language: 'en', title: 'English' },
        { flag: 'ru', language: 'ru', title: 'Русский' }
      ],
      menu: false,
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
    printLanguage () {
      if (localStorage.getItem('lang') === 'ru'){
        this.$store.commit("establishLanguage","ru");
        this.addLocaleClass('ru')
        i18n.locale = 'ru';
      }
      else{
        this.$store.commit("establishLanguage","en");
        this.addLocaleClass('en')
        i18n.locale = 'en';
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
      this.adminModalOpened = true;
      scroll.enableScroll();
    },
    logOut () {
      this.$store.commit("changeLogin", false);
      this.$store.commit("changeLoading", true);
      this.$store.commit("establishAdmin", false);
      this.switchMenu();
      localStorage.removeItem(this.$store.state.STORAGE_KEY);
      this.$router.replace('/')
    },
    changeMode (mode) {

      localStorage.setItem('mode', (localStorage.getItem('mode') || 'dark') === 'dark' ? 'light' : 'dark')
      this.$store.commit("establishMode",localStorage.getItem('mode') || 'dark');
      document.querySelector('.toggle-btn').classList.toggle('active')
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
        '--theme-border-bottom': '1px solid rgb(56, 68, 77)',
        '--theme-border-top': '1px solid rgb(56, 68, 77)',
        '--theme-color': '#fff',
        '--theme-posts-border': '2px solid #1C2532',
        '--theme-posts-line': '#232D3D',
        '--theme-profile-border': '2px solid #1C2532',
        '--theme-box-shadow': '0px 3px 16px -3px black',
        '--theme-header-box-shadow': '0px 7px 16px -3px black',
        '--theme-header-background': '#1c2938',
        '--theme-modal-background': 'rgba(10,10,10,0.6)',
        '--theme-like-preview-background': 'rgba(10,10,10,0.95)',
        '--theme-button-color': 'rgb(136, 153, 166)',
        '--theme-profile-edit-header': '#232D3D',
        '--theme-list-background': '#18191A',
        '--theme-toggle-button' : '#3498db',
        '--theme-table-two': '#0f181d',
        '--theme-sort-and-search-box-shadow-right': '4px -4px 5px -1px #0f181d inset',
        '--theme-sort-and-search-box-shadow-left': '-4px -4px 5px -1px #0f181d inset',


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
        '--theme-border-bottom': '1px solid #ccc',
        '--theme-border-top': '1px solid #ccc',
        '--theme-color': '#4e4343',
        '--theme-posts-border': '2px solid #9E9E9E',
        '--theme-posts-line': '#9E9E9E',
        '--theme-profile-border': '2px solid #9E9E9E',
        '--theme-box-shadow': '0px 3px 16px -3px #797979',
        '--theme-header-box-shadow': '0px 7px 16px -3px #797979',
        '--theme-header-background': '#efeeee',
        '--theme-modal-background': 'rgba(10,10,10,0.4)',
        '--theme-like-preview-background': 'rgba(10,10,10,0.9)',
        '--theme-button-color': 'rgb(102, 117, 127)',
        '--theme-profile-edit-header': '#3498db',
        '--theme-list-background': '#A9C7DF',
        '--theme-toggle-button': 'rgb(147, 147, 147)',
        '--theme-table-two': '#d2d2d2',
        '--theme-sort-and-search-box-shadow-right': '4px -4px 5px -6px #0f181d inset',
        '--theme-sort-and-search-box-shadow-left': '-4px -4px 5px -6px #0f181d inset',

      }
      for(let k in lightTheme) {
        rootElement.style.setProperty(k, lightTheme[k])
      }
    },

    switchMenu () {
      
      this.menu = !this.menu;
      if(this.menu){
        document.addEventListener('click', this.handleClickOutside);
        let menu = document.querySelector('.menu').classList.add('menu-active')
        let burger = document.querySelector('.burger').classList.add('burger-toggle')
      }
      else{
        let menu = document.querySelector('.menu').classList.remove('menu-active')
        let burger = document.querySelector('.burger').classList.remove('burger-toggle')
        document.removeEventListener('click', this.handleClickOutside);
      }
    },
    changeLocale(locale) {
      // console.log(locale)
      localStorage.setItem('lang', locale || 'ru')
      this.$store.commit("establishLanguage",localStorage.getItem('lang') || 'ru');
      this.addLocaleClass(locale);
      // console.log(this.$el)
      this.switchMenu();
      i18n.locale = locale;
    },
    addLocaleClass(locale){
      if(locale == 'en'){
        document.querySelector('.language-1').classList.add('language-active')
        document.querySelector('.language-2').classList.remove('language-active')
      }
      else{
        document.querySelector('.language-1').classList.remove('language-active')
        document.querySelector('.language-2').classList.add('language-active')
      }
    },
    handleClickOutside(evt) {
      let header = document.querySelector("header");
      if (!header.contains(evt.target)) {
        this.switchMenu();
      }
    }
  },
  mounted () {
    this.printMode;
    this.printLanguage;
    scroll.scrollButton();
    if(this.$route.query.login === "false"){
      this.openModal();
    }
  },
}
</script>

<style>
@import url('https://fonts.googleapis.com/css?family=Work+Sans:400');
*{padding:0;margin: 0; font-family: 'Work Sans', sans-serif;}
::-webkit-scrollbar {
   width: 12px;
   border-left: var(--theme-border-bottom);
   transition: 0.25s;
   
}

::-webkit-scrollbar-track  {
   box-shadow: var(--theme-box-shadow) ;
   transition: 0.25s;
   
}

::-webkit-scrollbar-thumb  {
    background: var(--header);
    border: var(--theme-border-bottom);
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
  grid-template-columns: 0.3fr 2fr;
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
.title{
  background: var(--theme-profile-edit-header);
  width:100%;
  padding: 20px 0;
  text-align:center;
  font-size: 30px;
  /* text-transform: uppercase; */
  font-weight: 700;
  color: #fff;
  
}
#logo{
  width: 50px;
}
#logo img{
  width: 30px;
  vertical-align: middle;
  text-align: center;
  cursor: pointer;
}
.toggle-btn{
  width: 60px;
  height: 30px;
  background: var(--theme-toggle-button);
  border-radius: 30px;
  padding: 2px;
  transition: all 300ms ease-in-out;
  margin-left: 10px;
}
.toggle-btn > .inner-circle {
  width: 30px;
  height: 30px;
  background: none;
  border-radius: 50%;
  transition: all 300ms ease-in-out;
}

.toggle-btn.active >.inner-circle {
  margin-left: 30px;
}
.inner-circle img{
  transition: all 300ms ease-in-out;
}
.menu{
  display:flex;
  justify-content: flex-end;
  align-items: center;
  height: 40px;
  padding-left: 10px;
}
.menu button{
  padding:0 10px;
}
.btn{
  background: none;
  border:none;
  outline: none;
  font-size: 20px;
  white-space: nowrap;
  color:var(--theme-button-color);
  cursor: pointer;
  
}
.btn:hover{
  color:#3498db;
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
  padding: 12px 0;
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
.internacializaton{
  display: grid;
  grid-template-columns: 1fr 1fr;
  /* justify-items: center; */
  /* padding: 0px 5px; */
  margin-left: 5px;
  width:70px;
  height: 30px;
  background: rgb(147, 147, 147);
  border-radius: 30px;
  /* padding: 2px; */
  transition: all 300ms ease-in-out;
}
.internacializaton .language-1{
  /* background: #ccc; */
  border-top-left-radius: 50%;
  border-bottom-left-radius: 50%;
  padding: 0;
}
.internacializaton .language-2{
  /* background: #ccc; */
  border-top-right-radius: 50%;
  border-bottom-right-radius: 50%;
  padding: 0;
  /* justify-self: left; */
  /* padding-right: 10px; */
}
.language-active{
  background: #3498db;
}
.flag-icon{
  width: 17px;
}
.sign-up,.profile,.log-out{
  justify-self: left;
  text-decoration:none;
}

.back_to_top {
  position: fixed;
  bottom: 80px;
  right: 40px;
  z-index: 1000;
  width: 50px;
  height: 50px;
  text-align: center;
  vertical-align: middle;
  background: #3498db;
  color: #444;
  cursor: pointer;
  border-radius: 50%;
  box-shadow: var(--theme-box-shadow);
  display: none;
  transition: 0.25s;
}
.back_to_top img{
  padding-top: 6px;
}
.back_to_top-show {
  display: block;
}
.password{
  position: relative;
}
.show-password{
  position: absolute;
  right: -40px;
  top: 15px;
}
.cp{
  cursor: pointer;
}
.bold{
  font-weight: 700;
}
.center{
  text-align: center;
}
.required{
  position: relative;
}
.show-required{
  position: absolute;
  left: 0px;
  top: 8px;
}
@media only screen and (max-width: 950px) {
  .menu button{
    padding: 0 0 0 10px;
  }
  header{
    grid-template-columns: 2.5fr 10fr;
  }
}
@media only screen and (max-width: 768px) {
  header{
    grid-template-columns: 2fr 10fr;
  }
  
}
@media only screen and (max-width: 650px){
  .back_to_top-show {
    display: none;
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
    grid-gap:2em;
    box-shadow: var(--theme-header-box-shadow);
    padding: 20px 0;
    z-index:50;
  }
  .menu button{
    padding: 0;
  }
}
@media only screen and (max-width: 425px){
  header{
    grid-template-columns: 2fr 5fr;
  }
  .btn{
    font-size: 20px;
  }
  .menu-active{
    width: 100%;
  }
  
}

</style>
