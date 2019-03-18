<template>
  <div class="single-post">
    <h2>{{ $t('noPosts') }}</h2>
  </div>
</template>
<style scoped>
.single-post{
  width:400px;
  border-radius:2px;
  font-size: 20px;
  border: var(--theme-border-bottom);
  background: var(--theme-background);
  color:var(--theme-color);
  padding: 20px 0;
  text-align: center;
  box-shadow: var(--theme-box-shadow);
  transition: 0.25s;
}
@media only screen and (max-width: 425px){
  .single-post{
    width:280px;
  }
}
</style>