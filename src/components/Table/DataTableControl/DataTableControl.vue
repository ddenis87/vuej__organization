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
          <v-btn icon small tile :disabled="!isFocusedElement" v-on="on" @click.stop=""><v-icon>mdi-delete</v-icon></v-btn>
        </template>
        <span class="tooltip-text">Удалить</span>
      </v-tooltip>
      
      <v-spacer></v-spacer>
      <v-btn icon small tile><v-icon>mdi-sort-variant</v-icon></v-btn>
      <v-btn icon small tile><v-icon>mdi-filter-outline</v-icon></v-btn>
    </v-toolbar>

    <v-dialog v-model="isShowDialog" max-width="60%" class="dialog">
      <v-card>
        <v-system-bar color="rgba(64, 64, 64, 1)" height="40">
          <span class="dialog__title" >Новая запись</span>
          <!-- <span class="dialog__title" v-if="componentFormProperties.actionName == 'editing'">Редактирование записи</span> -->
          <v-spacer></v-spacer>
          <v-btn class="system__btn" color="white" tile icon small @click="() => {isDialogCreated = false;}"><v-icon small color="white">mdi-close</v-icon></v-btn>
        </v-system-bar>
        <component :is="componentForm" v-bind:properties="componentFormProperties"></component>
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
      // propertiesComponentForm: {
      //   fields: null,
      //   actionName: 'adding',
      // },
    }
  },
  computed: {
    componentForm() {
      let componentForm = '';
      if (!this.properties.tableName) return null;
      this.properties.tableName.split('-').forEach(item => {
        componentForm += item[0].toUpperCase() + item.slice(1);
      })
      console.log(componentForm);
      return () => import(`@/views/TableForm/TableForm${componentForm}`); /// ?????? необходимо получать по API
    },
    componentFormProperties() {
      let componentFormProperties = {
        actionName: 'adding',
      }
      if (!this.properties.propertiesFocusedElement) return componentFormProperties;
      componentFormProperties.values = this.properties.propertiesFocusedElement;
      componentFormProperties.actionName = 'editing'
      return componentFormProperties;
    },
  },
  watch: {
    properties() {
      console.log(this.properties);
      if (this.properties.propertiesFocusedElement != null) this.isFocusedElement = true;
      else this.isFocusedElement = false;
      // this.focusedElement = (this.properties.propertiesFocusedElement) ? true : true;
    }
  },
  methods: {
    eventClickAdding() {
      // this.componentFormProperties = {
      //   values: null,
      //   actionName: 'adding',
      // };
      this.isShowDialog = true;
    },
    eventClickEditing() {
      // Object.assign(this.propertiesComponentForm.fields, this.properties.propertiesFocusedElement)
      // this.propertiesComponentForm = {
      //   fields: this.properties.propertiesFocusedElement,
      //   actionName: 'editing',
      // };
      this.isShowDialog = true;
    },

    addingAccept(event) {
      if (this.formOption.values.head_code == null || this.formOption.values.head_name == null) return;
      this.$store.commit('DataTable/ADDING_LIST_DATA', this.formOption);
      this.isDialogCreated = false;
      this.$emit('adding-accept');
    },
    editingAccept() {
      this.$store.commit('DataTable/EDITING_LIST_DATA', this.formOption);
      this.isDialogEditing = false;
      this.$emit('editing-accept');
    },
    editingCancel() {
      this.isDialogEditing = false;
      this.$emit('editing-cancel');
    },
    deletingAccept() {
      this.formOption.values.id = this.itemSelected.id;
      this.$store.commit('DataTable/DELETING_LIST_DATA', this.formOption);
      this.isDialogDeleting = false;
      this.$emit('deleting-accept');
    },
    deletingCancel() {
      this.isDialogDeleting = false;
      this.$emit('deleting-cancel');
    },
    clickOutside() {
      this.$emit('click-outside');
    },
  },
}
</script>

<style lang="scss" scoped>
// .data-table-control {
//   .tooltip-text {
//     display: block;
//     width: 100%;
//     height: 100%;
//     border: thin solid rgba(255, 0, 0, 1);
//   }
// }
// .tooltip-text {
//     display: block;
//     width: 100%;
//     height: 100%;
//     border: thin solid rgba(255, 0, 0, 1);
//   }
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