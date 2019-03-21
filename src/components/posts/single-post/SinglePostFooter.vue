<template>
  <div>
    <div class="post-footer">
      <div class="post-likes" @click="changePostLike()">
        <img v-if="like" src="/src/assets/likefull.png" class="cp" width="20" height="20" alt="">
        <img v-else src="/src/assets/like.png" class="cp" width="20" height="20" alt="">     
        <div>{{userPost.likes.length}}</div>
      </div>
      <!-- <div>
         <img src="/src/assets/share.png" class="cp" width="20" height="20" alt="">
      </div> -->
      <div @click="showComments()" class="post-comment">
         <img src="/src/assets/comment.png" class="cp" width="20" height="20" alt="">
         <div>{{userPost.comments.length}}</div>
      </div>
    </div>
    <div v-if="commentsOpen && !commentLoading">
      <Comments v-for="(comment, index) in comments" :key="index" :index="index" :comment="comment" :users="users"/>
    </div>
    <div v-if="comments.length >=5 && comments.length < totalComments-newComments.length">
      <button class="btn add-more-comments" @click="getComments()">{{ $t('moreComments') }}</button> 
    </div>
    <div v-if="commentsOpen && !commentLoading && newComments.length>0">
      <Comments v-for="(comment, index) in newComments" :key="index" :index="index" :comment="comment" :users="users"/>
    </div>
    <div v-if="commentsOpen && !commentLoading" >
      <AddComment :userPost="userPost" :newComments="newComments" :totalComments="totalComments"/>
    </div>
    <Loader v-else-if="commentsOpen && commentLoading" />
  </div>
</template>
<script>
import axios from 'axios'
import Comments from './Comments'
import AddComment from './AddComment'
import Loader from '../../Loader'
import _debounce from 'lodash.debounce';
export default {
  name: 'SinglePostFooter',
  props: {
    users: Array,
    userPost: Object,
    index: Number,
  },
  components: {
    Comments,
    AddComment,
    Loader
  },
  data() {
    return {
      commentsOpen: false,
      commentLoading: false,
      comments: [],
      newComments: [],
      page: 1,
      totalComments: 0,
      like: Boolean,
      likeId: Number,
      newLike: Boolean,
      lastChange: String,
    }
  },
  computed: {
    hasLike () {
      let filter = this.userPost.likes.filter(elem => { 
        return elem.userId == this.getLoginId;
      });
      if(filter.length!==0){
        // this.like = true;
        this.likeId = filter[0].id;
        this.newLike = true;
        this.like = true
      }
      else{
        // this.like = false;
        this.newLike = true;
        this.like = false
      }
    },
    lastLikeChange () {
      if(this.like==true){
        this.lastChange = "add"
      }
      else{
        this.lastChange = "del"
      }
    },
    getLike () {
      return this.like
    },
    getLoginId () {
      return this.$store.state.loginId
    }
  },
  methods: {
    showComments(){
      this.commentLoading = true;
      this.commentsOpen = !this.commentsOpen;
      
      if(this.commentsOpen){
        this.getComments();
      }
      else{
        this.page=1;
        this.comments = [];
        this.newComments = [];
      }
    },
    getComments () {
      let vm = this;
      const options = {
        method: 'GET',
        headers: {
          'Authorization': "bearer " + this.$store.state.access_token
          },
        url: 'http://localhost:3000/comments?postId='+this.userPost.id +'&_page='+this.page+'&_limit=5',
      };
      axios(options)
      .then(response =>{
        response.data.forEach(comment => vm.comments.push(comment));
        vm.totalComments = response.headers['x-total-count'];
        vm.page+=1;
        vm.commentLoading = false;
        if((vm.page-1)*5>vm.totalComments-vm.newComments.length){
          vm.comments = vm.comments.slice(0,vm.comments.length-vm.newComments.length)
          vm.newComments.forEach(newComment=>vm.comments.push(newComment))
          vm.newComments = [];
        }
      });
    },
    changePostLike () {
      
      if(this.like){
        this.userPost.likes.pop();
      }
      else{
        this.userPost.likes.push({});
      }
      this.like = !this.like;
    },
    changeLike () {
      if(this.like && this.lastChange!=="add"){
        this.lastChange = "add"
        this.addLike();
      }
      else if(!this.like && this.lastChange!=="del"){
        this.lastChange = "del"
        this.deleteLike();
      }
    },
    deleteLike () {
      const options = {
        method: 'DELETE',
        headers: {
          'Authorization': "bearer " + this.$store.state.access_token
          },
        url: 'http://localhost:3000/likes/'+ this.likeId,
      };
      axios(options)
      .then(response=>{
        this.likeId = Number;
      })
    },
    addLike () {
      axios.post('http://localhost:3000/likes', {
        userId: this.getLoginId,
        postId: this.userPost.id,
      },
      {
        headers: {
          authorization: "bearer " + this.$store.state.access_token
        }
      })
      .then(response =>{
        this.likeId = response.data.id;
      })
    }

  },
  mounted () {
    this.hasLike;
    this.lastLikeChange;
  },
  created () {
    
    this.debounceFunc = _debounce(this.changeLike, 500);
   
  },
  watch: {
    like: function () {
      if(!this.newLike){
        this.debounceFunc()
      }
      this.newLike = false;
    },
  },
}

</script>
<style>
.post-content{
  display: grid;
  grid-template-columns: 1fr 4fr;
  margin: 5px 0;
}

.post-footer{
  padding-left: 80px;
  border-top:var(--theme-border-top);
  height: 30px;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  justify-items: left;
  align-items: center;
  color: var(--theme-color);
  transition: 0.25s;
}

.add-more-comments{
  width: 100%;
  /* border-top: var(--theme-border-top) */
  padding: 10px 0;
  color: #3498db;
}
.add-more-comments:hover{
  /* text-decoration: underline; */
  color: #2ecc71;
}
.post-comment, .post-likes{
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-column-gap: 0.2em;
  justify-items: center;
  color: #2ecc71;
}
.post-likes{
  color: #f34141;
}
@media only screen and (max-width: 425px){
  
  .post-footer{
    padding-left: 0;
    justify-items: center;
  }
}
</style>