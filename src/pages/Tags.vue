<template>
  <div class="about-login">
    <h1>#{{ tag }}</h1>
    <div class="profile-content" v-if="users!==''">
      <Posts :query="'?tags_like='+tag" :users="users"/>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import Posts from ".././components/posts/Posts";
import Loader from '.././components/Loader'
import store from '../store'
export default {
  name: 'Tags',
  components: {
    Posts,
    Loader,
  },
  data() {
    return {
      tag: this.$router.currentRoute.params['tag'],
      users: '',
    }
  },
  watch: {
    $route (toR, fromR) {
      this.tag = toR.params['tag']
    },
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
        this.$store.commit("establishQuery", "?tags_like="+this.tag)
        this.users = response.data;
      });
    },
  },
  mounted() {
    this.$store.commit("establishQuery")
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
.about-login h1{
  text-align:center;
  color: var(--theme-color);
  transition: 0.25s;
}

</style>

