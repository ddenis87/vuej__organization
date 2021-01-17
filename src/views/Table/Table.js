import DataTableControl from '@/components/Table/DataTableControl/DataTableControl.vue';
import DataTable from '@/components/Table/DataTable/DataTable.vue';

export const Table = {
  components: {
    DataTableControl,
    DataTable,
  },
  props: {
    editable: {
      type: Boolean,
      default: true,
    },
  },
  computed: {
    isEditable() { return this.editable; }
  },
  methods: {
    eventRowFocused(event, option, tableName) {
      this.focusedElement = Object.assign({}, option);
    },
    eventRowSelected(event, option, tableName) {
      this.$emit('event-row-selected', option);
    },
    eventTableBlur() {
      console.log('blur table');
      // this.propertiesDataTableControl = null;
    },
    eventChangeRow() {
      if (this.heightTypeCount == this.heightType.length - 1) { this.heightTypeCount = 0; return; }
      this.heightTypeCount = this.heightTypeCount + 1;

      // (this.heightType == 'fixed') ? this.heightType = 'dense' : this.heightType = 'fixed';
    },
    eventChangeColumn() {
      (this.paddingType == 'padding-fixed') ? this.paddingType = 'padding-dense' : this.paddingType = 'padding-fixed';
      // switch(value) {
      //   case 'fixed': this.paddingType = 'padding-fixed'; break;
      //   case 'dense': this.paddingType = 'padding-dense'; break;
      // }
    },
    toggleFooter() {
      this.isFooter = !this.isFooter;
    },
  }
}