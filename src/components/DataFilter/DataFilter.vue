<template>
  <div class="filter">
    <div class="filter__title">
      <v-subheader>{{ nameTable }}</v-subheader>
    </div>
    <!-- <div class="filter__sub-title">
      <data-filter-extended-item :is-title="true"
                                  :input-title="['Условие', 'Значение']"></data-filter-extended-item>
    </div> -->
    <div class="filter__body">
      <!-- <v-list flat>
      <v-list-item v-for="item in listFieldChoice" :key="item.key"> -->
        <el-field-choice v-for="item in listFieldChoice" :key="item.key"
                         is-label 
                         :is-required="false"
                         :is-btn-clear="true"
                         :inputProperties="item"
                         :is-single-line="false"
                         v-model="dataFilterValue[item.key]" @keydown-clear="() => clearValue(item.key)"></el-field-choice>
      <!-- </v-list-item> -->
      <!-- <v-list-item v-for="item in listFieldNestedObject" :key="item.key"> -->
        <el-field-dialog v-for="item in listFieldNestedObject" :key="item.key"
                         is-label
                         :is-required="false"
                         :is-btn-clear="true"
                         :inputProperties="item"
                         :is-single-line="false"
                         v-model="dataFilterValue[item.key]" @keydown-clear="() => clearValue(item.key)"></el-field-dialog>
      <!-- </v-list-item> -->
      <!-- </v-list> -->
    </div>
    <div class="filter__action">
      <template v-if="emptyFilter">
        <v-btn class="btn btn-accept" color="blue darken-1" dark height="30" @click="acceptFilter">Применить</v-btn>
      </template>
      <template v-else>
        <v-card-text>Для данной таблицы отсутствуют фильтры выбора. Воспользуйтесь произвольным поиском по таблице</v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn class="btn btn-accept" color="blue darken-1" dark height="30" @click="$emit('close')">Закрыть</v-btn>
        </v-card-actions>
      </template>
    </div>
  </div>
<!-- 
  <div class="data-filter">
    <v-card flat tile>
      <v-list flat>
        <v-subheader class="data-filter__title">{{ nameTable }}</v-subheader>
        <v-list-item v-for="item in listFieldChoice" :key="item.key">
          <el-field-choice is-label 
                           :is-btn-clear="true"
                           :inputProperties="item"
                           :is-single-line="false"
                           v-model="dataFilterValue[item.key]" @keydown-clear="() => clearValue(item.key)"></el-field-choice>
        </v-list-item>
        <v-list-item v-for="item in listFieldNestedObject" :key="item.key">
          <el-field-dialog is-label
                           :is-required="false"
                           :is-btn-clear="true"
                           :inputProperties="item"
                           :is-single-line="false"
                           v-model="dataFilterValue[item.key]" @keydown-clear="() => clearValue(item.key)"></el-field-dialog>
        </v-list-item>
      </v-list>
      <v-card-actions v-if="emptyFilter">
        <v-spacer></v-spacer>
        <v-btn class="data-filter__btn-accept" color="blue darken-1" dark height="30" @click="acceptFilter">Применить</v-btn>
      </v-card-actions>
      <template v-else>
        <v-card-text>Для данной таблицы отсутствуют фильтры выбора. Воспользуйтесь произвольным поиском по таблице</v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn class="data-filter__btn-accept" color="blue darken-1" dark height="30" @click="$emit('close')">Закрыть</v-btn>
        </v-card-actions>
      </template>
      
    </v-card>
  </div> -->
</template>

<script>
import ElFieldChoice from '@/components/Elements/ElField/ElFieldChoice.vue';
import ElFieldDialog from '@/components/Elements/ElField/ElFieldDialog.vue';
export default {
  name: 'DataFilter',
  components: {
    ElFieldChoice,
    ElFieldDialog,
  },
  props: {
    tableName: {type: String, default: null},
  },
  data() {
    return {
      dataFilterValue: {},
      currentTab: 'Filter'
    }
  },
  computed: {
    nameTable() { return (!this.tableName) ? '' : this.$store.getters[`DataTable/GET_DESCRIPTION`](this.tableName); },
    emptyFilter() {
      return (this.listFieldChoice == 0 && this.listFieldNestedObject == 0) ? false : true;
    },
    listFieldChoice() {
      if (!this.tableName) return 0;
      let listField = this.$store.getters[`DataTable/GET_OPTIONS`](this.tableName);
      let listFieldChoice = [];
      if (listField) {
        for (let item of Object.entries(listField)) {
          if (item[1].type == 'choice') listFieldChoice.push(Object.assign({key: item[0]}, item[1]));
        }
      }
      // console.log(listFieldChoice);
      return listFieldChoice;
    },
    listFieldNestedObject() {
      if (!this.tableName) return 0;
      let listField = this.$store.getters[`DataTable/GET_OPTIONS`](this.tableName);
      let listFieldNestedObject = [];
      if (listField) {
        for (let item of Object.entries(listField)) {
          if (item[1].type == 'field') listFieldNestedObject.push(Object.assign({key: item[0]}, item[1], (item[0] == 'bk') ? {related_model_view: '{head_code} - {head_name}'} : {} )); //костыль
        }
      }
      // console.log(listFieldNestedObject);
      return listFieldNestedObject;
    },
  },
  methods: {
    acceptFilter() {
      console.log(this.dataFilterValue);
      this.$store.commit('DataTable/SET_FILTER_PRIMITIVE', (Object.keys(this.dataFilterValue).length != 0) ? {
        tableName: this.tableName,
        filters: this.dataFilterValue
      } : {
            tableName: this.tableName,
            filters: null
          });
      this.$store.commit('DataTable/SET_DATA_CLEAR', { tableName: this.tableName });
      this.$store.dispatch(`DataTable/REQUEST_DATA`, {tableName: this.tableName});
      this.$emit('accept');
    },
    clearValue(key) {
      delete this.dataFilterValue[key];
    },
  },
}
</script>

<style lang="scss" scoped>
@import './DataFilter.scss';
.filter {
  display: grid;
  grid-template-areas: "filter__title" "filter__body" "filter__action";
  grid-template-columns: 1fr;
  grid-template-rows: 48px 1fr 48px;
  padding: 8px 0px;
  padding-left: 10px;
  height: calc(100vh - 64px);
  overflow: hidden;
  &__title {
    grid-area: filter__title;
    text-transform: uppercase;
    overflow: hidden;
  }
  &__sub-title {
    grid-area: filter__sub-title;
    padding: 0px 8px;
    border-bottom: thin solid rgba(0,0,0,.12);    
    overflow: hidden;
  }

  &__body {
    grid-area: filter__body;
    padding: 0px 8px;
    padding-top: 20px;
    padding-right: 10px;
    border-bottom: thin solid rgba(0,0,0,.12);  
    overflow: hidden;
    overflow-y: scroll;
    &::-webkit-scrollbar {
      width: $scrollWidth;
      height: $scrollHeight;
      border-radius: $scrollBorderRadius;
      &-thumb {
        border-radius: $scrollThumbBorderRadius;
        background-color: $scrollThumbBackgroundColor;
      }
    }
  }
  &__action {
    display: flex;
    justify-content: flex-end;
    align-items: center;
    height: 56px;
    padding: 0px 16px;
  }
}

// .data-filter {
//   padding: 0px 10px;
//   z-index: 9999;
//   &__title {
//     text-transform: uppercase;
//   }
// }
// .v-list-item {
//   padding: 0px 5px;
// }
</style>