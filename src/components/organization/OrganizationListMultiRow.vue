<template>
  <div class="multi-table">
    <div class="multi-table__control">
      <v-select label="Количество столбцов (по умолчанию 4)"
                :items="columnCountList"
                filled
                danse
                v-model="columnCountSelected"></v-select>
    </div>
    <v-divider></v-divider>
    <div class="table">
      <div class="header">
        <div class="header__item"
             v-for="(item, index) in listFields" 
             :key="index"
             :style="columnHeaderWidth">
          {{ item.label }}
        </div>
      </div>
      <div class="body">          
        <div class="body__item"
             v-for="(itemI, indexI) in listItems" 
             :key="indexI">
          <div class="body__item-col" 
               v-for="(itemF, indexF) in listFields" 
               :key="indexF"
               :style="columnBodyWidth">
            {{ itemI[itemF.key] }}
          </div>
        </div>
      </div>
      <tbody class="body" 
             v-if="listItems.length == 0">
        <div class="body__item">Отсутствуют данные для отображения</div>
    </tbody>
    </div>
  </div>
</template>

<script>
export default {
  name: 'OrganizationListMultiRow',
  computed: {
    listFields() { return this.$store.getters.GET_LIST_FIELDS; },
    listItems() { return this.$store.getters.GET_LIST_DATA; },
    columnHeaderWidth() { return `min-width: calc(100% / ${this.columnCountSelected})`; },
    columnBodyWidth() { return `width: calc(100% / ${this.columnCountSelected})`; }
  },
  data() {
    return {
      columnCountList: [2,3,4,5,6],
      columnCountSelected: 4,
    }
  },
  created() {
    window.addEventListener('scroll', this.loadData);
  },
  updated() {
    window.addEventListener('scroll', this.loadData);
  },
  destroyed() { window.removeEventListener('scroll', this.loadData); },
  methods: {
    loadData() {
      if (document.getElementById('home').getBoundingClientRect().bottom < document.documentElement.clientHeight + 130) {
        window.removeEventListener('scroll', this.loadData);
        this.$store.dispatch('GET_LIST_DATA');
      }
    },
  },
}
</script>

<style lang="scss" scoped>


.multi-table {
  margin-top: 10px;
  margin-bottom: 10px;
  &__control {
    width: 300px;
    margin-left: 10px;
  }
  .table {
    .header {
      position: sticky;
      top: 0px;
      display: flex;
      justify-content: start;
      flex-wrap: wrap;
      padding-top: 10px;
      background-color: white;
      box-shadow: 0px 3px 0px grey;
      &__item {
        padding: 5px 15px;
        // min-width: calc(100% / 5);
        white-space: nowrap;
        color: rgba(0, 0, 0, 0.6);
        font-size: 0.8rem;
        font-weight: bold;
      }
    }
    .body {
      &__item {
        display: flex;
        justify-content: start;
        flex-wrap: wrap;
        background-color:  rgba(0, 0, 0, 0.1);
        &:nth-child(2n) { background-color:  whitesmoke; }
        &-col {
          padding: 5px 15px;
          // width: calc(100% / 5);
          font-size: 0.875rem;
          color: rgba(0, 0, 0, 0.87);
        }
      }
    }
  }
}
</style>