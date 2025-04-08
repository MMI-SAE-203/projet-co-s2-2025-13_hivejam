/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("pbc_3581422619")

  // add field
  collection.fields.addAt(3, new Field({
    "cascadeDelete": false,
    "collectionId": "pbc_3371280457",
    "hidden": false,
    "id": "relation4005479202",
    "maxSelect": 1,
    "minSelect": 0,
    "name": "game_jam",
    "presentable": false,
    "required": false,
    "system": false,
    "type": "relation"
  }))

  return app.save(collection)
}, (app) => {
  const collection = app.findCollectionByNameOrId("pbc_3581422619")

  // remove field
  collection.fields.removeById("relation4005479202")

  return app.save(collection)
})
