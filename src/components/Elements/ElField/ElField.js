import ElBtnIconSmall from '@/components/Elements/ElBtnIconSmall.vue';
import ElBtn from '@/components/Elements/ElBtn.vue';

export const ElField = {
  model: {
    prop: 'inputValue',
    event: 'input-value',
  },
  components: {
    ElBtnIconSmall,
    ElBtn,
  },
  props: {
    // isUse: { type: String, default: 'form', },         // where use component
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
      isEmit: false,
      fieldValue: this.inputValue,
      rules: {
        required(value) { return !!value || false; },
      },
    }
  },
  computed: {
    fieldLabel() { if (!this.isHideLabel) return this.inputProperties.label; return; },
    fieldRequired() { return (this.inputProperties.required && !this.isRequiredOff) ? true : false; },
  },
  watch: {
    inputValue() { this.fieldValue = this.inputValue; }, 
  },
  methods: {
    // EVENTS --------------------- //
    eventKeyEsc() { this.isEmit = true; this.emitKeyEsc(); },
    eventClearValue() {
      this.fieldValue = null;
      this.emitInputValue();
      this.emitClearValue();
    },
    eventFocusField() { this.emitFocusField(); },
    eventBlurField() {
      if (!this.isEmit) this.emitBlurField();
    },
    // ------ --------------------- //

    // EMITS ---------------------- //
    emitKeydown(event) { this.$emit('keydown-any', event); },
    emitKeyEnter(option = null) { this.$emit('keydown-enter', option); },
    emitKeyTab(option = null) { this.$emit('keydown-tab', option); },
    emitKeyEsc() { this.$emit('keydown-esc'); },
    emitClearValue() { this.$emit('clear-value'); },
    emitInputValue() { this.$emit('input-value', this.fieldValue); },
    emitFocusField() { this.$emit('focus-field') },
    emitBlurField() { console.log('blur element'); this.$emit('blur-field') },
    // ----- ---------------------- //
  },
}