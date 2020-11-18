<template>
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
        <sorting-control @sorting-accept="sortingAccept"></sorting-control>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import SortingControl from './SortingControl.vue';

export default {
  name: 'SortingSection',
  components: {
    SortingControl,
    },
  data() {
    return {
      listFields: this.$store.getters.GET_LIST_FIELDS,
    }
  },
  methods: {
    sortingAccept() {
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
  }
}
</script>

<style lang="scss" scoped>
.block-sort {
  width: 450px;
  .sort-title {
    display: flex;
    justify-content: center;
  }
}
</style>