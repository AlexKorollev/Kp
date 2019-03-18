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
  },
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
  border: var(--theme-profile-border);
  border-radius: 50%;
  justify-self: center;
  transition: 0.25s;
}

.profile-main-info{
  max-width:250px;
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
