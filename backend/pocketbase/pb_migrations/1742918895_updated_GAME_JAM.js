/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("pbc_3371280457")

  // add field
  collection.fields.addAt(8, new Field({
    "cascadeDelete": false,
    "collectionId": "pbc_850639752",
    "hidden": false,
    "id": "relation4280494897",
    "maxSelect": 999,
    "minSelect": 0,
    "name": "games",
    "presentable": false,
    "required": false,
    "system": false,
    "type": "relation"
  }))

  return app.save(collection)
}, (app) => {
  const collection = app.findCollectionByNameOrId("pbc_3371280457")

  // remove field
  collection.fields.removeById("relation4280494897")

  return app.save(collection)
})
