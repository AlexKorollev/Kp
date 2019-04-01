<template>
  <div class="autocomplite">
    <input type="search" :placeholder="$t('autocomplite')" id="input" v-model="search" autocomplete="off">
    <div class="search-result" v-if="this.$store.state.autocomplite">
      <ul class="list-of-names" v-if="!loading && findHashtag!=='#'">
        <li @click="closeAutocomplite()" v-for="(name, i) in names" :key="i"><router-link :to="'/user/'+ name.id">{{ name.firstName }}  {{ name.lastName }}</router-link></li>
        <div>
          <button v-if="names.length >=5 && names.length < totalNames" class="btn add-more-comments autocomplite-users" @click="getUsers()">{{ $t('showMore') }}</button> 
        </div>
      </ul>
      <ul class="list-of-names" v-else-if="!loading && findHashtag=='#'">
        <li @click="closeAutocomplite()" v-for="(tag, i) in hashtags" :key="i"><router-link :to="'/tags/'+tag.split('').slice(1).join('')">{{ tag }}</router-link></li>
        <div>
          <button v-if="totalHashtags==10 && totalHashtagsCount!==10" class="btn add-more-comments autocomplite-users" @click="getUsers()">{{ $t('showMore') }}</button> 
        </div>
      </ul>
      <Loader v-else class="list-of-names autocomplite-loader"/>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import _debounce from 'lodash.debounce';
import _split from 'lodash.split';
import Loader from './Loader';
export default {
  name: 'Autocomplite',
  components: {
    Loader
  },
  data() {
    return {
      search: '',
      names: [],
      page: 1,
      totalNames: 0,
      loading: false,
      findHashtag: '',
      hashtags: [],
      totalHashtags: 0,
      totalHashtagsCount: 0,
    }
  },
  methods: {
    searchUsers (page) {
      this.findHashtag = this.search.split("")[0]
      if(this.$store.state.login && this.findHashtag!=='#'){
        let vm = this;
        this.$store.commit("changeAutocomplite", true);
        const options = {
          method: 'GET',
          headers: {
            'Authorization': "bearer " + this.$store.state.access_token
            },
          url: 'http://localhost:3000/users?firstName_like='+this.search+'&_page='+(page || 1)+'&_limit=10',
        };
        
        axios(options)
        .then(response =>{
          this.loading = false;
          this.totalNames = response.headers['x-total-count'];
          if(this.page==1){
            this.names = response.data;
          }
          else{
            response.data.forEach(name => this.names.push(name));
          }
        });
      }
      else if(this.$store.state.login && this.findHashtag=='#'){
        let vm = this;
        this.$store.commit("changeAutocomplite", true);
        const options = {
          method: 'GET',
          headers: {
            'Authorization': "bearer " + this.$store.state.access_token
            },
          url: 'http://localhost:3000/posts/?tags_like='+this.search.split('').slice(1).join("")+'&_page='+(page || 1)+'&_limit=10',
        };
        
        axios(options)
        .then(response =>{
          console.log(response)
          let buff = []
          let result = [];
          this.totalHashtags = response.data.length;
          this.totalHashtagsCount = response.headers['x-total-count'].length;
          response.data.forEach(tag => buff.push(tag.tags));
          buff.forEach(arr => {
            for(let i=0;i<arr.length;i++){
              if(arr[i].indexOf(this.search)!==-1){
                result.push(arr[i]);
              }
            }
          })
          
          if(this.page==1){
            this.hashtags = this.unique(result);
            
          }
          else{
            this.unique(result).forEach(tag => {
              this.hashtags.push(tag);
            })
          }
          this.loading = false;
        });
      }
    },
    getUsers () {
      this.page++;
      this.searchUsers(this.page);
    },
    closeAutocomplite () {
      this.$store.commit("changeLoading",true);
      this.$store.commit("changeAutocomplite", false);
      
    },
    handleClickOutside(evt) {
      if (!this.$el.contains(evt.target)) {
        this.$store.commit("changeAutocomplite", false);
      }
    },
    unique(arr) {
      var obj = {};
      for (var i = 0; i < arr.length; i++) {
        var str = arr[i];
        obj[str] = true; // запомнить строку в виде свойства объекта
      }
      return Object.keys(obj); // или собрать ключи перебором для IE8-
    },
  },
  created () {
    this.debounceFunc = _debounce(this.searchUsers, 500);
  },
  watch: {
    search: function () {
      document.addEventListener('click', this.handleClickOutside);
      this.loading = true;
      this.page=1;
      this.debounceFunc()
    },
  },
  mounted() {
    
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
  color:var(--theme-button-color);
  display:grid;
  grid-template-columns: 1fr;
}
.list-of-names li:hover{
  background: var(--theme-list-background);
}
.autocomplite-users{
  padding: 10px 20px;
  text-align: left;
}
.autocomplite-loader{
  padding:15px 0 5px 0;
  overflow: hidden;
}
@media only screen and (max-width: 425px){
  .list-of-names{
    width: 200px;
  }
}
</style>
