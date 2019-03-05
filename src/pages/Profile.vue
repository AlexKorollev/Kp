<template>
  <div class="about-login">
    <h1>Hello dear {{ this.$store.state.loginId }}</h1>
    <AddPost />
    <Pagination />
    <Posts :query="'?userId='+this.$store.state.loginId"/>
  </div>
</template>

<script>
import axios from 'axios';
import Posts from ".././components/posts/Posts";
import Pagination from ".././components/posts/Pagination"
import AddPost from ".././components/posts/AddPost"
import api from '../helpers/api'
import store from '../store'
export default {
  components:{
    Posts,
    Pagination,
    AddPost,
  },
}
</script>

<style scoped>
.about-login{
  margin-top: 30px;
  display: grid;
  grid-template-columns: 1fr;
  width:100%;
  justify-items: center;
  grid-row-gap:1em;
}


</style>
