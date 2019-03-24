<template>
  <transition name="modal-transition">
    <div class="modal" v-if="modalOpened">
      <div class="modal-background" @click="emitCloseModal()"></div>
      <form class="modal-content" @submit.prevent="onSubmit" autocomplete="off">
        <div class="close" @click="emitCloseModal()"><img src="src/assets/close.png" width="20" height="20" alt=""></div>
        <h1 class="title">{{ $t('login') }}</h1>
        <div class="form-group">
          <input type="email" id="emailLogin" class="form-control" :placeholder="$t('inputEmail')" :class="{'is-invalid': $v.emailLogin.$error}" @blur="$v.emailLogin.$touch()" v-model="emailLogin">
          <div class="invalid-feedback" v-if="!$v.emailLogin.required && $v.emailLogin.$error">{{ $t('emailRequest') }}</div>
           <div class="invalid-feedback" v-if="!$v.emailLogin.email && $v.emailLogin.$error">{{ $t('emailValidate') }}</div> 
        </div>
        <div class="form-group password">
          <input :type="passwordType" id="passwordLogin" class="form-control" :placeholder="$t('inputPassword')" :class="{'is-invalid': $v.passwordLogin.$error}" @blur="$v.passwordLogin.$touch()" v-model="passwordLogin">
          <img v-if="passwordType == 'password'" src="/src/assets/view.png" width="25" class="show-password" @click="changePasswrodType()">
          <img v-else src="/src/assets/view-active.png" width="25" class="show-password" @click="changePasswrodType()">
          <div class="invalid-feedback" v-if="!$v.passwordLogin.required && $v.passwordLogin.$error">{{ $t('passwordRequest') }}</div>
        </div>
        <div class="invalid-feedback" v-if="!uniqLogin">{{ $t('incorrectInfo') }}</div>
        <button class="btn submit-login" type="submit" :disabled="$v.$invalid">{{ $t('submitButton') }}</button>
      </form>
    </div>
  </transition>
</template>

<script>
import { required,email } from 'vuelidate/lib/validators'
import axios from 'axios'
export default {
  name: 'Modal',
  data() {
    return {
      emailLogin: '',
      passwordLogin: '',
      uniqLogin: true,
      passwordType: 'password',
    }
  },
  props: {
    modalOpened:{
      type: Boolean,
    }
  },
  validations: {
    emailLogin: {
      required,
      email,
    },
    passwordLogin: {
      required
    }
  },
  methods: {
    emitCloseModal(){
      this.$emit('modalClose');
      this.$v.$reset();
    },
    emitMenuClose(){
      this.$emit('menuClose');
      this.$v.$reset();
    },
    onSubmit() {
      axios.post('http://localhost:3000/auth/login', {
      email: this.emailLogin,
      password: this.passwordLogin
      })
      .then(response => {
        console.log(response);
        console.log("zaebok");
        this.emitCloseModal();
        this.emitMenuClose();
        this.emailLogin = "";
        this.passwordLogin = "";
        this.uniqLogin = true;
        this.$router.replace("/");
        localStorage.setItem(this.$store.state.STORAGE_KEY, JSON.stringify(response.data));
        this.$store.commit("changeLogin", true);
        this.$store.commit("changeLoginName", response.data.user.firstName);
        this.$store.commit("establishUserId", response.data.user.id);
        this.$store.commit("establishAccessToken", response.data.access_token)
        this.$store.commit("establishQuery", '?')
        this.$v.$reset();
      })
      .catch(error => {
        console.log("GOVNO " + error);
        this.uniqLogin = false;
      });
    },
    changePasswrodType () {
      if(this.passwordType == 'password'){
        this.passwordType = 'text';
      }
      else{
        this.passwordType = 'password'
      }
    }
  },
}
</script>
<style>

.modal,.modal-background{
  position: fixed;
  left:0;
  top:0;
  width: 100vw;
  height: 100vh;
  z-index:1000;
}
.modal-background{
  background: var(--theme-modal-background);
  z-index:40;
}
.modal{
  display:flex;
  align-items: center;
  justify-content: center;
  z-index:50;
  transition: opacity 0.5s ease-out, transform 0.5s ease-out;
}
.modal-content{
  background-color: var(--theme-background);
  z-index:50;
  padding: 2em 2.5em;
  display:grid;
  grid-template-columns: 1fr;
  justify-items: center;
  grid-gap:1em;
  border-radius: 2px;
  width:100%;
}
.modal-content input{
  border: none;
  background: none;
  text-align: center;
  border: 2px solid #3498db;
  padding: 14px 0px;
  width: 200px;
  outline: none;
  color: var(--theme-color);
  border-radius: 24px;
  transition: 0.25s;
  font-size: 20px;
}
.modal-content input[type=email]{
  color: var(--theme-color);
}
.modal-content h1{
  font-size: 30px;
  text-transform: uppercase;
  font-weight: 700;
  color: var(--theme-color);
}
.modal-content input:focus{
  width:280px;
  border-color: #2ecc71;
}
.modal-content .form-group{
  display: grid;
  grid-template-columns: 1fr;
}
.submit-login{
  border-bottom: 2px solid #3498db;
  width: 200px;
  transition: 0.25s;
  font-size: 20px;
  padding-bottom:5px;
  color: #3498db;
}
.submit-login:hover{
  border-bottom: 2px solid #2ecc71;
  color: #2ecc71;
}
.invalid-feedback{
  justify-self: center;
  font-size: 12px;
  color: #bb0000;
  margin: 10px 0 0 0;
  text-align: center;
}
.is-invalid{
  color: red;
}
.modal-transition-enter-active{
  opacity: 1;
}
.modal-transition-enter{
  opacity: 0;
  transform: scale(1.5, 1.5);
}
.modal-transition-leave-active{
  opacity: 0;
  transform: scale(1.5, 1.5);
}
.modal-transition-leave{
  opacity: 1;
}
.close{
  justify-self: end;
  cursor: pointer;
  width:10px;
  height: 10px;

}
@media only screen and (max-width: 1024px) {
  .modal-background{
    background: var(--theme-background);
  }
}
@media only screen and (max-width: 425px){
  .show-password{
    right: -30px;
  }
}
@media only screen and (max-width: 355px){
  .modal-content input:focus{
    width:240px;
  }
}
/* .modal-content input{
} */
</style>


