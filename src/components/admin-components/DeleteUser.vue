<template>
  <div>
    <h1 class="title">Удалить пользователя</h1>
    <h2 v-if="noSuchUser" class="error-title-admin">Нет такого пользователя</h2>
    <h2 v-if="deleted" class="success-title-admin">Удалён</h2>
    <div class="profile-edit-main-admin">
      <div class="form-group-admin">
        <label for="deleteNickname">Никнейм</label>
        <div>
          <input type="text" id="deleteNickname" class="form-control" placeholder="" :class="{'is-invalid': $v.deleteNickname.$error}" @blur="$v.deleteNickname.$touch()" v-model="deleteNickname">
          <div class="invalid-feedback-admin" v-if="!$v.deleteNickname.required && $v.deleteNickname.$error">Никнейм обязателен</div> 
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
  name: 'DeleteUser',
  data() {
    return {
      deleteNickname: '',
      noSuchUser: false,
      deleted: false,
      index: Number,
    }
  },
  props: {
    users: Array,
  },
  validations: {
    deleteNickname: {
      required,
    }
  },
  methods: {
    
    onSubmit () {
      this.noSuchUser = false;
      this.deleted = false;
      let deleteUser = this.users.filter((user,index) => {
        if(user.nickname == this.deleteNickname){
          this.index = index;
          return true;
        }
        else{
          return false;
        }
      })
      if(deleteUser.length>0){
        axios.delete('http://localhost:3000/users/'+ deleteUser[0].id,
          {
          headers:{
            authorization: "bearer " + this.$store.state.access_token
          }
        })
        .then(response => {
          console.log(this.$store.state.users)
          this.$store.commit('deleteUser',this.index)
          console.log('response',response)
          this.deleteNickname = '';
          this.$v.$reset();
          this.deleted = true;
          console.log(this.$store.state.users)
        })
        .catch(error => {
          console.log("error",error);
        });
      }
      else{
        this.noSuchUser = true;
      }
      
     
    },
    cleanField () {
      this.noSuchUser = false;
      this.deleted = false;
      this.deleteNickname = '';
      this.$v.$reset();
    }
  },
}
</script>
<style scoped>
</style>


