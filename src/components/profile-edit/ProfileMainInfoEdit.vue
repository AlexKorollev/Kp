<template>
  <div>
    <h1 class="title">{{ $t('profileEdit') }}</h1>
    <h2 v-if="error" class="error-title">{{ $t('noChange') }}</h2>
    <div class="profile-edit-main">

      <!-- <div class="form-group">
        <label for="">Avatar</label>
        <div>
          <input type="file" accept="image/*" @change="uploadImage($event)" id="file-input">
        </div>
      </div> -->

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
        <div></div>
        <div class="button-group">
          <button class="btn submit-post" type="submit" @click="onSubmit()">{{ $t('submitButton') }}</button>
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
  name: 'ProfileMainInfoEdit',
  data() {
    return {
      editFirstName: '',
      editLastName: '',
      error: false,
    }
  },
  components: {
    Loader,
  },
  props: {
    user: Object,
  },
  validations: {
    editFirstName: {
      required,
    },
    editLastName: {
      required,
    },
  },
  methods: {
    
    putInfo () {
      this.editFirstName = this.user.firstName + '';
      this.editLastName = this.user.lastName + '';
    },
    onSubmit() {
      if(this.user.firstName == this.editFirstName && this.user.lastName == this.editLastName){
        this.error = true;
        console.log("error",this.error)
      }
      else {
        this.error = false;
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
  },
  mounted () {
    this.putInfo();
  }
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


