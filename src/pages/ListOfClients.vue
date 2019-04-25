<template>
<div>
  <div class="sort-and-search">
    <div class="sort-and-search-buttons">
      <h1 :class="search?'active':'not-active-left'" class="title" @click="changeToSearch()">Поиск сотрудников</h1>
      <h1 :class="sort?'active':'not-active-right'" class="title"  @click="changeToSort()">Сортировка</h1>
    </div>
    <SearchClients :clients="getClients" v-if="search"/>
    <SortClients :clients="getClients" v-if="sort" />
  </div>
  
  <div v-if="getClients.length!==0" class="client-page">
      <table >
        <tr>
          <th></th>
          <th>ФИО</th>
          <th>Дата рождения</th>
          <th>Серия паспорта</th>
          <th>Номер паспорта</th>
          <th>Орган выдачи паспорта</th>
          <th>Дата выдачи</th>
          <th>Место рождения</th>
          <th>Город фактического проживания</th>
          <th>Адрес</th>
          <th>Мобильный</th>
          <th>Домашний</th>
          <th>Email</th>
          <th>Место работы</th>
          <th>Должность</th>
          <th>Статус</th>
          <th>Гражданство</th>
          <th>Инвалидность</th>
          <th>Пенсионер</th>
          <th>Ежемесячный доход</th>
          <th></th>
        </tr>

        <Client v-for="(client,index) in getClients" :index="index" :key="client.id" :client="client"/>
      </table>
    </div>
    <div v-else class="center-block">
      <div class="no-result">
        <h2>Нет совпадений</h2>
      </div>
    </div>
    <div class="center-block">
      <button v-if="hasDelete" class="btn delete-btn" @click="deleteClients()">Удалить -  {{getDeleteClients.length}}</button>
    </div>
    <div class="center-block">
      <Pagination v-if="getTotalClients>3" />
    </div>
  </div>
</template>

<script>
import api from '../helpers/api'
import Client from '../components/client/Client'
import Pagination from '../components/client/Pagination'
import SearchClients from '../components/client/SearchClients'
import SortClients from '../components/client/SortClients'

export default {
  name: 'ListOfClients',
  data() {
    return {
      search: true,
      sort: false
    }
  },
  components: {
    Client,
    Pagination,
    SearchClients,
    SortClients
  },
  computed: {
    getClients () {
      return this.$store.state.clients
    },
    hasDelete () {
      return this.$store.state.deleteClientsArray.length>0
    },
    getDeleteClients () {
      return this.$store.state.deleteClientsArray
    },
    getTotalClients () {
      return this.$store.state.totalPosts;
    }
  },
  methods: {
    scroll () {
      window.onscroll = () => {}
    },
    deleteClients () {
      this.$store.commit("deleteClients");
      api.deleteClients()
    },
    changeToSearch () {
      this.sort = false;
      this.search = true;
    },
    changeToSort () {
      this.sort = true;
      this.search = false;
    }
  },
  mounted () {
    this.scroll()
    api.searchClients(1);
  },
  destroyed() {
    
  }
}
</script>
<style scoped>
.sort-and-search{
  margin-top: 10px;
  width: 100%;
  display: flex;
  justify-content: center;
  flex-direction: column;
}
.sort-and-search .sort-and-search-buttons{
  display: grid;
  grid-template-columns: 1fr 1fr;
  width:700px;
  align-self: center;
  
}
.sort-and-search-buttons h1{
  width: 350px;
  color: var(--theme-color);
  border: var(--theme-border-top);
  border-bottom: none;
  box-sizing: border-box;
}
.sort-and-search-buttons h1:first-child{
  border-top-left-radius: 5px;
  border-right: none;
}
.sort-and-search-buttons h1:last-child{
  border-top-right-radius: 5px;
  border-left: none;
}
.client-page{
  margin: 0 10px 30px 10px;
  display: flex;
  max-width: 100%;
  overflow-x: scroll;
  overflow-y: hidden;
  color: var(--theme-color);
  border-top: var(--theme-border-top);
  border-bottom: var(--theme-border-bottom);
  
}

.client-page table{
  border-collapse: collapse;
} 
.client-page th{
  border: var(--theme-border-bottom);
  padding: 0 10px;
  background: var(--theme-header-background);
   
}
.center-block{
  width: 100%;
  display: flex;
  justify-content: center;
}
.delete-btn{
  color: #ef4135;
  border: 2px solid #ef4135;
  border-radius: 5px;
  padding: 5px 10px;
  margin: 0 0 30px 0;
  
}
.delete-btn:hover{
  color: #fff;
  background:#ef4135;
}
.no-result{
  width:400px;
  border-radius:2px;
  font-size: 20px;
  border: var(--theme-border-bottom);
  background: var(--theme-background);
  color:var(--theme-color);
  padding: 20px 0;
  text-align: center;
  box-shadow: var(--theme-box-shadow);
  transition: 0.25s;
}
.active{
  background: var(--theme-background);
  box-shadow: none;
}
.not-active-left,.not-active-right{
  box-sizing: border-box;
  border-left: 1px solid var(--theme-background);
  border-bottom: 1px solid var(--theme-background);
  background-color: var(--theme-table-two);
  box-shadow: var(--theme-sort-and-search-box-shadow-right);
}
.not-active-left{
  box-shadow: var(--theme-sort-and-search-box-shadow-left);

}
@media only screen and (max-width: 720px) {
  .sort-and-search .sort-and-search-buttons{
    width:95%;
  }
  .sort-and-search-buttons h1{
    width: 100%;
    
  }
}
@media only screen and (max-width: 635px) {
  
  .sort-and-search-buttons h1{
    font-size: 20px;
  }
}

@media only screen and (max-width: 425px) {
  
  .sort-and-search .sort-and-search-buttons{
    margin: 0;
    width:100%;
  }
  /* .sort-and-search{
    margin-bottom: 10px;
  } */
  .sort-and-search-buttons h1{
    font-size: 16px;
  }
  .no-result{
    margin-top: 20px;
    width:100%;
    box-sizing: border-box;
    box-shadow: none;
  }
  .client-page{
    margin: 10px 0;
    
  }
  .title{
    padding: 10px 0;
  }
}

</style>


