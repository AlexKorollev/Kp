<template>
  <div class="single-post">
    <div class="post-content">
      <router-link :to="'/user/'+ userPost.userId" class="post-avatar"><img class="avatar-img" :src="users[userPost.userId-1].avatar"></router-link>
      <div class="post-main-content">
        <div class="post-title">
          <router-link class="post-title-name" :to="'/user/'+ userPost.userId">{{users[userPost.userId-1].firstName}} {{users[userPost.userId-1].lastName}}</router-link>
          <div v-if="path == '/profile'" class="post-title-icon" @click="openDropSettings">
            <img src="/src/assets/download.png" width="15" height="15" alt="">
          </div>
          <DropSettings class="drop-settings" :visibleStatus="visibleStatus" @close="closeDropSettings" :userPost="userPost" :index="index">qwe</DropSettings>
        </div>
        <div class="post-body">{{ userPost.post || "no post"}}</div>
      </div>
    </div>
    <div class="post-footer"></div>
  </div>
</template>
<script>
import api from '../../../helpers/api'
import DropSettings from './DropSettings'
export default {
  name: 'SinglePost',
  props: {
    users: Array,
    userPost: Object,
    index: Number
  },
  components: {
    DropSettings
  },
  data() {
    return {
      visibleStatus: false,
      path: this.$router.currentRoute.path,
    }
  },
  computed: {
    getMode () {
      if ((localStorage.getItem('mode') || 'dark') === 'dark'){
        let singlePosts = document.querySelectorAll('div > .single-post')
        let singlePostsAvatars = document.querySelectorAll('div > .post-avatar > img');
        let singlePostsTitle = document.querySelectorAll('div > .post-title-name')
        for(let i=0;i<singlePosts.length;i++){
          singlePosts[i].classList.add('dark-single-post')
          singlePostsAvatars[i].classList.add('dark-post-avatar')
          singlePostsTitle[i].classList.add('dark-post-title-name')
        }
      }
      else{
        let singlePosts = document.querySelectorAll('div > .single-post')
        let singlePostsAvatars = document.querySelectorAll('div > .post-avatar > img');
        let singlePostsTitle = document.querySelectorAll('div > .post-title-name')
        for(let i=0;i<singlePosts.length;i++){
          singlePosts[i].classList.remove('dark-single-post')
          singlePostsAvatars[i].classList.remove('dark-post-avatar')
          singlePostsTitle[i].classList.remove('dark-post-title-name')
        }
      }
    },
    mode () {
      return this.$store.state.mode;
    }
  },
  methods: {
    
    openDropSettings () {
      this.visibleStatus = true;
    },
    closeDropSettings () {
      this.visibleStatus = false;
    },
    openModal () {
      this.modalOpened = true;
    },
    closeModal () {
      this.modalOpened = false;
    },
    logOut () {
      localStorage.removeItem(this.$store.state.STORAGE_KEY);
      this.$store.commit("changeLogin", false);
      this.$store.commit("establishQuery", '?public=true&_page=1&_limit=5&_sort=id&_order=desc')
    },

  },
  watch: {
    
  },
  mounted () {
    this.getMode;
  }
}

</script>
<style scoped>
.single-post{
  /* max-width:400px; */
  width:400px;
  border-radius:2px;
  font-size: 15px;
  border-top: 2px solid #ccc;
  border-bottom: 2px solid #ccc;
  background: #efeeee;
  /* margin-top: 20px; */
  margin-bottom:20px;
  color:#4e4343;
}
.dark-single-post{
  background: rgb(21, 32, 43);
  border-bottom: 2px solid rgb(56, 68, 77);
  border-top: 2px solid rgb(56, 68, 77);
  color:#fff;
}
.post-content{
  display: grid;
  grid-template-columns: 1fr 4fr;
  margin: 5px 0;
}
.avatar-img{
  width: 50px;
  height: 50px;
  border: 1px solid #9E9E9E;
  border-radius:50%;
  margin: 5px 10px;
}
.dark-post-avatar{
  border: 1px solid #1C2532;
}
.post-main-content{
  text-align:left;
  word-break: break-all;
}
.post-body{
  box-sizing: border-box;
}
.post-title{
  border-bottom: 2px solid #3498db;
  height: 30px;
  display: grid;
  grid-template-columns: 5fr 1fr;
  align-items: center;
  position: relative;
}
.post-footer{
  border-top:2px solid #3498db;
  height: 30px;
}
.post-title-icon{
  margin-top: 3px;
  text-align: center;
  cursor: pointer;
}
.post-title-name{
  font-weight: bold;
  text-decoration:none;
  color:#4e4343;
}
.dark-post-title-name{
  color: #fff;
}
.post-title-icon{

}
.drop-settings{
  position: absolute;
  left: 105px;
  top:10px
}

@media only screen and (max-width: 425px){
  .single-post{
    /* max-width:400px; */
    width:280px;
  }
}
@media only screen and (max-width: 768px){
  .drop-settings{
    position: fixed;
    top: 90%;
    left:0;
  }
}
</style>