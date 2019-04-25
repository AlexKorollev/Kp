<template>
  <transition name="modal-transition">
    <div class="modal" v-if="successModalOpened">
      <div class="modal-background" @click="emitCloseModal()"></div>
      <div class="modal-content">
        <div class="close" @click="emitCloseModal()"><img src="src/assets/close.png" width="20" height="20" alt=""></div>
        <h1 class="title title-modal">Нажимите "окей" чтобы продолжить работу</h1>
        <button class="btn submit-post" @click="emitCloseModal()">окей</button>
        
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  name: 'SuccessModal',
  props: {
    successModalOpened:{
      type: Boolean,
    }
  },
  
  methods: {
    emitCloseModal(){
      this.$emit('modalClose');
    },
    emitMenuClose(){
      this.$emit('menuClose');
    },
  },
}
</script>
<style scoped>
.modal-content{
  width: 320px; 
}
.submit-post{
  color: #3498db;
}
.submit-post:hover{
  color: #2ecc71;
}
.submit-post:focus{
  color: #fff;
}
.title{
  font-size: 16px;
}

</style>


