<template>
  <div class="comments">
    <div class="post-content">
      <router-link :to="'/user/'+comment.userId" class="post-avatar"><img class="avatar-img" :src="users[comment.userId-1].avatar"></router-link>
      <div class="post-main-content">
        <div class="post-title">
          <router-link class="post-title-name" :to="'/user/'+comment.userId">{{users[comment.userId-1].firstName}} {{users[comment.userId-1].lastName}} <Date :object="comment"/> </router-link>
        </div>
        <div class="post-body">{{ comment.comment || "no post"}}</div>
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
    
  },
  methods: {
    
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
  margin: 5px 0;
}
.avatar-img{
  width: 30px;
  height: 30px;
  border: var(--theme-posts-border);
  border-radius:50%;
  margin: 10px 10px;
  transition: 0.25s;
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
</style>