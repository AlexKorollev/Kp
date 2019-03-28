<template>
  <div>
    <h1 class="title">{{ $t('passwordEdit') }}</h1>
    <h2 v-if="passwordError" class="error-title">{{ $t('passwordNotMatch') }}</h2>
    <div class="profile-edit-main">

      <!-- <div class="form-group">
        <label for="">Avatar</label>
        <div>
          <input type="file" accept="image/*" @change="uploadImage($event)" id="file-input">
        </div>
      </div> -->
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
     
      <div class="form-group">
        <label for="editConfirmPassword">{{ $t('confirmPassword') }}</label>
        <div>
          <input :type="passwordType" id="editConfirmPassword" class="form-control" :class="{'is-invalid': $v.editConfirmPassword.$error}" @blur="$v.editConfirmPassword.$touch()" v-model="editConfirmPassword">
          <div class="invalid-feedback" v-if="!$v.editConfirmPassword.required && $v.editConfirmPassword.$error">{{ $t('passwordNotMatch') }}</div> 
          <div class="invalid-feedback" v-if="!$v.editConfirmPassword.sameAs || $v.editConfirmPassword.$error ">{{ $t('passwordNotMatch') }}</div>
        </div>
        <div></div>
        <div class="button-group">
          <button class="btn submit-post" type="submit"  @click="onSubmit()">{{ $t('submitButton') }}</button>
          <router-link class="btn submit-post cancel link" :to="'/profile'">{{ $t('cancelButton') }}</router-link>
        </div>
      </div>

    </div>
  </div>
   
</template>

<script>
import { required, minLength, sameAs } from 'vuelidate/lib/validators'
import axios from 'axios'
import store from '../../store'
import Loader from '../Loader'
export default {
  name: 'ProfilePasswordEdit',
  data() {
    return {
      editPassword: '',
      editNewpassword: '',
      editConfirmPassword: '',
      passwordError: false,
      passwordType:'password',
    }
  },
  props: {
    user: Object,
  },
  components: {
    Loader,
  },
  validations: {
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
    
    
    onSubmit() {
      if(this.user.password !== this.editPassword){
        this.passwordError = true;
      }
      else {
        this.passwordError = false;
        axios.put('http://localhost:3000/users/' + this.user.id, {
          avatar: this.user.avatar,
          email: this.user.email,
          password: this.editNewpassword,
          firstName: this.user.firstName,
          lastName: this.user.lastName,
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
    changePasswrodType () {
      if(this.passwordType == 'password'){
        this.passwordType = 'text';
      }
      else{
        this.passwordType = 'password'
      }
    },
    uploadImage(event) {

      // let data = new FormData();
      // data.append('name', 'avatar');
      // data.append('file', event.target.files[0]); 
      // console.log(data)
      // let config = {
      //   method: "PUT",
      //   header : {
          
      //     'Authorization': "bearer " + store.state.access_token
      //   },
      //   data: this.data,
      //   url:'http://localhost:3000/users/'+this.$store.state.loginId
      // }

      // axios(config)
      // .then(response => {
      //     console.log('image upload response > ', response)
      //   });

    //   axios.put('http://localhost:3000/users/'+this.$store.state.loginId, {
    //   avatar: this.data
    // },{
    //     headers: {
    //       authorization: "bearer " + this.$store.state.access_token,
    //       'Content-Type' : 'image/png',
    //   }
    // })
    // .then(response =>{
    //   console.log('image upload response > ', response)
    // })
    }
  },
}
</script>
<style scoped>

.profile-edit-main{
  display:grid;
  grid-template-columns: 1fr;
  background: var(--theme-background);
  grid-gap:2em;
  padding: 20px;
  
  transition: 0.25s;
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
  width: 93%;
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
  justify-self: left;
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
@media only screen and (max-width: 635px) {
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
    width:100%;
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


