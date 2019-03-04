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
    // .then(response =>{
    //   console.log(response)
    // });
  }
}