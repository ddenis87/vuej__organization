export const ElField = {
  model: {
    prop: 'inputValue',
    event: 'input-value',
  },
  props: {
    isUse: { type: String, default: 'form', },         // where use component
    isSingleLine: { type: Boolean, default: false, },  // show or hide label
    isRequiredOff: { type: Boolean, default: false },  // 
    isHideMessage: { type: Boolean, default: false },  // hidden or show validation error
    isHideLabel: { type: Boolean, dafault: false },    // hidden or show label
    isDisabled: { type: Boolean, default: false },     // 
    isSelected: { type: Boolean, defalt: false },      // selected value in text field after mounted
    isBtnClear: { type: Boolean, default: true },     // hidden or show button clear

    inputProperties: Object,
    inputValue: '',
  },
  data() {
    return {
      fieldValue: this.inputValue,
    }
  },
  computed: {
    fieldLabel() { if (!this.isHideLabel) return this.inputProperties.label; return; },
  },
  watch: {
    inputValue() { this.fieldValue = this.inputValue; }, 
  },
  methods: {
    // EVENTS --------------------- //
    eventKeyEsc() { this.isEmit = true; this.emitKeyEsc(); },
    eventBlurField() {
      if (!this.isEmit) this.emitBlurField();
    },
    // ------ --------------------- //

    // EMITS ---------------------- //
    emitKeyEnter(option = null) { this.$emit('keydown-enter', option); },
    emitKeyTab(option = null) { this.$emit('keydown-tab', option); },
    emitKeyEsc() { this.$emit('keydown-esc'); },
    emitClearValue() { this.$emit('clear-value'); },
    emitInputValue() { this.$emit('input-value'); },
    emitBlurField() { this.$emit('blur-field') }
    // ----- ---------------------- //
  },
}