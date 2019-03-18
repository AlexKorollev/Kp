<template>
  <div class="profile-info">
    <div class="profile-info-block">
      <img :src="getUser.avatar" width="" alt="" class="profile-image">
      <div class="profile-main-info">
        <div class="profile-name">{{ getUser.firstName }} {{ getUser.lastName }}</div>
        <button class="btn submit-post"><router-link class="link" :to="'/edit'">Edit profile</router-link></button>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import api from '../helpers/api'
import store from '../store'
export default {
  props: {
    users: Array
  },
  computed: {
    getUser () {
      return this.users[this.$store.state.loginId-1]
    },
    getMode () {
      if ((localStorage.getItem('mode') || 'dark') === 'dark'){
        document.querySelector('div > .profile-image').classList.add('dark-profile-image')
        document.querySelector('div > .profile-name').classList.add('dark-profile-name')
        
      }
      else{
        document.querySelector('div > .profile-image').classList.remove('dark-profile-image')
        document.querySelector('div > .profile-name').classList.remove('dark-profile-name')
      }
    },
  },
  methods: {
    
  },
  mounted () {
    this.getMode;
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
}
.profile-info-block{
  display: grid;
  justify-items: center;
  grid-row-gap: 1em;
}
.profile-image{
  width: 200px;
  height: 200px;
  border: 2px solid #9E9E9E;
  border-radius: 50%;
  justify-self: center;
}
.dark-profile-image{
  border: 2px solid #1C2532;
}
.profile-main-info{
  max-width:250px;
}
.profile-name{
  text-align: center;
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
  height: 40px;
}
.submit-post a:hover{
  width:150px;
  color: #2ecc71;
}
@media only screen and (max-width: 768px) {
  .profile-info-block{
    grid-template-columns: 1fr 1fr;
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
  }
  .submit-post{
    width:120px;
    height: 35px;
  }
  .submit-post:hover{
    width:150px;
  }
}
</style>
