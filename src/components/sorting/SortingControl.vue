<template>
  <v-container>
    <v-row>
      <v-col cols="12">
          <v-btn @click="$emit('sorting-accept')">Применить</v-btn>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: 'SortingControl',
}
</script>