<template>
  <div>
    <div class="profile-edit-page" v-if="user!=='' ">
      <div class="profile-edit-block">
        <h1 class="title">{{ $t('profileEdit') }}</h1>
        <h2 v-if="error" class="error-title">{{ $t('noChange') }}</h2>
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
      user: '',
      error: false,
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
      
    }
  },
  mounted () {
    this.searchUsers();
  }
}
</script>
<style scoped>
.profile-edit-page{
  margin-top: 30px;
  display:flex;
  justify-content: center;
  width: 100%;
  height: 80vh;
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
}
.profile-edit-main{
  display:grid;
  grid-template-columns: 1fr;
  background: var(--theme-background);
  grid-gap:2em;
  padding: 20px;
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


@media only screen and (max-width: 600px) {
  .form-group{
    grid-template-columns: 1fr;
    margin: 30px 0;
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
}
@media only screen and (max-width: 425px) {
  .submit-post{
    width:120px;
  }
}
</style>


