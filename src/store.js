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
    access_token: '',
    currentPage: 1,
    perPage: 3,
    totalPosts: 0,
    loading: false,
    users: [],
    clients: [],
    deleteClientsArray: [],
    deleteIndexes: [],
    providers: [],
    taxes: [],
    search: false,
    searchQuery: '',
    mode: 'light',
    lang: 'ru',
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
    establishUsers(state,users){
      state.users = users;
    },
    addUser(state,user){
      state.users = user.concat(state.users);
    },
    deleteUser(state, index){
      state.users.splice(index,1);
    },
    establishClients(state,clients){
      state.clients = clients;
    },
    addDeleteClient(state,id){
      state.deleteClientsArray.push(id)
    },
    deleteDeleteClient(state,id){
      state.deleteClientsArray = state.deleteClientsArray.filter(clientId => clientId !== id)
    },
    deleteClients(state){
      state.deleteIndexes.sort((a,b) => b-a)

      for(let i = 0;i<state.deleteIndexes.length;i++){
        state.clients.splice(state.deleteIndexes[i],1)
      }
    },
    clearDeleteClient(state){
      state.deleteClientsArray = [];
    },
    addIndexForDeleteClient(state,index){
      state.deleteIndexes.push(index);
    },
    deleteIndexForDeleteClient(state,index){
      state.deleteIndexes = state.deleteIndexes.filter(deleteIndex => deleteIndex !== index)
    },
    clearDeleteClientsArray(state){
      state.deleteClientsArray = [];
    },
    changeTotalClients(state){
      state.totalPosts -= state.deleteClientsArray.length;
    },
    searchClients(state, search) {
      state.clients = search;
    },
    establishProviders(state,providers){
      state.providers = providers;
    },
    establishTaxes(state,taxes){
      state.taxes = taxes;
    },
    changeCurrentPage(state,num){
      state.currentPage += num;
    },
    establishCurrentPage(state,num){
      state.currentPage = num;
    },
    changePerPage(state, num){
      state.perPage += num;
    },
    changeTotalPosts(state,total){
      state.totalPosts = total;
    },
    incrementTotalPosts(state,num){
      state.totalPosts = num + state.totalPosts*1;
    },
    changeSearch(state,search){
      state.search = search;
    },
    changeSearchQuery(state,query){
      state.searchQuery = query;
    },
    changeLoading(state, bool){
      state.loading = bool;
    },
    
    establishMode(state, mode){
      state.mode = mode;
      
    },
    establishLanguage(state,lang){
      state.lang = lang;
    }
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
