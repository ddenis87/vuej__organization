import axios from 'axios';
export default {
  GET_LIST_OPTION(state, option) {
    // console.log('activ');
    if (state.getters.GET_DESCRIPTION_TABLE(option.tableName)) { return; };
    state.commit('SET_IS_DATA_LOAD', true);
    axios
      .options(state.getters.GET_ADDRESS_API + option.tableName)
      .then(response => {
        // console.log(response);
        let mutationOption = {
          tableName: option.tableName,
          description: response.data.description,
          data: JSON.parse(response.request.response).actions.POST
        }
        state.commit('SET_LIST_OPTION', mutationOption);
        state.dispatch('GET_LIST_DATA', {tableName: option.tableName});
      })
      .catch(err => {
        console.log(err);

        // if not work server
        // state.commit('SET_LIST_OPTION', {
        //   description: 'Testing table',
        //   tableName: 'organisations',
        //   data: {
        //     id: {value: 'id', label: 'ID', type: 'string'},
        //     bk: {value: 'bk', label: 'BK', type: 'nested object'},
        //     institution_code: {value: 'institution_code', label: 'Код', type: 'string'},
        //     title: {value: 'title', label: 'Наименование', type: 'string'},
        //     inn: {value: 'inn', label: 'ИНН', type: 'string'},
        //     egrul_status: {value: 'egrul_status', label: 'ЕГРЮЛ статус', type: 'choice', choices: [
        //       {display_name: 'Действующий', value: 1},
        //       {display_name: 'Спец. указания', value: 2},
        //     ]}
        //   }
        // });
        // state.dispatch('GET_LIST_DATA', {tableName: 'organisations'});
      })
      .finally(() => state.commit('SET_IS_DATA_LOAD'));
  },
  
  GET_LIST_DATA(state, option) {
    state.commit('SET_IS_DATA_LOAD', true);
    let filterString = state.getters.GET_FILTER_STRING;
    axios
      .get(state.getters.GET_ADDRESS_API + option.tableName + filterString)
      .then(response => {
        let mutationOption = {
          tableName: option.tableName,
          data: response.data,
          clear: true,
        }
        state.commit('SET_LIST_DATA', mutationOption);
      })
      .catch(err => {
        console.log(err);
        // state.commit('SET_LIST_DATA', {
        //   tableName: 'organisations',
        //   clear: true,
        //   data: [
        //     {id: '1', bk: {id: '1', head_name: 'test', head_code: '333' }, institution_code: '2', title: 'Test organisations 1', inn: '1111111', egrul_status: 1},
        //     {id: '2', bk: {id: '1', head_name: 'test', head_code: '333' }, institution_code: '3', title: 'Test organisations 2', inn: '1111112', egrul_status: 1},
        //     {id: '3', bk: {id: '1', head_name: 'test', head_code: '333' }, institution_code: '4', title: 'Test organisations 3', inn: '1111113', egrul_status: 1},
        //     {id: '4', bk: {id: '1', head_name: 'test', head_code: '333' }, institution_code: '5', title: 'Test organisations 4', inn: '1111114', egrul_status: 1},
        //   ],
        // });
      })
      .finally(() => state.commit('SET_IS_DATA_LOAD'));
  },
  GET_LIST_DATA_NEXT(state, option) {
    state.commit('SET_IS_DATA_LOAD', true);
    let filterString = state.getters.GET_FILTER_STRING;
    axios
      .get(state.getters.GET_ADDRESS_API_NEXT(option.tableName) + filterString)
      .then(response => {
        let mutationOption = {
          tableName: option.tableName,
          data: response.data,
          clear: false,
        }
        state.commit('SET_LIST_DATA', mutationOption);
      })
      .catch(err => {console.log(err)})
      .finally(() => state.commit('SET_IS_DATA_LOAD'));
  },
}
