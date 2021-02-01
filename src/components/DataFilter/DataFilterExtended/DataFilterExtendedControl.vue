<template>
  <div class="control">
      <!-- <v-spacer></v-spacer> -->
      <v-btn class="control__btn" color="blue darken-1" dark depressed small height="26">Применить</v-btn>
      <v-btn class="control__btn" color="blue darken-1" dark depressed small height="26">Отменить</v-btn>
  </div>
</template>

<script>
export default {
  name: 'DataFilterExtendedControl',

}
</script>

<style lang="scss" scoped>
.control {
    grid-area: control;
    display: flex;
    justify-content: flex-end;
    align-items: center;
    padding-right: 16px;
    // border-top: thin solid rgba(0,0,0,.12);
    &__btn {
      margin-left: 16px;
    }
  }
</style>