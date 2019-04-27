<template>
  <div class="row">
    <h1 class="title title-modal">Войти</h1>
    <h2 class="title error" v-if="uniqLogin">Неверные данные</h2>

    <form class="col s12" @submit.prevent="onSubmit">
      <div class="row">
        <div class="input-field col s12">
          <input id="nick_name" type="text" class="validate" v-model="nickname">
          <label for="nick_name">Nickname</label>
        </div>
      </div>
      
      <div class="row">
        <div class="input-field col s12">
          <input id="passwordLogin" type="password" class="validate" v-model="passwordLogin">
          <label for="passwordLogin">Password</label>
        </div>
      </div>
      <button class="btn" type="submit">Войти</button>
    </form>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  name: 'Modal',
  data() {
    return {
      nickname: '',
      passwordLogin: '',
      uniqLogin: false,
    }
  },
  
  methods: {
    
    onSubmit() {
      this.uniqLogin = false;
      axios.post('http://localhost:3000/auth/login', {
      nickname: this.nickname,
      password: this.passwordLogin,
      })
      .then(response => {
        console.log(response);
        console.log("zaebok");
        console.log(this.nickname);
        if(this.nickname == "Admin"){
          this.$store.commit('establishAdmin', true);
          this.$router.replace("/admin");
          console.log(this.$store.state.admin)
        }
        else{
          this.$router.replace("/");
        }
        this.nickname = "";
        this.passwordLogin = "";
        localStorage.setItem(this.$store.state.STORAGE_KEY, JSON.stringify(response.data));
        this.$store.dispatch("loginState")

      })
      .catch(error => {
        console.log("error " + error);
        this.uniqLogin = true;
      });
    },
    
  },
}
</script>
<style>


</style>


