<template>
  <div @click="changePageSubcribe()" class="user-subscribe">
    <button v-if="!subscribe" class="btn submit-post link">Подписаться</button>
    <button v-else class="btn submit-post link subscribe">Подписан</button>
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
      active: false,
      subscribe: false,
      id: this.$router.currentRoute.params['id'],
      lastChange: "del",
      index: -1,
    }
  },
  props: {
    users: Array,
  },
  computed: {
    getSubscribe () {
      this.index = this.getUser.subscribers.indexOf(this.id*1)
      if(this.index!==-1){
        this.subscribe = true;
      }
      else{
        this.subscribe = false;
      }
    },
    getUser () {
      return this.users[this.getLoginId-1]  
    },
    lastSubscribeChange () {
      if(this.subscribe==true){
        this.lastChange = "add"
      }
      else{
        this.lastChange = "del"
      }
    },
    getLoginId () {
      return this.$store.state.loginId
    }
  },
  methods: {
    changePageSubcribe () {
      
      if(this.subscribe){
        this.getUser.subscribers.splice(this.index,1);
        // this.users[this.getUser].subscribers = this.getUser.subscribers;
      }
      else{
        this.getUser.subscribers.splice(this.index,0,this.id*1);
        // this.users[this.getUser].subscribers = this.getUser.subscribers;
      }
      this.subscribe = !this.subscribe;
    },
    changeSubscribe () {
      // console.log(this.subscribe)
      if(this.subscribe && this.lastChange!=="add"){
        this.lastChange = "add"
        console.log("add")
        this.addOrDeleteSubcribe();
      }
      else if(!this.subscribe && this.lastChange!=="del"){
        this.lastChange = "del"
        console.log("dell")
        console.log("subs",this.getUser.subscribers)
        this.addOrDeleteSubcribe();
      }
    },
    
    // deleteSubcribe () {
    //   const options = {
    //     method: 'DELETE',
    //     headers: {
    //       'Authorization': "bearer " + this.$store.state.access_token
    //       },
    //     url: 'http://localhost:3000/users/'+ this.id,
    //   };
    //   axios(options)
    //   .then(response=>{
    //   })
    // },
    addOrDeleteSubcribe () {
      axios.put('http://localhost:3000/users/'+this.getLoginId, {
        email: this.getUser.email,
        password: this.getUser.password,
        firstName: this.getUser.firstName,
        lastName: this.getUser.lastName,
        avatar: this.getUser.avatar,
        subscribers: this.getUser.subscribers,
        },
        {
        headers: {
          authorization: "bearer " + this.$store.state.access_token
        }
      })
      .then(response =>{
        
      })
      
    },
  },
  mounted () {
    this.getSubscribe;
    this.lastSubscribeChange;
  },
  created () {
    this.debounceFunc = _debounce(this.changeSubscribe, 500);
    console.log("subs",this.getUser.subscribers)
    console.log('user',this.getUser)
  },
  watch: {
    $route (toR, fromR) {
      this.id = toR.params['id']
      this.getUser
      this.getSubscribe;
      this.lastSubscribeChange;
    },
    subscribe: function () {
      this.debounceFunc()
    },
  },
}
</script>
<style scoped>
.user-subscribe{
  height: 40px;
  grid-row-end: 1em;
}
.subscribe{
  background: #3498db;
  border: 2px solid #3498db;
  color: #fff;
  transition: 0.25s;
}
.submit-post:hover{
  color: #2ecc71;
}
.submit-post:active{
  color: #fff;
}
.subscribe:hover{
  background: #e82626;
  border: 2px solid #e82626;
  color: #fff;
}
.submit-post{
  padding: 10px 5px;
  margin: 0;
}
.subscribe:active{
  transition: 0.25s;
  color: #fff;
  background: #2ecc71;
  border: 2px solid #2ecc71;
}

@media only screen and (max-width: 425px) {
  
  .submit-post{
    font-size: 15px;
    padding: 5px 5px;
    margin: 0;
  }
  .submit-post:hover{
    width:150px;
  }
}
</style>
