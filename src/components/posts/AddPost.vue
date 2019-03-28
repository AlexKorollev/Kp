<template>
  <div class="add-post">
    <div class="add-post-block">
      <!-- <input type="text" placeholder="title" v-model="title"> -->
      <div class="post-textarea">
        <textarea class="textarea" :placeholder="$t('addPostTextarea')"  v-model="post" :class="{'cancel-textarea': getPostError}"></textarea>
        <ProgressBar class="icon" :post="post"/>
        <input class="input-file cp" id="my-file" type="file" v-on:change="changeImage">
        <img v-if="image!==''" src="/src/assets/one.png" class="one">
        <img tabindex="0" for="my-file" src="/src/assets/paperclip.png" class="input-file-trigger">
      </div>
      <button class="btn submit-post" @click="addPost()" :disabled="getPostError" :class="{'cancel-button': getPostError}">{{ $t('submitButton') }}</button>
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
      allowableTypes: ['jpg', 'jpeg', 'png', 'gif','mp4'],
      maximumSize: 5000000,
      selectedImage: null,
      image: '',
    }
  },
  computed: {
    getPostError () {
      return this.$store.state.addPostError
    },
  },
  
  methods: {
    addPost () {
      let hashtags = this.post.match(/(|^)#[A-Za-z0-9\-\.\_]+(|$)/g);
      this.$store.commit("changeLoading", true);
      var now = new Date();
      now = Math.round(now.getTime()/1000);
      axios.post('http://localhost:3000/posts', {
        title: this.title,
        post: this.post,
        userId: this.$store.state.loginId,
        date: now + '',
        image: this.image,
        tags: hashtags,
      },{
          headers: {
            authorization: "bearer " + this.$store.state.access_token
        }
      })
      .then(response =>{
        this.post = '';
        this.image = '';
        this.selectedImage = '';
        response.data.date = "today"
        response.data.comments = [];
        response.data.likes = [];
        this.$store.commit("incrementTotalPosts", 1)
        this.$store.commit("addPost", [response.data]);
        this.$store.commit("changeLoading", false);
    })
    },
    validate(image) {
      if (!this.allowableTypes.includes(image.name.split(".").pop().toLowerCase())) {
        alert(`Sorry you can only upload ${this.allowableTypes.join("|").toUpperCase()} files.`)
        return false
      }

      if (image.size > this.maximumSize){
        alert("Sorry File size exceeding from 100kb")
        return false
      }

      return true
    },
    onImageError(err){
      console.log(err, 'do something with error')
    },
    changeImage($event) {
      this.selectedImage = $event.target.files[0]
    
      //validate the image
      if (!this.validate(this.selectedImage))
        return
      // create a form
      const form = new FormData();
      form.append('file', this.selectedImage);
      // submit the image
      this.createImage();
      
    },
    createImage() {
      const image = new Image()
      const reader = new FileReader()
      reader.onload = (e) => {
        this.image = e.target.result
      };
      reader.readAsDataURL(this.selectedImage)
    },
  },
  watch: {
    // post () {
    //   // var i = this.post.match((http|ftp|https)://([\w_-]+(?:(?:\.[\w_-]+)+))([\w.,@?^=%&:/~+#-]*[\w@?^=%&/~+#-])?);
      
      
    //   console.log(this.post)
    //   console.log(urls);

    // }
  }
}

</script>
<style scoped>
.add-post{
  width:100%;
}
.add-post-block{
  width:400px;
  display: grid;
  grid-template-columns: 1fr;
  border-top: var(--theme-border-top);
  border-bottom: var(--theme-border-bottom);
  border-radius:2px;
  background: var(--theme-background);
  grid-gap:1em;
  max-height: 2000px;
  color: var(--theme-color);
  transition: 0.25s;
}
.textarea{
  box-sizing: border-box;
  resize: vertical;
  text-decoration: none;
  font-size: 20px;
  padding: 10px 40px 10px 10px;
  overflow-y:hidden;
  outline: none;
  min-height: 150px;
  width:100%;
  border:none;
  border-bottom: 2px solid #3498db;
  background: var(--theme-background);
  color: var(--theme-color);
  /* transition: 0.25s; */
}
/* .dark-posts, .dark-textarea{
  background: rgb(21, 32, 43);
  color:#fff;
}
.dark-posts{
  border-bottom: 2px solid rgb(56, 68, 77);
  border-top: 2px solid rgb(56, 68, 77);
  
} */

.textarea:focus{
  border-bottom: 2px solid #2ecc71;
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
.post-textarea input{
  height: 40px;
  width: 40px;
}
.add-post-block .icon{
  position: absolute;
  right: 2%;
  bottom:15px;
}
.add-post-block button {
  justify-self: center;
}
.submit-post{
  transition: 0.25s;
  color: #3498db;
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

.input-file-trigger,.one {
  display: block;
  transition: 0.25s;
  cursor: pointer;
  position: absolute;
  right: 7px;
  bottom:-65px;
  width: 40px;
  z-index:10;
}
.one{
  width:15px;
  right: 35px;
  bottom:-37px;
  z-index:15;
}
.input-file {
  position: absolute;
  right: 7px;
  bottom:-65px;
  width: 40px;
  height: 40px;
  opacity: 0;
  cursor: pointer;
  z-index:20;
}

.input-file:hover + .input-file-trigger,
.input-file:focus + .input-file-trigger,
.input-file-trigger:hover,
.input-file-trigger:focus {
  outline: none;
}

@media only screen and (max-width: 425px){
  .submit-post{
    font-size: 20px;
  }
  .add-post-block{
    width:280px;
  }
  .add-post{
    display: grid;
    justify-items: center;
  }
}
</style>
