<template>
  <tr v-if="!editClient" :class="(index % 2 == 0)?'client-page-row':'client-page-second-row'">
    <td><th><input type="checkbox" @click="changeDelete()"></th></td>
    <td>{{client.lastName + "\n" + client.firstName + "\n" + client.patronymic}}</td>
    <td>{{client.dateOfBirth}}</td>
    <td>{{client.passportSeries}}</td>
    <td>{{client.passportNumber}}</td>
    <td>{{client.authority}}</td>
    <td>{{client.dateOfIssue}}</td>
    <td>{{client.city}}</td>
    <td>{{client.residenceCity}}</td>
    <td>{{client.address}}</td>
    <td>{{client.mobileNumber}}</td>
    <td>{{client.homeNumber}}</td>
    <td>{{client.email}}</td>
    <td>{{client.job}}</td>
    <td>{{client.post}}</td>
    <td>{{client.familyStatus}}</td>
    <td>{{client.nationality}}</td>
    <td>{{client.disability}}</td>
    <td>{{client.pensioner}}</td>
    <td>{{client.mounthlyRevenue}}</td>
    <td class="edit-images"><img class="cp" src="/src/assets/pencil-edit-button.png" @click="showEditClient" width=15 alt=""></td>
  </tr>
  <tr v-else :class="(index % 2 == 0)?'client-page-row':'client-page-second-row'">
    <td></td>
    <td>
      <input type="text" id="lastName" :placeholder="$t('inputLastName')" class="form-control" v-model="client.lastName">
      <input type="text" id="lastName" :placeholder="$t('inputLastName')" class="form-control" v-model="client.firstName">
      <input type="text" id="lastName" :placeholder="$t('inputLastName')" class="form-control" v-model="client.patronymic">
    </td>
    <td>
      <input type="date" id="dateOfBirth" :placeholder="'dateOfBirth'" v-model="client.dateOfBirth">
    </td>
    <td>
      <input type="text" id="passportSeries" :placeholder="'passportSeries'" v-model="client.passportSeries">      
    </td>
    <td>
      <input type="text" id="passportNumber" :placeholder="'passportNumber'" v-model="client.passportNumber">      
    </td>
    <td>
      <input type="text" id="authority" :placeholder="'authority'" v-model="client.authority">      
    </td>
    <td>
      <input type="date" id="dateOfIssue" :placeholder="'dateOfIssue'" v-model="client.dateOfIssue">      
    </td>
    <td>
      <input type="text" id="city" :placeholder="'city'" v-model="client.city">      
    </td>
    <td>
      <select :class="(index % 2 == 0)?'client-page-row':'client-page-second-row'" name="residenceCity" id="residenceCity" required v-model="client.residenceCity"> 
        <option disabled value="">Выберите город проживания</option>
        <option value="Минск">Минск</option>
        <option value="Гродно">Гродно</option>
        <option value="Гомель">Гомель</option>
        <option value="Гомель">Могилёв</option>
        <option value="Брест">Брест</option>
        <option value="Витебск">Витебск</option>
      </select>
    </td>
    <td>
      <input type="text" id="address" :placeholder="'address'"  v-model="client.address">      
    </td>
    <td>
      <input type="text" id="mobileNumber" :placeholder="'mobileNumber'" v-model="client.mobileNumber">
    </td>
    <td>
      <input type="text" id="homeNumber" :placeholder="'homeNumber'" v-model="client.homeNumber">      
    </td>
    <td>
      <input type="email" id="email" :placeholder="$t('inputEmail')" v-model="client.email">
    </td>
    <td>
      <input type="text" id="job" :placeholder="'job'" v-model="client.job">
    </td>
    <td>
      <input type="text" id="post" :placeholder="'post'" v-model="client.post">      
    </td>
    <td>
      <select :class="(index % 2 == 0)?'client-page-row':'client-page-second-row'" name="familyStatus" id="familyStatus" v-model="client.familyStatus"> 
        <option disabled value="">Выберете семейное положение</option>
        <option value="Женат">Женат</option>
        <option value="Не женат">Не женат</option>
      </select>
    </td>
    <td>
      <select :class="(index % 2 == 0)?'client-page-row':'client-page-second-row'" name="nationality" id="nationality" v-model="client.nationality"> 
        <option disabled value="">Выберете Гражданство</option>
        <option value="Белорус">Белорус</option>
        <option value="Россиянин">Россиянин</option>
      </select>
    </td>
    <td>
      <select :class="(index % 2 == 0)?'client-page-row':'client-page-second-row'" name="disability" id="disability" v-model="client.disability"> 
        <option disabled value="">Выберете Инвалидность</option>
        <option value="Да">Да</option>
        <option value="Нет">Нет</option>
      </select>
    </td>
    <td>
      <input type="radio" id="one" value="Да" v-model="client.pensioner" required>
      <label for="one">Да</label>
      <br>
      <input type="radio" id="two" value="Нет" v-model="client.pensioner">
      <label for="two">Нет</label>
    </td>
    <td>
      <input type="text" id="address" :placeholder="'mounthlyRevenue'" v-model="client.mounthlyRevenue">      
    </td>
    <td class="edit-images">
      <img class="cp" @click="saveEditClient" src="/src/assets/save-file-option.png" width=15 alt="">
      <img class="cp" @click="closeEditClient" src="/src/assets/close.png" width=15 alt="">
    </td>
  </tr>
</template>

<script>
import axios from 'axios'

export default {
  name: 'Client',
  data() {
    return {
      deleteClient: false,
      editClient: false
    }
  },
  props: {
    client: Object,
    index: Number
  },
  components: {

  },
  computed: {
  },
  methods: {
    changeDelete () {
      this.deleteClient = !this.deleteClient
      if(this.deleteClient){
        this.$store.commit("addDeleteClient",this.client.id);
        this.$store.commit("addIndexForDeleteClient",this.index)
      }
      else{
        this.$store.commit("deleteDeleteClient",this.client.id)
        this.$store.commit("deleteIndexForDeleteClient",this.index)
      }
    },
    showEditClient () {
      this.editClient = true;
    },
    saveEditClient () {
      axios.put('http://localhost:3000/clients/'+this.client.id, {
        lastName: this.client.lastName,
        firstName: this.client.firstName,
        patronymic: this.client.patronymic,
        dateOfBirth: this.client.dateOfBirth,
        passportSeries: this.client.passportSeries,
        passportNumber: this.client.passportNumber,
        authority: this.client.authority,
        dateOfIssue: this.client.dateOfIssue,
        indentificationNumber: this.client.indentificationNumber,
        birthPlace: this.client.birthPlace,
        city: this.client.city,
        residenceCity: this.client.residenceCity,
        address: this.client.address,
        mobileNumber: this.client.mobileNumber,
        homeNumber: this.client.homeNumber,
        email: this.client.email,
        job: this.client.job,
        post: this.client.post,
        familyStatus: this.client.familyStatus,
        nationality: this.client.nationality,
        disability: this.client.disability,
        pensioner: this.client.pensioner,
        mounthlyRevenue: this.client.mounthlyRevenue*1,
      })
      .then(response => {
      })
      .catch(error => {
        console.log("error",error);
      });
      this.editClient = false;
    },
    closeEditClient () {
      this.editClient = false;
    }
  },
  mounted () {
    this.$store.commit("clearDeleteClient")
  }
}
</script>
<style scope>
td{
  border: var(--theme-border-bottom);
  padding: 0 10px;
}
.edit-images img{
  padding: 5px 0;
}
.client-page-row{
  background: var(--theme-table-two);

}
.client-page-second-row{
  background: var(--theme-header-background);

}
select{
  border: none;
  background: none;
  border-bottom: 2px solid #3498db;
  outline: none;
  color:var(--theme-color);
  transition: 0.25s;
  font-size: 16px;
  text-align-last:left;
  text-decoration: none;
  width: 100%;
  padding: 0;
  margin-bottom: 5px;

}

select:focus{
  border-color: #2ecc71;
}
td input[type=text],td input[type=date],td input[type=email]{
  border: none;
  background: none;
  text-align: left;
  border-bottom: 2px solid #3498db;
  width: 93%;
  align-items: center;
  margin-bottom: 5px;
  outline: none;
  color: var(--theme-color);
  transition: 0.25s;
  font-size: 16px;
  padding: 0;
}
td input:focus{
  border-color: #2ecc71;
}
</style>


