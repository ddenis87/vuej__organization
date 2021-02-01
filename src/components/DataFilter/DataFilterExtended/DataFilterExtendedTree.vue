<template>
  <div class="tree">
      
    <div class="tree-control">
      <v-btn color="blue darken-1" dark depressed small height="26" @click="selectedField">Добавить</v-btn>
    </div>
    <div class="tree-title">
      <v-subheader>Доступные поля</v-subheader>
    </div>
    <div class="tree-box">
      <div class="tree-box__tree">
        <v-treeview dense
                  hoverable
                  activatable
                  return-object
                  :items="treeList"
                  :item-key="'key'"
                  :item-text="'label'"
                  :active.sync="fieldSelected"
                  :load-children="loadTreeListChildren"></v-treeview>
      </div>
      
    </div>
    
  </div>
</template>

<script>
export default {
  name: 'DataFilterExtendedTree',
  props: {
    tableName: { type: String, default: null, },
  },
  data() {
    return {
      open: [],
      fieldSelected: [],
      treeListChildren: [],
      // treeItemSelected: [],
    }
  },
  computed: {
    treeList() {
      let treeListArray = [];
      let treeList = this.$store.getters[`DataTable/GET_OPTIONS`](this.tableName);
      for (let key of Object.keys(treeList)) {
        treeListArray.push(Object.assign({key: key}, treeList[key], ('related_model_name' in treeList[key]) ? {children: this.treeListChildren} : {}));
      }
      console.log(treeListArray);
      console.log(treeList);
      return treeListArray;
    },
  },
  // watch: {
  //   fieldSelected() {
  //     console.log(this.fieldSelected);
  //   },
  // },
  methods: {
    async loadTreeListChildren(item) {
      await this.$store.dispatch('DataTable/REQUEST_OPTIONS_ONLY', { tableName: item['related_model_name'] })
        .then(response => {
          let treeListChildren = this.$store.getters[`DataTable/GET_OPTIONS`](item['related_model_name']);
          for (let key of Object.keys(treeListChildren)) {
            item.children.push(Object.assign({key: key}, treeListChildren[key], ('related_model_name' in treeListChildren[key]) ? {children: this.treeListChildren} : {}));
          }
        })
        .catch((error) => {
          console.log(error);
        })
    },
    selectedField() {
      this.$emit('selected-field', this.fieldSelected[0]);
      this.fieldSelected = [];
    },
  }
}
</script>

<style lang="scss" scoped>
@import './DataFilterExtended.scss';
.tree {
    grid-area: tree;
    display: grid;
    grid-template-areas: "tree-control" "tree-title" "tree-box";
    grid-template-columns: 1fr;
    grid-template-rows: 40px 32px 1fr;
    
    height: calc(100vh - 105px);
    
    &-control {
      grid-area: tree-control;
      display: flex;
      justify-content: left;
      align-items: center;
      padding-left: 16px;
      // border: thin solid green;
    }
    &-title {
      grid-area: tree-title;
      border: thin solid rgba(0,0,0,.12);
      border-bottom: 0px;
      text-transform: uppercase;
      
      .v-subheader { height: 30px; font-weight: bold; }
    }

    &-box {
      grid-area: tree-box;
      overflow: auto;
      border: thin solid rgba(0,0,0,.12);

      &::-webkit-scrollbar {
        width: $scrollWidth;
        height: $scrollHeight;
        border-radius: $scrollBorderRadius;
        &-thumb {
          border-radius: $scrollThumbBorderRadius;
          background-color: $scrollThumbBackgroundColor;
        }
      }
      &__tree {
        display: inline-block;
        min-width: 100%;
      }
    }
    
  }
</style>