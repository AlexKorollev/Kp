<template>
  <div class="start">
    <h1>Запись на стрижку</h1>
    <div class="input-field col s12">
      <select required v-model="haircut">
        <option value="" disabled selected>Выберите вид стрижки</option>
        <option value="Стрижка машинкой">Стрижка машинкой</option>
        <option value="Стрижка">Стрижка</option>
        <option value="Детская стрижка">Детская стрижка</option>
      </select>
      <label>Выберите вид стрижки</label>
    </div>
    <div class="input-field col s12">
      <select required v-model="haircutMaster">
        <option value="" disabled selected>Выберите мастера</option>
        <option value="Лёха">Лёха</option>
        <option value="Даник">Даник</option>
        <option value="Гена">Гена</option>
      </select>
      <label>Выберите мастера</label>
    </div>

    <div class="input-field col s12">
      <input type="text" class="datepicker" id="date">
      <label for="date">Нажмите, чтобы выбрать дату</label>

    </div>
    <div class="input-field col s12">
      <input type="text" class="timepicker" id="time">
      <label for="time">Нажмите, чтобы выбрать время</label>

    </div>
    <div class="row">
      <div class="input-field col s2">
        <button class="btn" @click="onSubmit()">Записаться</button>
      </div>
      <div class="input-field col s6">
        
        <p class="pt">Цена за стрижку: {{getPrice}}</p>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'

export default {

  components: {
    
  },
  data () {
    return {
      haircut: '',
      haircutMaster: '',
      date: '',
      time: '',
      phone: '',
    }
  },
  computed: {
    getUsers () {
      return this.$store.state.users
    },
    getLoginId () {
      return this.$store.state.loginId;
    },
    getLoginName () {
      return this.$store.state.loginName;
    },
    getPrice () {
      let sum = 0;
      if(this.haircut == 'Стрижка'){
        return 35;
      }
      if(this.haircut == 'Стрижка машинкой'){
        return 25;
      }
      if(this.haircut == 'Детская стрижка'){
        return 15;
      }
      if(this.haircut == ''){
        return 0;
      } 
    }
  },
  methods: {
    
    onSubmit() {
      
      axios.post('http://localhost:3000/registrations', {
      nickname: this.getLoginName,
      haircut: this.haircut,
      haircutMaster: this.haircutMaster,
      price: this.getPrice,
      date: document.getElementById('date').value,
      time: document.getElementById('time').value,
      })
      .then(response => {
        console.log(response);
        console.log("response")
        this.$router.replace("/");

      })
      .catch(error => {
        console.log("error " + error);
      });
    },
  },
  mounted () {
    M.FormSelect.init(document.querySelectorAll('select'));
    M.Datepicker.init(document.querySelectorAll('.datepicker'),{firstDay: 1, disableWeekends: true});
    M.Timepicker.init(document.querySelectorAll('.timepicker'));
  }
}
</script>

<style scoped>
.start{
  margin: 10px;

  
}
.input-field{
  padding: 10px;
}
.pt{
  padding-top: 10px;
}
</style>
