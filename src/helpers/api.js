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
      this.sendRequest(store.state.query+'&_embed=likes&_embed=comments&_page='+page+'&_limit=10&_sort=id&_order=desc')
      .then(response=>{
        store.commit("changeTotalPosts", response.headers['x-total-count'])
        store.commit("changePosts",response.data);
        store.commit("changeLoading", false)
      });
    }
    else{
      this.sendRequest(store.state.query)
      .then(response=>{
        store.commit("establishPosts", response.data);
      });
    }
  },
  deletePost (id, index){
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
      store.commit("deletePost",index);
      store.commit("changePerPage", -1);
    })
  },
  searchUsers () {
    const options = {
      method: 'GET',
      headers: {
        'Authorization': "bearer " + store.state.access_token
        },
      url: 'http://localhost:3000/users/',
    };
    axios(options)
    .then(response =>{
      store.commit("establishUsers", response.data)
      store.commit("changeLoading", false)
    });
  },
  
}