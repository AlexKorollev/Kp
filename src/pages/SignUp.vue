<template>
  <div class="validate">
    <form @submit.prevent="onSubmit" autocomplete="off">
      <h1 class="title">{{ $t('singUp') }}</h1>
      <div class="form-group">
        <input type="text" id="firstName" :placeholder="$t('inputFirstName')" class="form-control" :class="{'is-invalid': $v.firstName.$error}" @blur="$v.firstName.$touch()" v-model="firstName">
        <div class="invalid-feedback" v-if="!$v.firstName.required && $v.firstName.$error">{{ $t('fistNameRequest') }}</div>
        <div class="invalid-feedback" v-if="!$v.firstName.alpha && $v.firstName.$error">{{ $t('useOnlyLeterRequest') }}</div>
      </div>
      <div class="form-group">
        <input type="text" id="lastName" :placeholder="$t('inputLastName')" class="form-control" :class="{'is-invalid': $v.lastName.$error}" @blur="$v.lastName.$touch()" v-model="lastName">
        <div class="invalid-feedback" v-if="!$v.lastName.alpha && $v.lastName.$error">{{ $t('useOnlyLeterRequest') }}</div>
      </div>
      <div class="form-group">
        <input type="email" id="email" :placeholder="$t('inputEmail')" class="form-control" :class="{'is-invalid': $v.email.$error}" @blur="$v.email.$touch()" v-model="email">
        <div class="invalid-feedback" v-if="!$v.email.required && $v.email.$error">{{ $t('emailRequest') }}</div>
        <div class="invalid-feedback" v-if="!$v.email.email && $v.email.$error">{{ $t('emailValidate') }}</div>
        <div class="invalid-feedback" v-if="!uniqEmail">{{ $t('emailExist') }}</div>
      </div>
      <div class="form-group password">
        <input :type="passwordType" id="password" :placeholder="$t('inputPassword')" class="form-control" :class="{'is-invalid': $v.password.$error}" @blur="$v.password.$touch()" v-model="password">
        <img v-if="passwordType == 'password'" src="/src/assets/view.png" width="25" class="show-password" @click="changePasswrodType()">
        <img v-else src="/src/assets/view-active.png" width="25" class="show-password" @click="changePasswrodType()">
        <div class="invalid-feedback" v-if="!$v.password.minLength && $v.password.$error">{{ $t('minPasswordLengthIs') }} {{ $v.password.$params.minLength.min }}. {{ $t('minPasswordLengthNow') }} {{ password.length }}</div>
        <div class="invalid-feedback" v-if="!$v.password.required && $v.password.$dirty ">{{ $t('passwordRequest') }}</div>
      </div>
      <div class="form-group">
        <input :type="passwordType" id="confirm" :placeholder="$t('inputConfirmPassword')" class="form-control" :class="{'is-invalid': $v.confirmPassword.$error}" @blue="$v.confirmPassword.$touch()" v-model="confirmPassword">
        <div class="invalid-feedback" v-if="!$v.confirmPassword.sameAs || $v.confirmPassword.$error ">{{ $t('passwordNotMatch') }}</div>
      </div>
      <button class="btn submit is-invalid" @click="submitForm()" :disabled="$v.$invalid" >{{ $t('submitButton') }}</button>
      
    </form>
  </div>
</template>

<script>
import {required,email,minLength, sameAs, alpha } from 'vuelidate/lib/validators'
import axios from 'axios'
import scroll from '.././helpers/scroll'
export default {
  data() {
    return {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      confirmPassword: '',
      uniqEmail: true,
      passwordType: 'password',
    }
  },
  methods: {
    submitForm() {
      axios.post('http://localhost:3000/auth/register', {
      email: this.email,
      password: this.password,
      firstName: this.firstName,
      lastName: this.lastName,
      avatar: '/src/assets/avatars/no-avatar.jpg',
      subscribers: [],
      })
      .then(response => {
        console.log(response);
        console.log("zaebok");
        this.$router.replace("/");
      })
      .catch(error => {
        console.log("GOVNO " + error);
        this.uniqEmail = false;
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
  validations: {
    firstName:{
      required,
      alpha
    },
    lastName: {
      alpha
    },
    email: {
      required,
      email,
    },
    password: {
      minLength: minLength(6),
      required
    },
    confirmPassword:{
      sameAs: sameAs('password')
    }
    
  },
  mounted () {
    scroll.disableScroll();
  },
  destroyed () {
    scroll.enableScroll();
  }
}
</script>

<style scoped>
.validate{
  display:flex;
  align-items: center;
  justify-content: center;
  /* width:100vw; */
  height: 95vh;
  background: var(--theme-background);
}
form{
  background: var(--theme-background);
  padding: 2em 4em;
  display:grid;
  grid-template-columns: 1fr;
  justify-items: center;
  grid-gap:0.5em;
  border-radius: 2px;
  width:300px;
  box-shadow: var(--theme-box-shadow);
  transition: 0.25s;
}
.form-group{
  display: grid;
  grid-template-columns: 1fr;
  width:300px;
  justify-items: center;
  grid-gap:0.5em;
}
.form-group input{
  border: none;
  background: none;
  text-align: center;
  border-bottom: 2px solid #3498db;
  padding: 14px 0 5px 0;
  width: 300px;
  outline: none;
  color:var(--theme-color);;
  transition: 0.25s;
  font-size: 20px;
}
.form-group input:focus{
  border-color: #2ecc71;
  display: grid;
  justify-self: center;
}
h1{
  font-size: 30px;
  text-transform: uppercase;
  font-weight: 700;
  color: var(--theme-color);
  transition: 0.25s;
}
.submit{
  margin-top: 20px;
  border: 2px solid #3498db;
  border-radius: 24px;
  width: 120px;
  transition: 0.25s;
  padding: 5px 10px;
  font-size: 20px;
  color: #3498db;
}
.submit:hover{
  border: 2px solid #2ecc71;
  width: 150px;
  color: #2ecc71
}
.invalid-feedback{
  justify-self: center;
  font-size: 12px;
  color: #bb0000;
}

@media only screen and (max-width: 768px) {
  .validate{
    height: 100vh;
  }

}
@media only screen and (max-width: 425px){
  .show-password{
    right: 0px;
  }
}
@media only screen and (max-width: 500px) {
  form{
    padding: 2em 0;
    box-shadow: none;
  }
  
}

</style>
