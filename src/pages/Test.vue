<template>
  <div class="container">
    <button class="btn" @click="updateCounter(1)">Add</button>
    <button class="btn" @click="updateCounter(-1)">Minus</button>
  </div>
</template>

<script>

export default {
  methods: {
    updateCounter(val){
      // this.$store.commit("changeCounter", val)
      this.$store.dispatch('asyncChangeCounter', {
        counterValue: val,
        timeOutDelay: 200
      })
    }
  }
}
</script>

<style scoped>
h1{
  text-align: center;
}
.container{
  display:flex;
  justify-content: center;
  padding:20px;
  border-bottom: 60px solid crimson;
}
.btn{
  margin:0 30px;
}
</style>
