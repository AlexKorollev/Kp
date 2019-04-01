<template>
  <div class="single-post">
    <div class="post-content">
      <div class="post-content-avatar">
        <router-link :to="'/user/'+ userPost.userId" class="post-avatar"><img class="avatar-img" :src="users[userPost.userId-1].avatar"></router-link>
        <div class="post-avatar-line">
          <div class="line"></div>
        </div>
      </div>
      <div class="post-main-content">
        <div class="post-title">
          <div class="post-title-name">
            <router-link :to="'/user/'+ userPost.userId">{{users[userPost.userId-1].firstName}} {{users[userPost.userId-1].lastName}} </router-link>
            <Date :object="userPost" /> 
          </div>
          <div v-if="path == '/profile' || (userPost.userId==getLoginId && getLogin)" class="post-title-icon" @click="openDropSettings">
            <img v-if="this.mode == 'dark'" src="/src/assets/down-arrow-white.png" width="15" height="15" alt="">
            <img v-else src="/src/assets/down-arrow.png" width="15" height="15" alt="">
          </div>
          <DropSettings class="drop-settings" :visibleStatus="visibleStatus" @close="closeDropSettings" :userPost="userPost" :index="index"></DropSettings>
        </div>
        <div class="post-body" v-html="parseText"></div>
          <div v-if="userPost.image" class="post-body post-image " ><img @click="openImage()" :src="userPost.image" alt="" class="cp"></div>
          <transition name="modal-transition">
            <div class="modal-img" v-if="image">
              <div class="modal-background-img" @click="openImage()"></div>
              <div class="modal-content-img">
                <div class="close-img" @click="openImage()">
                  <img  src="/src/assets/close.png" width="20" height="20" alt="">
                </div>
                <img :src="userPost.image" class="modal-content-main-img" alt="">
              </div>
            </div>
          </transition>
          <!-- <div v-if="image" class="post-body post-image" @click="openImage()"></div> -->
          <iframe v-if="youtube" class="post-video" id="video" width="auto" height="auto" :src="'https://youtube.com/embed/'+youtube[1]" frameborder="0" allowfullscreen></iframe>
        <!-- <div v-if="response">
          qwe
        </div> -->
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
import axios from 'axios';

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
      youtube: null,
      image: false,
      // link: '',
      // response: null,
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
    },
    parseText () {
      
      let urls = this.userPost.post.match(/(http|https|ftp|ftps)\:\/\/[a-zA-Z0-9\-\.]+\.[a-zA-Z]{2,3}(\/\S*)?/g)
      let hashtags = this.userPost.post.match(/(|^)#[A-Za-z0-9\-\.\_]+(|$)/g)
      // console.log(userNames);
      this.youtube = null;
      let buff = this.userPost.post;
        if(urls){
          let youtube = this.userPost.post.match(/http(?:s?):\/\/(?:www\.)?youtu(?:be\.com\/watch\?v=|\.be\/)([\w\-\_]*)(&(amp;)?‌​[\w\?‌​=]*)?/)
          // console.log(this.youtube)
          this.youtube = youtube;
          // this.link = urls[0];
          // this.getLinkPreview ();
          let uniqUrls = this.unique(urls);
          uniqUrls.forEach(link => {
            buff = buff.replaceAll(link,"<a style='color:#3498db' target='_blank' class='link post-link' href='"+link+"'>"+link+"</a>")
          
          });
        }
        if(hashtags){
          let uniqHashtags = this.unique(hashtags);
          uniqHashtags.forEach(hashtag => {

            buff = buff.replaceAll(hashtag,"<a style='color:#3498db' class='link post-link' target='_blank' href='/tags/"+hashtag.split('').slice(1).join("")+"'>"+hashtag+"</a>")
          });
        }
      return "<div>"+buff+"</div>"
      this.youtube = null;
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
    },
    unique(arr) {
      var obj = {};
      for (var i = 0; i < arr.length; i++) {
        var str = arr[i];
        obj[str] = true; // запомнить строку в виде свойства объекта
      }
      return Object.keys(obj); // или собрать ключи перебором для IE8-
    },
    openImage () {
      this.image = !this.image;
      if(this.image){
        scroll.disableScroll();
      }
      else{
        scroll.enableScroll();
      }
    },
    
  },
  created () {

  },
  mounted () {
    
  },
  watch: {
    userPost: function () {
      this.parseText
    },
  }
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
  grid-template-columns: 1fr 5fr;
  margin: 5px 0;
}
.post-content-avatar{
 width:100%; 
 display: flex;
 flex-direction: column;
}
.avatar-img{
  width: 50px;
  height: 50px;
  border: var(--theme-posts-border);
  border-radius:50%;
  margin: 0px 5px;
  transition: 0.25s;
}
.post-avatar{
  justify-self: center;
  align-self: flex-start;
}
.avatar-img:hover{
  border: 2px solid #3498db;
}

.post-avatar-line{
  display: flex;
  justify-content: center;
  width: 100%;
  height: 100%;
}
.line{
  content: '';
  height: 100%;
  width: 4px;
  background: var(--theme-posts-line);
  transition: 0.25s;
}
.post-main-content{
  text-align:left;
  word-break: break-all;
  padding-right: 10px;
}
.post-body{
  box-sizing: border-box;
  padding: 4px 0;
}
.post-video{
  border-top: var(--theme-border-top);
  padding-top: 5px;
  max-width:100%;
}
.post-title{
  border-bottom: 2px solid #3498db;
  height: 30px;
  display: grid;
  grid-template-columns: 5fr 1fr;
  align-items: center;
  position: relative;
}
.post-body img{
  max-width:100%;
}

.post-title-icon{
  margin-top: 3px;
  text-align: right;
  cursor: pointer;
  transition: 0.25s;
}
.post-title-name{
  display: flex;
}
.post-title-name a{
  font-weight: bold;
  text-decoration:none;
  color:var(--theme-color);
  transition: 0.25s;
}
.post-title-name a:hover{
  text-decoration:underline;
  color: #3498db;
}
.drop-settings{
  position: absolute;
  left: 112px;
  top:10px
}
.post-link:hover{
  border-bottom: 1px solid #3498db;
}
.slide-fade-enter-active {
  transition: all .3s ease;
}
.slide-fade-leave-active {
  transition: all .3s cubic-bezier(1.0, 0.5, 0.8, 1.0);
}
.slide-fade-enter, .slide-fade-leave-to{
  transform: translateX(10px);
  opacity: 0;
}
.modal-img,.modal-background-img{
  position: fixed;
  left:0;
  top:0;
  width: 100vw;
  height: 100vh;
  z-index:1000;
}
.modal-background-img{
  background: var(--theme-modal-background);
  z-index:30;
}
.modal-img{
  display:flex;
  align-items: center;
  justify-content: center;
  z-index:50;
  transition: opacity 0.5s ease-out, transform 0.5s ease-out;
}
.modal-content-img{
  background-color: var(--theme-background);
  z-index:100;
  position: relative;
  padding: 10px;
  display:grid;
  grid-template-columns: 1fr;
  justify-items: center;
  grid-gap: 0;
  border-radius: 2px;
  /* max-width:50%;
  max-height: 50%; */
}
.modal-content-img .modal-content-main-img{
  max-width:500px;
  /* max-height: 50%; */
}
.close-img{
  cursor: pointer;
  position: absolute;
  top:-25px;
  right: -15px;
  width:10px;
  height: 10px;
}
@media only screen and (max-width: 520px){
  .modal-content-img .modal-content-main-img{
    max-width:400px;
  }
}
@media only screen and (max-width: 425px){
  .single-post{
    /* max-width:400px; */
    width:280px;
  }
  .modal-content-img .modal-content-main-img{
    max-width:240px;
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