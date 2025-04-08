/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("pbc_850639752")

  // remove field
  collection.fields.removeById("file104153177")

  // add field
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

  // add field
  collection.fields.addAt(5, new Field({
    "hidden": false,
    "id": "file683577107",
    "maxSelect": 1,
    "maxSize": 2147483648,
    "mimeTypes": [
      "application/zip",
      "application/vnd.microsoft.portable-executable"
    ],
    "name": "file_dl",
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

  // add field
  collection.fields.addAt(4, new Field({
    "hidden": false,
    "id": "file104153177",
    "maxSelect": 99,
    "maxSize": 2147483648,
    "mimeTypes": [],
    "name": "files",
    "presentable": false,
    "protected": false,
    "required": false,
    "system": false,
    "thumbs": [],
    "type": "file"
  }))

  // remove field
  collection.fields.removeById("file982169288")

  // remove field
  collection.fields.removeById("file683577107")

  return app.save(collection)
})
