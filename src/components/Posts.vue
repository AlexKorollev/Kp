<template>
  <div class="about-user">
    <h1>Hello user {{ getLoginId }}</h1>
    <div class="posts">
      <input type="text" placeholder="title" v-model="title">
      <textarea placeholder="ur post" v-model="post"></textarea>
      <button class="btn submit submit-post" @click="addPost()">Submit</button>
    </div>
    <div>
      <div class="page-buttons">
        <button class="btn btn-page" @click="prevPage()">PREV</button>
        <button class="btn btn-page" @click="nextPage()">NEXT</button>
      </div>
      <p>Page: {{ currentPage }} totalPosts: {{ totalPosts }}</p>
    </div>
    <div v-for="(userPost, i) in posts" :key="i" class="all-posts">
      <div class="post-title">{{ userPost.title }}</div>
      <div>{{ userPost.post }}</div>
      <br>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import api from '../helpers/api'
console.log(api.sendRequest)
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
  computed: {
    getLoginId () {
      return this.$store.state.loginId;
    }
  },
  props: {
    
  },
  methods: {
    addPost () {
      axios.post('http://localhost:3000/posts', {
        title: this.title,
        post: this.post,
        userId: this.getLoginId
      },{
          headers: {
            authorization: "bearer " + this.$store.state.access_token
        }
      })
      .then(response =>{
        this.totalPosts++;
        this.refreshPosts(this.currentPage);
    })
    },
    refreshPosts (page) {
      const options = {
        method: 'GET',
        headers: {
          authorization: "bearer " + this.$store.state.access_token
        },
        url: 'http://localhost:3000/posts?userId='+this.getLoginId+'&_page='+(Math.ceil(this.totalPosts / this.perPage)-page+1)+'&_limit='+this.perPage,
      };
      axios(options)
      .then(response =>{
        this.posts = response.data || "create ur first post";
        this.posts.reverse();
      })
    //   axios.get('http://localhost:3000/posts?userId='+this.getLoginId+'&_page='+(Math.ceil(this.totalPosts / this.perPage)-page+1)+'&_limit='+this.perPage)
    //   .then(response =>{
    //     this.posts = response.data || "create ur first post";
    //     this.posts.reverse();
    // })
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
    // const options = {
    //   headers: this.$store.state.access_token
    // }
    // axios.get('http://localhost:3000/posts?userId='+this.getLoginId, options)
    // .then(response =>{
    //   console.log(response)
    //   this.totalPosts = response.data.length;
    //   this.refreshPosts(this.currentPage);
    // })
    // const options = {
    //   method: 'GET',
    //   headers: {
    //     'Authorization': "bearer " + this.$store.state.access_token
    //     },
    //   url: 'http://localhost:3000/posts?userId='+this.getLoginId,
    // };
    // axios(options)
    // .then(response =>{
    //   this.totalPosts = response.data.length;
    //   this.refreshPosts(this.currentPage);
    // });
    api.sendRequest('userId='+this.getLoginId+'&_page=1&_limit=5&_sort=id&_order=desc')
      .then(response =>{
        this.totalPosts = response.data.length;
        this.posts = response.data
        // this.refreshPosts(this.currentPage);
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
.posts,.all-posts{
  width:301px;
  display: grid;
  grid-template-columns: 1fr;
  margin-top: 20px;
  border: 2px solid black;
  font-size: 15px;
}
.all-posts{
  word-break: break-all;
}
.posts{
  justify-items: center;

}
.post-title{
  border-bottom:1px solid black;
  font-size: 20px;
}
.posts input{
  height: 40px;
  font-size: 20px;
}
.posts textarea, .posts input{
  outline: none;
  text-align: center;
  width:100%;
  border:none;
  border-bottom: 2px solid black;
}
textarea{
  height: 120px;
  box-sizing: border-box;
  resize: vertical;
  text-decoration: none;
  font-size: 15px;
}
.submit-post{
  height: 45px;
  border: 2px solid #3498db;
  width:150px;
  justify-items: center;
  border-radius: 24px;
  margin: 20px 0;
  transition: 0.5s;
}
.submit-post:hover{
  border: 2px solid #2ecc71;
  width:200px;
}
.page-buttons{
  margin-top: 10px;
  height: 40px;
}
.btn-page{
  border-bottom:2px solid #3498db;
}

</style>
