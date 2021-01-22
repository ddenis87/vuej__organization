import axios from 'axios';

export default {
  namespaced: true,
  state: {
    userTokenAccess: '',
    userName: '',
    password: '',
  },
  getters: {
    GET_USER_TOKEN_ACCESS(state) { return `Token ${state.userTokenAccess}`; },
    GET_USER_NAME_PASSWORD(state) { return { userName: state.userName, password: state.password }; }
  },
  mutations: {
    SET_USER_TOKEN_ACCESS(state, option) { state.userTokenAccess = option; },
    SET_USER_NAME_PASSWORD(state, option) { state.userName = option.userName; state.password = option.password;  }
  },
  actions: {
    GET_USER_TOKEN_ACCESS(state, option, rootState) {
      console.log(option);
      // console.log(state.rootState.addressApi);
      axios
        .post(state.rootState.addressApi + 'api-token-auth/', {
          username: option.userName,
          password: option.password
        })
        .then(response => {
          console.log(response);
          state.commit('SET_USER_TOKEN_ACCESS', response.data.token);
        })
        .catch(error => {
          console.log('error: ' + error);
        })
    },
  },
}