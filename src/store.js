import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    login: false,
    admin: false,
    loginName: '',
    STORAGE_KEY: 'login-storage',
    loginId: '',
    phone: '',
    access_token: '',
    records: [],
    calls: [],
  },
  
  mutations: {
    
    changeLogin(state, bool){
      state.login = bool;
    },
    changeLoginName(state, name){
      state.loginName = name;
    },
    establishUserId(state,id){
      state.loginId = id;
    },
    establishAccessToken(state, token){
      state.access_token = token;
    },
    establishAdmin(state,bool){
      state.admin = bool;
    },
    establishRecords(state,records){
      state.records = records;
    },
    establishCalls(state,calls){
      state.calls = calls;
    },
    deleteRecords(state, index){
      state.records.splice(index,1);
    },
    deleteCalls(state, index){
      state.calls.splice(index,1);
    },
  },
  actions: {
    
    loginState ({commit}) {
      if(localStorage.getItem(this.state.STORAGE_KEY)) {
        if(JSON.parse(localStorage.getItem(this.state.STORAGE_KEY)).user.nickname == "Admin"){
          commit("establishAdmin", true);
        }
        commit("changeLoginName", JSON.parse(localStorage.getItem(this.state.STORAGE_KEY)).user.nickname);
        commit("changeLogin", true);
        commit("establishUserId", JSON.parse(localStorage.getItem(this.state.STORAGE_KEY)).user.id);
        commit("establishAccessToken", JSON.parse(localStorage.getItem(this.state.STORAGE_KEY)).access_token);
        
      }
      else {
        commit("changeLogin", false);
      }
      return this.state.login;
    },
    
  },
});
