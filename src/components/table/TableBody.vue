<template>
  <tbody class="body">
    <tr class="body__row" v-for="(itemI, indexI) in listItemRow" :key="indexI">
      <td class="body__col" v-for="(itemF, indexF) in listItemColumn" :key="indexF">{{ itemI[itemF.key] }}</td>
    </tr>
  </tbody>
</template>

<script>
export default {
  name: 'TableBody',
  props: {
    listItemColumn: Array,
    listItemRow: Array,
  }
}
</script>

<style lang="scss" scoped>
.body {
  font-size: 0.875rem;
  padding: 0 16px;
  color: rgba(0, 0, 0, 0.87);
  &__row {
    background-color:  rgba(0, 0, 0, 0.1);
    &:nth-child(2n) { background-color:  whitesmoke; }
  }
  &__col {
    padding: 3px 16px;
  }
}
</style>