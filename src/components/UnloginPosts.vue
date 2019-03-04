<template>
  <div class="about-user">
    <h1>Last posts</h1>
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
    }
  },
  
  created () {
    axios.get('http://localhost:3000/posts?public=true&_page=1&_limit=5&_sort=id&_order=desc')
    .then(response =>{
        this.posts = response.data || "create ur first post";
      })
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
  justify-self: center;
}
.post-title{
  border-bottom:1px solid black;
  font-size: 20px;
}
</style>
