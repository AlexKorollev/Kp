<template>
  <div class="single-post">
    <div class="post-content">
      <router-link :to="'/user/'+ userPost.userId" class="post-avatar"><img class="avatar-img" :src="users[userPost.userId-1].avatar"></router-link>
      <div class="post-main-content">
        <div class="post-title">
          <router-link class="post-title-name" :to="'/user/'+ userPost.userId">{{users[userPost.userId-1].firstName}} {{users[userPost.userId-1].lastName}}</router-link>
          <div v-if="path == '/profile'" class="post-title-icon" @click="openDropSettings">
            <img v-if="this.mode == 'dark'" src="/src/assets/white-arrow.png" width="15" height="15" alt="">
            <img v-else src="/src/assets/black-arrow.png" width="15" height="15" alt="">
          </div>
          <DropSettings class="drop-settings" :visibleStatus="visibleStatus" @close="closeDropSettings" :userPost="userPost" :index="index">qwe</DropSettings>
        </div>
        <div class="post-body">{{ userPost.post || "no post"}}</div>
      </div>
    </div>
    <div class="post-footer">
      <div>
         <img src="/src/assets/like.png" width="20" height="20" alt="">
      </div>
      <div>
         <img src="/src/assets/share.png" width="20" height="20" alt="">
      </div>
      <div @click="showComments()">
         <img src="/src/assets/comment.png" width="20" height="20" alt="">
      </div>
    </div>
    <div v-if="commentsOpen && !commentLoading">
      <Comments v-for="(comment, index) in comments" :key="index" :index="index" :comment="comment" :users="users"/>
    </div>
    <div v-if="commentsOpen && !commentLoading" >
      <AddComment :userPost="userPost" :comments="comments"/>
    </div>
    <Loader v-else-if="commentsOpen && commentLoading" />
  </div>
</template>
<script>
import axios from 'axios'
import api from '../../../helpers/api'
import scroll from '../../../helpers/scroll'
import DropSettings from './DropSettings'
import Comments from './Comments'
import AddComment from './AddComment'
import Loader from '../../Loader'

export default {
  name: 'SinglePost',
  props: {
    users: Array,
    userPost: Object,
    index: Number,
  },
  components: {
    DropSettings,
    Comments,
    AddComment,
    Loader
  },
  data() {
    return {
      visibleStatus: false,
      path: this.$router.currentRoute.path,
      commentsOpen: false,
      commentLoading: false,
      comments: [],
    }
  },
  computed: {
    mode () {
      return this.$store.state.mode;
    },
    
  },
  methods: {
    
    openDropSettings () {
      console.log(this.getComments)
      this.visibleStatus = true;
      scroll.disableScroll();
    },
    closeDropSettings () {
      this.visibleStatus = false;
      scroll.enableScroll();
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
    showComments(){
      this.commentLoading = true;
      this.commentsOpen = !this.commentsOpen;
      
      if(this.commentsOpen){
        this.getComments();
      }
    },
    getComments () {
      let vm = this;
      const options = {
        method: 'GET',
        headers: {
          'Authorization': "bearer " + this.$store.state.access_token
          },
        url: 'http://localhost:3000/comments?postId='+this.userPost.id,
      };
      axios(options)
      .then(response =>{
        vm.comments = response.data;
        vm.commentLoading = false;
      });
    }

  },
}

</script>
<style>
.single-post{
  width:400px;
  border-radius:2px;
  font-size: 15px;
  border-top: var(--theme-border-top);
  border-bottom: var(--theme-border-bottom);
  background: var(--theme-background);
  margin-bottom:20px;
  color:var(--theme-color);
  transition: 0.25s;
}
.post-content{
  display: grid;
  grid-template-columns: 1fr 4fr;
  margin: 5px 0;
}
.avatar-img{
  width: 50px;
  height: 50px;
  border: var(--theme-posts-border);
  border-radius:50%;
  margin: 5px 10px;
  transition: 0.25s;
}

.post-main-content{
  text-align:left;
  word-break: break-all;
  padding-right: 10px;
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
  padding-left: 80px;
  border-top:var(--theme-border-top);
  height: 30px;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  justify-items: left;
  align-items: center;
  color: var(--theme-color)
}
.post-title-icon{
  margin-top: 3px;
  text-align: center;
  cursor: pointer;
  transition: 0.25s;
}
.post-title-name{
  font-weight: bold;
  text-decoration:none;
  color:var(--theme-color);
  transition: 0.25s;
}

.drop-settings{
  position: absolute;
  left: 105px;
  top:10px
}
/* .post-comment{
  display: grid;
  grid-template-columns: 1fr 1fr;
  justify-items: center;
  color: #2ecc71;
} */
@media only screen and (max-width: 425px){
  .single-post{
    /* max-width:400px; */
    width:280px;
  }
  .post-footer{
    padding-left: 0;
    justify-items: center;
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