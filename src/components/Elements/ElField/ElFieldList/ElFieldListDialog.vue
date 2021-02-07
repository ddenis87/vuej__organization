<template>
  <div class="list-dialog">
    <div class="list-dialog__title">
      <v-subheader>{{ fieldLabel }}</v-subheader>
    </div>
    <div class="list-dialog__action">
      <el-button @click="addingItem">Добавить</el-button>
      <el-button @click="acceptList">Применить</el-button>
    </div>
    <div class="list-dialog__body">
      <data-table-lazy :headers="tableHeaders"
                       :items="tableItems"
                       :is-clearable="true"
                       :input-properties="inputProperties"
                       @input-value="inputValue"
                       @deleting-item="deletingItem">
      </data-table-lazy>
    </div>
  </div>
  
</template>

<script>
import DataTableLazy from '@/components/DataTable/DataTableLazy/DataTableLazy.vue';
import ElButton from '@/components/Elements/ElButton.vue';

export default {
  name: 'ElFieldListDialog',
  components: {
    DataTableLazy,
    ElButton,
  },
  props: {
    countSelectValue: { type: Number, default: 0, },
    inputProperties: {
      type: Object,
      default() {
        return {}
      }
    },
  },
  data() {
    return {
      tableHeaders: [
        {key: 'value', text: 'Значение', 'position_in_template': 'grid-area: value', width: [100, ]},
      ],
      tableItems: [],
      uniqueIndex: 0,
      tableValue: [],
    }
  },
  computed: {
    fieldLabel() { console.log(this.inputProperties); return this.inputProperties.label; },
  },
  watch: {
    countSelectValue() {
      if (this.countSelectValue == 0) {
        console.log('del')
        this.tableItems.splice(0, this.tableItems.length);
        // this.uniqueIndex = 0;
        this.tableValue.splice(0, this.tableValue.length);
      }
    }
  },
  methods: {
    addingItem() {
      // if (this.tableItems.length == 0) this.uniqueIndex = 0;
      this.uniqueIndex = this.uniqueIndex + 1;
      this.tableItems.push({uniqueIndex: this.uniqueIndex});
    },
    deletingItem(index) {
      this.tableItems.splice(index, 1);
    },
    inputValue(tableValue) {
      // console.log(tableValue);
      this.tableValue = [];
      if (this.inputProperties.type == 'field') {
        for (let key of Object.keys(tableValue)) {
          if (!this.tableValue.find(item => item.id == tableValue[key].id)) this.tableValue.push(tableValue[key]);
        }
      } else if (this.inputProperties.type == 'choice') {
        for (let key of Object.keys(tableValue)) {
          if (!this.tableValue.find(item => item.value == tableValue[key].value)) this.tableValue.push(tableValue[key]);
        }
      }
    },
    acceptList() {
      this.$emit('accept-list', this.tableValue);
    },
  }
}
</script>

<style lang="scss" scoped>
@import './ElFieldList.scss';
.list-dialog {
  display: grid;
  grid-template-areas: "list-dialog__title" "list-dialog__action" "list-dialog__body";
  grid-template-columns: 1fr;
  grid-template-rows: 48px 48px 1fr;
  padding: 8px 0px;
  padding-left: 10px;
  height: calc(100vh - 64px);
  overflow: hidden;
  &__title {
    grid-area: list-dialog__title;
    text-transform: uppercase;
    overflow: hidden;
  }
  &__body {
    grid-area: list-dialog__body;
    padding: 0px 8px;
    padding-top: 20px;
    padding-right: 8px;
    // border-top: thin solid rgba(0,0,0,.12);
    // border-bottom: thin solid rgba(0,0,0,.12);
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
    grid-area: list-dialog__action;
    display: flex;
    justify-content: flex-end;
    align-items: center;
    height: 56px;
    padding: 0px 16px;
    border-top: thin solid rgba(0,0,0,.12);
    border-bottom: thin solid rgba(0,0,0,.12);
    .btn {
      margin-left: 10px;
    }
  }
}
</style>