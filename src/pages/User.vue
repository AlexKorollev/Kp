<template>
  <div class="about-login">
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
  }
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

