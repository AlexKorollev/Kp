<template>
  <div class="row">
    <h1 class="title title-modal">Регистрация</h1>
    <form class="col s12" @submit.prevent="onSubmit" >
      <div class="row">
        <div class="input-field col s12">
          <input v-model="addNickname" id="addNickname" type="text" class="validate">
          <label for="addNickname">Логин</label>
        </div>
      </div>
      <div class="row">
        <div class="input-field col s12">
          <input v-model="addPassword" id="addPassword" type="password" class="validate">
          <label for="addPassword">Пароль</label>
        </div>
      </div>
      <div class="row">
        <div class="input-field col s12">
          <button class="btn" type="submit">Отправить</button>
        </div>
      </div>
      
    </form>
  </div>
</template>

<script>

import axios from 'axios'
export default {
  data() {
    return {
      addNickname: '',
      addPassword: '',
    }
  },

  methods: {
    onSubmit() {
      axios.post('http://localhost:3000/users/', {
        nickname: this.addNickname,
        password: this.addPassword
      },
      {
        headers:{
          authorization: "bearer " + this.$store.state.access_token
        }
      })
      .then(response => {
        this.$router.replace("/login");
      })
      .catch(error => {
        console.log("error " + error);
      });
    },
  },
}
</script>

<style scoped>


</style>
