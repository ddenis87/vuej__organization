export const Styles = {
  props: {
    // props for height type
    fixed: {type: Boolean, default: true},
    dense: {type: Boolean, default: false},
    auto: {type: Boolean, default: false},
  },
  computed: {
    heightType() {
      let heightType = 'fixed';
      if (this.dense) heightType = 'dense';
      if (this.auto) heightType = 'auto';
      return heightType;
    },
  },
}