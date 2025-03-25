/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("pbc_979555228")

  // add field
  collection.fields.addAt(3, new Field({
    "cascadeDelete": false,
    "collectionId": "pbc_979555228",
    "hidden": false,
    "id": "relation2490651244",
    "maxSelect": 999,
    "minSelect": 0,
    "name": "comment",
    "presentable": false,
    "required": false,
    "system": false,
    "type": "relation"
  }))

  return app.save(collection)
}, (app) => {
  const collection = app.findCollectionByNameOrId("pbc_979555228")

  // remove field
  collection.fields.removeById("relation2490651244")

  return app.save(collection)
})
