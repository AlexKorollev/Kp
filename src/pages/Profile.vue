<template>
  <div>
    <h1 class="about-login">Hello dear {{ this.$store.state.loginId }}</h1>
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
h1{
  text-align: center;
}
.about-login{
  margin-top: 30px;
  text-align: center;
  padding:20px;
  border-bottom: 60px solid crimson;
}


</style>
