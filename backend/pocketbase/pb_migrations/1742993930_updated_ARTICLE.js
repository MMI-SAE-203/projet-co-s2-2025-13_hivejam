/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("pbc_2888601494")

  // remove field
  collection.fields.removeById("date1489170449")

  // add field
  collection.fields.addAt(3, new Field({
    "hidden": false,
    "id": "number1489170449",
    "max": null,
    "min": null,
    "name": "reading_time",
    "onlyInt": false,
    "presentable": false,
    "required": false,
    "system": false,
    "type": "number"
  }))

  return app.save(collection)
}, (app) => {
  const collection = app.findCollectionByNameOrId("pbc_2888601494")

  // add field
  collection.fields.addAt(3, new Field({
    "hidden": false,
    "id": "date1489170449",
    "max": "",
    "min": "",
    "name": "reading_time",
    "presentable": false,
    "required": false,
    "system": false,
    "type": "date"
  }))

  // remove field
  collection.fields.removeById("number1489170449")

  return app.save(collection)
})
