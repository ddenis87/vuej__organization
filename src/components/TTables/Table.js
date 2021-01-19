import DataTable from '@/components/DataTable/DataTable/DataTable.vue';

export const Table = {
  components: {
    DataTable,
  },
  props: {
    editable: { type: Boolean, default: true },
    typeRowNumber: { type: Number, default: 0 },
    typeColumn: { type: String, default: 'padding-fixed' },
    isFooter: { type: Boolean, default: false },
  },
  data() {
    return {
      
      typeRow: ['fixed', 'dense', 'auto'],
      // paddingType: 'padding-fixed',
      focusedElement: {},
      
    }
  },
  
  computed: {
    isEditable() { return this.editable; }
  },
  mounted() {
    this.$emit('table-mount', this.$data);
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