<template>
  <div class="drop-settigs-menu" v-if="visibleStatus">
      <div class="drop-settigs-background" @click="emitClose"></div>
      <div class="drop-settigs-content">
        <div class="delete-post" @click="deletePost(userPost.id, index)">{{ $t('delete') }}</div>
      </div>
    </div>
</template>
<script>
 
import api from '../../../helpers/api'
export default {
  name: 'DropSettings',
  props: {
    visibleStatus: Boolean,
    userPost: Object,
    index: Number
  },
  data() {
    return{
      
    }
  },
  computed: {
    
  },
  methods: {
    deletePost(id, index){
      api.deletePost(id, index);
      this.emitClose();
    },
    emitClose(){
      this.$emit('close');
    },
  },
  watch: {
  }
}
</script>
<style>
.drop-settigs-menu{
  display:flex;
  align-items: center;
  justify-content: center;
  z-index:1050;
}
.drop-settigs-background{
  position: fixed;
  left:0;
  top:0;
  width: 100vw;
  height: 100vh;
  background: none;
  z-index:40;
}
.drop-settigs-content{
  width:200px;
  min-height: 40px;
  background: var(--theme-background);
  z-index:50;
  /* border:2px solid #ccc; */
  border-radius: 2px;
  box-shadow: var(--theme-box-shadow);
  display:grid;
  grid-template-columns: 1fr;
  justify-items: center;
  align-items: center;
}
.delete-post{
  color:crimson;
  cursor: pointer;
}
@media only screen and (max-width: 768px) {
  .drop-settigs-content{
    width:100vw;
  }
  .drop-settigs-background{
    background: rgba(10,10,10,0.4);
  }
}
/* .modal-content{
  background-color: #efeeee;
  z-index:50;
  padding: 2em 4em;
  display:grid;
  grid-template-columns: 1fr;
  justify-items: center;
  grid-gap:1em;
  border-radius: 2px;
  width:300px;
} */
</style>