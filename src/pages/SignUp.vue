<template>
  <div class="validate">
    <form @submit.prevent="onSubmit" autocomplete="off">
      <h1 class="title">Registration</h1>
      <div class="form-group">
        <input type="text" id="firstName" placeholder="* enter ur first name" class="form-control" :class="{'is-invalid': $v.firstName.$error}" @blur="$v.firstName.$touch()" v-model="firstName">
        <div class="invalid-feedback" v-if="!$v.firstName.required && $v.firstName.$dirty">First Name field is required</div>
        <div class="invalid-feedback" v-if="!$v.firstName.alpha">Use only letters</div>
      </div>
      <div class="form-group">
        <input type="text" id="last" placeholder="enter ur last name" class="form-control" :class="{'is-invalid': $v.last.$error}" @blur="$v.last.$touch()" v-model="last">
        <div class="invalid-feedback" v-if="!$v.last.alpha">Use only letters</div>
      </div>
      <div class="form-group">
        <input type="email" id="email" placeholder="* enter ur email" class="form-control" :class="{'is-invalid': $v.email.$error}" @blur="$v.email.$touch()" v-model="email">
        <div class="invalid-feedback" v-if="!$v.email.required && $v.email.$dirty">Email field is required</div>
        <div class="invalid-feedback" v-if="!$v.email.email">This field shoud be in email</div>
        <div class="invalid-feedback" v-if="!uniqEmail">This email alredy exist</div>
      </div>
      <div class="form-group">
        <input type="password" id="password" placeholder="* enter ur password" class="form-control" :class="{'is-invalid': $v.password.$error}" @blur="$v.password.$touch()" v-model="password">
        <div class="invalid-feedback" v-if="!$v.password.minLength">min length of password is {{ $v.password.$params.minLength.min }}. Now it is {{ password.length }}</div>
        <div class="invalid-feedback" v-if="!$v.password.required && $v.password.$dirty">Password field is required</div>
      </div>
      <div class="form-group">
        <input type="password" id="confirm" placeholder="* repeat ur password" class="form-control" :class="{'is-invalid': $v.confirmPassword.$error}" @blue="$v.confirmPassword.$touch()" v-model="confirmPassword">
        <div class="invalid-feedback" v-if="!$v.confirmPassword.sameAs && $v.confirmPassword.$dirty">Password not match</div>
      </div>
      <button class="btn submit" type="submit" :disabled="$v.$invalid" >Submit</button>
    </form>
  </div>
</template>

<script>
import {required,email,minLength, sameAs, alpha } from 'vuelidate/lib/validators'
import axios from 'axios'
export default {
  data() {
    return {
      firstName: '',
      last: '',
      email: '',
      password: '',
      confirmPassword: '',
      uniqEmail: true,
    }
  },
  methods: {
    onSubmit() {
      axios.post('http://localhost:3000/auth/register', {
      email: this.email,
      password: this.password,
      firstName: this.firstName
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
  },
  validations: {
    firstName:{
      required,
      alpha
    },
    last: {
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
    
  }
}
</script>

<style scoped>
.validate{
  display:flex;
  align-items: center;
  justify-content: center;
  width:100vw;
  height: 80vh;
}
form{
  background: #efeeee;
  padding: 2em 4em;
  display:grid;
  grid-template-columns: 1fr;
  justify-items: center;
  grid-gap:0.5em;
  border-radius: 2px;
  width:300px;
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
  color:black;
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
}
.submit{
  margin-top: 20px;
  border: 2px solid #3498db;
  border-radius: 24px;
  width: 120px;
  transition: 0.25s;
  padding: 5px 10px;
  font-size: 20px;
}
.submit:hover{
  border: 2px solid #2ecc71;
  width: 150px;
  color: #6b6b6b;
}
.invalid-feedback{
  justify-self: center;
  font-size: 12px;
  color: #bb0000;
}

@media only screen and (max-width: 768px) {
  .validate{
    background: #efeeee;
    height: 100vh;
  }

}
@media only screen and (max-width: 500px) {
  form{
    padding: 2em 0;
  }
}

</style>
