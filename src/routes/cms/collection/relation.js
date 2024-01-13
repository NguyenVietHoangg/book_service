export const list = (data) => {
  const rl = [
    {
      name: 'collection',
      attributes: ['id', 'name', 'slug'],
      where: {},
      required: false
    },
    {
      name: 'collection',
      attributes: ['id', 'name', 'slug'],
      where: {},
      required: false
    },
    {
      name: 'tag',
      attributes: ['id', 'name', 'slug'],
      where: {},
      required: false
    },
    {
      name: 'collection_collection',
      attributes: ['id'],
      where: {},
      require: true
    },
    {
      name: 'collection_collection',
      attributes: ['id'],
      where: {},
      require: true
    },
    {
      name: 'tag_collection',
      attributes: ['id'],
      where: {},
      require: true
    },
  ]
  if (data.collectionId) {
    rl[0].where.id = parseInt(data.collectionId)
    rl[0].required = true
  }
  if (data.collectionId) {
    rl[1].where.id = parseInt(data.collectionId)
    rl[1].required = true
  }
  if (data.tagId) {
    rl[1].where.id = parseInt(data.tagId)
    rl[1].required = true
  }
  return rl
}

export const list1 = (data={}) => {
  const rl = [
    {
      name: 'collection',
      attributes: ['id', 'name', 'slug'],
      where: {},
      required: false
    },
    {
      name: 'collection',
      attributes: ['id', 'name', 'slug'],
      where: {},
      required: false
    },
    {
      name: 'tag',
      attributes: ['id', 'name', 'slug'],
      where: {},
      required: false
    }
  ]
  if (data.collectionId) {
    rl[0].where.id = parseInt(data.collectionId)
    rl[0].required = true
  }
  if (data.collectionId) {
    rl[1].where.id = parseInt(data.collectionId)
    rl[1].required = true
  }
  if (data.tagId) {
    rl[1].where.id = parseInt(data.tagId)
    rl[1].required = true
  }
  return rl
}
