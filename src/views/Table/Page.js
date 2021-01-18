import DataTableControl from '@/components/Table/DataTableControl/DataTableControl.vue';

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