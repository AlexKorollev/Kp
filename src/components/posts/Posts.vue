<template>
  <div class="posts">
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
  methods: {
    printPost () {
      this.$store.commit("establishCurrentPage", 1);
      this.$store.commit("establishQuery", this.query);
      api.sendRequest(this.$store.state.query)
      .then(response =>{
        this.$store.commit("changeTotalPosts",response.data.length);
        this.$store.commit("changePosts", response.data || "create ur first post");
        api.refreshPosts(store.state.currentPage)
      });
    }
  },
  created () {
    this.printPost();
  },
  watch: {
    immediate: true,
    query () {
      this.printPost();
    },
  }
}
</script>
<style scoped>
.all-posts{
  width:100%;
  text-align:center;
  border-bottom: 2px solid #ccc;
}
.all-posts>div{
  word-break: break-all;
  padding: 10px 10px;
}
.post-title{
  border-bottom:1px solid #ccc;
  font-size: 20px;
  font-weight: 700;
}
.posts{
  width:301px;
  display: grid;
  grid-template-columns: 1fr;
  margin-top: 20px;
  border: 2px solid #ccc;
  border-radius:5px;
  font-size: 15px;
  justify-items: center;
  background: #efeeee;
  grid-gap:1em;
}
</style>