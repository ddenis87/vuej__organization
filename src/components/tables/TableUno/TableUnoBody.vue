<template>
  <div class="table-body">
    <div v-for="(itemRow, indexRow) in listData"
         :key="`bodyRow-${indexRow}`"
         class="table-body__row"
         :class="`table-body__row_${heightType}`"
         :style="fieldsTemplate">
      <div v-for="(itemCol, indexCol) in listDataHeader" 
           :key="`bodyCol-${indexCol}`" 
           class="table-body__col"
           :class="`table-body__col_${heightType}`" 
           :style="itemCol.position"
           :tabindex="(!itemCol['read_only']) ? +indexCol: (-1 * (+indexCol + 1))">

        <slot :name="`${itemCol.value}`" v-bind:itemValue="itemRow[itemCol.value]">
          <!-- <table-uno-body-edit class="display-none"
                               :list-props="editProps"></table-uno-body-edit> -->

          <table-uno-overflow :content="itemRow[itemCol.value]"
                              @show-tooltip="(event) => $emit('show-tooltip', event)">
            <span class="content" :class="`content_${heightType}`" :style="`text-align: ${itemCol.align}`" disabled @dblclick="(event) => editCell(event, itemCol, itemRow[itemCol.value])" @mousedown="() => {return false}">
              {{ itemRow[itemCol.value] }}
            </span>
          </table-uno-overflow>
        </slot>

      </div>
      <div class="table-body__col-action">
        <slot name="action" v-bind:activeValue="itemRow['title']"></slot>
      </div>
    </div>
    
  </div>
</template>

<script>
import Vue from 'vue';
import TableUnoOverflow from './TableUnoOverflow.vue';
import TableCellEdit from './TableCellEdit.vue';

export default {
  name: 'TableUnoBody',
  components: {
    TableUnoOverflow,
    // TableUnoBodyEdit,
  },  
  mixins: [
  ],
  props: {
    listData: Array,
    listDataHeader: Array,
    fieldsTemplate: Object,
    heightType: {type: String, default: 'fixed'},
    parentId: String,
  },
  data() {
    return {
      // editCellShow: false,
      // editProps: {},
      cellEditProps: {type: 'string', value: 'null', choices: null},
      cellEditComponent: null,
      vueCellEdit: Vue.extend(TableCellEdit),
    }
  },
  create() {
  },
  mounted() {
  },
  methods: {
    editCell(event, itemColumn, itemValue) {
      let cellEditParent = event.target.parentElement.parentElement;
      if (itemColumn['read_only'] == true) {
        cellEditParent.classList.add('table-body__col_disabled');
        cellEditParent.blur();
        setTimeout(() => cellEditParent.classList.remove('table-body__col_disabled'), 1000)
        return;
      }
      this.cellEditProps.value = event.target.innerText;
      this.cellEditProps.type = itemColumn.type;
      if (itemColumn.choices) this.cellEditProps.choices = itemColumn.choices;
      this.cellEditComponent = new this.vueCellEdit({  propsData: {listProps: this.cellEditProps} }).$mount();  
      cellEditParent.prepend(this.cellEditComponent.$el);
      if (itemColumn.type != 'choice' && itemColumn.type != 'nested object') 
        event.target.parentElement.parentElement.querySelector('.box-edit').firstElementChild.select();
      cellEditParent.querySelector('.box-edit').firstElementChild.focus();
    } // plug

    // editCell(event, itemColumn, value) {
    //   // console.log(itemColumn);
    //   let parentElement = event.target.parentElement.parentElement;
    //   if (itemColumn['read_only'] == true) {
    //     parentElement.classList.add('table-body__col_disabled');
    //     parentElement.blur();
    //     setTimeout(() => parentElement.classList.remove('table-body__col_disabled'), 1000)
    //     return;
    //   }
    //   this.editProps = {
    //     required: itemColumn.required,
    //     value: event.target.innerText,
    //     type: itemColumn.type,
    //     text: itemColumn.text,
    //     choices: itemColumn.choices
    //   };
    //   parentElement.classList.add('table-body__col_focus');
    //   parentElement.querySelector('.box-overflow').classList.add('display-none');
    //   parentElement.querySelector('.box-edit').classList.remove('display-none');
    //   setTimeout(() => {
    //     // console.log(event.target.parentElement.parentElement.querySelector('.box-edit').firstElementChild);
    //     if (itemColumn.type != 'choice' && itemColumn.type != 'nested object') event.target.parentElement.parentElement.querySelector('.box-edit').firstElementChild.select()
    //     event.target.parentElement.parentElement.querySelector('.box-edit').firstElementChild.focus();
    //     ;
    //   }, 100);
    // },
  },
}
</script>

<style lang="scss" scoped>
@import 'TableUno';

.table-body {
  &__row {
    display: grid;
    border-bottom: $bodyRowBorder;

    &_fixed { grid-auto-rows: $bodyRowHeight;       }
    &_dense { grid-auto-rows: $bodyDenseRowHeight;  }
    &_auto  { grid-auto-rows: $bodyAutoRowHeight;   }

    &:hover > .table-body__col { background-color: $bodyRowBackgroundColorHover;}
    &:hover > .table-body__col-action > .action-box { opacity: 1; }
    
    .table-body__col {
      position: relative;
      display: inline-flex;
      justify-content: $bodyHorizontalAlign;
      align-items: $bodyVerticalAlign;

      font-size: $bodyFontSize;
      font-weight: $bodyFontWeight;
      line-height: $bodyFontLineHeight;
      color: $bodyFontColor;

      border: thin solid rgba(0, 0, 255, 0);
      background-color: $bodyRowBackgroundColor;
      transition-delay: .1s;
      overflow: hidden;
      box-sizing: border-box;
      outline: none;

      &:focus { border: $bodyCellBorderFocus }

      &_disabled { border: thin solid rgba(255, 0, 0, .8) }

      &_fixed { padding: $bodyPaddingTB $bodyPaddingLR;           }
      &_dense { padding: $bodyDensePaddingTB $bodyDensePaddingLR; }
      &_auto  { padding: $bodyAutoPaddingTB $bodyAutoPaddingLR;   }


      // &_focus {
      //   // border: thin solid lightblue;
      //   border-radius: 0px;
      //   background-color: #FFFFFF;
      // }
      

      

      // .display-none { display: none;  }
      .content {
        width: 100%;
        -webkit-user-select: none;
        &_fixed {
          display: -webkit-box;
          -webkit-box-orient: vertical;
          -webkit-line-clamp: 2;
          text-overflow: ellipsis;
          overflow: hidden;
        }
        &_dense {
          white-space: nowrap;
          text-overflow: ellipsis;
          overflow: hidden;
        }
        &_auto {
          text-overflow: ellipsis;
          overflow: hidden;
        }
      }

      &-action {
        position: sticky;
        right: 0px;
        grid-area: action_box;
      }
    }
  }
}
</style>