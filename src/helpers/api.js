import axios from 'axios';
import store from '../store';
export default {
  
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
  searchClients (page) {
    const options = {
      method: 'GET',
      headers: {
        'Authorization': "bearer " + store.state.access_token
        },
      url: 'http://localhost:3000/clients?&_page='+page+'&_limit='+ store.state.perPage,
    };
    axios(options)
    .then(response =>{
      store.commit("changeTotalPosts", response.headers['x-total-count'])
      store.commit("establishClients", response.data)
      store.commit("changeLoading", false)
    });
  },
  searchAllClients () {
    const options = {
      method: 'GET',
      headers: {
        'Authorization': "bearer " + store.state.access_token
        },
      url: 'http://localhost:3000/clients/',
    };
    axios(options)
    .then(response =>{
      store.commit("changeTotalPosts", response.headers['x-total-count'])
      store.commit("establishClients", response.data)
      store.commit("changeLoading", false)
    });
  },
  deleteClients () {
    store.state.deleteClientsArray.forEach(clientId =>{
      const options = {
        method: 'DELETE',
        headers: {
          'Authorization': "bearer " + store.state.access_token
          },
        url: 'http://localhost:3000/clients/'+ clientId,
      };
      axios(options)
      .then(response=>{
        store.commit("changeTotalClients");
        if(store.state.deleteClientsArray.length == store.state.perPage || store.state.currentPage * store.state.perPage - 3 == store.state.totalPosts ){
          store.commit("changeCurrentPage",-1);
        }
        store.commit("clearDeleteClientsArray");
        this.searchClients(store.state.currentPage)
      })
    })
  },
  searchProviders () {
    const options = {
      method: 'GET',
      headers: {
        'Authorization': "bearer " + store.state.access_token
        },
      url: 'http://localhost:3000/providers/',
    };
    axios(options)
    .then(response =>{
      store.commit("establishProviders", response.data)
    });
  },
  searchTaxes () {
    const options = {
      method: 'GET',
      headers: {
        'Authorization': "bearer " + store.state.access_token
        },
      url: 'http://localhost:3000/tax/1',
    };
    axios(options)
    .then(response =>{
      store.commit("establishTaxes", response.data)
    });
  },
  
}