<template>
  <div class="posts">
    <div class="content" v-if="!pageLoading">
      <div v-for="(userPost, i) in this.$store.state.posts" :key="i" class="all-posts">
        <div class="post-title">{{ userPost.title || "no title" }}</div>
        <div>{{ userPost.post || "no post"}}</div>
        <div v-if="path == '/profile'" @click="deletePost(userPost.id)" class="delete-post"> Delete {{ userPost.id }}</div>
        <div v-if="login"><router-link class="" :to="'/user/'+ userPost.userId">{{users[userPost.userId-1].firstName}}</router-link></div>
      </div>
    </div>
    <Loader v-if="isLoading" />
    <div v-if="Object.keys(this.$store.state.posts).length == 0 && !this.$store.state.loading"><h2>No posts</h2></div>
    
  </div>
</template>
<script>
import axios from 'axios'
import api from '../../helpers/api'
import store from '../../store';
import Loader from '../Loader'
export default {
  name: 'NewPosts',
  props: {
    query: String
  },
  components: {
    Loader
  },
  data() {
    return {
      path: this.$router.currentRoute.path,
      login: this.$store.state.login,
      users: this.$store.state.users,
      pageLoading: true,
    }
  },
  computed: {
    isLoading(){
      return this.$store.state.loading
    }
  },
  methods: {
    // isLoading (bool) {
    //   this.loading = bool;
    // },
    printPost () {
      this.$store.commit("changePosts", {})
      this.$store.commit("changeLoading", true)
      this.pageLoading = true;
      this.$store.commit("establishQuery", this.query);
      api.refreshPosts(store.state.limit)
      this.pageLoading = false
    },
    deletePost(id){
      api.deletePost(id);
    },
    scroll (userPost) {
      if((window.innerHeight >= document.documentElement.offsetHeight) && ((this.$store.state.counter * 10 - this.$store.state.totalPosts)<0)){
        this.changeVars();
      }
      window.onscroll = () => {
        let bottomOfWindow = Math.floor(document.documentElement.scrollTop) + 10 + window.innerHeight >= document.documentElement.offsetHeight;
        if (bottomOfWindow && ((this.$store.state.perPage - this.$store.state.totalPosts)<0) && !this.$store.state.loading) {
          this.changeVars();
        }
      };
    },
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
    changeVars () {
      this.$store.commit("changePerPage", 10);
      this.$store.commit("changeLoading", true)
      this.$store.commit("establishQuery", this.query);
      this.$store.commit("changeLimit", 10);
      api.refreshPosts(store.state.limit)
      console.log(store.state.limit)
      console.log(this.$store.state.totalPosts)
    },
  },
  created () {
    
    this.$store.commit("establishLimit", 10);
    this.printPost();
  },
  watch: {
    immediate: true,
    query () {
      this.printPost();
    },
  },
  mounted() {
    
    this.searchUsers('/')
    this.scroll(this.userPost);
    scroll(0,0);
  },
}
</script>
<style scoped>
.content{
  width:100%;
}
.all-posts{
  width:100%;
  text-align:center;
  border: 2px solid #ccc;
  background: #efeeee;
  border-radius:5px;
  margin-top:10px;
}
.all-posts>div{
  word-break: break-all;
  padding: 10px 10px;
}
.post-title{
  border-bottom:1px solid #ccc;
  font-size: 20px;
  font-weight: 700;
  background: #3498db;
}
.posts{
  width:301px;
  display: grid;
  grid-template-columns: 1fr;
  margin-top: 20px;
  border-radius:5px;
  font-size: 15px;
  justify-items: center;
  grid-gap:1em;
}
.delete-post{
  /* background:crimson; */
  cursor: pointer;
  text-transform: uppercase;
  font-weight: 700;
  font-size: 20px;
  color:crimson;
  border-top: 2px solid #ccc;
}

</style>