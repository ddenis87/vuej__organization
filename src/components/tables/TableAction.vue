<template>
  <div class="action-box" id="active-box" :style="positionLeft">
    <div class="action-box__toolbar">
      <v-btn class="toolbar__item" icon x-small @click="clickButtonPrint">
        <v-icon>mdi-printer</v-icon>
      </v-btn>
      <v-btn class="toolbar__item" icon x-small @click="clickButtonCopy">
        <v-icon>mdi-content-copy</v-icon>
      </v-btn>
      <v-btn class="toolbar__item" icon x-small @click="clickButtonDelete">
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
    positionLeft() { return `left: -${this.widthActionBox}px;`; },
  },
  data() {
    return {
      widthActionBox: 0,
    }
  },
  mounted() {
    this.widthActionBox = document.getElementsByClassName('action-box')[0].getBoundingClientRect().right - document.getElementsByClassName('action-box')[0].getBoundingClientRect().left;
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
  box-sizing: border-box;
  opacity: 0;
  transition: opacity .3s;

  &__toolbar {
    display: flex;
    padding: 10px 10px;
    background-color: white;
    border-radius: 5px 0px 0px 5px;
    box-shadow: -1px 0px 5px 0px #C1C1C1;
    box-sizing: border-box;
    .toolbar__item {
      margin: 0px 5px;
    }
  }
}
</style>