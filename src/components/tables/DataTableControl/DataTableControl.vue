<template>
  <div class="data-table-control">
    <v-toolbar height="40" flat>
        <v-tooltip bottom>
          <template v-slot:activator="{ on }">
            <v-btn icon small tile v-on="on" @click.stop="() => {formOption.values.id = 'newId';
        formOption.values.head_code = null;
        formOption.values.head_name = null; isDialogCreated = true;}"><v-icon>mdi-plus</v-icon></v-btn>
          </template>
          <span>Добавить</span>
        </v-tooltip>
        <v-tooltip bottom>
          <template v-slot:activator="{ on }">
            <v-btn icon small tile :disabled="isItemSelected" v-on="on" @click.stop="isDialogEditing = !isDialogEditing"><v-icon>mdi-pencil</v-icon></v-btn>
            </template>
          <span>Изменить</span>
        </v-tooltip>
        <v-tooltip bottom>
          <template v-slot:activator="{ on }">
            <v-btn icon small tile :disabled="isItemSelected" v-on="on" @click.stop="isDialogDeleting = !isDialogDeleting"><v-icon>mdi-minus</v-icon></v-btn>
          </template>
          <span>Удалить</span>
        </v-tooltip>
        
        <v-spacer></v-spacer>
        <v-btn icon small tile><v-icon>mdi-sort-variant</v-icon></v-btn>
        <v-btn icon small tile><v-icon>mdi-filter-outline</v-icon></v-btn>
      </v-toolbar>
      <v-dialog v-model="isDialogCreated" max-width="60%" class="dialog" @click:outside="clickOutside">
        <v-card>
          <v-system-bar color="rgba(64, 64, 64, 1)" height="40">
            <span class="dialog__title">Новая запись</span>
            <v-spacer></v-spacer>
            <v-btn class="system__btn" color="white" tile icon small @click="() => {isDialogCreated = false; $refs.formCreated.reset()}"><v-icon small color="white">mdi-close</v-icon></v-btn>
          </v-system-bar>
          <v-card-text>
            <v-form ref="formCreated">
              <v-text-field v-model="formOption.values.head_code" label="Код главы по БК"></v-text-field>
              <v-text-field v-model="formOption.values.head_name" label="Наименование главы по БК"></v-text-field>
            </v-form>
          </v-card-text>
          <v-card-actions>
            <v-btn small tile @click="$refs.formCreated.reset()">Очистить</v-btn>
            <v-spacer></v-spacer>
            <v-btn small tile @click="addingAccept">Добавить</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>

      <v-dialog v-model="isDialogEditing" max-width="60%" class="dialog" @click:outside="clickOutside">
        <v-card>
          <v-system-bar color="rgba(64, 64, 64, 1)" height="40">
            <span class="dialog__title">Редактирование записи</span>
            <v-spacer></v-spacer>
            <v-btn class="system__btn" color="white" tile icon small @click="editingCancel"><v-icon small color="white">mdi-close</v-icon></v-btn>
          </v-system-bar>
          <v-card-text>
            <v-form ref="formCreated">
              <v-text-field v-model="formOption.values.head_code" label="Код главы по БК"></v-text-field>
              <v-text-field v-model="formOption.values.head_name" label="Наименование главы по БК"></v-text-field>
            </v-form>
          </v-card-text>
          <v-card-actions>
            <v-btn small tile @click="editingCancel">Отменить</v-btn>
            <v-spacer></v-spacer>
            <v-btn small tile @click="editingAccept">Изменить</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>

      <v-dialog v-model="isDialogDeleting" max-width="60%" class="dialog" @click:outside="clickOutside">
        <v-card>
          <v-system-bar color="red darken-3" height="40">
            <span class="dialog__title">Удаление записи</span>
            <v-spacer></v-spacer>
            <v-btn class="system__btn" color="white" tile icon small @click="deletingCancel"><v-icon small color="white">mdi-close</v-icon></v-btn>
          </v-system-bar>
          <v-card-text>
            <p class="dialog__text">Вы уверены что хотите удалить следующую запись:</p>
            <p class="dialog__text dialog__text_bold">{{ (itemSelected) ? (itemSelected.head_name) : '' }}</p>
          </v-card-text>
          <v-card-actions>
            <v-btn small tile @click="deletingCancel">Отменить</v-btn>
            <v-spacer></v-spacer>
            <v-btn small tile @click="deletingAccept">Подтвердить</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
  </div>
</template>

<script>
export default {
  name: 'DataTableControl',
  props: {
    itemSelected: {type: Object, default: () => {return {}}},
    // itemSelected: null, 
    dataProperties: {type: Object, default: () => {return {}}},
  },
  data() {
    return {
      isDialogCreated: false,
      isDialogEditing: false,
      isDialogDeleting: false,
      formOption: {
        tableName: this.dataProperties.tableName,
        values: {
          id: (this.itemSelected) ? this.itemSelected.id : 'newId',
          head_code: (this.itemSelected) ? this.itemSelected.head_code : null,
          head_name: (this.itemSelected) ? this.itemSelected.head_name : null,
        }
      }
    }
  },
  watch: {
    itemSelected() {
      // console.log('watch');
      if (this.itemSelected) {
        this.formOption.values.id = this.itemSelected.id;
        this.formOption.values.head_code = this.itemSelected.head_code;
        this.formOption.values.head_name = this.itemSelected.head_name;
      } else {
        this.formOption.values.id = 'newId';
        this.formOption.values.head_code = null;
        this.formOption.values.head_name = null;
      }
    }
  },
  computed: {
    isItemSelected() {
      // console.log(this.itemSelected);
      // console.log(this.formOption);
      if (this.itemSelected == null) return true;
      return false;
    }
  },
  methods: {
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