<template>
  <div>
    <h1>Клиенты, которым нужно перезвонить</h1>
    <div class="client-page" v-if="getCalls.length!==0">
      <table class="striped highlight">
        <thead>
          <tr>
            <th>Логин</th>
            <th>Номер</th>
            <th>Действия</th>
          </tr>
        </thead>
        <tbody>
          <Call v-for="(call,index) in getCalls" :index="index" :key="call.id" :call="call"/>
        </tbody>
      </table>
    </div>
    <div class="" v-else>
      <div class="no-result">
        <h2>Нет звонков</h2>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import Call from '../components/Call'

export default {
  name: 'ListOfCalls',
  components: {
    Call
  },
  computed: {
    getCalls () {
      return this.$store.state.calls
    },
    
  },
  methods: {
    
    findCalls () {
      const options = {
        method: 'GET',
        headers: {
          'Authorization': "bearer " + this.$store.state.access_token
          },
        url: 'http://localhost:3000/callBacks',
      };
      axios(options)
      .then(response =>{
        this.$store.commit("establishCalls", response.data)
      });
    },
  },
  mounted () {
    this.findCalls();
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


