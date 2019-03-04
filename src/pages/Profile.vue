<template>
  <div>
    <h1 class="about-login">Hello dear - {{ name.firstName }} - {{ getLoginName }}</h1>
  <Pagination />
  <NewPosts />
  </div>
</template>

<script>
import Posts from ".././components/Posts";
import axios from 'axios';
import NewPosts from ".././components/posts/NewPosts";
import Pagination from ".././components/posts/Pagination"
export default {
  components:{
    Posts,
    NewPosts,
    Pagination
  },
  data () {
    return {
      name: {}
    }
  },
  computed: {
    getLoginName () {
      return this.$store.state.loginName
    }
  },
  created () {
    axios.get('http://localhost:3000/users/1')
    .then(response =>{
      this.name = response.data;
    })
  }
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
