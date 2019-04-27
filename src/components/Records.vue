<template>
  <tr>
    <td>{{record.nickname}}</td>
    <td>{{record.haircut}}</td>
    <td>{{record.haircutMaster}}</td>
    <td>{{record.price}}</td>
    <td>{{record.date}}</td>
    <td>{{record.time}}</td>
    <td ><button class="btn" @click="deleteRecord">Удалить</button></td>
  </tr>
</template>

<script>
import axios from 'axios'

export default {
  name: 'Client',
  data() {
    return {
      deleteClient: false,
      editClient: false
    }
  },
  props: {
    record: Object,
    index: Number
  },
  components: {

  },
  computed: {
  },
  methods: {
    deleteRecord () {
      
      const options = {
        method: 'DELETE',
        headers: {
          'Authorization': "bearer " + this.$store.state.access_token
          },
        url: 'http://localhost:3000/registrations/'+ this.record.id,
      }
      axios(options)
      .then(response=>{
        this.$store.commit("deleteRecords", this.index);
      })
    },
  },
}
</script>
<style scope>
.btn{
  margin: 5px;
}
</style>


