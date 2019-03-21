<template>
  <div class="about-login">
    <div class="profile-page" v-if="users!==''">
      <ProfileInfo :users="users" :id="id"/>
      <div class="profile-content">
        <Posts :query="'?userId='+id" :users="users"/>
      </div>
    </div>
    <Loader v-else class="posts-loading"/>
  </div>
</template>

<script>
import axios from 'axios'
import Posts from ".././components/posts/Posts";
import ProfileInfo from ".././components/ProfileInfo";
import Loader from '.././components/Loader'
import store from '../store'
export default {
  name: 'User',
  components: {
    Posts,
    Loader,
    ProfileInfo,
  },
  data() {
    return {
      id: this.$router.currentRoute.params['id'],
      users: '',
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
  /* justify-items: center; */
  grid-row-gap:1em;
}
.about-login h1{
  color: var(--theme-color);
  transition: 0.25s;
  text-align: left;
}
.profile-page{
  display: grid;
  grid-template-columns: 1fr 2fr;
  grid-column-gap: 4em;
}
@media only screen and (max-width: 768px) {
  .profile-page{
    grid-template-columns: 1fr;
    grid-gap:2em;
    justify-items: center;
  }
  
}
@media only screen and (max-width: 425px) {
  .profile-page{
    grid-template-columns: 1fr;
    justify-items: center;
  }
}
</style>

