/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("pbc_3581422619")

  // add field
  collection.fields.addAt(2, new Field({
    "cascadeDelete": false,
    "collectionId": "pbc_1139167521",
    "hidden": false,
    "id": "relation1384045349",
    "maxSelect": 999,
    "minSelect": 0,
    "name": "task",
    "presentable": false,
    "required": false,
    "system": false,
    "type": "relation"
  }))

  return app.save(collection)
}, (app) => {
  const collection = app.findCollectionByNameOrId("pbc_3581422619")

  // remove field
  collection.fields.removeById("relation1384045349")

  return app.save(collection)
})
