<template>
  <div>
    <h1 class="title">Добавить пользователя</h1>
    <h2 v-if="userExist" class="error-title-admin">Пользователя уже существует</h2>
    <h2 v-if="added" class="success-title-admin">Добавлен</h2>
    <div class="profile-edit-main-admin">
      <div class="form-group-admin">
        <label for="addNickname">Никнейм</label>
        <div>
          <input type="text" id="addNickname" class="form-control-admin" placeholder="" :class="{'is-invalid': $v.addNickname.$error}" @blur="$v.addNickname.$touch()" v-model="addNickname">
          <div class="invalid-feedback" v-if="!$v.addNickname.required && $v.addNickname.$error">nick req</div> 
        </div>
      </div>
      <div class="form-group-admin">
        <label for="addPassword">Пароль</label>
        <div>
          <input type="password" id="addPassword" class="form-control-admin" placeholder="" :class="{'is-invalid': $v.addPassword.$error}" @blur="$v.addPassword.$touch()" v-model="addPassword">
          <div class="invalid-feedback" v-if="!$v.addPassword.required && $v.addPassword.$error">Пароль обязателен</div>
        </div>
        <div></div>
        <div class="button-group-admin">
          <button class="btn submit-post submit-post-admin" type="submit" :disabled="$v.$invalid" @click="onSubmit()">{{ $t('submitButton') }}</button>
          <button class="btn submit-post cancel-admin" @click="cleanField()" >Очистить</button>
        </div>
      </div>
    </div>
    
  </div>
</template>

<script>
import { required, minLength } from 'vuelidate/lib/validators'
import axios from 'axios'
export default {
  name: 'AddUser',
  data() {
    return {
      addNickname: '',
      addPassword: '',
      userExist: false,
      added: false,
    }
  },
  props: {
    users: Array,
  },
  validations: {
    addNickname: {
      required,
    },
    addPassword: {
      required,
    },
  },
  methods: {
    
    onSubmit () {
      this.userExist = false;
      this.added = false;
      let addUser = this.users.filter(user => {
        return user.nickname == this.addNickname;
      })
      if(addUser.length == 0){
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
          console.log(this.$store.state.users)
          console.log('response',response)
          this.$store.commit('addUser',[response.data])
          this.addNickname = '';
          this.addPassword = '';
          this.$v.$reset();
          this.added = true;
          console.log(this.$store.state.users)
        })
        .catch(error => {
          console.log("error" + error);
        });
      }
      else{
        this.userExist = true;
      }
      
    },
    cleanField () {
      this.userExist = false;
      this.added = false;
      this.addNickname = '';
      this.addPassword = '';
      this.$v.$reset();
    }
  },
}
</script>
<style scoped>

</style>


