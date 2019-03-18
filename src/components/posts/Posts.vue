<template>
  <div class="posts">
    <div class="content" v-if="!pageLoading && users.length!==0">
      <SinglePost v-for="(userPost, index) in posts" :key="index" :userPost="userPost" :users="users" :index="index"/>
    </div>
    <Loader v-if="isLoading && query!='?public=true&_page=1&_limit=5&_sort=id&_order=desc'" class="posts-loading"/>
    <NoPosts v-if="Object.keys(this.$store.state.posts).length == 0 && !this.$store.state.loading" />
  </div>
</template>
<script>
import axios from 'axios'
import api from '../../helpers/api'
import store from '../../store';
import Loader from '../Loader'
import SinglePost from './single-post/SinglePost'
import NoPosts from './NoPosts'
export default {
  name: 'NewPosts',
  props: {
    query: String,
    users: Array,
  },
  components: {
    Loader,
    SinglePost,
    NoPosts
  },
  data() {
    return {
      pageLoading: true,
    }
  },
  computed: {
    isLoading(){
      return this.$store.state.loading
    },
    posts() {
      return this.$store.state.posts
    }
  },
  methods: {
    printPost () {
      console.log("print")
      api.refreshPosts(store.state.currentPage)
      this.pageLoading = false
    },
    scroll () {
      // if((window.innerHeight >= document.documentElement.offsetHeight) && ((this.$store.state.counter * 10 - this.$store.state.totalPosts)<0)){
      //   console.log("na down")
      //   this.downloadPosts();
      // }
      window.onscroll = () => {
        let bottomOfWindow = Math.floor(document.documentElement.scrollTop) + 10 + window.innerHeight >= document.documentElement.offsetHeight;
        if (bottomOfWindow && ((Object.keys(this.$store.state.posts).length - this.$store.state.totalPosts)<0) && !this.$store.state.loading) {
          console.log("scroll")
          this.downloadPosts();
        }
      };
    },
    downloadPosts () {
      console.log("down")
      this.$store.commit("changeLoading", true)
      this.$store.commit("changeCurrentPage", 1);
      api.refreshPosts(store.state.currentPage)
    },
  },
  created () {
    
  },
  watch: {
    query () {
      this.$store.commit("clearPosts");
      this.$store.commit("establishQuery", this.query);
      this.printPost();
    },
  },
  mounted() {
    this.$store.commit("changeLoading", true)
    this.$store.commit("clearPosts");
    this.$store.commit("establishCurrentPage", 1);
    this.$store.commit("establishQuery", this.query);
    this.scroll();
    this.printPost();
  },
}
</script>
<style scoped>
.posts{
  grid-template-columns: 1fr 1fr;
  margin-top: 20px;
  border-radius:5px;
  font-size: 15px;
  justify-items: center;
  justify-self: center;
  grid-gap:1em;
  
}
.content{
  width:100%;
}
.posts-loading{
  width: 400px;
}
@media only screen and (max-width: 425px) {
  .posts-loading{
    width: 280px;
  }
}
</style>