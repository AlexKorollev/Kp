<template>
  <div>
    <h1>About user {{ id }}</h1>
    <Pagination />
    <Posts :query="'?userId='+this.id"/>
  </div>
</template>

<script>
import axios from 'axios'
import Posts from ".././components/posts/Posts";
import Pagination from ".././components/posts/Pagination"
export default {
  name: 'User',
  components: {
    Pagination,
    Posts,
  },
  data() {
    return {
      id: this.$router.currentRoute.params['id']
    }
  },
  watch: {
    $route (toR, fromR) {
      this.id = toR.params['id']
    },
    Posts
  }
}
</script>
<style scoped>
h1{
  text-align: center;
}
</style>

