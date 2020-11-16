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
                <v-select :label="item.label" 
                          :items="item.choices" 
                          item-text="display_name" 
                          item-value="value" 
                          v-model="valueFilter[item.key]"></v-select>
              </v-col>
            </v-row>
          </v-container>
        </v-form>
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
      </v-expansion-panel-content>
    </v-expansion-panel>
    <v-expansion-panel>
      <v-expansion-panel-header>Сортировка</v-expansion-panel-header>
      <v-divider></v-divider>
      <v-expansion-panel-content class="block-dark">
        <v-container >
          <v-row justify="space-between">
            <v-col cols="auto">
              <v-sheet class="block-sort">
                <v-list dense>
                  <v-list-item v-for="(item, index) in listFields" :key="index">
                    <v-btn color="error" fab small icon @click="moveDown(index)" :key="`btnDown${index}`"><v-icon>mdi-chevron-down</v-icon></v-btn>
                    <v-list-item-content class="sort-title">{{ item.label }}</v-list-item-content>
                    <v-btn color="primary" fab small icon @click="moveUp(index)" :key="`btnUp${index}`"><v-icon>mdi-chevron-up</v-icon></v-btn>
                  </v-list-item>
                </v-list>
              </v-sheet>
            </v-col>
            <v-col cols="auto">
              <v-btn @click="acceptSort">Применить</v-btn>
            </v-col>
          </v-row>
        </v-container>
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
      listFields: this.$store.getters.GET_LIST_FIELDS,
    }
  },
  created() {
    for (let item of this.listFilter) {
      this.valueFilter[item.key] = null;
    }
  },
  methods: {
    acceptSort() {
      this.$store.commit('SET_LIST_FIELDS', this.listFields);
      this.closeFilter = null;
    },
    moveUp(index) {
      if (index != 0) {
        let listFieldsSort = [];
        listFieldsSort.push(...this.listFields);
        let tempVar = listFieldsSort[index];
        listFieldsSort[index] = listFieldsSort[index - 1];
        listFieldsSort[index - 1] = tempVar;
        this.listFields = listFieldsSort;
      }
    },
    moveDown(index) {
      if (index != this.listFields.length - 1) {
        let listFieldsSort = [];
        listFieldsSort.push(...this.listFields);
        let tempVar = listFieldsSort[index];
        listFieldsSort[index] = listFieldsSort[index + 1];
        listFieldsSort[index + 1] = tempVar;
        this.listFields = listFieldsSort;
      }
    },
    resetForm() {
      this.$refs.form.reset();
      this.closeFilter = null;
      this.$store.commit('SET_OPTIONS_REQUEST');
      this.$store.dispatch('GET_LIST_OPTIONS');
      this.$emit('reset-filter');
    },
    acceptFilter() {
      let stringFilter = '';
      let optionRequest = {};
      for (let [key, value] of Object.entries(this.valueFilter)) {
        if (value) {
          stringFilter += `&${key}=${value}`;
        }
      }
      optionRequest.stringFilter = stringFilter;
      this.closeFilter = null;
      this.$store.commit('SET_OPTIONS_REQUEST', optionRequest);
      this.$store.commit('CLEAR_LIST_DATA');
      this.$store.dispatch('GET_LIST_DATA');
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
.block-dark { background-color: lightgrey; }
.block-sort {
  width: 450px;
  .sort-title {
    display: flex;
    justify-content: center;
  }
}
</style>