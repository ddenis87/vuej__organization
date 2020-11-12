<template>
  <table class="table-list" v-if="true">
    <thead class="header">
      <tr class="header__row">
        <th class="header__col" v-for="(item, index) in listFields" :key="index">{{ item.text }}</th>
      </tr>
    </thead>
    <tbody class="body">
      <tr class="body__row" v-for="(itemI, indexI) in listItems" :key="indexI">
        <td class="body__col" v-for="(itemF, indexF) in listFields" :key="indexF">{{ itemI[itemF.value] }}</td>
      </tr>
    </tbody>
    <tbody class="body" v-if="listItems.length == 0">
      <tr class="body__row">
        <td class="body__col" :colspan="listFields.length">Отсутствуют данные для отображения</td>
      </tr>
    </tbody>
  </table>
</template>

<script>
export default {
  name: 'OrganizationList',
  props: {
    listFields: Array,
    listItems: Array,
  }
}
</script>

<style lang="scss" scoped>
.table-list {
  position: relative;
  width: 100%;
  margin-top: 10px;
  border-collapse: collapse;
  .header {
    position: sticky;
    top: 0px;
    height: 80px;
    background-color: white;
    padding-top: 10px;
    color: rgba(0, 0, 0, 0.6);
    font-size: 0.8rem;
    box-shadow: 0px 3px 1px grey;
    &__col {
      padding: 5px 15px;
      white-space: nowrap;
    }
  }
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
}
@media screen and (max-width: 1440px) {
  .table-list {
    .header {
      &__col { white-space: pre-wrap; }
    }
  }
}
</style>