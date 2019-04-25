<template>
  <div>
    <div class="profile-edit-page-admin">
      <div class="profile-edit-block-admin">
        <h1 class="title">Расчёт с поставщиками</h1>
        <div class="profile-edit-main-admin">
          <div class="form-group-admin">
            <label for="provider">Поставщик</label>
            <div>
              <select name="provider" id="provider" v-model="providerSelect" > 
                <option disabled value="">Выберите поставщика</option>
                <option v-for="(provider,index) in getProviders" :key="provider.id" :value="provider.name" :selected="index==1" >{{provider.name}}</option>
              </select>
            </div>
          </div>
          <div class="form-group-admin">
            <label for="addPassword">Сумма</label>
            <div>
              <input type="text" id="amount" v-model="amount">
            </div>
            <div></div>
            <div class="button-group-admin">
              <button class="btn submit-post submit-post-admin" type="submit" @click="onSubmit()">{{ $t('submitButton') }}</button>
              <button class="btn submit-post cancel-admin" @click="cleanField()">Очистить</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import api from '../helpers/api'
import axios from 'axios'
export default {

  components: {
  },
  data () {
    return {
      providerSelect: '',
      amount: '',
      providerId: Number,
      providerAmount: Number
    }
  },
  computed: {
    getProviders () {
      return this.$store.state.providers
    }
  },
  methods: {
    cleanField () {
      this.providerSelect = '';
      this.amount = '';
    },
    onSubmit () {
      console.log(this.getProviders)

      for(let i = 0; i<this.getProviders.length; i++){
        if(this.getProviders[i].name == this.providerSelect){
          axios.put('http://localhost:3000/providers/' + this.getProviders[i].id, {
            name: this.getProviders[i].name,
            amount: this.amount*1 + this.getProviders[i].amount*1,
          },
          {
            headers:{
              authorization: "bearer " + this.$store.state.access_token
            }
          })
          .then(response => {
            console.log('response',response)
            this.cleanField();
          })
          .catch(error => {
            console.log("error" + error);
          });
        }
      }
      
    },
    
  },
  mounted() {
    api.searchProviders();
  },
}
</script>

<style scoped>




.profile-edit-page-admin{
  
  margin-top: 30px;
  display:flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  height: auto;
  width: 100%;
  /* height: 100vh; */
}
.profile-edit-block-admin{
  display: grid;
  grid-template-columns: 1fr;
  word-break:break-all;
  width:700px;
  box-shadow: var(--theme-box-shadow);
  height: auto;
  align-self: center;
  margin: 30px 10px;
  transition: 0.25s;
  background: var(--theme-background);

}

.form-group-admin{
  display:grid;
  grid-template-columns: 1fr 2fr;
  grid-gap: 1em;
  color: var(--theme-color);
  margin-top: 20px;
}
.buttons-admin{
  display:grid;
  grid-template-columns: 1fr;
}
.button-group-admin{
  display:grid;
  grid-template-columns: 1fr 2fr;
  grid-column-gap:1em;
}
.form-group-admin label{
  justify-self: right;
  font-size: 25px;
  font-weight: bold;
  word-break: normal;  
  text-align: right;
  align-self: end;
  padding-bottom: 5px;
}
.form-group-admin input{
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
.form-group-admin input:focus{
  border-color: #2ecc71;
}
.submit-post-admin{
  justify-self: left;
  color: #3498db;
}
.submit-post-admin:hover{
  color: #2ecc71;
}
.submit-post-admin:active{
  color: #fff;
}
.cancel-admin{
  justify-self: left;
  text-align: center;
  color: #3498db;
}
.cancel-admin:hover{
  border: 2px solid #e85a50;
  color:#e82626;
}
.cancel-admin:active{
  border: 2px solid #e82626;
  background: #e85a50;
  color: #fff;
}
.error-title-admin,.success-title-admin{
  text-align: center;
  background: #e85a50;
  width:100%;
  padding: 20px 0;
}
.success-title-admin{
  background: #2ecc71;
}
.invalid-feedback-admin{
  text-align: left;
}
.show-password-admin{
  right: 0px;
  top: -2px;
}
select{
  border: none;
  background: none;
  border-bottom: 2px solid #3498db;
  outline: none;
  color:var(--theme-color);
  transition: 0.25s;
  font-size: 20px;
  background: var(--theme-background);
  text-align-last:left;
  text-decoration: none;
  width:93%;
}


select:focus{
  border-color: #2ecc71;
}
@media only screen and (max-width: 720px) {
  .profile-edit-block-admin{
    width:95%;
  }
}
@media only screen and (max-width: 635px) {
  .form-group-admin{
    grid-template-columns: 1fr;
    margin: 15px 10px;
  }
  .form-group-admin label{
    justify-self: left;
    padding-bottom: 0;
  }
  
  .profile-edit-main-admin{
    grid-row-gap: 0em;
  }
  .form-group-admin input{
    text-align: left;
    width:100%;
  }
}

@media only screen and (max-width: 425px) {
  .submit-post-admin{
    width:120px;
  }
}
</style>
