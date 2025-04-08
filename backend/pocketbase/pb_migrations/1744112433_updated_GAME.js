/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("pbc_850639752")

  // update field
  collection.fields.addAt(4, new Field({
    "hidden": false,
    "id": "file982169288",
    "maxSelect": 1,
    "maxSize": 2147483648,
    "mimeTypes": [
      "application/zip"
    ],
    "name": "file_web",
    "presentable": false,
    "protected": false,
    "required": false,
    "system": false,
    "thumbs": [],
    "type": "file"
  }))

  return app.save(collection)
}, (app) => {
  const collection = app.findCollectionByNameOrId("pbc_850639752")

  // update field
  collection.fields.addAt(4, new Field({
    "hidden": false,
    "id": "file982169288",
    "maxSelect": 1,
    "maxSize": 2147483648,
    "mimeTypes": [
      "application/zip",
      "application/x-rar-compressed"
    ],
    "name": "file_web",
    "presentable": false,
    "protected": false,
    "required": false,
    "system": false,
    "thumbs": [],
    "type": "file"
  }))

  return app.save(collection)
})
