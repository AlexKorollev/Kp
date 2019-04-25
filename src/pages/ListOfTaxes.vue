<template>
  <div>
    <div class="client-page" id="print" v-if="!loading">
      <table >
        <tr>
          <th>Ф.И.О.</th>
          <th>Зароботная плата</th>
          <th>Налог</th>
        </tr>

        <tr  v-for="(client,index) in getClients" :key="client.id" :class="(index % 2 == 0)?'client-page-row':'client-page-second-row'">
          <td>{{client.lastName + "\n" + client.firstName + "\n" + client.patronymic}}</td>
          <td class="center">{{client.mounthlyRevenue}}</td>
          <td class="center">{{taxes[index]}}</td>
        </tr>
        <tr >
          <td class="bold ">Итого:</td>
          <td class="bold center" >{{getSumOfMounthlyRevenue}}</td>
          <td class="bold center">{{getSumOfTaxes}}</td>
        </tr>
        
      </table>
      <p class="all-taxes">Собранный налог за всё время - {{getAllTaxes}}</p>

      </div>
      <Loader v-else/>

      <div class="client-page-btn">
        <button class="btn submit-post submit-post-admin" @click="download()">Печать</button>
      </div>
  </div>
</template>

<script>
import api from '../helpers/api'
import Pagination from '../components/client/Pagination'
import Loader from '../components/Loader'
import $ from 'jquery';
import axios from 'axios'


export default {
  name: 'ListOfTaxes',
  data() {
    return {
      sumOfTaxes: 0,
      taxes: [],
      loading: true,
    }
  },
  components: {
    Loader
  },
  computed: {
    getClients () {
      return this.$store.state.clients;
    },
    getAllTaxes () {
      return this.$store.state.taxes.value;
    },
    getSumOfMounthlyRevenue () {
      let sum = 0;
      this.getClients.forEach(client => {
        sum += client.mounthlyRevenue;
      })
      return sum;
    },
    getSumOfTaxes () {
      return this.taxes.reduce((tax,sum) => sum += tax, 0)
    }
  },
  methods: {
    download(){
      var divContents = $("#print").html();
      var printWindow = window.open('', '', 'height=400,width=800');
      printWindow.document.write('<html><head><title>Taxes</title>');
      printWindow.document.write('</head><body >');
      printWindow.document.write(divContents);
      printWindow.document.write('</body></html>');
      printWindow.document.close();
      printWindow.print();
    },
    countTaxes () {
      if(!this.getClients){
        this.loading = true;
      }
      else{
        for(var i=0; i<this.getClients.length; i++){
          var tax = this.getClients[i].mounthlyRevenue;
          if(this.getClients[i].mounthlyRevenue < 563){
            tax -= 93;
          }
          if(this.getClients[i].pensioner =="Да"){
            tax -= 131;
          }
          if(this.getClients[i].disability =="Да"){
            tax -= 131;
          }
          if(this.getClients[i].familyStatus == "Женат"){
            tax -= 27;
          }
          if(tax>0){
            tax *= 0.13;
          }
          else{
            tax = 0;
          }

          this.taxes.push(tax);
          tax = 0;
        }
      }
      
    },
    searchTaxes () {
      const options = {
        method: 'GET',
        headers: {
          'Authorization': "bearer " + this.$store.state.access_token
          },
        url: 'http://localhost:3000/tax/1',
      };
      axios(options)
      .then(response =>{
        this.$store.commit("establishTaxes", response.data)
        this.countTaxes();
        this.loading = false;        

      });
    },
  },
  mounted () {
    api.searchAllClients();
    this.searchTaxes();
  },
}
</script>
<style scoped>
.client-page{
  margin: 30px 10px;
  display: flex;
  color: var(--theme-color);
  flex-direction: column;
}
.client-page table{
  border-collapse: collapse;
  width: 100%;
} 
.client-page th,.all-taxes{
  border: var(--theme-border-bottom);
  padding: 0 10px;
  background: var(--theme-header-background);
   
}
.all-taxes{
  padding: 20px 10px;
  margin-top: 10px;
}
.delete-btn-block{
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
.submit-post-admin{
  padding: 5px 0;
  color: #3498db;
}
.submit-post-admin:hover{
  color: #2ecc71;
}
.submit-post-admin:active{
  color: #fff;
}

.client-page-btn{
  margin: 30px 10px;
  display: flex;
  flex-direction: center;
  width: calc(100% - 20px);
  justify-content: center;
}
td{
  border: var(--theme-border-bottom);
  padding: 0 10px;
}

.client-page-row{
  background: var(--theme-table-two);

}
.client-page-second-row{
  background: var(--theme-header-background);

}
</style>


