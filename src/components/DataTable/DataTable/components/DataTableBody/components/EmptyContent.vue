<template>
  <dialog-modal is-dialog-name="Сообщение"
                :is-dialog-show="isOpenDialogModal"
                @close-dialog="closeDialogModal">
    По заданным условиям записи отсутствуют
  </dialog-modal>
</template>

<script>
import DialogModal from '@/components/Dialogs/DialogModal.vue';
export default {
  name: 'EmptyContent',
  components: {
    DialogModal,
  },
  props: {
    tableName: { type: String, defalut: null },
    guid: { type: String, default: null },
  },
  data() {
    return {
      isOpenDialogModal: false,
      isTimerBeforeShowMessage: null,
    }
  },
  computed: {
    countData() {
      return this.$store.getters[`DataTable/GET_DATA`]({
        tableName: this.tableName,
        guid: this.guid,
      }).length;
    },
    isSetFilterExtend() {
      return this.$store.getters[`DataTable/GET_FILTER_EXTENDED`]({
        tableName: this.tableName,
        guid: this.guid,
      });
    },
  },
  watch: {
    countData() {
      clearTimeout(this.isTimerBeforeShowMessage);
      this.isTimerBeforeShowMessage = setTimeout(() => {
        console.log()
        if (this.countData == 0 && this.isSetFilterExtend != null) this.isOpenDialogModal = true;
        else this.isOpenDialogModal = false;
      }, 1400);
    },
  },
  methods: {
    closeDialogModal() {
      this.isOpenDialogModal = false;
    },
  }
}
</script>