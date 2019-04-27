<template>
  <li>
    <div class="collapsible-header"><i class="material-icons">sort</i>Сортировка</div>
    <div class="collapsible-body">
      <div class="row">
        <div class="input-field col s12">
          <select v-model="sortBy" id="sort-by">
            <option disabled value="">Выберете вариант сортировки</option>
            <option value="asc">ASC</option>
            <option value="desc">DESC</option>
          </select>
          <label for="fluid">Вид сортировки</label>
        </div>
      </div>
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
          <button class="btn" type="submit" @click="sort()" >Сортировать</button>
        </div>
      </div>
    </div>
  </li>
</template>

<script>
import _debounce from 'lodash.debounce';
import axios from 'axios';

export default {
  name: 'SortRecords',
  data() {
    return {
      sortBy: '',
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
    sort () {
      const options = {
        method: 'GET',
        headers: {
          'Authorization': "bearer " + this.$store.state.access_token
          },
        url: 'http://localhost:3000/registrations?&_sort=' + this.fuild + '&_order=' + this.sortBy,
      };
      
      axios(options)
      .then(response =>{
        console.log(response)
        this.$store.commit('establishRecords',response.data)
        
      });
    } 
  },
}
</script>
<style scoped>

</style>


