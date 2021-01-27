import axios from 'axios';

export default {
  namespaced: true,
  state: {
    isProccessRequest: false,
    userTokenAccess: (localStorage.getItem('Token')) ? localStorage.getItem('Token') : '',
    userName: (localStorage.getItem('userName')) ? localStorage.getItem('userName') : '',
    password: '',
  },
  getters: {
    GET_PROCCESS_REQUEST(state) { return state.isProccessRequest; },
    GET_USER_TOKEN_ACCESS(state) { return `Token ${state.userTokenAccess}`; },
    GET_USER_NAME_PASSWORD(state) { return { userName: state.userName, password: state.password }; }
  },
  mutations: {
    SET_PROCCESS_REQUEST(state, status = false) { state.isProccessRequest = status },
    SET_USER_TOKEN_ACCESS(state, option) {
      state.userTokenAccess = option;
      localStorage.setItem('Token', option);
      localStorage.setItem('userName', state.userName);
    },
    SET_USER_NAME_PASSWORD(state, option) { state.userName = option.userName; state.password = option.password;  },
    SET_LOGOUT(state) {
      delete localStorage.Token;
      delete localStorage.userName;
      state.userTokenAccess = '';
      state.userName = '';
      state.password = '';
    },
  },
  actions: {
    GET_USER_TOKEN_ACCESS(state, option, rootState) {
      state.commit('SET_PROCCESS_REQUEST', true);
      return new Promise((resolve, reject) => {
        axios
          .post(state.rootState.addressApi + 'api-token-auth/', {
            username: option.userName,
            password: option.password
          })
          .then(response => {
            state.commit('SET_USER_TOKEN_ACCESS', response.data.token);
            resolve(response);
          })
          .catch(error => {
            console.log(error);
            reject(error);
          })
          .finally(() => state.commit('SET_PROCCESS_REQUEST'));
      })
      
    },
  },
}