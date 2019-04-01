<template>
  <div class="about-login">
    <div>
      <div class="home-page">
        <h1>{{ $t('feedPage') }}</h1>
        <h2 v-if="noSubscribers" class="title">{{ $t('noSubscriptions') }}</h2>
        <div class="posts">
          <div class="content" v-if="!pageLoading">
            <SinglePost v-for="(userPost, index) in posts" :key="index" :userPost="userPost" :users="users" :index="index" :id="id"/>
          </div>
          <Loader v-else  class="posts-loading"/>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import SinglePost from ".././components/posts/single-post/SinglePost";
import Loader from '.././components/Loader'
import axios from 'axios';
import store from '../store'
export default {

  components: {
    SinglePost,
    Loader,
  },
  data () {
    return {
      users: [],
      user: '',
      posts: [],
      counter: 0,
      pageLoading: false,
      noSubscribers: false
    }
  },
  props: {
    id: String
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
        this.user = this.users[this.$store.state.loginId-1]
        this.downloadPosts();
      });
    },
    downloadPosts () {
      if(this.user.subscribers.length>0){
        this.user.subscribers.forEach(sub => {
        this.sendRequest(sub);
      })
      }
      else{
        this.pageLoading = false;
        this.noSubscribers = true;
      }
      
    },
    sendRequest (sub) {
      let vm = this;
      const options = {
        method: 'GET',
        headers: {
          'Authorization': "bearer " + store.state.access_token
          },
        url: 'http://localhost:3000/posts?userId='+ sub +'&_embed=likes&_embed=comments&_page=1&_limit=10&_sort=id&_order=desc',
      };
      axios(options)
      .then(response=>{
        response.data.forEach(post => {
        vm.posts.push(post)
        });
        vm.posts.sort((a,b) => b.id-a.id)
        vm.counter+=1;
        if(vm.counter==vm.user.subscribers.length){
          vm.pageLoading = false;
        }
      });
    },
  },
  mounted() {
    this.$store.commit("clearPosts")
    this.searchUsers()
    this.pageLoading = true;
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
.posts{
  grid-template-columns: 1fr 1fr;
  margin-top: 20px;
  border-radius:5px;
  font-size: 15px;
  justify-items: center;
  justify-self: center;
  grid-gap:1em;
  
}

.title{
  width:400px;
  border-radius:2px;
  font-size: 20px;
  border: var(--theme-border-bottom);
  background: var(--theme-background);
  color:var(--theme-color);
  padding: 20px 0;
  text-align: center;
  box-shadow: var(--theme-box-shadow);
  transition: 0.25s;
  font-size: 30px;
  margin-top: 20px;
}
@media only screen and (max-width: 425px){
  .title{
    width:280px;
  }
}
</style>
