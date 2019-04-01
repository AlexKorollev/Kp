<template>
  <div class="profile-info">
    <div class="profile-info-block">
      <img :src="getUser.avatar" alt="avatar" class="profile-image">
      <div class="profile-main-info">
        <div class="profile-name">{{ getUser.firstName }} {{ getUser.lastName }}</div>
        <router-link v-if="(!id || equalsId)" class="btn submit-post link" :to="'/edit'">{{ $t('profileEdit') }}</router-link>
        <div v-else>
          <Subscribe :users="users" :id="id" />
        </div>
        <div v-if="((!id || equalsId) && size=='more')">
          <ProfileSubscribers :users="users" />
        </div>
      </div>
    </div>
    <div v-if="((!id || equalsId) && size=='less')" class="profile-main-subscribers">
      <ProfileSubscribers :users="users" />
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import api from '../helpers/api'
import store from '../store'
import Subscribe from './Subscribe'
import ProfileSubscribers from './ProfileSubscribers'
export default {
  data () {
    return {
      size: String,
    }
  },
  components: {
    Subscribe,
    ProfileSubscribers
  },
  props: {
    users: Array,
    id: String,
  },
  computed: {
    getUser () {
      console.log('id',this.id);
      if(this.id){
        return this.users[this.id-1]
      }
      else{
        return this.users[this.$store.state.loginId-1]
      }
      
    },
    equalsId () {
      return this.id*1 == this.users[this.$store.state.loginId-1].id
    },
    windowSize() {
      let width = window.innerWidth
      // console.log(width)
      if(width>768){
        this.size = "more";
      }
      else{
        this.size = "less";
      }
    }
    
  },
  methods: {
    addPicture(e) {
      var files = e.target.files || e.dataTransfer.files
      if (!files.length) {
        return
      }
      this.createImage(files[0])
    },
    createImage(file) {
      this.edited = true
      var reader = new FileReader();
      reader.onload = (e) => {
        this.image = e.target.result
        this.message.image = this.image
      }
      reader.readAsDataURL(file)
      console.log("file",file)
    },
    
    
  },
  mounted () {
    this.windowSize;
  },
  created () {
    window.addEventListener('resize', () => {
      let width = window.innerWidth
      // console.log(width)
      if(width>768){
        // console.log('more',this.size)
        this.size = "more";
      }
      else{
        // console.log('less',this.size)
        this.size = "less";
      }
    })
  },
  beforeDestroy (){
    window.removeEventListener('resize', () => {
      let width = window.innerWidth
      // console.log(width)
      if(width>768){
        // console.log('more',this.size)
        this.size = "more";
      }
      else{
        // console.log('less',this.size)
        this.size = "less";
      }
    })
  }
  
}
</script>
<style scoped>
.profile-info{
  display: grid;
  grid-template-columns: 1fr;
  align-items: start;
  font-size: 30px;
  font-weight: bold;
  grid-row-gap: 1em;
}
.profile-info-block{
  display: grid;
  justify-items: center;
  grid-row-gap: 1em;
}
.profile-image{
  width: 200px;
  height: 200px;
  border: var(--theme-profile-border);
  border-radius: 50%;
  justify-self: center;
  transition: 0.25s;
}

.profile-main-info{
  /* max-width:250px; */
  grid-row-gap: 0.2em;
}
.profile-name{
  text-align: center;
  color: var(--theme-color);
  transition: 0.25s;
}
.dark-profile-name{
  color: #fff;
}
#profile-id{
  font-size: 20px;
  font-weight: normal;
}
.profile-main-info{
  display:grid;
  grid-template-columns: 1fr;
  justify-items: center;
}
.submit-post{
  width: auto;
  padding: 10px 15px;
  text-align: center;
}
.submit-post:hover{
  color: #2ecc71;
}
.submit-post:active{
  color: #fff;
}
.profile-main-subscribers{
  justify-self: center;
}
/* @media only screen and (min-width: 920px) {
  .profile-info-block{
    margin-left: 10px;
  }
  
} */
@media only screen and (max-width: 768px) {
  .profile-info-block{
    grid-template-columns: 0.6fr 1fr;
    justify-self: center;
    min-width: 400px;
  }
  .profile-image{
    justify-self:left;
    width: 170px;
    height: 170px;
    /* position: relative; */
  }
  .profile-main-info{
    align-self: center;
  }
}
@media only screen and (max-width: 425px) {
  .profile-info-block{
    font-size: 20px;
    min-width: 270px;
  }
  #profile-id{
  font-size: 15px;
  }
  .profile-image{
    width: 120px;
    height: 120px;
    justify-self:left;
  }
  .profile-main-info {
    width: 150px;
    margin-left: 5px;
  }
  .submit-post{
    font-size: 15px;
    padding: 10px 5px;
  }
  .submit-post:hover{
    width:150px;
  }
  
}
</style>
