# vuej__organization

# Files:
#
# TableUno
#   mixins
#     TableUno
#       BuildingTemplate.js
#       GetterData.js
#       LoadData.js
#       Tooltip.js
#     TableUnoBody
#       TableCellEdit.js
#   TableCellEdit.vue
#   TableUno.vue
#   TableUnoHead.vue
#   TableUnoBody.vue
#   TableOverfolow.vue

# Used
# import TableUno from '@/components/TableUno/TableUno.vue';
#
# <table-uno d-id="yourIdElement" :table-properties="tableProperties" dense></table-uno>

# Props
# d-id - Id element in DOM
# Use one of three properties to set type line heights: fixed, dense or auto (default: fixed)
#
# table-properties: Object
#   state: Object (getters, mutations and actions)
#     {
#       progress: String,       // getter status load return Boolean
#       init: String            // action basic initial
#       header: Object
#         {
#           getData: String     // getter data header table
#         }
#       body: Object
#         {
#           getData: String     // getter data body table
#           loadData: String    // action load data from server
#         }
#     }
#   header: Array object
#     [
#       {
#         value: String,           // required
#         fixed: Boolean,          // fixed column, default no property - false
#         align: String,           // align content in cell start, end or center, default left
#         width: Array [min, max]  // if min = null 
#       }
#     ]