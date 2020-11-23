<template>
  <div class="btn-up">
    <v-btn class="btn-up__item" icon @click="$emit('go-up')">
      <v-icon medium color="blue" >mdi-chevron-up</v-icon>
    </v-btn>
  </div>
</template>

<script>
export default {
  name: 'TableMultilineBodyBtnUp',
  // data() {
  //   return {
  //     btnUp: true,
  //   }
  // },
  // mounted() {
  //   document.getElementById('table-uno').addEventListener('scroll', this.showBtnUp);
  // },
  // methods: {
  //   showBtnUp() {
  //     // (document.getElementById('body').getBoundingClientRect().top < 10) ? this.btnUp = true : this.btnUp = false;
  //   },
  //   goUp() {
  //     document.getElementById('table-uno').scrollTo(0,0);
  //   }
  // }
}
</script>

<style lang="scss" scoped>

.btn-up {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 35px;
  &:hover {
    background-color: rgba(0, 0, 0, 0.1);
  }
}
</style>