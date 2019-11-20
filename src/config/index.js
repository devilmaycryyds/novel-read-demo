const schema = require('@/blocks/schema.json');
export default {
  "pages": [
    {
      "type": "Module",
      "properties": {
        "padding": {
          "type": "String",
          "value": ""
        }
      },
      "children": [
        schema
      ]
    }
  ]
}