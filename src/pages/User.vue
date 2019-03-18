<template>
  <div class="about-login">
    <h1>About user {{ id }}</h1>
    <Posts :query="'?userId='+id" :users="users"/>
  </div>
 
</template>

<script>
import axios from 'axios'
import Posts from ".././components/posts/Posts";
import Loader from '.././components/Loader'
import store from '../store'
export default {
  name: 'User',
  components: {
    Posts,
    Loader,
  },
  data() {
    return {
      id: this.$router.currentRoute.params['id'],
      users: [],
    }
  },
  watch: {
    $route (toR, fromR) {
      this.id = toR.params['id']
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
        this.$store.commit("establishQuery", "?userId="+this.id)
        this.users = response.data;
      });
    },
  },
  mounted() {
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
  color: var(--theme-color);
  transition: 0.25s;
}
</style>

