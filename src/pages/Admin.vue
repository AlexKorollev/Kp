<template>
  <div>
    <h1>Записи клиентов</h1>
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
      <div class="all-price">
        <p>Итого цена: {{getAllPrice}}</p>
      </div>
    </div>
    <div class="" v-else>
      <div class="no-result">
        <h2>Нет совпадений</h2>
      </div>
    </div>
    <ul class="collapsible">
      <FindRecords :records="getRecords"/>
      <SortRecords :records="getRecords"/>
    </ul>
  </div>
</template>

<script>
import axios from 'axios'
import Records from '.././components/Records'
import FindRecords from '.././components/FindRecords'
import SortRecords from '.././components/SortRecords'
export default {
  name: 'Admin',
  components: {
    Records,
    FindRecords,
    SortRecords
  },
  computed: {
    getRecords () {
      return this.$store.state.records
    },
    getAllPrice () {
      let sum = 0;
      this.getRecords.forEach(record => {
        sum += record.price;
      })
      return sum;
    }
  },
  methods: {
    findRecords () {
      const options = {
        method: 'GET',
        headers: {
          'Authorization': "bearer " + this.$store.state.access_token
          },
        url: 'http://localhost:3000/registrations/',
      };
      axios(options)
      .then(response =>{
        this.$store.commit("establishRecords", response.data)
      });
    },
  },
  mounted () {
    this.findRecords();
    M.Collapsible.init(document.querySelector('.collapsible'), {
      accordion: false
    });
  }
}
</script>
<style>
table{
  border-top: 1px solid black;
  border-bottom: 1px solid black;
  border-radius: 4px;
  box-sizing: border-box;
}
.all-price{
  border-bottom: 1px solid black;
  padding: 10px 0 10px 5px;
  font-weight: 700;
}
</style>


