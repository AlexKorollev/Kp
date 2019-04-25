<template>
  <div class="validate">
    <form @submit.prevent="onSubmit" autocomplete="off" id="create-client">
      <h1 class="title">{{ $t('singUp') }}</h1>
      <div class="form-group required">
        <input type="text" id="lastName" :placeholder="$t('inputLastName')" class="form-control" :class="{'is-invalid': $v.lastName.$error}" @blur="$v.lastName.$touch()" v-model="lastName">
        <img src="/src/assets/star.png" width="10" class="show-required">
        <div class="invalid-feedback" v-if="!$v.lastName.required && $v.lastName.$error">{{ $t('fistNameRequest') }}</div>
        <div class="invalid-feedback" v-if="!$v.lastName.alpha && $v.lastName.$error">{{ $t('useOnlyLeterRequest') }}</div>
      </div>
      
      <div class="form-group required">
        <input type="text" id="firstName" :placeholder="$t('inputFirstName')" class="form-control" :class="{'is-invalid': $v.firstName.$error}" @blur="$v.firstName.$touch()" v-model="firstName">
        <img src="/src/assets/star.png" width="10" class="show-required">
        <div class="invalid-feedback" v-if="!$v.firstName.required && $v.firstName.$error">{{ $t('fistNameRequest') }}</div>
        <div class="invalid-feedback" v-if="!$v.firstName.alpha && $v.firstName.$error">{{ $t('useOnlyLeterRequest') }}</div>
      </div>

      <div class="form-group required">
        <input type="text" id="patronymic" :placeholder="'Отчество'" class="form-control" :class="{'is-invalid': $v.patronymic.$error}" @blur="$v.patronymic.$touch()" v-model="patronymic">
        <img src="/src/assets/star.png" width="10" class="show-required">
        <div class="invalid-feedback" v-if="!$v.patronymic.required && $v.patronymic.$error">Отчество обязательно</div>
        <div class="invalid-feedback" v-if="!$v.patronymic.alpha && $v.patronymic.$error">{{ $t('useOnlyLeterRequest') }}</div>
      </div>

      <div class="form-group date required inline">
        <p>Дата рождения</p>
        <input type="date" id="dateOfBirth" :placeholder="'Дата рождения'" class="form-control" :class="{'is-invalid': $v.dateOfBirth.$error}" @blur="$v.dateOfBirth.$touch()" v-model="dateOfBirth">
        <img src="/src/assets/star.png" width="10" class="show-required">
        <div class="invalid-feedback" v-if="!$v.dateOfBirth.required && $v.dateOfBirth.$error">Дата рождения обязательна</div>
      </div>

      <div class="form-group required">
        <input type="text" id="passportSeries" :placeholder="'Серия паспорта'" class="form-control" :class="{'is-invalid': $v.passportSeries.$error}" @blur="$v.passportSeries.$touch()" v-model="passportSeries">
        <img src="/src/assets/star.png" width="10" class="show-required">
        <div class="invalid-feedback" v-if="!$v.passportSeries.required && $v.passportSeries.$error">Серия паспорта обязательна</div>
      </div>

      <div class="form-group required">
        <input type="text" id="passportNumber" :placeholder="'Номер паспорта'" class="form-control" :class="{'is-invalid': $v.passportNumber.$error}" @blur="$v.passportNumber.$touch()" v-model="passportNumber">
        <img src="/src/assets/star.png" width="10" class="show-required">
        <div class="invalid-feedback" v-if="!$v.passportNumber.required && $v.passportNumber.$error">Номер паспорта обязательно</div>
      </div>
      
      <div class="form-group required">
        <input type="text" id="authority" :placeholder="'Кем выдан паспорт'" class="form-control" :class="{'is-invalid': $v.authority.$error}" @blur="$v.authority.$touch()" v-model="authority">
        <img src="/src/assets/star.png" width="10" class="show-required">
        <div class="invalid-feedback" v-if="!$v.authority.required && $v.authority.$error">Это поле обязательно</div>
      </div>

      <div class="form-group date required inline">
        <p>Дата выдачи</p>
        <input type="date" id="dateOfIssue" :placeholder="'Дата выдачи'" class="form-control" :class="{'is-invalid': $v.dateOfIssue.$error}" @blur="$v.dateOfIssue.$touch()" v-model="dateOfIssue">
        <img src="/src/assets/star.png" width="10" class="show-required">
        <div class="invalid-feedback" v-if="!$v.dateOfIssue.required && $v.dateOfIssue.$error">Дата выдачи обязательна</div>
      </div>

      <div class="form-group required">
        <input type="text" id="indentificationNumber" :placeholder="'Идентификационный номер'" class="form-control" :class="{'is-invalid': $v.indentificationNumber.$error}" @blur="$v.indentificationNumber.$touch()" v-model="indentificationNumber">
        <img src="/src/assets/star.png" width="10" class="show-required">
        <div class="invalid-feedback" v-if="!$v.indentificationNumber.required && $v.indentificationNumber.$error">Идентификационный номер обязателен</div>
      </div>

      <div class="form-group required">
        <select name="birthPlace" id="birthPlace" required v-model="birthPlace"> 
          <option disabled value="">Выберите город прописки</option>
          <option value="Минск">Минск</option>
          <option value="Гродно">Гродно</option>
          <option value="Гомель">Гомель</option>
          <option value="Могилёв">Могилёв</option>
          <option value="Брест">Брест</option>
          <option value="Витебск">Витебск</option>
        </select>
        <img src="/src/assets/star.png" width="10" class="show-required">
      </div>

      <div class="form-group required">
        <input type="text" id="city" :placeholder="'Место рождения'" class="form-control" :class="{'is-invalid': $v.city.$error}" @blur="$v.city.$touch()" v-model="city">
        <img src="/src/assets/star.png" width="10" class="show-required">
        <div class="invalid-feedback" v-if="!$v.city.required && $v.city.$error">Место рождения обязательно</div>
      </div>

      <div class="form-group required">
        <select name="residenceCity" id="residenceCity" required v-model="residenceCity"> 
          <option disabled value="">Выберите город проживания</option>
          <option value="Минск">Минск</option>
          <option value="Гродно">Гродно</option>
          <option value="Гомель">Гомель</option>
          <option value="Гомель">Могилёв</option>
          <option value="Брест">Брест</option>
          <option value="Витебск">Витебск</option>
        </select>
        <img src="/src/assets/star.png" width="10" class="show-required">
      </div>

      <div class="form-group required">
        <input type="text" id="address" :placeholder="'Адрес'" class="form-control" :class="{'is-invalid': $v.address.$error}" @blur="$v.address.$touch()" v-model="address">
        <img src="/src/assets/star.png" width="10" class="show-required">
        <div class="invalid-feedback" v-if="!$v.address.required && $v.address.$error">address req</div>
      </div>

      <div class="form-group">
        <input type="text" id="mobileNumber" :placeholder="'Моб. номер'" class="form-control" v-model="mobileNumber">
      </div>

      <div class="form-group">
        <input type="text" id="homeNumber" :placeholder="'Дом. номер'" class="form-control" v-model="homeNumber">
      </div>

      <div class="form-group required">
        <input type="email" id="email" :placeholder="$t('inputEmail')" class="form-control" :class="{'is-invalid': $v.email.$error}" @blur="$v.email.$touch()" v-model="email">
        <img src="/src/assets/star.png" width="10" class="show-required">
        <div class="invalid-feedback" v-if="!$v.email.required && $v.email.$error">{{ $t('emailRequest') }}</div>
        <div class="invalid-feedback" v-if="!$v.email.email && $v.email.$error">{{ $t('emailValidate') }}</div>
        <div class="invalid-feedback" v-if="!uniqEmail">{{ $t('emailExist') }}</div>
      </div>

      <div class="form-group">
        <input type="text" id="job" :placeholder="'Место работы'" class="form-control" v-model="job">
      </div>

      <div class="form-group">
        <input type="text" id="post" :placeholder="'Должность'" class="form-control" v-model="post">
      </div>

      <div class="form-group required">
        <select name="familyStatus" id="familyStatus" v-model="familyStatus"> 
          <option disabled value="">Выберете семейное положение</option>
          <option value="Женат">Женат</option>
          <option value="Не женат">Не женат</option>
        </select>
        <img src="/src/assets/star.png" width="10" class="show-required">
      </div>

      <div class="form-group required">
        <select name="nationality" id="nationality" v-model="nationality"> 
          <option disabled value="">Выберете Гражданство</option>
          <option value="Белорус">Белорус</option>
          <option value="Россиянин">Россиянин</option>
        </select>
        <img src="/src/assets/star.png" width="10" class="show-required">
      </div>

      <div class="form-group required">
        <select name="disability" id="disability" v-model="disability"> 
          <option disabled value="">Выберете Инвалидность</option>
          <option value="Да">Да</option>
          <option value="Нет">Нет</option>
        </select>
        <img src="/src/assets/star.png" width="10" class="show-required">
      </div>

      <div class="form-group required radio-buttons">
        <p>Пенсионер: </p>
        <input type="radio" id="one" value="Да" v-model="pensioner" required>
        <label for="one">Да</label>
        <input type="radio" id="two" value="Нет" v-model="pensioner">
        <label for="two">Нет</label>
        <img src="/src/assets/star.png" width="10" class="show-required">
      </div>

      <div class="form-group required">
        <input type="text" id="address" :placeholder="'Доход'" class="form-control" :class="{'is-invalid': $v.mounthlyRevenue.$error}" @blur="$v.mounthlyRevenue.$touch()" v-model="mounthlyRevenue">
        <img src="/src/assets/star.png" width="10" class="show-required">
        <div class="invalid-feedback" v-if="!$v.mounthlyRevenue.required && $v.mounthlyRevenue.$error">address req</div>
      </div>

      <button class="btn submit is-invalid" type="submit" :disabled="$v.$invalid">{{ $t('submitButton') }}</button>

    </form>

  </div>
</template>

<script>
import {required,email,minLength, sameAs, alpha } from 'vuelidate/lib/validators'
import axios from 'axios'
import scroll from '.././helpers/scroll'
export default {
  data() {
    return {
      lastName: '',
      firstName: '',
      patronymic: '',
      dateOfBirth: '',
      passportSeries: '',
      passportNumber: '',
      authority: '',
      dateOfIssue: '',
      indentificationNumber: '',
      birthPlace: '',
      city: '',
      residenceCity: '',
      address: '',
      mobileNumber: '',
      homeNumber: '',
      email: '',
      job: '',
      post: '',
      familyStatus: '',
      nationality: '',
      disability: '',
      pensioner: '',
      mounthlyRevenue: '',
      uniqEmail: true,

    }
  },
  // computed: {
  //   client () {
  //     return new Client()
  //   }
  // },
  methods: {
    onSubmit() {
      axios.post('http://localhost:3000/clients', {
        lastName: this.lastName,
        firstName: this.firstName,
        patronymic: this.patronymic,
        dateOfBirth: this.dateOfBirth,
        passportSeries: this.passportSeries,
        passportNumber: this.passportNumber,
        authority: this.authority,
        dateOfIssue: this.dateOfIssue,
        indentificationNumber: this.indentificationNumber,
        birthPlace: this.birthPlace,
        city: this.city,
        residenceCity: this.residenceCity,
        address: this.address,
        mobileNumber: this.mobileNumber,
        homeNumber: this.homeNumber,
        email: this.email,
        job: this.job,
        post: this.post,
        familyStatus: this.familyStatus,
        nationality: this.nationality,
        disability: this.disability,
        pensioner: this.pensioner,
        mounthlyRevenue: this.mounthlyRevenue*1,
      })
      .then(response => {
        console.log(response);
        console.log("zaebok");
        document.getElementById("create-client").reset();

        this.$router.replace("/");
      })
      .catch(error => {
        console.log("GOVNO " + error);
        this.uniqEmail = false;
      });
    },
    changePasswrodType () {
      if(this.passwordType == 'password'){
        this.passwordType = 'text';
      }
      else{
        this.passwordType = 'password'
      }
    }
  },
  validations: {
    firstName: {
      required,
      alpha
    },
    lastName: {
      required,
      alpha
    },
    patronymic: {
      required,
      alpha
    },
    dateOfBirth: {
      required
    },
    passportSeries: {
      required
    },
    passportNumber: {
      required
    },
    authority: {
      required
    },
    dateOfIssue: {
      required
    },
    indentificationNumber: {
      required
    },
    birthPlace: {
      required
    },
    city: {
      required
    },
    residenceCity: {
      required
    },
    address: {
      required
    },
    email: {
      required,
      email,
    },
    familyStatus: {
      required
    },
    nationality: {
      required
    },
    disability: {
      required
    },
    pensioner: {
      required
    },
    mounthlyRevenue: {
      required
    },
    
  },
  mounted () {
  },
  destroyed () {
  }
}
</script>

<style scoped>
.validate{
  display:flex;
  align-items: center;
  justify-content: center;
  padding: 20px 0;
  margin-top: 30px;
}
form{
  background: var(--theme-background);
  padding: 2em 4em;
  display:grid;
  grid-template-columns: 1fr;
  justify-items: center;
  grid-gap:0.5em;
  border-radius: 2px;
  width:300px;
  box-shadow: var(--theme-box-shadow);
  transition: 0.25s;
}
.form-group{
  display: grid;
  grid-template-columns: 1fr;
  width:300px;
  justify-items: center;
  grid-gap:0.5em;
}
.title{
  background: none;
  padding: 0 0 10px 0;
}
.form-group input, .form-group select{
  border: none;
  background: none;
  text-align: center;
  border-bottom: 2px solid #3498db;
  padding: 14px 0 5px 0;
  width: 300px;
  outline: none;
  color:var(--theme-color);
  transition: 0.25s;
  font-size: 20px;
}
.form-group select{
  background: var(--theme-background);
  text-align-last:center;
  padding-left: 20px;
  text-decoration: none;
  /* line-height: 2.5; */
  line-height:50px;
  /* height: 100px; */
  overflow: auto;
  /* border: none; */
}

.form-group select:focus{
  border-color: #2ecc71;
}
.form-group input:focus{
  border-color: #2ecc71;
  display: grid;
  justify-self: center;
}
.inline{
  /* border-bottom: 2px solid #3498db; */
  height: 80px;
  align-items: center;
  
  color: var(--theme-color);
}
.inline div{
  width: 100%;
}
.inline p{
  font-size: 20px;
  color: #757575;

}
.radio-buttons{
  border-bottom: 2px solid #3498db;
  display: flex;
  justify-content: space-around;
  height: 40px;
  align-items: center;
  color: var(--theme-color);
  font-size: 20px;
}
.radio-buttons p{
  font-size: 20px;
  padding-left: 20px;
  color: #757575;
}
h1{
  font-size: 30px;
  text-transform: uppercase;
  font-weight: 700;
  color: var(--theme-color);
  transition: 0.25s;
}
.submit{
  margin-top: 20px;
  border: 2px solid #3498db;
  border-radius: 24px;
  width: 120px;
  transition: 0.25s;
  padding: 5px 10px;
  font-size: 20px;
  color: #3498db;
}
.submit:hover{
  border: 2px solid #2ecc71;
  width: 150px;
  color: #2ecc71
}
.invalid-feedback{
  justify-self: center;
  font-size: 12px;
  color: #bb0000;
}
.date input{
  display: grid;
  grid-template-columns: 9fr 1fr 1fr 1fr;
  justify-items: right;
  margin: 0;
  padding: 6px 0;
}
@media only screen and (max-width: 768px) {
  .validate{
    padding: 0;
  }

}
@media only screen and (max-width: 425px){
  .show-password{
    right: 0px;
  }
}
@media only screen and (max-width: 500px) {
  form{
    padding: 2em 0;
    box-shadow: none;
  }
  
}

</style>
