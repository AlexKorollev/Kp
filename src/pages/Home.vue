<template>
  <div class="home-page">
    <div v-if="this.$store.state.login" class="about-login">
      <h1>Last posts</h1>
      <!-- <Pagination /> -->
      <Posts :query="'?'" />
    </div>
    <div v-else class="about-login">
      <h1>Last posts</h1>
      <Posts :query="'?public=true&_page=1&_limit=5&_sort=id&_order=desc'" />
    </div>
  </div>
</template>

<script>
import Posts from ".././components/posts/Posts";
// import Pagination from ".././components/posts/Pagination"
export default {

  components: {
    Posts,
    // Pagination
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
