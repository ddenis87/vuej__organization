<template>
  <div class="data-table-control">
    <v-toolbar height="40" flat>
      <v-tooltip bottom>
        <template v-slot:activator="{ on }">
          <v-btn icon small tile v-on="on" @click="eventClickAdding"><v-icon>mdi-plus</v-icon></v-btn>
        </template>
        <span class="tooltip-text">Добавить</span>
      </v-tooltip>
      <v-tooltip bottom>
        <template v-slot:activator="{ on }">
          <v-btn icon small tile :disabled="!isFocusedElement" v-on="on" @click="eventClickEditing"><v-icon>mdi-pencil</v-icon></v-btn>
          </template>
        <span class="tooltip-text">Изменить</span>
      </v-tooltip>
      <v-tooltip bottom>
        <template v-slot:activator="{ on }">
          <v-btn icon small tile :disabled="!isFocusedElement" v-on="on" @click="eventActionDeleting"><v-icon>mdi-delete</v-icon></v-btn>
        </template>
        <span class="tooltip-text">Удалить</span>
      </v-tooltip>
      
      <v-spacer></v-spacer>
      <v-btn icon small tile><v-icon>mdi-sort-variant</v-icon></v-btn>
      <v-btn icon small tile><v-icon>mdi-filter-outline</v-icon></v-btn>
    </v-toolbar>

    <v-dialog v-model="isShowDialog" max-width="60%" class="dialog" @click:outside="eventClickCloseDialog">
      <v-card>
        <v-system-bar color="rgba(64, 64, 64, 1)" height="40">
          <span class="dialog__title">{{ idDialogName }}</span>
          <v-spacer></v-spacer>
          <v-btn class="system__btn" color="white" tile icon small @click="eventClickCloseDialog"><v-icon small color="white">mdi-close</v-icon></v-btn>
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
export default {
  name: 'DataTableControl',
  props: {
    tableName: String,
    focusedElement: Object,
  },
  data() {
    return {
      isShowDialog: false,
      focusedElementForm: null, //(Object.keys(this.focusedElement).length != 0) ? this.focusedElement : null,
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

    eventActionAccept(option) {
      let sendOption = {
        tableName: this.tableName,
      };
      Object.assign(sendOption, option);
      sendOption.values.id = (sendOption.actionName == 'editing') ? this.focusedElement.id : 'newId';
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
}
</style>