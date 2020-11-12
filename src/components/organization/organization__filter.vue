<template>
  <v-expansion-panels v-model="closeFilter">
    <v-expansion-panel>
      <v-expansion-panel-header>Фильтр</v-expansion-panel-header>
      <v-divider></v-divider>
      <v-expansion-panel-content>
        <v-form class="form-filter" ref="form">
          <v-container>
            <v-row>
              <v-col v-for="(item, index) in listFilter" :key="index" cols="12" class="select-item">
                <v-select :label="item.title" 
                          :items="item.values" 
                          item-text="title" 
                          item-value="value" 
                          v-model="valueFilter[item.key]"></v-select>
              </v-col>
            </v-row>
          </v-container>
          <v-container>
            <v-row justify="space-between" class="cont">
              <v-col cols="auto">
                <v-btn @click="resetForm">Сбросить фильтр</v-btn>
              </v-col>
              <v-col cols="auto">
                <v-btn @click="acceptFilter">Применить</v-btn>
              </v-col>
            </v-row>
          </v-container>
        </v-form>
      </v-expansion-panel-content>
    </v-expansion-panel>
  </v-expansion-panels>
</template>

<script>
export default {
  name: 'OrganizationFilter',
  computed: {
    listFilter() { return this.$store.getters.GET_LIST_FILTER; },
  },
  data() {
    return {
      valueFilter: {},
      closeFilter: null,
    }
  },
  created() {
    for (let item of this.listFilter) {
      this.valueFilter[item.key] = null;
    }
  },
  methods: {
    resetForm() {
      this.$refs.form.reset();
      this.closeFilter = null;
      this.$store.dispatch('GET_LIST_BK');
      this.$emit('reset-filter');
    },
    acceptFilter() {
      let stringFilter = '';
      for (let [key, value] of Object.entries(this.valueFilter)) {
        if (value) {
          stringFilter += `&${key}=${value}`;
        }
      }
      this.closeFilter = null;
      this.$emit('accept-filter', stringFilter);
    },
  }
}
</script>

<style lang="scss" scoped>
.form-filter {
  .select-item {
    padding: 2px;
    height: 54px;
  }
}
</style>