import DataTable from '@/components/DataTable/DataTable/DataTable.vue';

export const Table = {
  components: {
    DataTable,
  },
  props: {
    // editable: { type: Boolean, default: true },
    typeRowNumber: { type: Number, default: 0 },
    typeColumn: { type: String, default: 'fixed' },
    isFooter: { type: Boolean, default: false },
    isExpansion: { type: Boolean, default: false },
    isMultiline: { type: Boolean, default: false },
    isEditable: { type: Boolean, default: true },
  },
  data() {
    return {
      typeRow: ['fixed', 'dense', 'auto'],
      focusedElement: {},
      // tableProperties: this.tablePropertiesUno,
    }
  },
  
  computed: {
    // isEditable() { return this.editable; },
    tableProperties() {
      return (this.isMultiline) ? this.tablePropertiesMultiline : this.tablePropertiesUno;
    },
  },
  mounted() {
    this.$emit('table-mount', this.$data, this.tableProperties);
  },
  methods: {
    eventRowFocused(option) {
      this.$emit('row-focused', option);
    },
    eventRowSelected(option) {
      this.$emit('row-selected', option);
    },
  }
}