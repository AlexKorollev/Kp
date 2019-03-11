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
  refreshPosts (limit) {
    if(store.state.login){
      this.sendRequest(store.state.query+'&_page=1&_limit='+limit+'&_sort=id&_order=desc')
      .then(response=>{
        store.commit("changeTotalPosts", response.headers['x-total-count'])
        store.commit("changePosts",response.data);
        store.commit("changeLoading", false)
      });
    }
    else{
      this.sendRequest(store.state.query)
      .then(response=>{
        store.commit("changePosts", response.data || "create ur first post");
      });
    }
  },
  deletePost (id){
    console.log(store.state.totalPosts)
    const options = {
      method: 'DELETE',
      headers: {
        'Authorization': "bearer " + store.state.access_token
        },
      url: 'http://localhost:3000/posts/'+ id,
    };
    axios(options)
    .then(response=>{
      store.commit("incrementTotalPosts", -1)
      store.commit("deletePost", id);
      store.commit("changePerPage", -1);
      console.log(store.state.perPage + "   " + store.state.totalPosts)
    })
  }
}