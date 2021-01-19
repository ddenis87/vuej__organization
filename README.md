#### Dependencies:
```sh
    "axios": "^0.21.0",
    "core-js": "^3.6.5",
    "vue": "^2.6.11",
    "vue-router": "^3.2.0",
    "vuetify": "^2.2.11",
    "vuex": "^3.4.0"
```
#### devDependencies:
```sh
    "@vue/cli-plugin-babel": "~4.5.0",
    "@vue/cli-plugin-router": "~4.5.0",
    "@vue/cli-plugin-vuex": "~4.5.0",
    "@vue/cli-service": "~4.5.0",
    "sass": "^1.26.5",
    "sass-loader": "^8.0.2",
    "vue-cli-plugin-vuetify": "~2.0.7",
    "vue-template-compiler": "^2.6.11",
    "vuetify-loader": "^1.3.0"
```
#### Vue component:
```sh
<templates>
    <data-table d-id="yourIdElement" :table-properties="tableProperties" dense></ata-table>
</templates>
<script>
    import DataTable from '@/components/Table/DataTable/DataTable.vue';
</script>
```