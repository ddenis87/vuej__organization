import DataTable from '@/components/Table/DataTable/DataTable.vue';

export const Table = {
  components: {
    DataTable,
  },
  data() {
    return {
      heightType: 'fixed',
      paddingType: 'padding-fixed',
      focusedElement: {},
    }
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
      (this.heightType == 'fixed') ? this.heightType = 'dense' : this.heightType = 'fixed';
    },
    eventChangeColumn() {
      (this.paddingType == 'padding-fixed') ? this.paddingType = 'padding-dense' : this.paddingType = 'padding-fixed';
    },
  }
}