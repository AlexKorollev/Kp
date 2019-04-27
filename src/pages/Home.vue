<template>
  <div class="start">
    <h1>Добро пожаловать</h1>
    <a class="waves-effect waves-light btn modal-trigger" href="#modal1"> Попросить перезвонить</a>

    <div id="modal1" class="modal">
      <div class="modal-content">
        <h4>Дорогой наш клиент!</h4>
        <p>Введите ваш номер и мы вам перезвоним!</p>
        <div class="input-field col s12">
          <input id="phone" type="text" class="validate" v-model="phone">
          <label for="phone">Номер</label>
        </div>
      </div>
      <div class="modal-footer">
        <a class="modal-close waves-effect waves-red btn-flat">Отмена</a>
        <a @click="callBack()" class="modal-close waves-effect waves-green btn-flat">Подтвердить</a>
      </div>
    </div>
  </div>
  
</template>

<script>
import axios from 'axios'

export default {

  data () {
    return {
      phone: '',
    }
  },
  computed: {
    getLoginName () {
      return this.$store.state.loginName;
    }
  },
  methods: {
    callBack () {
      axios.post('http://localhost:3000/callbacks', {
        nickname: this.getLoginName,
        phone: this.phone,
      })
      .then(response => {
        this.phone = ""
      })
      .catch(error => {
      });
    }
  },
  mounted() {
    M.Modal.init(document.querySelectorAll('.modal'));
  },
}
</script>

<style scoped>
.start{
  margin-top: 30px;
  display: grid;
  grid-template-columns: 1fr;
  width:100%;
  justify-items: center;
  grid-row-gap:1em;
  
}

</style>
