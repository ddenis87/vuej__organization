# TableUno
## Files:
    - TableUno
        - mixins
            - TableUno
                - BuildingTemplate.js
                - GetterData.js
                - LoadData.js
                - Tooltip.js
            - TableUnoBody
                - TableCellEdit.js
        - TableCellEdit.vue
        - TableUno.vue
        - TableUnoHead.vue
        - TableUnoBody.vue
        - TableOverfolow.vue
        - TableUno.scss
## Used
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
    <table-uno d-id="yourIdElement" :table-properties="tableProperties" dense></table-uno>
</templates>
<script>
    import TableUno from '@/components/TableUno/TableUno.vue';
</script>
```

# Props
 - ##### d-id, Id element in DOM
 - ##### Use one of three properties to set type line heights: fixed, dense or auto (default: fixed)
 - ##### table-properties:
```
table-properties: {
    state: {                    //(getters, mutations and actions)
        progress: String,       // getter status load return Boolean
        init: String            // action basic initial
        header: {
            getData: String     // getter data header table
        }
        body: {
            getData: String     // getter data body table
            loadData: String    // action load data from server
        }
    }
    header: [
        {
            value: String,          // required
            fixed: Boolean,         // fixed column, default no property - false
            align: String,          // align content in cell start, end or center, default left
            width: Array            // min, max width
        }
    ]
    activeField: String             // key header, value field for use in slot
}