<template>
  <div class="input-file-container">  
    <input class="input-file" id="my-file" type="file" v-on:change="changeImage">
    <label tabindex="0" for="my-file" class="input-file-trigger" :class="{'avatar-error':avatarError}">{{ $t('avatarEdit')}}</label>
  </div>
</template>

<script>
import axios from 'axios';
export default {
  props: {
    user: Object,
  },
  data () {
    return {
      allowableTypes: ['jpg', 'jpeg', 'png', 'gif'],
      maximumSize: 100000,
      selectedImage: null,
      image: null,
      options:{
        url: 'http://localhost:3000/users/' + this.user.id,
        method: "PUT",
        headers: {
          'Authorization': "bearer " + this.$store.state.access_token
          },
        processData: false, 
        contentType: false 
      },
      avatarError: false,
    }
  },
  methods: {
    
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
        if(this.user.avatar == this.image){
          this.avatarError = true;
        }
        else{
          this.avatarError = false;
          this.user.avatar = this.image
          this.loadImage(this.image)
        }
      };
      reader.readAsDataURL(this.selectedImage)
    },
    loadImage (image){
      axios.put('http://localhost:3000/users/'+this.user.id, {
      email: this.user.email,
      password: this.user.password,
      firstName: this.user.firstName,
      lastName: this.user.lastName,
      avatar: image,
      subscribers: this.user.subscribers,
      },{
        headers: {
          'Authorization': "bearer " + this.$store.state.access_token
          },
        processData: false, 
        contentType: false 
      })
      .then(response => {
        console.log(response);
        // this.$router.replace("/profile");
      })
      .catch(error => {
        console.log("GOVNO " + error);
      });
    }
  }
}
</script>
<style scoped>
.input-file-container {
  position: relative;
  width: auto;
} 
.input-file-trigger {
  display: block;
  padding: 10px 5px;
  /* background: #39D2B4; */
  border: 2px solid #3498db;
  border-radius: 24px;
  color: #3498db;
  font-size: 20px;
  transition: 0.25s;
  cursor: pointer;
  text-align: center;
}
.input-file {
  position: absolute;
  top: 0; left: 0;
  width: 70px;
  opacity: 0;
  padding: 14px 0;
  cursor: pointer;
}
.input-file:hover + .input-file-trigger,
.input-file:focus + .input-file-trigger,
.input-file-trigger:hover,
.input-file-trigger:focus {
  border: 2px solid #2ecc71;
  color: #2ecc71;
  outline: none;
}
.input-file-trigger:active{
  background: #2ecc71;
  color: #fff;
}
.avatar-error{
  border: 2px solid #e85a50;  
  color: #e85a50; 
}
@media only screen and (max-width: 425px){
  .submit-post{
    font-size: 20px;
  }
  
}

</style>
