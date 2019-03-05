<template>
  <transition name="modal-transition">
    <div class="modal" v-if="modalOpened">
      <div class="modal-background" @click="emitClose"></div>
      <form class="modal-content" @submit.prevent="onSubmit" autocomplete="off">
        <div class="close" @click="emitClose"><img src="src/assets/close2.png" width="30" height="30" alt=""></div>
        <h1 class="title">Login</h1>
        <div class="form-group">
          <input type="email" id="emailLogin" class="form-control" placeholder="enter ur login" :class="{'is-invalid': $v.emailLogin.$error}" @blur="$v.emailLogin.$touch()" v-model="emailLogin">
          <div class="invalid-feedback" v-if="!$v.emailLogin.required && $v.emailLogin.$dirty">Email field is required</div> 
        </div>
        <div class="form-group">
          <input type="password" id="passwordLogin" class="form-control" placeholder="enter ur pass" :class="{'is-invalid': $v.passwordLogin.$error}" @blur="$v.passwordLogin.$touch()" v-model="passwordLogin">
          <div class="invalid-feedback" v-if="!$v.passwordLogin.required && $v.passwordLogin.$dirty">Password field is required</div>
        </div>
        <div class="invalid-feedback" v-if="!uniqLogin">This email not exist or incorrect password</div>
        <button class="btn submit" type="submit" :disabled="$v.$invalid">Submit</button>
      </form>
    </div>
  </transition>
</template>

<script>
import { required } from 'vuelidate/lib/validators'
import axios from 'axios'
export default {
  name: 'Modal',
  data() {
    return {
      emailLogin: '',
      passwordLogin: '',
      uniqLogin: true,
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
    },
    passwordLogin: {
      required
    }
  },
  methods: {
    emitClose(){
      this.$emit('close');
    },
    onSubmit() {
      axios.post('http://localhost:3000/auth/login', {
      email: this.emailLogin,
      password: this.passwordLogin
      })
      .then(response => {
        console.log(response);
        console.log("zaebok");
        this.emitClose();
        this.emailLogin = "";
        this.passwordLogin = "";
        this.uniqLogin = true;
        this.$router.replace("/");
        localStorage.setItem(this.$store.state.STORAGE_KEY, JSON.stringify(response.data));
        this.$store.commit("changeLogin", true);
        this.$store.commit("changeLoginName", response.data.user.firstName);
        this.$store.commit("establishUserId", response.data.user.id);
        this.$store.commit("establishAccessToken", response.data.access_token)
        console.log(response.data.access_token)
      })
      .catch(error => {
        console.log("GOVNO " + error);
        this.uniqLogin = false;
      });
    }
  }
}
</script>
<style scoped>
.modal,.modal-background{
  position: fixed;
  left:0;
  top:0;
  width: 100vw;
  height: 100vh;
  z-index:1000;
}
.modal-background{
  background: rgba(10,10,10,0.4);
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
  background-color: #efeeee;
  z-index:50;
  padding: 2em 4em;
  display:grid;
  grid-template-columns: 1fr;
  justify-items: center;
  grid-gap:1em;
  border-radius: 2px;
  width:300px;
}
.modal-content input{
  border: none;
  background: none;
  text-align: center;
  border: 2px solid #3498db;
  padding: 14px 0px;
  width: 200px;
  outline: none;
  color:black;
  border-radius: 24px;
  transition: 0.25s;
  font-size: 20px;
  
}
.modal-content input[type=email]{
  color: #6b6b6b;
}
h1{
  font-size: 30px;
  text-transform: uppercase;
  font-weight: 700;
}
.modal-content input:focus{
  width:280px;
  border-color: #2ecc71;
}
.form-group{
  display: grid;
  grid-template-columns: 1fr;
}
.submit{
  border-bottom: 2px solid #3498db;
  width: 200px;
  transition: 0.25s;
  font-size: 20px;
  padding-bottom:5px;
}
.submit:hover{
  border-bottom: 2px solid #2ecc71;
  width: 100px;
  color: #6b6b6b;
}
.invalid-feedback{
  justify-self: center;
  font-size: 12px;
  color: #bb0000;
  margin: 10px 0 0 0;
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
    background: #efeeee;
  }
}
/* .modal-content input{
} */
</style>


