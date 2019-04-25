<template>
  <div>
    <div class="profile-edit-page-admin">
      <div class="profile-edit-block-admin">
        <AddUser :users="getUsers"/>
      </div>
      <div class="profile-edit-block-admin">
        <DeleteUser :users="getUsers"/>
      </div>
    </div>
  </div>
</template>

<script>
import api from '../helpers/api'
import AddUser from '.././components/admin-components/AddUser'
import DeleteUser from '.././components/admin-components/DeleteUser'

export default {
  name: 'Admin',
  data() {
    return {
      users: []
    }
  },
  components: {
    AddUser,
    DeleteUser
  },
  computed: {
    getUsers () {
      return this.$store.state.users
    }
  },
  methods: {
    scroll () {
      window.onscroll = () => {}
    },
  },
  mounted () {
    this.scroll()
    api.searchUsers();
    this.getUsers
  }
}
</script>
<style>
.profile-edit-page-admin{
  margin-top: 30px;
  display:flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  height: auto;
  width: 100%;
  /* height: 100vh; */
}
.profile-edit-block-admin{
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

.form-group-admin{
  display:grid;
  grid-template-columns: 1fr 2fr;
  grid-gap: 1em;
  color: var(--theme-color);
  margin-top: 20px;
}
.buttons-admin{
  display:grid;
  grid-template-columns: 1fr;
}
.button-group-admin{
  display:grid;
  grid-template-columns: 1fr 2fr;
  grid-column-gap:1em;
}
.form-group-admin label{
  justify-self: right;
  font-size: 25px;
  font-weight: bold;
  word-break: normal;  /* не поддерживает Opera12.14, значение keep-all не поддерживается IE, Chrome */ 
  text-align: right;
}
.form-group-admin input{
  border: none;
  background: none;
  text-align: left;
  border-bottom: 2px solid #3498db;
  width: 93%;
  align-items: center;
  padding: 0;
  outline: none;
  color: var(--theme-color);
  transition: 0.25s;
  font-size: 20px;
}
.form-group-admin input:focus{
  border-color: #2ecc71;
}
.submit-post-admin{
  justify-self: left;
  color: #3498db;
}
.submit-post-admin:hover{
  color: #2ecc71;
}
.submit-post-admin:active{
  color: #fff;
}
.cancel-admin{
  justify-self: left;
  text-align: center;
  color: #3498db;
}
.cancel-admin:hover{
  border: 2px solid #e85a50;
  color:#e82626;
}
.cancel-admin:active{
  border: 2px solid #e82626;
  background: #e85a50;
  color: #fff;
}
.error-title-admin,.success-title-admin{
  text-align: center;
  background: #e85a50;
  width:100%;
  padding: 20px 0;
}
.success-title-admin{
  background: #2ecc71;
}
.invalid-feedback-admin{
  text-align: left;
}
.show-password-admin{
  right: 0px;
  top: -2px;
}
@media only screen and (max-width: 720px) {
  .profile-edit-block-admin{
    width:95%;
  }
}
@media only screen and (max-width: 635px) {
  .form-group-admin{
    grid-template-columns: 1fr;
    margin: 15px 10px;
  }
  .form-group-admin label{
    justify-self: left;
  }
  
  .profile-edit-main-admin{
    grid-row-gap: 0em;
  }
  .form-group-admin input{
    text-align: left;
    width:100%;
  }
}

@media only screen and (max-width: 425px) {
  .submit-post-admin{
    width:120px;
  }
}
</style>


