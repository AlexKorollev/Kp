<template>
  <div class="container" @click="progress()">
    <!-- <button class="btn" @click="updateCounter(1)">Add</button>
    <button class="btn" @click="updateCounter(-1)">Minus</button> -->
    <div class="progress_width">
    <div id="progressBar"></div>
    </div>
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
    },
    progress()
    {
        var i=0;
        var width= document.getElementById('progressBar').parentNode.clientWidth;
        var id=setInterval(grow, 10)
        
        function grow()
        {
            if(i<width)
            {
                i+=1;
                if(!document.getElementById('progressBar').setAttribute("style","width: "+i+"px;"))
                    document.getElementById('progressBar').style.width = i;
                
            }
            else
            {
                alert('готово')
                clearInterval(id);
            }
        }
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
.progress_width{
  width: 500px;
  height: 10px;
  margin: 0 auto;
  border: 1px solid #000;
  color: #fff;
}
#progressBar{
  width: 0;
  height: 10px;
  background-color: #f00;
}
</style>