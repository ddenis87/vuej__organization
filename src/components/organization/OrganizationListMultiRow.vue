<template>
  <div class="multi-table">
    <div class="table">
      <div class="header">
        <div class="header__item" v-for="(item, index) in listFields" :key="index">{{ item.text }}</div>
      </div>
      <div class="body">          
        <div class="body__item" v-for="(itemI, indexI) in listItems" :key="indexI">
          <div class="body__item-col" v-for="(itemF, indexF) in listFields" :key="indexF">{{ itemI[itemF.value] }}</div>
        </div>
      </div>
      <tbody class="body" v-if="listItems.length == 0">
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
    listItems() { return this.$store.getters.GET_LIST_ORGANIZATIONS; },
  },
  created() {
    this.$store.commit('SET_OPTIONS_REQUEST'); // НЕ ТРЕБУЕТСЯ ЕСЛИ НЕТ ПЕРЕКЛЮЧЕНИЯ МЕЖДУ КОМПОНЕНТАМИ
    this.$store.dispatch('GET_LIST_BK');
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
        this.$store.dispatch('GET_LIST_ORGANIZATIONS');
      }
    },
  },
}
</script>

<style lang="scss" scoped>
.multi-table {
  margin-top: 10px;
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
        min-width: calc(100% / 5);
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
          width: calc(100% / 5);
          font-size: 0.875rem;
          color: rgba(0, 0, 0, 0.87);
        }
      }
    }
  }
}
</style>