<template>
  <div class="center-block">
    <div class="profile-edit-block-admin">
      <h2 v-if="selectError" class="error-title">Вы не выбрали поле</h2>
      <div class="profile-edit-main-admin">
        <div class="form-group-admin">
          <label for="search">Поле для поиска</label>
          <div>
            <select name="search" id="search" v-model="fuild"> 
              <option disabled value="">Выберете поле для поиска</option>
              <option value="lastName">Фамилия</option>      
              <option value="firstName">Имя</option>
              <option value="patronymic">Отчество</option>
              <option value="dateOfBirth">Дата рождения</option>
              <option value="passportSeries">Серия паспорта</option>
              <option value="passportNumber">Номер паспорта</option>
              <option value="authority">Орган выдачи паспорта</option>
              <option value="dateOfIssue">Дата выдачи</option>
              <option value="indentificationNumber">Иденцификационный номер</option>
              <option value="birthPlace">Город прописки</option>
              <option value="city">Место рождения</option>
              <option value="residenceCity">Город факт. проживания</option>
              <option value="address">Адрес</option>
              <option value="mobileNumber">Моб.номер</option>
              <option value="homeNumber">Дом.номер</option>
              <option value="email">Имейл</option>
              <option value="job">Место работы</option>
              <option value="post">Должность</option>
              <option value="familyStatus">Семейный статус</option>
              <option value="nationality">Гражданство</option>
              <option value="disability">Инвалидность</option>
              <option value="pensioner">Пенсионер</option>
              <option value="mounthlyRevenue">Ежемесячный доход</option>
            </select>
          </div>
        </div>
        <div class="form-group-admin">
          <label for="addPassword">Строка поиска</label>
          <div>
            <input type="search" name="" id="" v-model="search" autocomplete="off">
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import api from '../../helpers/api'
import _debounce from 'lodash.debounce';
import axios from 'axios';

export default {
  name: 'SearchClients',
  data() {
    return {
      search: '',
      fuild: '',
      selectError: false
    }
  },
  props: {
    clients: Array,
  },
  components: {
  },
  computed: {
    getClients () {
      return this.$store.state.clients
    },
    getTotalClients () {
      return this.$store.state.totalPosts;
    },
  },
  methods: {
    searchClientsByFuild () {
      this.selectError = false;
      if(this.fuild.length==0){
        this.selectError = true;
      }
      else{
        this.$store.commit("establishCurrentPage",1)
        // if(this.search.length!==0){
        //   this.$store.commit('changeSearch',true)
        //   this.$store.commit('changeSearchQuery', this.fuild +'_like='+ this.search)
        // }
        // else{
        //   this.$store.commit('changeSearch',false)
        //   this.$store.commit('changeSearchQuery', '')
        // }
        const options = {
          method: 'GET',
          headers: {
            'Authorization': "bearer " + this.$store.state.access_token
            },
          url: 'http://localhost:3000/clients?' + this.fuild +'_like='+ this.search + '&_page='+this.$store.state.currentPage + '&_limit='+ this.$store.state.perPage,
        };
        
        axios(options)
        .then(response =>{
          console.log(response)
          this.$store.commit('searchClients',response.data)
          this.$store.commit("changeTotalPosts", response.headers['x-total-count'])
          
        });
      } 
    },
  },
  mounted () {
  },
  created () {
    this.debounceFunc = _debounce(this.searchClientsByFuild, 500);
  },
  watch: {
    search: function () {
      this.debounceFunc()
    },
  },
}
</script>
<style scoped>
.center-block{
  width: 100%;
  display: flex;
  justify-content: center;
  
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
  width: 93%;
}

select:focus{
  border-color: #2ecc71;
  max-height: 300px;
}
.profile-edit-main-admin{
  padding-bottom: 20px;
  border: var(--theme-border-top);
  border-top: none;
  /* box-shadow: var(--theme-box-shadow); */

}
.profile-edit-block-admin{
  display: grid;
  grid-template-columns: 1fr;
  word-break:break-all;
  width:700px;
  height: auto;
  align-self: center;
  margin-bottom: 30px;
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
.error-title{
  text-align: center;
  background: #e85a50;
  width:100%;
  padding: 20px 0;
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
  .form-group-admin input, select{
    text-align: left;
    width:100%;
  }
}

@media only screen and (max-width: 425px) {
  .submit-post-admin{
    width:120px;
  }
  .profile-edit-block-admin{
    margin: 0;
    width:100%;

  }
}
</style>


