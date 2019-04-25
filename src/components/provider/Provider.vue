<template>
  <tr :class="(index % 2 == 0)?'provider-page-row':'provider-page-second-row'">

    <td>{{provider.name}}</td>
    <td>{{provider.amount}}</td>
   
  </tr>
  
</template>

<script>
import axios from 'axios'

export default {
  name: 'Provider',
  data() {
    return {
      
    }
  },
  props: {
    provider: Object,
    index: Number
  },
}
</script>
<style scope>
td{
  border: var(--theme-border-bottom);
  padding: 0 10px;
}
td:last-child{
  text-align: center;
  border: var(--theme-border-bottom);
  padding: 0 10px;
}
.provider-page-row{
  background: var(--theme-table-two);

}
.provider-page-second-row{
  background: var(--theme-header-background);

}
</style>


