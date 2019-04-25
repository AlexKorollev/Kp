<template>
<div>
  <div class="provider-page" id="print">
    <table >
      <tr>
        <th>Провайдер</th>
        <th>Переведенно денег</th>
      </tr>

      <Provider v-for="(provider,index) in getProviders" :index="index" :key="provider.id" :provider="provider"/>
    
      <tr>
        <td class="bold">Итого:</td>
        <td class="bold">{{getProvidersSum}}</td>
      </tr>
    </table>
  </div>
  <div class="provider-page">
    <button class="btn submit-post submit-post-admin" @click="download()">Печать</button>

  </div>
  </div>
</template>

<script>
import api from '../helpers/api'
import Provider from '../components/provider/Provider'
import $ from 'jquery';
import html2canvas from 'html2canvas'
import * as jsPDF from 'jspdf'
export default {
  name: 'ProvidersList',
  data() {
    return {
    }
  },
  components: {
    Provider
  },
  computed: {
    getProviders () {
      return this.$store.state.providers
    },
    getProvidersSum () {
      console.log("ok")
      let buff = this.$store.state.providers;
      let sum = 0;
      buff.forEach(provider => {
        sum += provider.amount
      });
      return sum;
    }
  },
  methods: {
    scroll () {
      window.onscroll = () => {}
    },
    download(){
      var divContents = $("#print").html();
      var printWindow = window.open('', '', 'height=400,width=800');
      printWindow.document.write('<html><head><title>Proveders</title>');
      printWindow.document.write('</head><body >');
      printWindow.document.write(divContents);
      printWindow.document.write('</body></html>');
      printWindow.document.close();
      printWindow.print();
    },
    
  },
  mounted () {
    this.scroll()
    api.searchProviders();
  }
}
</script>
<style scoped>
.provider-page{
  padding: 30px 10px 0 10px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  color: var(--theme-color);
}
.provider-page table{
  border-collapse: collapse;
  width: 100%;
  text-align: left;
} 
.provider-page th{
  text-align: center;
  border: var(--theme-border-bottom);
  background: var(--theme-header-background);
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
.bold{
  font-weight: 700;
}
</style>


