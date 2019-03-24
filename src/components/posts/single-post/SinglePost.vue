<template>
  <div class="single-post">
    <div class="post-content">
      <router-link :to="'/user/'+ userPost.userId" class="post-avatar"><img class="avatar-img" :src="users[userPost.userId-1].avatar"></router-link>
      <div class="post-main-content">
        <div class="post-title">
          <router-link class="post-title-name" :to="'/user/'+ userPost.userId">{{users[userPost.userId-1].firstName}} {{users[userPost.userId-1].lastName}} <Date :object="userPost" /> </router-link>
          <div v-if="path == '/profile' || (userPost.userId==getLoginId && getLogin)" class="post-title-icon" @click="openDropSettings">
            <img v-if="this.mode == 'dark'" src="/src/assets/down-arrow-white.png" width="15" height="15" alt="">
            <img v-else src="/src/assets/down-arrow.png" width="15" height="15" alt="">
          </div>
          <DropSettings class="drop-settings" :visibleStatus="visibleStatus" @close="closeDropSettings" :userPost="userPost" :index="index"></DropSettings>
        </div>
        <div class="post-body">{{ userPost.post || "no post"}}</div>
      </div>
    </div>
    <SinglePostFooter :userPost="userPost" :users="users" :index="index"/>
  </div>
</template>
<script>
import scroll from '../../../helpers/scroll'
import DropSettings from './DropSettings'
import Date from './Date'
import SinglePostFooter from './SinglePostFooter'
import Loader from '../../Loader'

export default {
  name: 'SinglePost',
  props: {
    users: Array,
    userPost: Object,
    index: Number,
    id: String,
  },
  components: {
    DropSettings,
    SinglePostFooter,
    Loader,
    Date
  },
  data() {
    return {
      visibleStatus: false,
      path: this.$router.currentRoute.path,
    }
  },
  computed: {
    mode () {
      return this.$store.state.mode;
    },
    getUser () {
      if(this.id){
        return this.users[this.id-1]
      }
      else{
        return this.users[this.$store.state.loginId-1]
      }
      
    },
    getLoginId () {
      return this.$store.state.loginId;
    },
    getLogin () {
      return this.$store.state.login;
    }
    
  },
  methods: {
    
    openDropSettings () {
      this.visibleStatus = true;
      scroll.disableScroll();
    },
    closeDropSettings () {
      this.visibleStatus = false;
      scroll.enableScroll();
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

.post-title-icon{
  margin-top: 3px;
  text-align: right;
  cursor: pointer;
  transition: 0.25s;
}
.post-title-name{
  font-weight: bold;
  text-decoration:none;
  color:var(--theme-color);
  transition: 0.25s;
  display: flex;
}

.drop-settings{
  position: absolute;
  left: 112px;
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