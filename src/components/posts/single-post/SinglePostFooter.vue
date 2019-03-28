<template>
  <div>
    <div class="post-footer">
      <div class="post-likes cp" @click="changePostLike()" v-if="getLogin">
        <img v-if="like" src="/src/assets/likefull.png" class="cp" width="20" height="20" alt="">     
        <img v-else src="/src/assets/like.png" class="cp" width="20" height="20" alt="">
        <div>{{userPost.likes.length}}</div>
      </div>
      <div @click="showComments()" v-if="getLogin" class="post-comment cp transition">
         <img src="/src/assets/comment.png" class="cp" width="20" height="20" alt="">
         <div>{{userPost.comments.length}}</div>
      </div>
    </div>
    <transition name="slide-fade">
      <div v-if="commentsOpen && !commentLoading" class="transition">
        <Comments v-for="(comment, index) in comments" :key="index" :index="index" :comment="comment" :users="users"/>
      </div>
    </transition>
    <div v-if="comments.length >=5 && comments.length < totalComments-newComments.length">
      <button class="btn add-more-comments" @click="getComments()">{{ $t('moreComments') }}</button> 
    </div>
    <transition name="slide-fade">
      <div v-if="commentsOpen && !commentLoading && newComments.length>0">
        <Comments v-for="(comment, index) in newComments" :key="index" :index="index" :comment="comment" :users="users"/>
      </div>
     </transition>
    <div v-if="commentsOpen && !commentLoading" >
      <AddComment  @add="increaseTotalComments()" :userPost="userPost" :newComments="newComments" :totalComments="totalComments"/>
    </div>
    <Loader v-else-if="commentsOpen && commentLoading" class="comment-loader"/>
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
      like: false,
      likeId: Number,
      newLike: Boolean,
      lastChange: "del",
      scroll: 0,
      first: 1,
    }
  },
  computed: {

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
    getLogin () {
      return this.$store.state.login
    },
    getLoginId () {
      return this.$store.state.loginId
    },
    hasLike () {
      let filter = this.userPost.likes.filter((elem,index) => { 
        if(elem.userId == this.getLoginId){
          this.index = index;
          return true;
        }
        else{
          return false;
        }
        
      });
      if(filter.length!==0){
        this.likeId = filter[0].id;
        this.like = true
      }
      else{
        this.like = false
      }
    
    },
  },
  methods: {
    showComments(){
      // document.addEventListener('click', this.handleClickOutside);
      this.commentLoading = true;
      this.commentsOpen = !this.commentsOpen;
      if(this.first == 1){
        this.scroll = document.documentElement.scrollTop;
        this.first += 1;
      }
      if(this.commentsOpen){
        this.getComments();
        
      }
      else{
        console.log(this.scroll)
        // window.scrollTo( 0, this.scroll);
        this.page=1;
        this.comments = [];
        this.newComments = [];
        // document.removeEventListener('click', this.handleClickOutside);
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
    increaseTotalComments () {
      this.totalComments++;
      this.userPost.comments.length++;
    },
   
    changePostLike () {
      
      if(this.like){
        this.userPost.likes.splice(this.index,1);
      }
      else{
        this.userPost.likes.splice(this.index,0,{
          userId: this.getLoginId,
          postId: this.userPost.id,
          id: this.likeId
        });
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
      
    },
    // handleClickOutside(evt) {
      
    //   // console.log('height',this.$el.offsetWidth * this.$store.state.counter) 
    //   if (!this.$el.contains(evt.target) && this.commentsOpen) {
    //     this.showComments();
        
    //     // let coordinate = elem.getBoundingClientRect()
    //     // window.scrollBy(0, -this.$el.style.height);
    //   }
    //   else{
    //     blockHeigth = this.$el.offsetWidth
    //   }
    // }

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
      this.debounceFunc()
    },
    userPost: function () {
      this.hasLike;
      this.lastLikeChange;
    },
  }
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
  padding: 10px 0;
  color: #3498db;
}
.add-more-comments:hover{
  color: #2ecc71;
}
.post-comment, .post-likes{
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-column-gap: 0.2em;
  justify-items: center;
  color: #2ecc71;
  
  position: relative;
}
.post-likes{
  color: #f34141;
}
.post-likes::before,.post-comment:before{
  position: absolute;
  width:28px;
  height: 28px;
  opacity: 0;
  bottom:-17.8px;
  right: 19px;
  margin-bottom: 15px;
  border-radius: 50%;
  content: '';
  background: #f34141;
  transition: 0.25s;
}
.post-comment:before{
  background:#2ecc71;
}
.post-likes:hover::before,.post-comment:hover::before{
  opacity: 0.2;
}
.post-likes:active::before,.post-comment:active::before{
  width:35px;
  height: 35px;
  bottom:-21px;
  right: 16px;
}
.comment-loader{
  padding: 10px 0;
}

@media only screen and (max-width: 425px){
  
  .post-footer{
    padding-left: 0;
    justify-items: center;
    
  }
}
</style>