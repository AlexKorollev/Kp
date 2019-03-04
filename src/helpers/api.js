import axios from 'axios';
import store from '../store';
export default {
  sendRequest (query) {
    const options = {
      method: 'GET',
      headers: {
        'Authorization': "bearer " + store.state.access_token
        },
      url: 'http://localhost:3000/posts?'+ query,
    };
    return axios(options)
  },
  refreshPosts (page) {
    this.sendRequest('userId='+store.state.loginId+'&_page='+(Math.ceil(store.state.totalPosts / store.state.perPage)-page+1)+'&_limit='+store.state.perPage)
    .then(response=>{
      store.commit("changePosts",response.data.reverse() || "create ur first post");
    });
  },
}