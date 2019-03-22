<template>
  <div class="date">
    <p>{{object.date}}</p>
  </div>
</template>
<script>
 
import api from '../../../helpers/api'
import i18n from '../../../plugins/i18n';
export default {
  name: 'Date',
  props: {
    object: Object
  },
  computed: {
    getData () {
      var now = new Date();
      now = now.getTime() / 1000;
      var dateOfAddUser = (now - this.object.date) / 86400;
      if (dateOfAddUser < 1) this.object.date = 'today';
      else if (1 < dateOfAddUser && 2 > dateOfAddUser) this.object.date = '1 day';
      else if (2 < dateOfAddUser && 3 > dateOfAddUser) this.object.date = '2 day';
      else if (3 < dateOfAddUser && 4 > dateOfAddUser) this.object.date = '3 day';
      else if (4 < dateOfAddUser && 5 > dateOfAddUser) this.object.date = '4 day';
      else if (5 < dateOfAddUser && 6 > dateOfAddUser) this.object.date = '5 day';
      else if (6 < dateOfAddUser && 7 > dateOfAddUser) this.object.date = '6 day';
      else if (7 < dateOfAddUser && 14 > dateOfAddUser) this.object.date = '1 week';
      else if (14 < dateOfAddUser && 20 > dateOfAddUser) this.object.date = '2 weeks';
      else if (20 < dateOfAddUser && 27 > dateOfAddUser) this.object.date = '3 weeks';
      else if (27 < dateOfAddUser) this.object.date = 'a m.ago';
      var date = 1521042620;
      var now = new Date();
      now = now.getTime() / 1000;
      var dateOfAddUser = (now - date) / 86400;
      // console.log('i18n-test',i18n._vm.$root.messages.en.aboutUser)
    }
  },
  mounted () {
    this.getData;
  }
}
</script>
<style scoped>
.date{
  font-size: 14px;
  color: #657786;
  padding-left: 15px;
  
}
.date:hover{
  text-decoration: underline;
  
}
.date:before {
  position: absolute;
    content: "\00b7";
    padding-top: 1px;
    margin-left: -9px;
}
@media only screen and (max-width: 425px){
  .date{
    font-size: 10px;
    padding-top: 4px;
  }
}
</style>