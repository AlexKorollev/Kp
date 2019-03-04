<template>
  <div class="about-user">
    <h1>Last posts</h1>
    <div>
      <div class="page-buttons">
        <button class="btn btn-page" @click="prevPage()">PREV</button>
        <button class="btn btn-page" @click="nextPage()">NEXT</button>
      </div>
      <p>Page: {{ currentPage }} totalPosts: {{ totalPosts }}</p>
    </div>
    <div v-for="(usersPost, i) in posts" :key="i" class="posts">
      <div class="post-title">{{ usersPost.title }}</div>
      <div>{{ usersPost.post }}</div>
      <br>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  name: 'Posts',
  data() {
    return {
      posts: {},
      title: '',
      post: '',
      currentPage: 1,
      perPage: 5,
      totalPosts: 0
    }
  },
  methods: {
    
    refreshPosts (page) {
      const options = {
        method: 'GET',
        headers: {
          authorization: "bearer " + this.$store.state.access_token
        },
        url: 'http://localhost:3000/posts?_page='+(Math.ceil(this.totalPosts / this.perPage)-page+1)+'&_limit='+this.perPage,
      };
      axios(options)
      .then(response =>{
        this.posts = response.data || "create ur first post";
        this.posts.reverse();
      })
    },
    nextPage () {
      if(this.currentPage !== Math.ceil(this.totalPosts / this.perPage)){
        this.currentPage++;
        this.refreshPosts(this.currentPage);
      }
    },
    prevPage () {
      if(this.currentPage !== 1){
        this.currentPage--;
        this.refreshPosts(this.currentPage);
      }
    },
  },
  created () {
    const options = {
      method: 'GET',
      headers: {
        'Authorization': "bearer " + this.$store.state.access_token
        },
      url: 'http://localhost:3000/posts',
    };
    axios(options)
    .then(response =>{
      this.totalPosts = response.data.length;
      this.refreshPosts(this.currentPage);
    });
  }
}
</script>
<style scoped>
.about-user{
  margin-top: 30px;
  text-align: center;
  border-top: 60px solid crimson;
  display:grid;
  grid-template-columns: 1fr;
  width: 100%;
  justify-items: center;
}
.posts{
  width:301px;
  display: grid;
  grid-template-columns: 1fr;
  margin-top: 20px;
  border: 2px solid black;
  word-break: break-all;
}
.post-title{
  border-bottom:1px solid black;
  font-size: 20px;
}
.page-buttons{
  margin-top: 10px;
  height: 40px;
}
.btn-page{
  border-bottom:2px solid #3498db;
}

</style>
