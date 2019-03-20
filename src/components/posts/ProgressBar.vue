<template>
  <div class="progress-bar">
    <canvas height="30" width="30" id="progress-bar-circle"/>
    <div v-if="!zeroChars" class="circle" :class="{'twenty-chars': twentyChars}"><p>{{ getReversePostLength }}</p></div>
    <div v-else class="circle zero-chars"><p>{{ getReversePostLength }}</p></div>
  </div>
</template>

<script>
import store from '../../store';
export default {
  name: 'ProgressBar',
  props: {
    post: String
  },
  data() {
    return {
      twentyChars: false,
      zeroChars:false
    }
  },
  computed: {
    getReversePostLength () {
      return (this.post.length-255)*-1 || 0;
    }
  },
  methods: {
    fillCounter(progressBar,cw,ch){

      if(this.getReversePostLength>=0){
        this.$store.commit("addPostError", false);
        this.zeroChars = false;
        this.twentyChars = false;
        let start = (Math.PI*2/255)*this.post.length;
        progressBar.clearRect(0,0,cw,ch);   // Clear canvas every time when function is call
        progressBar.lineWidth = 4;     // size of stroke
        progressBar.strokeStyle = '#a9d0ea';    // Stroke Color
        progressBar.fillStyle = 'blue';
        progressBar.beginPath();
        progressBar.arc(15,15,15,start,Math.PI*2);    //arc(x,y,radius,start,stop)
        progressBar.stroke();   // to fill stroke

        if(this.getReversePostLength<=20){
          this.twentyChars = true;
        }
      } 
      else{
        progressBar.beginPath();
        progressBar.arc(15,15,15,Math.PI*2,Math.PI*2);    //arc(x,y,radius,start,stop)
        progressBar.stroke();   // to fill stroke
        this.twentyChars = false;
        this.zeroChars = true;
        this.$store.commit("addPostError", true);
      }
    },
    getProgressBarElements () {
      var progressBar = document.getElementById('progress-bar-circle').getContext('2d');
        //Point from where you want to fill the circle
      var cw = progressBar.canvas.width;  //Return canvas width
      var ch = progressBar.canvas.height; //Return canvas height
      this.fillCounter(progressBar,cw,ch);
    }
  },
  watch: {
    post() {
      this.getProgressBarElements();
    }
  },
}
</script>
<style scoped>
.progress-bar{
  width:30px;
  height: 30px;
  position: relative;
  z-index:40;
}
#progress-bar-circle{
  width:32px;
  border-radius: 50%;
  z-index: 60;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%,-50%);
  
}
/* .progress-bar-div{
  width: calc(100% - 4px);
  height: calc(100% - 4px);
  border: 2px solid #ccc;
  border: 2px solid #3498db;
  background: #ccc;
  border-radius:50%;
  animation: rotate 5s linear infinite;
} */

.circle{
  height: 27px;
  width: 27px;
  background: none;
  border:2px solid #3498db;
  border-radius: 50%;
  z-index: 50;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%,-50%);
  transition: 0.25s;
}
.twenty-chars{
  border:2px solid #feae22;
}
.zero-chars{
  border:2px solid #e82626;
}
.circle p{
  text-align: center;
  line-height:27px;
  height: 27px;
  color:  #6b6b6b;
  font-size: 13px;
}
.zero-chars p{
  color: #e82626;
}
</style>
