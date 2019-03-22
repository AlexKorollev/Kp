<template>
  <div class="about-login">
    <div>
      <div v-if="this.$store.state.login" class="home-page">
        <h1>{{ $t('lastPosts') }}</h1>
        <Posts :query="'?'" :users="users"/>
      </div>
      <div v-else class="home-page">
        <h1>{{ $t('lastPosts') }}</h1>
        <Posts :query="'?public=true&_embed=comments&_embed=likes&_page=1&_limit=5&_sort=id&_order=desc'" :users="users"/>
      </div>
    </div>
    
  </div>
</template>

<script>
import Posts from ".././components/posts/Posts";
import Loader from '.././components/Loader'
import axios from 'axios';
import store from '../store'
export default {

  components: {
    Posts,
    Loader
  },
  data () {
    return {
      users: [],
    }
  },
  methods: {
    searchUsers () {
      const options = {
        method: 'GET',
        headers: {
          'Authorization': "bearer " + this.$store.state.access_token
          },
        url: 'http://localhost:3000/users/',
      };
      axios(options)
      .then(response =>{
        store.commit("establishUsers", response.data)
        this.users = response.data;
      });
    },
  },
  mounted() {
    this.$store.commit("clearPosts")
    this.searchUsers()
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
.home-page h1{
  text-align:center;
  color: var(--theme-color);
  transition: 0.25s;
}
</style>
