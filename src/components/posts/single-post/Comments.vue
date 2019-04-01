<template>
  <div class="comments">
    <div class="post-content">
      <router-link :to="'/user/'+comment.userId" class="post-avatar"><img class="avatar-img" :src="users[comment.userId-1].avatar"></router-link>
      <div class="post-main-content">
        <div class="post-title">
          <div class="post-title-name" >
            <router-link :to="'/user/'+comment.userId">{{users[comment.userId-1].firstName}} {{users[comment.userId-1].lastName}}</router-link>
            <Date :object="comment"/> 
          </div>
        </div>
        <div class="post-body" v-html="parseText"></div>
      </div>
    </div>
  </div>
</template>
<script>
 
import api from '../../../helpers/api'
import Date from './Date'
export default {
  name: 'Comments',
  components: {
    Date,
  },
  props: {
    comment: Object,
    users: Array
  },
  data() {
    return{
      
    }
  },
  computed: {
    parseText () {
      
      let urls = this.comment.comment.match(/(http|https|ftp|ftps)\:\/\/[a-zA-Z0-9\-\.]+\.[a-zA-Z]{2,3}(\/\S*)?/g)
      let hashtags = this.comment.comment.match(/(|^)#[A-Za-z0-9\-\.\_]+(?:\s|$)/g)
      let buff = this.comment.comment;
        if(urls){
          let uniqUrls = this.unique(urls);
          uniqUrls.forEach(link => {
            buff = buff.replaceAll(link,"<a style='color:#3498db' target='_blank' class='link post-link' href='"+link+"'>"+link+"</a>")
          
          });
        }
        if(hashtags){
          let uniqHashtags = this.unique(hashtags);
          uniqHashtags.forEach(hashtag => {
            
            buff = buff.replaceAll(hashtag,"<a style='color:#3498db' target='_blank' class='link post-link' href='/tags/"+hashtag.split('').slice(1).join("")+"'>"+hashtag+"</a>")
          });
        }
      return "<div>"+buff+"</div>"
    }
  },
  methods: {
    unique(arr) {
      var obj = {};
      for (var i = 0; i < arr.length; i++) {
        var str = arr[i];
        obj[str] = true; // запомнить строку в виде свойства объекта
      }
      return Object.keys(obj); // или собрать ключи перебором для IE8-
    }
  },
  watch: {
  }
}
</script>
<style scoped>
.comments{
  border-top: var(--theme-border-top);
}

.post-content{
  display: grid;
  grid-template-columns: 1fr 6fr;
  margin: 5px 28px;
}
.avatar-img{
  width: 30px;
  height: 30px;
  border: var(--theme-posts-border);
  border-radius:50%;
  margin: 10px 10px;
  transition: 0.25s;
}
.avatar-img:hover{
  border: 2px solid #3498db;
}
.post-main-content{
  padding-right: 10px;
}
.post-title-name{
  font-weight: 500;
}
.post-body{
  font-size: 13px;
}

@media only screen and (max-width: 425px) {
  .post-content{
    margin: 5px 13px;
  }
}
</style>