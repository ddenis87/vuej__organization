<template>
  <div class="data-table-control">
    <v-toolbar height="40" flat>
      <v-tooltip bottom>
        <template v-slot:activator="{ on }">
          <v-btn icon fab small v-on="on" @click="eventClickAdding"><v-icon>mdi-plus</v-icon></v-btn>
        </template>
        <span class="tooltip-text tooltip-text-control">Добавить</span>
      </v-tooltip>
      <v-tooltip bottom>
        <template v-slot:activator="{ on }">
          <v-btn icon fab small :disabled="!isFocusedElement" v-on="on" @click="eventClickEditing"><v-icon>mdi-pencil</v-icon></v-btn>
          </template>
        <span class="tooltip-text tooltip-text-control">Изменить</span>
      </v-tooltip>
      <v-tooltip bottom>
        <template v-slot:activator="{ on }">
          <v-btn icon fab small :disabled="!isFocusedElement" v-on="on" @click="eventActionDeleting"><v-icon>mdi-delete</v-icon></v-btn>
        </template>
        <span class="tooltip-text tooltip-text-control">Удалить</span>
      </v-tooltip>

        <v-divider vertical></v-divider>
      <v-tooltip bottom>
        <template v-slot:activator="{ on }">
          <v-btn icon fab small v-on="on" @click="$emit('event-change-row')"><v-icon>{{ (heightType == 'fixed') ? 'mdi-view-sequential' : 'mdi-view-sequential-outline' }}</v-icon></v-btn>
        </template>
        <span class="tooltip-text tooltip-text-control">{{ (heightType == 'fixed') ? 'Строки сжато' : 'Строки свободно' }}</span>
      </v-tooltip>
      <v-tooltip bottom>
        <template v-slot:activator="{ on }">
          <v-btn icon fab small v-on="on" @click="$emit('event-change-column')"><v-icon>{{ (paddingType == 'padding-fixed') ? 'mdi-view-parallel-outline' : 'mdi-view-parallel' }}</v-icon></v-btn>
        </template>
        <span class="tooltip-text tooltip-text-control">{{ (paddingType == 'padding-fixed') ? 'Столбцы сжато' : 'Столбцы свободно' }}</span>
      </v-tooltip>
      <v-btn icon fab small disabled><v-icon>mdi-view-quilt</v-icon></v-btn>

      <v-spacer></v-spacer>
      <!-- <v-btn icon fab small><v-icon>mdi-sort-variant</v-icon></v-btn> -->
      <v-btn icon fab small @click="isOpenFilter = !isOpenFilter"><v-icon>mdi-filter-outline</v-icon></v-btn>
    </v-toolbar>
    <v-navigation-drawer v-model="isOpenFilter" temporary fixed hide-overlay right width="400">
      <data-filter-and-sorting table-name="organisations" @close="isOpenFilter = !isOpenFilter"></data-filter-and-sorting>
    </v-navigation-drawer>

    <v-dialog fullscreen transition="dialog-bottom-transition" v-model="isShowDialog" max-width="60%" class="dialog" @click:outside="eventClickCloseDialog">
      <v-card>
        <v-system-bar color="indigo" height="65">
          <v-btn class="system__btn" color="white" tile icon small @click="eventClickCloseDialog"><v-icon small color="white">mdi-close</v-icon></v-btn>
          <span class="dialog__title">{{ idDialogName }}</span>
          <v-spacer></v-spacer>
          
        </v-system-bar>
        <component :is="componentForm" 
                   :focused-element="focusedElementForm"
                   @event-action-accept="eventActionAccept"
                   @event-action-cancel="eventActionCancel"></component>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import DataFilterAndSorting from '@/components/DataFilterAndSorting/DataFilterAndSorting.vue';

export default {
  name: 'DataTableControl',
  components: {
    DataFilterAndSorting,
  },
  props: {
    tableName: String,
    focusedElement: Object,
    formProperties: Object,
    heightType: {type: String, default: 'fixed'},
    paddingType: {type: String, default: 'padding-fixed'},
  },
  data() {
    return {
      isShowDialog: false,
      focusedElementForm: null, //(Object.keys(this.focusedElement).length != 0) ? this.focusedElement : null,
      isOpenFilter: false,
    }
  },
  computed: {
    componentForm() {
      let componentForm = '';
      if (!this.tableName) return null;
      this.tableName.split('-').forEach(item => {
        componentForm += item[0].toUpperCase() + item.slice(1);
      })
      return () => import(`@/views/TableForm/TableForm${componentForm}`);
    },
    isFocusedElement() { return (this.focusedElementForm && Object.keys(this.focusedElementForm).length != 0) ? true : false },
    idDialogName() { return (this.focusedElementForm == null) ? 'Добавление записи' : 'Редактирование записи'; }
  },
  watch: {
    focusedElement() { this.focusedElementForm = (Object.keys(this.focusedElement).length != 0) ? this.focusedElement : null }
  },
  methods: {
    eventClickAdding() {
      this.focusedElementForm = null;
      this.isShowDialog = true;
    },
    eventClickEditing() {
      this.isShowDialog = true;
    },
    eventClickCloseDialog() {
      this.isShowDialog = false;
      this.focusedElementForm= null;
    },
    eventChangeRow(value) {
      this.$emit('event-change-row', value);
    },

    eventActionAccept(option) {
      let sendOption = {
        tableName: this.tableName,
      };
      Object.assign(sendOption, option);
      sendOption.values.id = (sendOption.actionName == 'editing' || sendOption.actionName == 'deleting') ? this.focusedElement.id : 'newId';
      console.log(sendOption);
      this.$store.commit(`DataTable/${sendOption.actionName.toUpperCase()}_LIST_DATA`, sendOption)
      this.eventClickCloseDialog();
    },
    eventActionCancel() {
      this.eventClickCloseDialog();
    },
    eventActionDeleting() {
      let sendOption = {
        actionName: 'deleting',
        values: Object.assign({}, this.focusedElement),
      }
      this.eventActionAccept(sendOption);
    }
  },
}
</script>

<style lang="scss" scoped>
.dialog {
  &__title {
    color: white;
  }
  &__text {
    font-size: 1em;
    padding: 5px 0px;

    &_bold {
      text-indent: 10px;
      font-weight: bold;
    }
  }
}
::v-deep {
  .v-icon { margin-right: 0px; }
  .v-navigation-drawer--temporary {
    z-index: 9998;
  }
}
</style>