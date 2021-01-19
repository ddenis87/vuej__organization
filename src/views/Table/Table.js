import DataTableControl from '@/components/DataTable/DataTableControl/DataTableControl.vue';
import DataTable from '@/components/DataTable/DataTable/DataTable.vue';

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
    },
    eventChangeColumn() {
      (this.paddingType == 'padding-fixed') ? this.paddingType = 'padding-dense' : this.paddingType = 'padding-fixed';
    },
    toggleFooter() {
      this.isFooter = !this.isFooter;
    },
  }
}