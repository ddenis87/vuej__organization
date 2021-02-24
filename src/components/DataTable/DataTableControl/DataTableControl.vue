<template>
  <div class="data-table-control">
    <v-toolbar height="40" flat>
      <!-- ACTIONS FOR TABLE -->
      <data-table-control-actions-table :table-name="tableName"
                                        :element-focused="focusedElementForm"
                                        :is-mount-table="isMountTable"
                                        @blur-element="elementFocusedClear"></data-table-control-actions-table>

      <v-divider vertical></v-divider>
      <data-table-control-actions-element :table-name="tableName"
                                          :element-focused="focusedElementForm"
                                          :is-mark-deleted-view="isMarkDeleted"
                                          @event-mark-deleted="eventMarkDeleted"
                                          @blur-element="elementFocusedClear"></data-table-control-actions-element>
 
      <v-divider vertical></v-divider>
      <el-button-icon icon="mdi-delete-variant"
                      :icon-color="(isMarkDeleted) ? 'blue' : ''"
                      @click="eventActionShowMarkDeleting">{{ (isMarkDeleted) ? 'Выйти из корзины' : 'Показать помеченные на удаление' }}</el-button-icon>

      <v-divider vertical></v-divider>
      <v-spacer></v-spacer>

      <!-- VIEW TABLE -->
      <data-table-control-view :type-height-number="typeHeightNumber"
                               :type-column="typeColumn"
                               :is-footer="isFooter"
                               :is-expansion="isExpansion"
                               :is-multiline="isMultiline"
                               :is-mount-table="isMountTable"
                               @toggle-type-row="$emit('toggle-type-row')"
                               @toggle-expansion="$emit('toggle-expansion')"
                               @toggle-type-column="$emit('toggle-type-column')"
                               @toggle-footer="$emit('toggle-footer')"
                               @toggle-multiline="$emit('toggle-multiline')"></data-table-control-view>
      <!-- FILTER TABLE -->
      <v-divider vertical></v-divider>
      <el-button-icon icon="mdi-filter-outline" 
                      :icon-color="(isFilterExtendedActive) ? 'blue' : ''"
                      :disabled="!isMountTable"
                      @click="isOpenFilterExtended = !isOpenFilterExtended">Фильтр</el-button-icon>
    </v-toolbar>

    <dialog-bar-right is-dialog-name="Фильтр"
                      :tableName="tableName"
                      :is-dialog-show="isOpenFilterExtended"
                      width="586"
                      @close-dialog="isOpenFilterExtended = false">
      <component :is="componentFilterExtended"
                 :table-name="tableName"
                 :is-open="isOpenFilterExtended"
                 @close-dialog="isOpenFilterExtended = false"
                 @accept="isOpenFilterExtended = false"></component>
    </dialog-bar-right>

    <v-snackbar light
                elevation="4"
                v-model="snackBar.show">
      <div class="snack">
        <v-icon small color="green darken-3" v-if="snackBar.status">mdi-check</v-icon>
        <v-icon small color="red darken-4" v-else>mdi-close</v-icon>
        {{ snackBar.text }}</div>
    </v-snackbar>
  </div>
</template>

<script>
import DialogFullPage from '@/components/Dialogs/DialogFullPage.vue';
import DialogBarRight from '@/components/Dialogs/DialogBarRight.vue';

import ElButtonIcon from '@/components/Elements/ElButtonIcon.vue';
import DataTableControlView from './DataTableControlView.vue';
import DataTableControlActionsTable from './DataTableControlActionsTable.vue';
import DataTableControlActionsElement from './DataTableControlActionsElement.vue';

export default {
  name: 'DataTableControl',
  components: {
    DialogFullPage,
    DialogBarRight,
    ElButtonIcon,
    DataTableControlView,
    DataTableControlActionsTable,
    DataTableControlActionsElement,
  },
  props: {
    focusedElement: null,
    formProperties: Object,

    typeHeightNumber: { type: Number, default: 0 },
    typeColumn: { type: String, default: 'fixed' },
    isFooter: { type: Boolean, default: false },
    isExpansion: { type: Boolean, default: false },
    isMultiline: { type: Boolean, default: false },
  },
  data() {
    return {
      focusedElementForm: null,
      isOpenFilterExtended: false,
      isMarkDeleted: false,
      typeHeight: ['fixed', 'dense', 'auto'],

      snackBar: {
        show: false,
        text: '',
        status: false,
      },
      
    }
  },
  computed: {
    isMountTable() { return (this.formProperties) ? true : false },
    tableName() { return (this.formProperties) ? this.formProperties.tableName : null },
    componentFilterExtended() {
      if (!this.formProperties?.tableName) return null;
      return () => import('@/components/DataFilter/DataFilterExtended/DataFilterExtended.vue')
    },
    isFilterExtendedActive() {
      return (this.formProperties) ? (this.$store.getters[`DataTable/GET_FILTER_EXTENDED`](this.formProperties.tableName) == '') ? false : true : false;
    },
  },
  watch: {
    focusedElement() { if (typeof(this.focusedElement) == 'object') this.focusedElementForm = (Object.keys(this.focusedElement).length != 0) ? this.focusedElement : null },
  },
  methods: {
    eventMarkDeleted(option) {
      this.focusedElementForm = null;
      console.log(option);
      this.snackBar = option;
      setTimeout(() => { this.snackBar.show = false; this.snackBar.text = '' }, 4000);
    },
    elementFocusedClear() {
      this.focusedElementForm = null;
    },
    eventActionShowMarkDeleting() {
      this.isMarkDeleted = !this.isMarkDeleted;
      this.$store.commit('DataTable/TOGGLE_FILTER_DEFAULT_IS_DELETED', {
        tableName: this.formProperties.tableName,
        value: this.isMarkDeleted,
      });
      this.focusedElementForm = null;
      this.$store.dispatch('DataTable/REQUEST_DATA', {tableName: this.formProperties.tableName});
    },
  },
}
</script>

<style lang="scss" scoped>
.data-table-control {
  .snack {
    display: inline-flex;
    justify-content: center;
    align-items: center;
    width: 100%;
  }
}
.dialog {
  &__title {
    color: white;
  }
  &__text {
    font-size: 1em;
    padding: 5px 0px;

    &_bold {
      text-indent: 10px;
      font-weight: bold;
    }
  }
}
::v-deep {
  .v-icon { margin-right: 0px; }
  .v-navigation-drawer--temporary {
    z-index: 9998;
  }
}
</style>