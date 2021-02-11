export const ElFieldRange = {
  model: {
    prop: 'inputValue',
    event: 'input-value'
  },
  props: {
    isSingleLine: { type: Boolean, default: true, },  // show or hide label
    isLabel: { type: Boolean, default: false, },  // hidden or show label
    isRequired: {type: Boolean, default: true},
    isBtnClear: {type: Boolean, default: false},
    isDisabled: { type: Boolean, default: false },
    inputValue: { type: Object, default() { return { start: null, end: null } } },
  },
  data() {
    return {
      fieldValue: {
        start: null,
        end: null,
      },
    }
  },
  watch: {
    inputValue() { this.fieldValue = this.inputValue; }, 
  },
  methods: {
    eventInputValue() {
      if (this.fieldValue.start && this.fieldValue.end)
        this.$emit('input-value', this.fieldValue);
    },
    eventClearValue() {
      if (!this.fieldValue.start && !this.fieldValue.end) {
        this.$emit('keydown-clear');
        return;
      }
      this.$emit('input-value', this.fieldValue);
    },
  },
}