<template>
  <div>
    <div class="profile-edit-page" v-if="user!=='' ">
      <div class="profile-edit-image-block">
        <img :src="user.avatar" alt="" class="profile-image">
        <ProfileAvatarEdit :user="user"/>
      </div>
      <div class="profile-edit-block">
        <ProfileMainInfoEdit :user="user"/>
      </div>
      <div class="profile-edit-block">
        <ProfilePasswordEdit :user="user"/>
      </div>
    </div>
    <Loader v-else class="profile-edit-page posts-loading"/>
  </div>
</template>

<script>
import { required, minLength, sameAs } from 'vuelidate/lib/validators'
import axios from 'axios'
import store from '../store'
import Loader from '.././components/Loader'
import ProfilePasswordEdit from '.././components/profile-edit/ProfilePasswordEdit'
import ProfileMainInfoEdit from '.././components/profile-edit/ProfileMainInfoEdit'
import ProfileAvatarEdit from '.././components/profile-edit/ProfileAvatarEdit'
export default {
  name: 'ProfileEdit',
  data() {
    return {
      user: '',
    }
  },
  components: {
    Loader,
    ProfilePasswordEdit,
    ProfileMainInfoEdit,
    ProfileAvatarEdit,
  },
  methods: {
    
    searchUsers () {
      const options = {
        method: 'GET',
        headers: {
          'Authorization': "bearer " + this.$store.state.access_token
          },
        url: 'http://localhost:3000/users/'+this.$store.state.loginId,
      };
      axios(options)
      .then(response =>{
        this.user = response.data;
        
      });
    },

    scroll () {
      window.onscroll = () => {}
    },
    
    uploadImage(event) {

      // let data = new FormData();
      // data.append('name', 'avatar');
      // data.append('file', event.target.files[0]); 
      // console.log(data)
      // let config = {
      //   method: "PUT",
      //   header : {
          
      //     'Authorization': "bearer " + store.state.access_token
      //   },
      //   data: this.data,
      //   url:'http://localhost:3000/users/'+this.$store.state.loginId
      // }

      // axios(config)
      // .then(response => {
      //     console.log('image upload response > ', response)
      //   });

    //   axios.put('http://localhost:3000/users/'+this.$store.state.loginId, {
    //   avatar: this.data
    // },{
    //     headers: {
    //       authorization: "bearer " + this.$store.state.access_token,
    //       'Content-Type' : 'image/png',
    //   }
    // })
    // .then(response =>{
    //   console.log('image upload response > ', response)
    // })
    }
  },
  mounted () {
    this.searchUsers();
    this.scroll()
  }
}
</script>
<style scoped>
.profile-edit-page{
  margin-top: 30px;
  display:flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  height: auto;
  width: 100%;
  /* height: 100vh; */
}
.profile-edit-block{
  display: grid;
  grid-template-columns: 1fr;
  word-break:break-all;
  width:700px;
  box-shadow: var(--theme-box-shadow);
  height: auto;
  align-self: center;
  margin: 30px 10px;
  transition: 0.25s;
}
.profile-image{
  width: 200px;
  height: 200px;
  border: var(--theme-profile-border);
  border-radius: 50%;
  justify-self: left;
  transition: 0.25s;
}
.profile-edit-image-block{
  display: grid;
  grid-template-columns: 1fr 1fr;
  justify-content: left;
  align-items: center;
  grid-column-gap: 3em;
}

.post-loading{
  width:100vw;
}
@media only screen and (max-width: 720px) {
  .profile-edit-block{
    width:95%;
  }
}
@media only screen and (max-width: 425px) {
  .profile-edit-image-block{
    grid-column-gap: 0.5em;
    padding:0 10px;
  }
}
</style>


