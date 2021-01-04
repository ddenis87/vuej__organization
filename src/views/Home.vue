<template>
  <div class="organization" id="organization">
    <div class="organization-control">
      <div class="control-view">
        <v-btn title="Переключить вид"
               dark
               fab
               x-small
               @click="() => {listMultiRow = !listMultiRow}">
          <v-icon small> {{ (listMultiRow) ? 'mdi-format-list-bulleted' : 'mdi-view-stream'}}</v-icon>
        </v-btn>
      </div>
    </div>

    <div class="organization-body">
      <div class="body-item">
        <div class="body-item__title">
          <v-toolbar dense flat>
            <v-toolbar-items>
              <v-radio-group v-model="heightType" row dense>
                <h4>Height row type:</h4>
                <v-radio label="fixed" value="fixed"></v-radio>
                <v-radio label="dense" value="dense"></v-radio>
                <v-radio label="auto" value="auto"></v-radio>
              </v-radio-group>
            </v-toolbar-items>
            <v-spacer></v-spacer>
            <v-toolbar-items>
              <v-radio-group v-model="paddingType" row dense>
                <h4>Padding column type:</h4>
                <v-radio label="fixed" value="padding-fixed"></v-radio>
                <v-radio label="dense" value="padding-dense"></v-radio>
              </v-radio-group>
            </v-toolbar-items>
            <v-spacer></v-spacer>
            <v-toolbar-items>
              <v-checkbox dense v-model="isFooter" label="Default footer"></v-checkbox>
            </v-toolbar-items>
          </v-toolbar>
        </div>

        <div class="body-item__body">
          <data-table d-id="organization" 
                     :table-properties="propsTableUno" 
                     v-bind:[heightType]="true"
                     v-bind:[paddingType]="true"
                     :footer="isFooter"
                     editable>
            <!-- <template v-slot:component-footer>
              <div class="table-footer">
                Всего записей в базе: {{ countRowInBase }}
              </div>
            </template> -->
          </data-table>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import DataTable from '@/components/Table/DataTable/DataTable.vue';

export default {
  name: 'Home',
  components: {
    DataTable,
  },
  data() {
    return {
      heightType: 'fixed',
      paddingType: 'padding-fixed',
      isFooter: false,
      listMultiRow: false,
      propsTableUno: {
        tableName: 'organisations',
        header: [
          {value: 'id', width: [50, 50], fixed: 'true'},
          {value: 'institution_code', align: 'end', width: [90, 90], },
          {value: 'title', width: [400,],},
          {value: 'inn', width: [115, 115]},
          {value: 'kpp', width: [115, 115],},
          {value: 'egrul_status', width: [140, 140]},
          {value: 'rubpnubp_status', width: [140, 140]},
          {value: 'industry_typing', width: [120, 120]},
          {value: 'institution_type', width: [130, 130]},
          {value: 'budget_level', width: [180, 180]},
          {value: 'bk', width: [180, 180], objectValue: 'head_name'},
        ],
      },
    }
  },
  computed: {
    countRowInBase() {
      return this.$store.getters[`DataTable/GET_LIST_DATA_COUNT`]('organisations');
    },
  },
}
</script>

<style lang="scss" scoped>
// .table-footer {
//   display: flex;
//   justify-content: flex-start;
//   align-items: center;
//   // border-top: thin solid rgba(0,0,0,.12);
//   width: 100%;
//   height: 40px;
//   // background-color: white;
// }

.organization {
  min-height: 100%;
  display: grid;
  grid-template-areas: "organization-control" "organization-body";
  grid-template-columns: 100%;
  grid-template-rows: 55px 100vh;
  width: 100%;
  box-sizing: border-box;
  &-control {
    grid-area: organization-control;
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    box-sizing: border-box;
    .control-view {
      margin: 0px 10px;
    }
  }

  &-body {
    max-height: calc(100% - 130px);
    grid-area: organization-body;
    padding: 3px;
    
    .body-item {
      max-height: 100%;
      display: grid;
      grid-template-areas: "body-item__title" "body-item__body";
      grid-template-columns: 100%;
      grid-template-rows: 56px 100%;
      border: thin solid rgba(0,0,0,.12);
      border-radius: 4px;
      overflow: hidden;
      // border: thin solid blue;
      &__title {
        padding: 0px 10px;
        grid-area: body-item__title;
        overflow: hidden;
        border-bottom: thin solid rgba(0,0,0,.12);
        h4 { margin-right: 10px ; }
        // border: thin solid red;
      }
      &__body {
        max-height: calc(100% - 66px);
        padding: 10px;
        grid-area: body-item__body;
        // border: thin solid purple;
      }
    }
  }
}
::v-deep {
  .container {
    margin-right: 5px;
    margin-left: 5px;
  }
  .row {
    flex-wrap: nowrap;
    justify-content: space-between;
  }
  .col {
    width: 100%;
  }
  .v-input--selection-controls {
    margin-top: 15px;
  }
  .v-input__control {
    height: 22px;
  }
}
</style>
