import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    counter: 1,
    login: false,
    loginName: '',
    STORAGE_KEY: 'login-storage',
    loginId: '',
    access_token: '',
    autocomplite: false,
    currentPage: 1,
    perPage: 10,
    totalPosts: 0,
    posts: {},
    query: '',
    limit: 10,
    loading: false,
    users: {},
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
    establishCounter(state,payload){
      state.counter = payload;
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
    changePosts(state,post){
      state.posts = post;
    },
    establishQuery(state, query){
      state.query = query || '';
    },
    establishLimit(state, limit){
      state.limit = limit;
    },
    changeLimit(state, limit){
      state.limit += limit;
    },
    changeLoading(state, bool){
      state.loading = bool;
    },
    deletePost(state, id){
      console.log(state.posts)
      for (let key in state.posts) {
        if (state.posts.hasOwnProperty(key) && (state.posts[key].id == id)) {
          state.posts.splice(key,1);
          break;
        }
       }
    },
    establishUsers(state,users){
      state.users = users;
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
