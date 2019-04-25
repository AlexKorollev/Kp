<template>
  <div class="home-page">
    <div class="home-page-block">
      <h1 class="title">{{ $t('menu') }}</h1>
      <router-link class="btn link home-page-btn" :to="'/sign-up'">Добавление сотрудника</router-link>
      <router-link class="btn link home-page-btn" :to="'/list-of-clients'">Список сотрудников</router-link>
      <div @click="openModal()">
        <GetTaxes />
      </div>
      <router-link class="btn link home-page-btn" :to="'/list-of-taxes'">Отчет по подоходному налогу</router-link>
      <router-link class="btn link home-page-btn" :to="'/providers'">Расчет с поставщиками</router-link>
      <router-link class="btn link home-page-btn" :to="'/providers-list'">Отчет по переводам</router-link>
    </div>
    <SuccessModal :successModalOpened="successModalOpened" @modalClose="closeModal"/>
  </div>
</template>

<script>
import store from '../store'
import api from '../helpers/api'
import GetTaxes from '../components/taxes/GetTaxes'
import SuccessModal from '../components/SuccessModal'
import scroll from '../helpers/scroll'

export default {

  components: {
    GetTaxes,
    SuccessModal
  },
  data () {
    return {
      successModalOpened: false,

    }
  },
  computed: {
    getUsers () {
      return this.$store.state.users
    }
  },
  methods: {
    openModal () {
      this.successModalOpened = true;
      scroll.disableScroll();
    },
    closeModal () {
      this.successModalOpened = false;
      scroll.enableScroll();
    },
  },
  mounted() {
    api.searchUsers();
  },
}
</script>

<style scoped>
.home-page{
  margin-top: 30px;
  display: grid;
  grid-template-columns: 1fr;
  width:100%;
  justify-items: center;
  grid-row-gap:1em;
  
}
.home-page-block{
  width:400px;
  justify-items: center;
  display: grid;
  box-shadow: var(--theme-box-shadow);
  padding-bottom: 10px;
}
.title{
  margin-bottom: 20px;
}
.home-page-btn{
  width:280px;
  margin:10px 0px;
  padding: 10px 0;
  text-align: center;
  border: none;
  border-radius: 5px;
  border: 2px solid #3498db;
  background: var(--theme-background);
  color: var(--theme-color);
}
.home-page-btn:hover{
  border-color: #2ecc71;
  color: #2ecc71;
}
.home-page-btn:focus{
  background: #2ecc71;
  color: #fff;
}
@media only screen and (max-width: 425px){
  .home-page-block{
    width:100%;
  }
  .home-page{
    margin-top: 0;
  }
}
</style>
