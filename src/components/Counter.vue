<template>
  <div>
    <h1>Counter: {{counter}}</h1>
  </div>

</template>

<script>

export default {
  computed: {
    counter(){
      return this.$store.getters.computedCounter
    }
  }
}
</script>

<style scoped>
h1{
  text-align: center;
}
</style>
