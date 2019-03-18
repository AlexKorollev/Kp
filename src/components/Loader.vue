<template>
  <div class="loader-page">
    <div class="loader">
      <div class="loader-div">
        <div class="loader-div">
          <div class="loader-div">
            <div class="loader-div">
              <div class="loader-div">
              
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<style scoped>
.loader-page{
  display:grid;
  justify-items: center;
}
.loader{
  width:50px;
  height: 50px;
}
.loader-div{
  width: calc(100% - 4px);
  height: calc(100% - 4px);
  /* border: 2px solid #ccc; */
  border-top: 2px solid #3498db;
  border-radius:50%;
  animation: rotate 5s linear infinite;
}

@keyframes rotate {
  100% {transform: rotate(360deg)}
}
</style>
