<template>
  <div class="about-login">
    <div class="profile-page" v-if="users!==''">
      <ProfileInfo :users="users"/>
      <div class="profile-content">
        <AddPost />
        <Posts :query="'?userId='+this.$store.state.loginId" :users="users"/>
      </div>
    </div>
    <Loader v-else class="posts-loading"/>
  </div>
</template>

<script>
import axios from 'axios';
import Posts from ".././components/posts/Posts";
import ProfileInfo from ".././components/ProfileInfo"
import AddPost from ".././components/posts/AddPost"
import store from '../store'
import Loader from '.././components/Loader'
export default {
  components:{
    ProfileInfo,
    Posts,
    AddPost,
    Loader,
  },
  data () {
    return {
      users: '',
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
    this.searchUsers()
  },
}
</script>
<style>
.about-login{
  margin-top: 30px;
  display: grid;
  grid-template-columns: 1fr;
  width:100%;
  grid-row-gap:1em;
}
.about-login h1{
  text-align: center;
}
.profile-page{
  display: grid;
  grid-template-columns: 1fr 2fr;
  grid-column-gap: 4em;
}

@media only screen and (max-width: 920px) {
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
