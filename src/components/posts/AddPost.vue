<template>
  <div class="add-post">
    <div class="posts">
      <input type="text" placeholder="title" v-model="title">
      <textarea placeholder="ur post" v-model="post"></textarea>
      <button class="btn submit submit-post" @click="addPost()">Submit</button>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import api from '../../helpers/api'
import store from '../../store';
export default {
  name: 'AddPosts',
  data() {
    return {
      title: '',
      post: '',
    }
  },
  methods: {
    addPost () {
      axios.post('http://localhost:3000/posts', {
        title: this.title,
        post: this.post,
        userId: this.$store.state.loginId
      },{
          headers: {
            authorization: "bearer " + this.$store.state.access_token
        }
      })
      .then(response =>{
        this.$store.commit("incrementTotalPosts", 1)
        console.log(this.$store.state.limit)
        api.refreshPosts(this.$store.state.limit);
        // store.commit("changeLimit", -10);
        
    })
    },
  }
}
</script>
<style scoped>
.add-post{
  width:100%;
  display:grid;
  grid-template-columns: 1fr;
  justify-items: center;
}
.posts{
  width:301px;
  display: grid;
  grid-template-columns: 1fr;
  border: 2px solid #ccc;
  border-radius:5px;
  font-size: 15px;
  justify-items: center;
  background: #efeeee;
  grid-gap:1em;
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
  border-bottom: 2px solid #ccc;
  background: #efeeee;
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
  margin: 5px 0 19px 0;
  transition: 0.5s;
}
.submit-post:hover{
  border: 2px solid #2ecc71;
  width:200px;
  color: #6b6b6b;
}
@media only screen and (max-width: 425px){
  .submit-post{
    font-size: 20px;
  }
}
</style>
