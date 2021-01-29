import DataTable from '@/components/DataTable/DataTable/DataTable.vue';

export const TheTable = {
  components: {
    DataTable,
  },
  props: {
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
    }
  },
  computed: {
    tableProperties() {
      return (this.isMultiline) ? (this.tablePropertiesMultiline) ? this.tablePropertiesMultiline : this.tablePropertiesUno : this.tablePropertiesUno;
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
    eventRowKeydown(event, option) {
      this.$emit('row-keydown', event, option);
    },
    eventComponentBlur() {
      this.$emit('component-blur');
    },
  }
}