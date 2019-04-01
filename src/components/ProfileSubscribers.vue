<template>
  <div class="profile-subscribers">
    <h2 v-if="!noSubscribers" class="title">{{ $t('subscriptions') }}: {{getUser.subscribers.length}}</h2>
    <h2 v-else class="title">{{ $t('noSubscriptions') }}</h2>
    <ul class="profile-subscribers-list" v-if="users.length>0">
      <li v-for="(user, i) in getUserSubscribers" :key="i">
        <router-link :to="'/user/'+ users[user-1].id"><img :src="users[user-1].avatar" alt="" class="avatar-img"></router-link>
        <router-link :to="'/user/'+ users[user-1].id">{{ users[user-1].firstName }}  {{ users[user-1].lastName }}</router-link>
      </li>
      <!-- <div>
        <button v-if="names.length >=5 && names.length < totalNames" class="btn add-more-comments autocomplite-users" @click="getUsers()">{{ $t('showMore') }}</button> 
      </div> -->

    </ul>
  </div>
</template>

<script>
import axios from 'axios';
import api from '../helpers/api'
import store from '../store'
import _debounce from 'lodash.debounce';
export default {
  data () {
    return {
      noSubscribers: false
    }
  },
  props: {
    users: Array,
  },
  computed: {
    getUser () {
      return this.users[this.$store.state.loginId-1]  
    },
    getUserSubscribers () {
      if(this.getUser.subscribers.length==0){
        this.noSubscribers = true;
      }
      return this.getUser.subscribers;
    }
  },
  methods: {
    
  },
  watch: {
    users () {
      this.getUserSubscribers;
    }
  }
  
}
</script>
<style scoped>
.profile-subscribers{
  background: var(--theme-background);
  /* border-top:var(--theme-border-top); */
  border-bottom:var(--theme-border-top);
  width:400px;
  transition: 0.25s;
  margin: 0 10px;
}
.title{
  background: var(--theme-profile-edit-header);
  padding: 15px 0;
  text-align:center;
  font-size: 30px;
  font-weight: 700;
  color: #fff;
  transition: 0.25s;
}

.profile-subscribers-list{
  max-height: 300px;
  overflow: auto;
  
}
.profile-subscribers-list li{
  list-style-type: none;
  padding: 0 5px;
  border-top: var(--theme-border-bottom);
  display:grid;
  grid-template-columns: 1fr 3fr;
  align-items: center;
  transition: 0.25s;
}
.profile-subscribers-list li:hover{
  background: var(--theme-list-background);
}
.profile-subscribers-list li a{
  text-decoration: none;
  outline:none;
  color:var(--theme-color);
  font-size: 20px;
  
}

.avatar-img {
    width: 40px;
    height: 40px;
    border: var(--theme-posts-border);
    border-radius: 50%;
    margin: 5px 10px;
    transition: 0.25s;
}
@media only screen and (max-width: 425px) {
  .profile-subscribers{
    background: var(--theme-background);
    border-top:var(--theme-border-top);
    border-bottom:var(--theme-border-top);
    width:280px;
    transition: 0.25s;
    justify-self: center;
  }
  .profile-subscribers-list{
    max-height: 200px;
  }
}
</style>
