<template>
  <div>
    <h1>Hello dear - {{ name.firstName }} - {{ getLoginName }}</h1>
    <!-- <div class="about-login">
       <p v-for="(v, k, i) in name" :key="i">{{i}} - {{k}} - {{v}}</p>
    </div> -->
  <Posts />
  </div>
</template>

<script>
import Posts from ".././components/Posts"
import axios from 'axios';
export default {
  components:{
    Posts
  },
  data () {
    return {
      name: {}
    }
  },
  computed: {
    getLoginName () {
      return this.$store.state.loginName
    }
  },
  created () {
    axios.get('http://localhost:3000/users/1')
    .then(response =>{
      this.name = response.data;
    })
  }
}
</script>

<style scoped>
h1{
  text-align: center;
}
.about-login{
  margin-top: 30px;
  text-align: center;
  padding:20px;
  border-bottom: 60px solid crimson;
}


</style>
