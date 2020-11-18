<template>
  <v-container>
    <v-row justify="space-between" class="cont">
      <v-col cols="auto">
        <v-btn @click="$emit('reset-filter')">Сбросить</v-btn>
      </v-col>
      <v-col cols="auto">
        <v-btn @click="$emit('accept-filter')">Применить</v-btn>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: 'FilerControl',
}
</script>

<style lang="scss" scoped>

</style>