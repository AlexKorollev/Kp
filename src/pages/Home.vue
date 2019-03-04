<template>
  <div>
    <h1>4ernii poyas po Vue (net)</h1>
    <AllPosts v-if="this.$store.state.login" />
    <UnloginPosts v-else />
  </div>
</template>

<script>
import AllPosts from ".././components/AllPosts"
import UnloginPosts from ".././components/UnloginPosts"
export default {
  components: {
    AllPosts,
    UnloginPosts
  }
}
</script>

<style scoped>
h1{
  text-align: center;
}
</style>
