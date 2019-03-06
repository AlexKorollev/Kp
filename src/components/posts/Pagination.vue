<template>
  <div class="pagination">
    <div class="page-buttons">
      <button class="btn btn-page" @click="prevPage()">PREV</button>
      <button class="btn btn-page" @click="nextPage()">NEXT</button>
    </div>
    <p>Page: {{ this.$store.state.currentPage }} totalPosts: {{ this.$store.state.totalPosts }}</p>
  </div>
</template>
<script>
import axios from 'axios'
import api from '../../helpers/api'
export default {
  name: 'Pagination',
  methods: {
    nextPage () {
      if(this.$store.state.currentPage !== Math.ceil(this.$store.state.totalPosts / this.$store.state.perPage)){
        this.$store.commit("changeCurrentPage", 1);
        api.refreshPosts(this.$store.state.currentPage);
      }
    },
    prevPage () {
      if(this.$store.state.currentPage !== 1){
        this.$store.commit("changeCurrentPage", -1);
        api.refreshPosts(this.$store.state.currentPage);
      }
    }
  }
}
</script>
<style scoped>
.pagination{
  width:301px;
  display:grid;
  border: 2px solid #ccc;
  border-radius:5px;
  grid-gap:1em;
  text-align: center;
  padding: 10px 0;
  background: #efeeee;
}
.page-buttons{
  height: 40px;
  display:grid;
  grid-template-columns: 1fr 1fr;
  justify-items: center;
}
.btn-page{
  border-bottom:2px solid #3498db;
}
@media only screen and (max-width: 425px){
  .btn{
    font-size: 20px;
  }
}
</style>