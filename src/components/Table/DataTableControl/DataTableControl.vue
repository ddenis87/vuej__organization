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
          <span class="dialog__title" v-if="componentFormProperties.actionName == 'adding'">Новая запись</span>
          <span class="dialog__title" v-if="componentFormProperties.actionName == 'editing'">Редактирование записи</span>
          <v-spacer></v-spacer>
          <v-btn class="system__btn" color="white" tile icon small @click="eventClickCloseDialog"><v-icon small color="white">mdi-close</v-icon></v-btn>
        </v-system-bar>
        <component :is="componentForm" 
                   v-bind:properties="componentFormProperties"
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
    properties: Object,
  },
  data() {
    return {
      isFocusedElement: false,
      isShowDialog: false,
      componentFormProperties: {
        values: null,
        actionName: 'adding',
      },
    }
  },
  computed: {
    componentForm() {
      let componentForm = '';
      if (!this.properties.tableName) return null;
      this.properties.tableName.split('-').forEach(item => {
        componentForm += item[0].toUpperCase() + item.slice(1);
      })
      return () => import(`@/views/TableForm/TableForm${componentForm}`);
    },
  },
  watch: {
    properties() {
      if (this.properties.propertiesFocusedElement != null) this.isFocusedElement = true;
      else this.isFocusedElement = false;
    }
  },
  methods: {
    eventClickAdding() {
      this.componentFormProperties.values = null;
      this.componentFormProperties.actionName = 'adding';
      this.isShowDialog = true;
    },
    eventClickEditing() {
      this.componentFormProperties.values = this.properties.propertiesFocusedElement;
      this.componentFormProperties.actionName = 'editing'
      this.isShowDialog = true;
    },
    eventClickCloseDialog() {
      this.isShowDialog = false;
      this.componentFormProperties.values = null;
      this.componentFormProperties.actionName = 'adding';
      this.isFocusedElement = false;
    },

    eventActionAccept(option) {
      let sendOption = {
        tableName: this.properties.tableName,
      };
      Object.assign(sendOption, option);
      this.$store.commit(`DataTable/${sendOption.actionName.toUpperCase()}_LIST_DATA`, sendOption)
      this.eventClickCloseDialog();
    },
    eventActionCancel() {
      this.eventClickCloseDialog();
    },
    eventActionDeleting() {
      let sendOption = {
        actionName: 'deleting',
        values: Object.assign({}, this.properties.propertiesFocusedElement),
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