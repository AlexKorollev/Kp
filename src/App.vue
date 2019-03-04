<template>
<div>
  <header>
    <router-link class="" :to="'/'"><img class="logo" src="/src/assets/logo.png" alt="qwe"></router-link>
    <Autocomplite class="autocomplite"/>
    <div class="menu"  @click="closeAutocomplite()">
      <button class="btn" v-if="getLogin"><router-link class="profile btn" :to="'/profile'">Profile</router-link></button>
      <button class="btn" @click ="logOut" v-if="getLogin"><router-link class="log-out btn" :to="'/'" >Log out</router-link></button>
      <button class="btn login" @click="openModal" v-if="!getLogin">Login</button>
      <button class="btn" v-if="!getLogin"><router-link class="sign-up btn" :to="'/sign-up'">Sign Up</router-link></button>
    </div>
    <Modal :modalOpened="modalOpened" @close="closeModal" />
  </header>
  <div @click="closeAutocomplite()">
    <router-view></router-view>
  </div>
</div>
</template>

<script>
import Modal from "./components/Modal"
import Autocomplite from "./components/Autocomplite"
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
    }
  },
  methods: {
    openModal () {
      this.modalOpened = true;
    },
    closeModal () {
      this.modalOpened = false;
    },
    closeAutocomplite () {
      this.$store.commit("changeAutocomplite", false);
    },
    logOut () {
      localStorage.removeItem(this.$store.state.STORAGE_KEY);
      this.$store.commit("changeLogin", false);
    }
  },
  mounted: function () {
    console.log(this.$route.query.login)
    if(this.$route.query.login === "false"){
      this.openModal();
    }
  }
}
</script>

<style>
*{padding:0;margin: 0;  font-family:'Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande', 'Lucida Sans', Arial, sans-serif;}
header{
  border-bottom: 2px solid #ccc;
  display:grid;
  grid-template-columns: 0.5fr 2fr 1fr;
  grid-gap:1em;
  align-items: center;
  background-color: #efeeee;
} 
.logo{
  width: 50px;
  margin-left:20px;
}
.menu{
  display:flex;
  justify-content: space-around;
}
.btn{
  background: none;
  border:none;
  border-bottom:2px solid #efeeee;
  outline: none;
  font-size: 20px;
  color: #6b6b6b;
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

@media only screen and (max-width: 950px) {
  .menu button{
    padding: 0 0 0 10px;
  }
  
}
@media only screen and (max-width: 425px){
  .header{
    grid-template-columns: 0.2fr 1fr 0.8fr;
  }
  .btn{
    font-size: 15px;
  }
}
</style>
