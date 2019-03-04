import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    counter: 0,
    login: false,
    loginName: '',
    STORAGE_KEY: 'login-storage',
    loginId: '',
    access_token: '',
    autocomplite: false,
    currentPage: 1,
    perPage: 5,
    totalPosts: 0,
    posts: {},
  },
  getters: {
    computedCounter (state) { 
      return state.counter * 10;
    }
  },
  mutations: {
    changeCounter(state, payload){
      state.counter += payload;
    },
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
    changeAutocomplite(state, bool){
      state.autocomplite = bool;
    },
    changeCurrentPage(state,num){
      state.currentPage+=num;
    },
    changeTotalPosts(state,total){
      state.totalPosts = total;
    },
    changePosts(state,post){
      state.posts = post;
    }
  },
  actions: {
    asyncChangeCounter ({commit}, payload) {
      setTimeout(() => {
        commit('changeCounter', payload.counterValue)
      }, payload.timeOutDelay)
    },
    loginState ({commit}) {
      if(localStorage.getItem(this.state.STORAGE_KEY)) {
        commit("changeLoginName", JSON.parse(localStorage.getItem(this.state.STORAGE_KEY)).user.firstName);
        commit("changeLogin", true);
        commit("establishUserId", JSON.parse(localStorage.getItem(this.state.STORAGE_KEY)).user.id);
        commit("establishAccessToken", JSON.parse(localStorage.getItem(this.state.STORAGE_KEY)).access_token);
      }
      else {
        commit("changeLogin", false);
      }
      return this.state.login;
    }
  },
});
