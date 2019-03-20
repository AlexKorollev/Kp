<template>
  <div class="autocomplite">
    <input type="search" :placeholder="$t('autocomplite')" id="input" v-model="search" autocomplete="off">
    <div class="search-result" v-if="this.$store.state.autocomplite">
      <ul class="list-of-names">
        <li @click="closeAutocomplite()" v-for="(name, i) in names" :key="i"><router-link class="autocomplite-users" :to="'/user/'+ name.id">{{ name.firstName }}  {{ name.lastName }}</router-link></li>
      </ul>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import _debounce from 'lodash.debounce';
import _split from 'lodash.split';
export default {
  name: 'Autocomplite',
  data() {
    return {
      search: '',
      names: {}
    }
  },
  methods: {
    searchUsers () {
      if(this.$store.state.login){
        this.$store.commit("changeAutocomplite", true);
        const options = {
          method: 'GET',
          headers: {
            'Authorization': "bearer " + this.$store.state.access_token
            },
          url: 'http://localhost:3000/users?firstName_like='+this.search,
        };
        
        axios(options)
        .then(response =>{
          console.log(response)
          this.names = response.data;
        });
      }
    },
    closeAutocomplite () {
      this.$store.commit("changeLoading",true);
      this.$store.commit("changeAutocomplite", false);
      
    },
    handleClickOutside(evt) {
      if (!this.$el.contains(evt.target)) {
        this.$store.commit("changeAutocomplite", false);
      }
    }
  },
  created () {
    this.debounceFunc = _debounce(this.searchUsers, 500);
  },
  watch: {
    search: function () {
      this.debounceFunc()
    },
  },
  mounted() {
    document.addEventListener('click', this.handleClickOutside);
  },
  destroyed() {
    document.removeEventListener('click', this.handleClickOutside);
  }

}
</script>
<style scoped>
.autocomplite{
  position: relative;
}
.autocomplite input{
  width:100%;
  border: none;
  background: none;
  text-align: left;
  border-bottom: 2px solid #3498db;
  outline: none;
  color:var(--theme-color);
  transition: 0.25s;
  font-size: 20px;
  padding-left: 20px;
}

.autocomplite input:focus{
  border-color: #2ecc71;
}
.search-result{
  width:100%;
  position: absolute;
  word-break: normal;
  z-index: 100;
}
.list-of-names{
  background: var(--theme-background);
  border:none;
  border-bottom-right-radius: 12px;
  border-bottom-left-radius: 12px;
  max-height: 250px;
  overflow: auto;
  box-shadow: var(--theme-box-shadow);
}
.list-of-names li{
  list-style-type: none;
  padding: 10px 20px;
  border-bottom: var(--theme-border-bottom);
}
.list-of-names li a{
  text-decoration: none;
  outline:none;
  color: #6b6b6b;
}
.list-of-names li a:hover{
  color: #3498db;
}
@media only screen and (max-width: 425px){
  .autocomplite input{
    font-size: 15px;
  }

  .list-of-names{
    width: 200px;
  }
}
</style>
