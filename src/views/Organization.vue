<template>
  <div class="home" id="home">
    <h2>Организации</h2>

    <div class="control">
      <control-user></control-user>
    </div>
    <div class="control">
      <div class="control-view">
        <p class="control-view__text">Блок для демонстрации</p>
        <v-container fluid>
          <v-radio-group v-model="viewTable"
                        column @change="changeView">
            <v-radio
              label='sourceProps = "header" - наследует свойства шапки'
              value="header"
            ></v-radio>
            <v-radio
              label='sourceProps = "body" - использует свои свойства'
              value="body"
            ></v-radio>
            <v-radio
              label='sourceProps = "join" - объединяет свойства header и body (body имеют приоритет)'
              value="join"
            ></v-radio>
            <v-radio
              label='sourceProps = "null" - стили компонента'
              value="null"
            ></v-radio>
          </v-radio-group>
        </v-container>
      </div>
      <div class="control-view" v-if="listMultiRow">
        <p class="control-view__text">Блок для демонстрации</p>
        <v-container fluid>
          <v-radio-group v-model="viewMultiTable"
                        column @change="changeViewMulti">
            <v-radio
              label='Вариант 1'
              value="1"
            ></v-radio>
            <v-radio
              label='Вариант 2'
              value="2"
            ></v-radio>
          </v-radio-group>
        </v-container>
      </div>
      <div>
        <v-btn class="control__btn"
              title="Переключить вид"
              fab
              dark
              small
              @click="() => {listMultiRow = !listMultiRow}">
          <v-icon> {{ (listMultiRow) ? 'mdi-view-stream' : 'mdi-format-list-bulleted'}}</v-icon>
        </v-btn>
      </div>
    </div>
    <div class="body">
      <table-section :propsHeader="propsHeader" :propsBody="propsBody" v-if="!listMultiRow"></table-section>
      <multi-table-section :propsHeader="propsHeader" :propsBody="propsBody" v-if="listMultiRow"></multi-table-section>
    </div>
  </div>
</template>

<script>
import ControlUser from '@/components/control/ControlUser';
import TableSection from '@/components/table/TableSection';
import MultiTableSection from '@/components/table/MultiTableSection';

export default {
  name: 'Organization',
  components: {
    ControlUser,
    TableSection,
    MultiTableSection,
  },
  data() {
    return {
      listMultiRow: false,
      viewTable: 'body',
      viewMultiTable: "1",
      propsHeader: {
        getter: 'GET_LIST_FIELDS',
        items: [
          {name: 'bk', width: 300, cols: [1,4], rows: [1,4]},
          {name: 'budget_level', width: 300, align: 'left', cols: [6,8], rows: [2,3]},
          {name: 'institution_code', width: 100, align: 'left', cols: [6,8], rows: [3,4]},
          {name: 'title', width: 300, align: 'center', cols: [4,13], rows: [1,2]},
          {name: 'inn', width: 130, align: 'right', colorBackground: 'yellow', colorText: 'blue', cols: [4,6], rows: [2,3]},
          {name: 'kpp', width: 130, align: 'right', colorBackground: 'grey', colorText: 'white', cols: [4,6], rows: [3,4]},
          {name: 'institution_type', width: 100, align: 'right', cols: [8,11], rows: [2,3]},
          {name: 'egrul_status', width: 100, align: 'right', cols: [8,11], rows: [3,4]},
          {name: 'rubpnubp_status', width: 100, align: 'right', cols: [11,13], rows: [2,3]},
          {name: 'industry_typing', width: 100, align: 'right', cols: [11,13], rows: [3,4]},
        ],
      },
      propsBody: {
        getter: 'GET_LIST_DATA',
        sourceProps: 'body',
        items: [
          {name: 'title', colorBackground: 'teal', colorText: 'white'},
        ],
      },
    }
  },
  created() {
    this.$store.dispatch('GET_LIST_OPTIONS');
  },
  methods: {
    changeView() {
      this.propsBody.sourceProps = this.viewTable;
    },
    changeViewMulti() {
      switch(this.viewMultiTable) {
        case "2": {
          let items = [
            {name: 'bk', align: 'center', width: 300, cols: [1,13], rows: [1,2]},
            {name: 'budget_level', width: 300, align: 'left', cols: [6,8], rows: [3,4]},
            {name: 'institution_code', width: 100, align: 'left', cols: [6,8], rows: [4,5]},
            {name: 'title', width: 300, align: 'center', cols: [1,13], rows: [2,3]},
            {name: 'inn', width: 130, align: 'right', colorBackground: 'yellow', colorText: 'blue', cols: [1,3], rows: [3,4]},
            {name: 'kpp', width: 130, align: 'right', colorBackground: 'grey', colorText: 'white', cols: [1,3], rows: [4,5]},
            {name: 'institution_type', width: 100, align: 'right', cols: [8,11], rows: [3,4]},
            {name: 'egrul_status', width: 100, align: 'right', cols: [8,11], rows: [4,5]},
            {name: 'rubpnubp_status', width: 100, align: 'right', cols: [3,6], rows: [3,5]},
            {name: 'industry_typing', width: 100, align: 'right', cols: [11,13], rows: [3,5]},
          ];
          this.propsHeader.items = items;
          break;
        }
        case "1": {
          let items = [
            {name: 'bk', width: 300, cols: [1,4], rows: [1,4]},
            {name: 'budget_level', width: 300, align: 'left', cols: [6,8], rows: [2,3]},
            {name: 'institution_code', width: 100, align: 'left', cols: [6,8], rows: [3,4]},
            {name: 'title', width: 300, align: 'center', cols: [4,13], rows: [1,2]},
            {name: 'inn', width: 130, align: 'right', colorBackground: 'yellow', colorText: 'blue', cols: [4,6], rows: [2,3]},
            {name: 'kpp', width: 130, align: 'right', colorBackground: 'grey', colorText: 'white', cols: [4,6], rows: [3,4]},
            {name: 'institution_type', width: 100, align: 'right', cols: [8,11], rows: [2,3]},
            {name: 'egrul_status', width: 100, align: 'right', cols: [8,11], rows: [3,4]},
            {name: 'rubpnubp_status', width: 100, align: 'right', cols: [11,13], rows: [2,3]},
            {name: 'industry_typing', width: 100, align: 'right', cols: [11,13], rows: [3,4]},
          ];
          this.propsHeader.items = items;
          break;
        }
      }
    },
  }
}
</script>

<style lang="scss" scoped>
.home {
  width: 100%;
  .control {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    margin-bottom: 10px;
    margin-left: 10px;
    margin-right: 10px;
    // &__btn { margin: 5px 10px; }
    &-view {
      padding: 10px;
      border: 1px solid green;
      &__text { padding: 0; margin: 0; }
    }
  }
}
</style>
