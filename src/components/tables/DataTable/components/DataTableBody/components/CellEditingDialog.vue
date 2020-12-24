<template>
  <div class="dialog" id="boxEditingComponentDialog">
    <!-- @click.stop - stop slider list -->
    <!-- @click:append-outer - open dialog -->
    <!-- @focus - for selected inner text -->
    <v-autocomplete auto-select-first
                    class="dialog__select"
                    tabindex="10"
                    dense
                    single-line
                    return-object
                    v-model="cellValue" 
                    :items="cellList"
                    append-icon="mdi-dots-horizontal"
                    hide-selected
                    small
                    @input="inputInput"
                    @keydown.stop="inputEvent" 
                    @blur.stop="blurInput"
                    @focus="focusEvent"
                    @click:append="isDialog = true"
                    @click:append-outer="isDialog = true"

                    @click.stop=""></v-autocomplete>
    <v-dialog v-model="isDialog" max-width="80%" scrollable class="dialog__box">
      <v-card height="700">
        <v-system-bar color="rgba(64, 64, 64, 1)" height="40">
          <span class="dialog__title">{{ descriptionTable }}</span>
          <v-spacer></v-spacer>
          <v-btn class="system__btn" color="white" tile icon small @click="dialogClose"><v-icon small color="white">mdi-close</v-icon></v-btn>
        </v-system-bar>
        <div class="dialog__table" id="dialog__table">
          <component :is="catalogComponent" v-bind:editable="false" @dblclick-row="selectInDialog"></component>
        </div>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
export default {
  name: 'CellEditingDialog',
  components: {
  },
  props: {
    dataProps: Object,
  },
  data() {
    return {
      cellValue: null,
      // rules: [v => (this.dataProps.required) ? v.length > 0 : true || `мин. 1` ],
      cellEditStatus: false,
      isDialog: false,
    }
  },
  computed: {
    catalogComponent() {
      return () => import('@/views/Tables/Bk'); /// ??????
    },
    cellList() {
      console.log(this.dataProps);
      let cellList = [];
      cellList = this.$store.getters[`DataTable/GET_LIST_DATA`]('budget-classifications');
      if (cellList.length == 0) {
        this.$store.dispatch(`DataTable/GET_LIST_OPTION`, {tableName: 'budget-classifications'});
      } else {
        this.cellValue = this.dataProps.text;
      }
      let modCellList = [];
      cellList.forEach(element => {
        modCellList.push({text: element[this.dataProps.objectValue], value: `${element.id}`});
      });
      return modCellList;
    },
    descriptionTable() {
      return this.$store.getters[`DataTable/GET_DESCRIPTION_TABLE`]('budget-classifications');
    },
  },
  methods: {
    dialogClose(event) {
      this.isDialog = false;
      setTimeout(() => {
        document.getElementById('boxEditingComponentDialog').querySelector('input').focus();
      }, 10);
    },
    selectInDialog(event, itemColumn, valueIn) {
      // console.log('select in dialog');
      this.isDialog = false;
      document.getElementById('boxEditingComponentDialog').querySelector('input').focus();
      this.cellValue = valueIn;
      this.cellEditStatus = true;
      this.$emit('input-event', event,  {value: valueIn, key: 'Enter'});
      
    },
    inputInput() {
      // console.log('input input select component');
      this.cellEditStatus = true;
    },
    inputEvent(event) {
      // console.log('input select component');
      if (event.key == 'Escape') { this.$emit('input-event', event, {value: this.dataProps.text, key: 'Escape'}); return; }
      if (event.key == 'Enter') {
        if (this.cellEditStatus) {
          this.$emit('input-event', event,  {value: this.cellValue, key: 'Enter'}); return;
        }
      }
      if (event.key == 'Tab') { console.log('tab'); event.preventDefault(); this.$emit('input-event', event, {value: this.cellValue, key: 'Tab'}); return; }
    },
    blurInput(event) {
      // console.log('blur dialog component');
      if (this.cellEditStatus) { this.$emit('input-blur', event); return; }
      if (event.relatedTarget && event.relatedTarget.classList.contains('table-body__col')) {
        this.$emit('input-blur', event);
        return;
      }
      if (event.relatedTarget == null) {
        this.$emit('input-blur', event);
        return;
      }
    },
    focusEvent(event) {
      // console.log('focus dialog component');
      setTimeout(() => { 
        event.target.select(); }, 100)
    },
  },
}
</script>

<style lang="scss" scoped>
.v-input {
  text-align: center;
  font-size: 14px;
  .v-input__control {
    padding: 0px;
  }
}
.v-text-field {
  margin-top: -3.5px;
   input {
    padding: 0px;
  }
}

.dialog {
  &__title {
    color: white;
  }
  &__table {
    height: 94%;
    color: white;
    &::-webkit-scrollbar {
      width: 8px;
      height: 8px;
      border-radius: 4px;
      &-thumb {
        border-radius: 3px;
        background-color: rgba(0,0,0,0.2);
      }
    }
  }
}
::v-deep {
  .v-icon { margin-right: 0px; }
}
</style>