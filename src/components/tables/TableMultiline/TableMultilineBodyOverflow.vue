<template>
  <div class="box-overflow" :class="{'box-overflow_cut': cutContent}" :id="`box-overflow-${sequenceOverflowBox}`" @scroll="scrollPrompt">
    <div class="box-full" :class="{'box-full_cut': cutContent}" :style="countRowStyle" :id="`box-full-${sequenceOverflowBox}`" @scroll="scrollPrompt">
      <slot></slot>
    </div>
    <div class="box-overflow__button-full" v-if="cutContent" @scroll="scrollPrompt">
      <div class="box-overflow__button-full-item" @click="showFullContent"><v-icon small color="blue" style="position: static;">mdi-chevron-down</v-icon></div>
    </div>
    <div class="box-overflow__prompt" :style="promptLocation" :id="`prompt-${sequenceOverflowBox}`" v-show="isShowPrompt" tabindex="1"  @blur="() => isShowPrompt = false" @scroll="scrollPrompt">
      <!-- <v-btn class="box-overflow__prompt-btn"  :id="`prompt-btn-${sequenceOverflowBox}`" tabindex="1">123</v-btn> -->
      <!-- <textarea class="box-overflow__prompt-text" :id="`prompt-text-${sequenceOverflowBox}`" tabindex="1" @blur="() => isShowPrompt = false"></textarea> -->
    </div>
  </div>
</template>

<script>
export default {
  name: 'TableMultilineBodyOverflow',
  props: {
    scrollEvent: {type: Boolean, default: false},
  },
  // computed: {
  //   computedScrollParent() {}
  // },
  watch: {
    scrollEvent(newValue, oldValue) {
      this.isShowPrompt = false;
    }
  },
  data() {
    return {
      isShowPrompt: false,
      promptLocation: '',
      countRowStyle: '',
      sequenceOverflowBox: this.$store.getters.GET_SEQUENCE_OVERFLOW_BOX,
      cutContent: false,
    }
  },
  created() {
    this.$store.commit('INCREMENT_SEQUENCE_OVERFLOW_BOX');
  },
  mounted() {
    //window.addEventListener('scroll',() => this.isShowPrompt = false);
    this.countRowStyle = '-webkit-line-clamp: ' + (document.getElementById(`box-overflow-${this.sequenceOverflowBox}`).getBoundingClientRect().height / 25) + ';';
    (document.getElementById(`box-full-${this.sequenceOverflowBox}`).getBoundingClientRect().height > document.getElementById(`box-overflow-${this.sequenceOverflowBox}`).getBoundingClientRect().height) ? this.cutContent = true : this.cutContent = false;
  },
  methods: {
    showFullContent() {
      this.isShowPrompt = !this.isShowPrompt;
      if (this.isShowPrompt == false) return;
      let parentContainer = document.getElementById(`box-overflow-${this.sequenceOverflowBox}`);
      let promptContainer = document.getElementById(`prompt-${this.sequenceOverflowBox}`);
      this.promptLocation = `left: ${parentContainer.getBoundingClientRect().left}px; top: ${parentContainer.getBoundingClientRect().top + (parentContainer.getBoundingClientRect().bottom - parentContainer.getBoundingClientRect().top)}px;`;
      promptContainer.innerText = parentContainer.innerText;
      setTimeout(() => promptContainer.focus(), 100);
      // setTimeout(() => this.isShowPrompt = false, 5000);
    },
    hideOverflow() {
      this.isShowPrompt = false;
    },
    scrollPrompt() {
      console.log('scroll');
    },
  },
}
</script>

<style lang="scss" scoped>
.box-overflow {
  width: inherit;
  height: inherit;
  text-align: inherit;
  overflow: hidden;
  &_cut {
    background: linear-gradient(180deg, rgba(0, 0, 0, 0.87) 60%, white 100%);
    background-clip: text;
    -webkit-text-fill-color: transparent;
  }
  &__button-full {
    display: flex;
    justify-content: flex-start;
    align-items: flex-end;
    height: 0px;
    background-clip: border-box;
    -webkit-text-fill-color: black;
    border: 0 solid blue;
    &-item {
      display: flex;
      justify-content: center;
      align-items: center;
      height: 15px;
      padding: 0px 10px;
      border: thin solid rgba(0, 0, 0, 0.12);
      border-radius: 15px;
      background-color: white; // #ECEFF1;
      &:hover { background-color: #BBDEFB; cursor: pointer; }
    }
  }
  &__prompt {
    position: fixed;
    width: 400px;
    padding: 5px 10px;
    -webkit-text-fill-color: black;
    border: thin solid rgba(0, 0, 0, 0.12);
    box-shadow: 1px 1px 3px black; //#FFF59D;
    border-radius: 5px;
    background-color: #FFF9C4;
    outline: none;
  }
  .box-full {
    &_cut {
      display: -webkit-box;
      -webkit-box-orient: vertical;
    }
  }
}
</style>