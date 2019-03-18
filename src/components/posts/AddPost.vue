<template>
  <div class="add-post">
    <div class="posts">
      <!-- <input type="text" placeholder="title" v-model="title"> -->
      <div class="post-textarea">
        <textarea class="textarea" placeholder="Wanna tell something?" v-model="post" :class="{'cancel-textarea': getPostError}"></textarea>
        <ProgressBar class="icon" :post="post"/>
      </div>
      
      <button class="btn submit submit-post" @click="addPost()" :disabled="getPostError" :class="{'cancel-button': getPostError}">Submit</button>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import api from '../../helpers/api'
import store from '../../store';
import ProgressBar from './ProgressBar'
export default {
  name: 'AddPosts',
  components: {
    ProgressBar,
  },
  data() {
    return {
      title: '',
      post: '',
    }
  },
  computed: {
    getPostError () {
      return this.$store.state.addPostError
    },
    getMode () {
      if ((localStorage.getItem('mode') || 'dark') === 'dark'){
        document.querySelector('div > .posts').classList.add('dark-posts');
        document.querySelector('div > .textarea').classList.add('dark-textarea');
      }
      else{
        document.querySelector('div > .posts').classList.remove('dark-posts')
        document.querySelector('div > .textarea').classList.remove('dark-textarea')
      }
    },
  },
  
  methods: {
    addPost () {
      this.$store.commit("changeLoading", true);
      axios.post('http://localhost:3000/posts', {
        title: this.title,
        post: this.post,
        userId: this.$store.state.loginId
      },{
          headers: {
            authorization: "bearer " + this.$store.state.access_token
        }
      })
      .then(response =>{
        this.$store.commit("incrementTotalPosts", 1)
        this.$store.commit("addPost", [response.data]);
        this.$store.commit("changeLoading", false);
    })
    },
  },
   mounted () {
    this.getMode;
  }
  // watch: {
  //   post () {
  //     console.log("textarea")
  //   }
  // }
}
</script>
<style scoped>
.add-post{
  width:100%;
}
.posts{
  width:400px;
  display: grid;
  grid-template-columns: 1fr;
  border-top: 2px solid #ccc;
  border-bottom: 2px solid #ccc;
  border-radius:2px;
  background: #efeeee;
  grid-gap:1em;
  max-height: 600px;
}
.textarea{
  box-sizing: border-box;
  resize: vertical;
  text-decoration: none;
  font-size: 20px;
  padding: 10px 40px 10px 10px;
  overflow-y:hidden;
  outline: none;
  min-height: 90px;
  width:100%;
  border:none;
  border-bottom: 2px solid #3498db;
  background: #efeeee;
}
.dark-posts, .dark-textarea{
  background: rgb(21, 32, 43);
  color:#fff;
}
.dark-posts{
  border-bottom: 2px solid rgb(56, 68, 77);
  border-top: 2px solid rgb(56, 68, 77);
  
}
.textarea:focus{
  border-bottom: 2px solid #2ecc71;
  min-height: 300px;
}
.cancel-textarea{
  border-bottom: 2px solid #e85a50;
}
.cancel-textarea:focus{
  border-bottom: 2px solid #e85a50;
}
.post-textarea{
  position: relative;
}

.posts .icon{
  position: absolute;
  right: 2%;
  bottom:15px;
}
.posts button {
  justify-self: center;
}
.red{
  color:red;
}
.submit-post{
  transition: 0.25s;
}
.submit-post:hover{
  color: #2ecc71;
}
.cancel-button{
  border: 2px solid #e85a50;
  color:#e85a50;
}
.cancel-button:hover{
  color:#e85a50;
}
@media only screen and (max-width: 425px){
  .submit-post{
    font-size: 20px;
  }
  .posts{
    width:280px;
  }
  .add-post{
    display: grid;
    justify-items: center;
  }
}
</style>
