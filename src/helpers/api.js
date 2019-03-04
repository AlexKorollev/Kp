import axios from 'axios';
import store from '../store';
export default {
  sendRequest (query) {
    const options = {
      method: 'GET',
      headers: {
        'Authorization': "bearer " + store.state.access_token
        },
      url: 'http://localhost:3000/posts'+ query,
    };
    return axios(options)
  },
  refreshPosts (page) {
    if(store.state.loginId){
      this.sendRequest(store.state.query+'&_page='+(Math.ceil(store.state.totalPosts / store.state.perPage)-page+1)+'&_limit='+store.state.perPage)
      .then(response=>{
        store.commit("changePosts",response.data.reverse() || "create ur first post");
      });
    }
    else{
      this.sendRequest(store.state.query)
      .then(response=>{
        store.commit("changePosts",response.data || "create ur first post");
      });
    }
  },
}