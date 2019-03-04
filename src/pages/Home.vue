<template>
  <div>
    <h1>Last posts</h1>
    <div v-if="this.$store.state.login">
      <Pagination />
      <Posts :query="'?'" />
    </div>
    <div v-else>
      <Posts :query="'?public=true&_page=1&_limit=5&_sort=id&_order=desc'" />
    </div>
  </div>
</template>

<script>
import AllPosts from ".././components/AllPosts"
import UnloginPosts from ".././components/UnloginPosts"
import Posts from ".././components/posts/Posts";
import Pagination from ".././components/posts/Pagination"
export default {
  
  components: {
    AllPosts,
    UnloginPosts,
    Posts,
    Pagination
  },
}
</script>

<style scoped>
h1{
  text-align: center;
}
</style>
