import DataTableControl from '@/components/DataTable/DataTableControl/DataTableControl.vue';

export const Page = {
  components: {
    DataTableControl,
  },
  methods: {
    tableMount(data) {
      console.log(data);
    },
  },
}