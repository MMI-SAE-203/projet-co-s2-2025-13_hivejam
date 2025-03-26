/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("pbc_3371280457")

  // remove field
  collection.fields.removeById("date2254405824")

  // add field
  collection.fields.addAt(8, new Field({
    "hidden": false,
    "id": "number2254405824",
    "max": null,
    "min": null,
    "name": "duration",
    "onlyInt": false,
    "presentable": false,
    "required": false,
    "system": false,
    "type": "number"
  }))

  return app.save(collection)
}, (app) => {
  const collection = app.findCollectionByNameOrId("pbc_3371280457")

  // add field
  collection.fields.addAt(6, new Field({
    "hidden": false,
    "id": "date2254405824",
    "max": "",
    "min": "",
    "name": "duration",
    "presentable": false,
    "required": false,
    "system": false,
    "type": "date"
  }))

  // remove field
  collection.fields.removeById("number2254405824")

  return app.save(collection)
})
