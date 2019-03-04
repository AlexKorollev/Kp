<template>
  <div>
    <test-counter></test-counter>
    <test-action-counter></test-action-counter>
  </div>

</template>

<script>
import Counter from '.././components/Counter'
import ActionCounter from '.././components/ActionCounter'

export default {
  components: {
    testCounter: Counter,
    testActionCounter: ActionCounter
  }
}
</script>

<style scoped>
h1{
  text-align: center;
}
</style>
