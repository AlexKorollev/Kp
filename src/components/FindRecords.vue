<template>
  <li>
    <div class="collapsible-header"><i class="material-icons">search</i>Поиск</div>
    <div class="collapsible-body">
      <div class="row">
        <div class="input-field col s12">
          <select v-model="fuild" id="fluid">
            <option value="" disabled selected>Выберите поле для поиска</option>
            <option value="nickname">Никнейм</option>
            <option value="haircut">Услуга</option>
            <option value="haircutMaster">Мастер</option>
          </select>
          <label for="fluid">Поле для поиска</label>
        </div>
      </div>
      <div class="row">
        <div class="input-field col s12">
          <input id="search" type="text" class="validate" v-model="search">
          <label for="search">Поиск</label>
        </div>
      </div>
    </div>
  </li>
</template>

<script>
import _debounce from 'lodash.debounce';
import axios from 'axios';

export default {
  name: 'SearchRecords',
  data() {
    return {
      search: '',
      fuild: '',
      selectError: false
    }
  },
  props: {
    records: Array,
  },
  components: {
  },
  computed: {
    getRecords () {
      return this.$store.state.records
    },
  },
  methods: {
    findRecords () {
      const options = {
        method: 'GET',
        headers: {
          'Authorization': "bearer " + this.$store.state.access_token
          },
        url: 'http://localhost:3000/registrations?' + this.fuild +'_like='+ this.search,
      };
      
      axios(options)
      .then(response =>{
        console.log(response)
        this.$store.commit('establishRecords',response.data)
      });
    },
  },
  mounted () {
    M.FormSelect.init(document.querySelectorAll('select'));
  },
  created () {
    this.debounceFunc = _debounce(this.findRecords, 500);
  },
  watch: {
    search: function () {
      this.debounceFunc()
    },
  },
}
</script>
<style scoped>

</style>


