<template>
  <div class="about-user">
    <div v-for="(userPost, i) in this.$store.state.posts" :key="i" class="all-posts">
      <div class="post-title">{{ userPost.title || "no title" }}</div>
      <div>{{ userPost.post || "no post"}}</div>
    </div>
  </div>
</template>
<script>
import axios from 'axios'
import api from '../../helpers/api'
import store from '../../store';
export default {
  name: 'NewPosts',
  props: {
    query: String
  },
  created () {
    this.$store.commit("establishCurrentPage", 1);
    this.$store.commit("establishQuery", this.query);
    api.sendRequest(this.$store.state.query)
      .then(response =>{
        this.$store.commit("changeTotalPosts",response.data.length);
        this.$store.commit("changePosts", response.data || "create ur first post");
        api.refreshPosts(store.state.currentPage)
      });
  }
}
</script>
<style scoped>
.about-user{
  margin-top: 30px;
  text-align: center;
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
</style>