<template>
  <div class="action-box" id="active-box" :style="positionLeft">
    <div class="action-box__toolbar">
      <v-btn class="toolbar__item" icon @click="clickButtonPrint">
        <v-icon>mdi-printer</v-icon>
      </v-btn>
      <v-btn class="toolbar__item" icon @click="clickButtonCopy">
        <v-icon>mdi-content-copy</v-icon>
      </v-btn>
      <v-btn class="toolbar__item" icon @click="clickButtonDelete">
        <v-icon>mdi-delete</v-icon>
      </v-btn>
    </div>
  </div>
</template>

<script>
export default {
  name: 'TableAction',
  props: {
    activeValue: NaN,
  },
  computed: {
    positionLeft() { return ''; } //`left: -${this.widthActionBox}px;`; },
  },
  data() {
    return {
      widthActionBox: 0,
    }
  },
  mounted() {
    let actionBox = document.getElementsByClassName('action-box')[0].getBoundingClientRect();
    this.widthActionBox = actionBox.right - actionBox.left;
  },
  methods: {
    clickButtonPrint() {
      alert('I`m PRINT ' + this.activeValue.activeValue);
    },
    clickButtonCopy() {
      alert('I`m COPY ' + this.activeValue.activeValue);
    },
    clickButtonDelete() {
      alert('I`m DELETE ' + this.activeValue.activeValue);
    },
  },
}
</script>

<style lang="scss" scoped>
.action-box {
  position: relative;
  display: inline-flex;
  align-items: center;
  height: 100%;
  opacity: 0;
   background-color: rgb(240, 240, 240);
  // background-image: linear-gradient(-90deg, white 95%, rgba(0,0,0,0) 100%);
  transition-delay: .1s;
  &__toolbar {
    position: absolute;
    right: 0px;
    display: flex;
    height: 100%;
    background-color: rgb(240, 240, 240); 
    // background-image: linear-gradient(-90deg, white 92%, rgba(0,0,0,0) 100%);
    // background-color: rgb(240, 240, 240);
    box-sizing: border-box;
    .toolbar__item {
      &:first-child {
        margin-left: 10px;
      }
    }
  }
}
</style>