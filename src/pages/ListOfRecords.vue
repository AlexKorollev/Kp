<template>
  <div>
  
    <h1>Ваши записи</h1>
    <div class="client-page" v-if="getRecords.length!==0">
      <table class="striped highlight">
        <thead>
          <tr>
            <th>Ваш логин</th>
            <th>Услуга</th>
            <th>Мастер</th>
            <th>Цена</th>
            <th>Дата</th>
            <th>Время</th>
            <th>Действия</th>
          </tr>
        </thead>
        <tbody>
          <Records v-for="(record,index) in getRecords" :index="index" :key="record.id" :record="record"/>
        </tbody>
      </table>
    </div>
    <div class="" v-else>
      <div class="no-result">
        <h2>Нет совпадений</h2>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import Records from '../components/Records'

export default {
  name: 'ListOfRecords',
  data() {
    return {
    }
  },
  components: {
    Records
  },
  computed: {
    getRecords () {
      return this.$store.state.records
    },
    
  },
  methods: {
    
    findRecords () {
      const options = {
        method: 'GET',
        headers: {
          'Authorization': "bearer " + this.$store.state.access_token
          },
        url: 'http://localhost:3000/registrations?nickname_like='+this.$store.state.loginName,
      };
      axios(options)
      .then(response =>{
        this.$store.commit("establishRecords", response.data)
      });
    },
  },
  mounted () {
    this.findRecords();
  },
}
</script>
<style scoped>
table{
  border-top: 1px solid black;
  border-bottom: 1px solid black;
  border-radius: 4px;
  box-sizing: border-box;
}

</style>


