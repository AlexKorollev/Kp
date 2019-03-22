<template>
  <div class="add-comment" v-if="this.$store.state.login">
    <div class="add-comment-block">
      <!-- <input type="text" placeholder="title" v-model="title"> -->
      <div class="add-comment-textarea">
        <textarea class="textarea" :placeholder="$t('addCommentTextarea')" v-model="comment"></textarea>
      </div>
      <button class="btn submit-post" @click="addComment()">{{ $t('submitButton') }}</button>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import api from '../../../helpers/api'
import store from '../../../store';
export default {
  name: 'AddComment',
  data() {
    return {
      comment: '',
    }
  },
  props: {
    userPost: Object,
    comments: Array,
    newComments: Array,
  },
  computed: {
   
  },
  methods: {
    emitAdd(){
      this.$emit('add');
    },
    addComment () {
      this.emitAdd()
      this.$store.commit("changeLoading", true);
      var now = new Date();
      now = Math.round(now.getTime()/1000)
      axios.post('http://localhost:3000/comments', {
        comment: this.comment,
        userId: this.$store.state.loginId,
        postId: this.userPost.id,
        date: now + ''
      },{
          headers: {
            authorization: "bearer " + this.$store.state.access_token
        }
      })
      .then(response =>{
        this.comment = '';
        response.data.date = "today"
        // console.log(this.newComments);
        this.newComments.push(response.data);
        
      })
    },
  },
}
</script>
<style scoped>
.add-comment{
  width:100%;
}
.add-comment-block{
  width:380px;
  display: grid;
  grid-template-columns: 1fr;
  border-top: var(--theme-border-top);
  border-radius:2px;
  background: var(--theme-background);
  /* grid-gap:1em; */
  color: var(--theme-color);
  transition: 0.25s;
  padding: 0 10px;
}
.textarea{
  box-sizing: border-box;
  resize: vertical;
  text-decoration: none;
  font-size: 20px;
  padding: 10px;
  overflow-y:hidden;
  outline: none;
  min-height: 85px;
  width:100%;
  border:none;
  border-bottom: 2px solid #3498db;
  background: var(--theme-background);
  color: var(--theme-color);
  transition: 0.25s;
}
.textarea:focus{
  border-bottom: 2px solid #2ecc71;
}
.add-comment-textarea{
  position: relative;
}

.add-comment-block .icon{
  position: absolute;
  right: 2%;
  bottom:15px;
}
.add-comment-block button {
  justify-self: center;
}
.btn{
  margin: 0;
}
.submit-post{
  transition: 0.25s;
  color: #3498db;
  margin: 5px 0;
}
.submit-post:hover{
  color: #2ecc71;
}

@media only screen and (max-width: 425px){
  .submit-post{
    font-size: 20px;
  }
  .add-comment-block{
    width:260px;
  }
  .add-comment{
    display: grid;
    justify-items: center;
  }
}
</style>
