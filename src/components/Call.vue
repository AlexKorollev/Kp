<template>
  <tr>
    <td>{{call.nickname}}</td>
    <td>{{call.phone}}</td>
    <td ><button class="btn" @click="deleteRecord">Удалить</button></td>
  </tr>
</template>

<script>
import axios from 'axios'

export default {
  name: 'Call',
  
  props: {
    call: Object,
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
        url: 'http://localhost:3000/callBacks/'+ this.call.id,
      }
      axios(options)
      .then(response=>{
        this.$store.commit("deleteCalls", this.index);
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


