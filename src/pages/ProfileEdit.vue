<template>
  <div>
    <div class="profile-edit-page" v-if="user!=='' ">
      <div class="profile-edit-block">
        <h1 class="title">{{ $t('profileEdit') }}</h1>
        <h2 v-if="error" class="error-title">{{ $t('noChange') }}</h2>
        <h2 v-else-if="passwordError" class="error-title">{{ $t('passwordNotMatch') }}</h2>
        <div class="profile-edit-main">

          <div class="form-group">
            <label for="Name">{{ $t('firstName') }}</label>
            <div>
              <input type="text" id="editFirstName" class="form-control" placeholder="" :class="{'is-invalid': $v.editFirstName.$error}" @blur="$v.editFirstName.$touch()" v-model="editFirstName">
              <div class="invalid-feedback" v-if="!$v.editFirstName.required && $v.editFirstName.$dirty">{{ $t('fistNameRequest') }}</div> 
            </div>
          </div>

          <div class="form-group">
            <label for="editLastName">{{ $t('lastName') }}</label>
            <div>
              <input type="text" id="editLastName" class="form-control" placeholder="" :class="{'is-invalid': $v.editLastName.$error}" @blur="$v.editLastName.$touch()" v-model="editLastName">
              <div class="invalid-feedback" v-if="!$v.editLastName.required && $v.editLastName.$dirty">{{ $t('lastNameRequest') }}</div> 
            </div>
          </div>

          <div class="form-group password">
            <label for="editPassword">{{ $t('oldPassword') }}</label>
            <img v-if="passwordType == 'password'" src="/src/assets/view.png" width="25" class="show-password" @click="changePasswrodType()">
            <img v-else src="/src/assets/view-active.png" width="25" class="show-password" @click="changePasswrodType()">
            <div>
              <input :type="passwordType" id="editPassword"  class="form-control" :class="{'is-invalid': $v.editPassword.$error}" @blur="$v.editPassword.$touch()" v-model="editPassword">
              <div class="invalid-feedback" v-if="!$v.editPassword.minLength && $v.editPassword.$error">{{ $t('minPasswordLengthIs') }} {{ $v.editPassword.$params.minLength.min }}. {{ $t('minPasswordLengthNow') }} {{ editPassword.length }}</div>
              <div class="invalid-feedback" v-if="!$v.editPassword.required && $v.editPassword.$dirty ">{{ $t('passwordRequest') }}</div>
            </div>
          </div>

          <div class="form-group">
            <label for="editNewpassword">{{ $t('newPassword') }}</label>
            <div>
              <input :type="passwordType" id="editNewpassword"  class="form-control" :class="{'is-invalid': $v.editNewpassword.$error}" @blur="$v.editNewpassword.$touch()" v-model="editNewpassword">
              <div class="invalid-feedback" v-if="!$v.editNewpassword.minLength && $v.editNewpassword.$error">{{ $t('minPasswordLengthIs') }} {{ $v.editNewpassword.$params.minLength.min }}. {{ $t('minPasswordLengthNow') }} {{ editNewpassword.length }}</div>
              <div class="invalid-feedback" v-if="!$v.editNewpassword.required && $v.editNewpassword.$dirty ">{{ $t('passwordRequest') }}</div>
            </div>
          </div>
          <!-- <div class="form-group">
            <input type="password" id="confirm" :placeholder="$t('inputConfirmPassword')" class="form-control" :class="{'is-invalid': $v.confirmPassword.$error}" @blue="$v.confirmPassword.$touch()" v-model="confirmPassword">
            <div class="invalid-feedback" v-if="!$v.confirmPassword.sameAs || $v.confirmPassword.$error ">{{ $t('passwordNotMatch') }}</div>
          </div> -->

          <div class="form-group">
            <label for="editConfirmPassword">{{ $t('confirmPassword') }}</label>
            <div>
              <input :type="passwordType" id="editConfirmPassword" class="form-control" :class="{'is-invalid': $v.editConfirmPassword.$error}" @blur="$v.editConfirmPassword.$touch()" v-model="editConfirmPassword">
              <div class="invalid-feedback" v-if="!$v.editConfirmPassword.required && $v.editConfirmPassword.$error">{{ $t('passwordNotMatch') }}</div> 
              <div class="invalid-feedback" v-if="!$v.editConfirmPassword.sameAs || $v.editConfirmPassword.$error ">{{ $t('passwordNotMatch') }}</div>
            </div>
            <div></div>
            <div class="button-group">
              <button class="btn submit-post" type="submit" :disabled="$v.$invalid" @click="onSubmit()">{{ $t('submitButton') }}</button>
              <router-link class="btn submit-post cancel link" :to="'/profile'">{{ $t('cancelButton') }}</router-link>
            </div>
          </div>

        </div>
      </div>
    </div>
    <Loader v-else class="profile-edit-page posts-loading"/>
  </div>
</template>

<script>
import { required, minLength, sameAs } from 'vuelidate/lib/validators'
import axios from 'axios'
import store from '../store'
import Loader from '.././components/Loader'
export default {
  name: 'ProfileEdit',
  data() {
    return {
      editFirstName: '',
      editLastName: '',
      editPassword: '',
      editNewpassword: '',
      editConfirmPassword: '',
      user: '',
      error: false,
      passwordError: false,
      passwordType:'password',
    }
  },
  components: {
    Loader,
  },
  validations: {
    editFirstName: {
      required,
    },
    editLastName: {
      required,
    },
    editPassword: {
      required
    },
    editNewpassword: {
      minLength: minLength(6),
      required
    },
    editConfirmPassword: {
      required,
      sameAs: sameAs('editNewpassword')
    }
    
  },
  methods: {
    
    searchUsers () {
      const options = {
        method: 'GET',
        headers: {
          'Authorization': "bearer " + this.$store.state.access_token
          },
        url: 'http://localhost:3000/users/'+this.$store.state.loginId,
      };
      axios(options)
      .then(response =>{
        this.user = response.data;
        this.editFirstName = this.user.firstName + '';
        this.editLastName = this.user.lastName + '';
      });
    },

    onSubmit() {
      if(this.user.firstName == this.editFirstName && this.user.lastName == this.editLastName){
        this.error = true;
        console.log("error",this.error)
      }
      else if(this.user.password !== this.editPassword){
        this.passwordError = true;
      }
      else {
        this.error = false;
        this.passwordError = false;
        axios.put('http://localhost:3000/users/' + this.user.id, {
          avatar: this.user.avatar,
          email: this.user.email,
          password: this.user.password,
          firstName: this.editFirstName,
          lastName: this.editLastName,
        })
        .then(response => {
          this.$router.replace("/profile");
          this.$v.$reset();
          
        })
        .catch(error => {
          console.log("GOVNO " + error);
          this.uniqLogin = false;
        });
      }
    },
    scroll () {
      window.onscroll = () => {}
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
  mounted () {
    this.searchUsers();
    this.scroll()
  }
}
</script>
<style scoped>
.profile-edit-page{
  margin-top: 30px;
  display:flex;
  justify-content: center;
  width: 100%;
  /* height: 100vh; */
}
.profile-edit-block{
  display: grid;
  grid-template-columns: 1fr;
  word-break:break-all;
  width:700px;
  box-shadow: var(--theme-box-shadow);
  height: auto;
  align-self: center;
  margin: 0 10px;
  transition: 0.25s;
}
.profile-edit-main{
  display:grid;
  grid-template-columns: 1fr;
  background: var(--theme-background);
  grid-gap:2em;
  padding: 20px;
  
  transition: 0.25s;
}
.title{
  background: #3498db;
  width:100%;
  padding: 20px 0;
  text-align:center;
  font-size: 30px;
  /* text-transform: uppercase; */
  font-weight: 700;
  color: var(--theme-color);
  
}
.form-group{
  display:grid;
  grid-template-columns: 1fr 2fr;
  grid-gap: 1em;
  color: var(--theme-color);
}
.buttons{
  display:grid;
  grid-template-columns: 1fr;
}
.button-group{
  display:grid;
  grid-template-columns: 1fr 2fr;
  grid-column-gap:1em;
}
.form-group label{
  justify-self: right;
  font-size: 25px;
  font-weight: bold;
  word-break: normal;  /* не поддерживает Opera12.14, значение keep-all не поддерживается IE, Chrome */ 
  text-align: right;
}
.form-group input{
  border: none;
  background: none;
  text-align: left;
  border-bottom: 2px solid #3498db;
  width: 100%;
  align-items: center;
  padding: 0;
  outline: none;
  color: var(--theme-color);
  transition: 0.25s;
  font-size: 20px;
}
.form-group input:focus{
  border-color: #2ecc71;
}
.modal-content input[type=email]{
  color: #6b6b6b;
}
.submit-post{
  justify-self: left;
  color: #3498db;
}
.submit-post:hover{
  color: #2ecc71;
}
.submit-post:active{
  color: #fff;
}
.cancel{
  justify-self: right;
      text-align: center;
}
.cancel:hover{
  border: 2px solid #e85a50;
  color:#e82626;
}
.cancel:active{
  border: 2px solid #e82626;
  background: #e85a50;
  color: #fff;
}
.error-title{
  text-align: center;
  background: #e85a50;
  width:100%;
  padding: 20px 0;
}

.invalid-feedback{
  text-align: left;
}
.show-password{
  right: 0px;
  top: -2px;
}
@media only screen and (max-width: 600px) {
  .form-group{
    grid-template-columns: 1fr;
    margin: 15px 0;
  }
  .form-group label{
    justify-self: left;
  }
  .modal-content{
    justify-items: center;
  }
  .profile-edit-main{
    grid-row-gap: 0em;
  }
  .form-group input{
    text-align: left;
  }
  .show-password{
    top: 0px;
  }
}
@media only screen and (max-width: 425px) {
  .submit-post{
    width:120px;
  }
}
</style>


