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
    if(store.state.login){
      this.sendRequest(store.state.query+'&_page='+page+'&_limit=5&_sort=id&_order=desc')
      .then(response=>{
        store.commit("changeTotalPosts", response.headers['x-total-count'])
        store.commit("changePosts",response.data);
      });
    }
    else{
      this.sendRequest(store.state.query)
      .then(response=>{
        store.commit("changePosts", response.data || "create ur first post");
      });
    }
  },
}