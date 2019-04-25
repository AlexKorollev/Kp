<template>
  <div class="pagination">
    <div class="page-buttons">
      <button class="btn btn-page btn-prev-page" @click="prevPage()">Дальше</button>
      <button class="btn btn-page btn-next-page" @click="nextPage()">Назад</button>
    </div>
    <p>Страница: {{ this.$store.state.currentPage }} Количество клиентов: {{ this.$store.state.totalPosts }}</p>
  </div>
</template>
<script>
import axios from 'axios'
import api from '../../helpers/api'
export default {
  name: 'Pagination',
  computed: {
    getSearch () {
      return this.$store.state.search
    }
  },
  methods: {
    nextPage () {
      if(this.$store.state.currentPage !== Math.ceil(this.$store.state.totalPosts / this.$store.state.perPage)){
        this.$store.commit("changeCurrentPage", 1);
        if(!this.getSearch){
          api.searchClients(this.$store.state.currentPage);
        }
        else{
          api.searchClients(this.$store.state.currentPage +'&'+ this.$store.state.searchQuery);
        }
      }
    },
    prevPage () {
      if(this.$store.state.currentPage !== 1){
        this.$store.commit("changeCurrentPage", -1);
        if(!this.getSearch){
          api.searchClients(this.$store.state.currentPage);
        }
        else{
          api.searchClients(this.$store.state.currentPage +'&'+ this.$store.state.searchQuery);
        }
      }
    }
  }
}
</script>
<style scoped>
.pagination{
  margin: 0 10px 10px 10px;
  display:grid;
  border: var(--theme-border-top);
  border-radius:5px;
  grid-gap:1em;
  text-align: center;
  padding: 10px 0;
  background: var(--theme-background);
  color: var(--theme-color);
  width: 300px;
}
.page-buttons{
  height: 40px;
  display:grid;
  grid-template-columns: 1fr 1fr;
  justify-items: center;
  grid-column-gap: 1em;
}
.btn-page{
  border-bottom:2px solid #3498db;
}
.btn-prev-page{
  justify-self: right;
}
.btn-next-page{
  justify-self: left;
}
@media only screen and (max-width: 425px){
  .btn{
    font-size: 20px;
  }
  .pagination{
    margin: 0;
    width: 100%;
  }
}
</style>