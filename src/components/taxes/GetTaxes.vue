<template>
  <button class="btn home-page-btn" @click="countTaxes()">Собрать подоходный налог</button>
</template>

<script>
import api from '../../helpers/api'
import axios from 'axios'
export default {

  components: {
  },
  data () {
    return {
      sumOfTaxes: 0,
    }
  },
  computed: {
    getClients () {
      return this.$store.state.clients;
    },
    getTaxes () {
      return this.$store.state.taxes;
    }
  },
  methods: {
    countTaxes () {
      this.getClients.forEach(client => {
        let tax = client.mounthlyRevenue;
        if(client.mounthlyRevenue < 563){
          tax -= 93;
        }
        if(client.pensioner =="Да"){
          tax -= 131;
        }
        if(client.disability =="Да"){
          tax -= 131;
        }
        if(client.familyStatus == "Женат"){
          tax -= 27;
        }
        if(tax>0){
          this.sumOfTaxes += tax;
        }
      });
      this.sumOfTaxes *= 0.13;
      this.collectTaxes();
    },
    collectTaxes () {
       axios.put('http://localhost:3000/tax/1',{
          value: this.getTaxes.value + this.sumOfTaxes,
        },
        {
          headers:{
            authorization: "bearer " + this.$store.state.access_token
          }
        })
        .then(response => {
          console.log('response',response)
        })
        .catch(error => {
          console.log("error" + error);
        });
    }
  },
  mounted() {
    api.searchAllClients();
    api.searchTaxes();
  },
}
</script>

<style scoped>
.home-page-btn{
  width: 284px;
}
</style>
