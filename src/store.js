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
    posts: [],
    query: '',
    limit: 10,
    loading: false,
    users: [],
    addPostError:false,
    mode: 'light',
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
    changePosts(state,posts){
      // let postsLen = Object.keys(state.posts).length;
      // let postLen = post.length;
      // let j=0;
      // for(let i=postsLen + 1;i<=postsLen + postLen; (i++ && j++)){
      //   state.posts[i] = post[j];
      // }
      // state.posts.push(posts);
      // state.posts.push(...posts)
      posts.forEach(post => state.posts.push(post));
    },
    clearPosts(state){
      state.posts = [];
    },
    addPost(state,post){
      state.posts = post.concat(state.posts);
      if(state.posts.length>=10){
        state.posts.pop();
      }
    },
    addPostError(state, error){
      state.addPostError = error;
    },
    deletePost(state, index){
      state.posts.splice(index,1);
    },
    establishPosts(state,posts){
      state.posts = posts;
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
    establishUsers(state,users){
      state.users = users;
    },
    establishMode(state, mode){
      state.mode = mode;
      
      if(state.mode=== 'dark'){
       
        let singlePosts = document.querySelectorAll('div > .single-post')
        
        let singlePostsTitle = document.querySelectorAll('div > .post-title-name')
        let singlePostsAvatars = document.querySelectorAll('div > .post-avatar > img');
        for(let i=0;i<singlePosts.length;i++){
          singlePosts[i].classList.add('dark-single-post');
          singlePostsAvatars[i].classList.add('dark-post-avatar')
          singlePostsTitle[i].classList.add('dark-post-title-name');
        }
        
        document.querySelector('div > .posts').classList.add('dark-posts');
        document.querySelector('div > .textarea').classList.add('dark-textarea');
        document.querySelector('div > .profile-name').classList.add('dark-profile-name')
        document.querySelector('body').classList.add('dark-body');
        document.querySelector('header').classList.add('dark-header');
        document.querySelector('div > .profile-image').classList.add('dark-profile-image');
        document.querySelector('h1').classList.add('dark-title');

      } 
      else if(state.mode === 'light'){
        let singlePosts = document.querySelectorAll('div > .single-post');
        let singlePostsAvatars = document.querySelectorAll('div > .post-avatar > img');
        let singlePostsTitle = document.querySelectorAll('div > .post-title-name');
        for(let i=0;i<singlePosts.length;i++){
          singlePosts[i].classList.remove('dark-single-post');
          singlePostsAvatars[i].classList.remove('dark-post-avatar')
          singlePostsTitle[i].classList.remove('dark-post-title-name')
        }
        
        document.querySelector('div > .posts').classList.remove('dark-posts')
        document.querySelector('div > .textarea').classList.remove('dark-textarea')
        document.querySelector('div > .profile-name').classList.remove('dark-profile-name')
        document.querySelector('body').classList.remove('dark-body');
        document.querySelector('header').classList.remove('dark-header');
        document.querySelector('div > .profile-image').classList.remove('dark-profile-image');
        document.querySelector('h1').classList.remove('dark-title');
      }
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
    },
    
  },
});
