import * as db from '../database/models'

export const syncContenRefItem = async (id) => {
  const item = await db.story.findOne({
    attributes: ['id'],
    where: {
      id: id,
    },
    include: [
      {
        model: db.category,
        attributes: ['id', 'name', 'slug']
      },
      {
        model: db.collection,
        attributes: ['id', 'name', 'slug'],
      },
      {
        model: db.tag,
        attributes: ['id', 'name', 'slug'],
      },
    ]
  })
  if (!item) {
    return;
  }
  const totalChapter = await db.chapter.count({
    attributes: ['id', 'name', 'slugUnique'],
    where: {
      storyId: id
    }
  })
  const firstChapter = await db.chapter.findOne({
    attributes: ['id', 'name', 'slugUnique'],
    where: {
      storyId: id
    },
    order: [
      ['id', 'asc']
    ]
  })
  const lastChapter = await db.chapter.findOne({
    attributes: ['id', 'name', 'slugUnique'],
    where: {
      storyId: id
    },
    order: [
      ['id', 'desc']
    ]
  })
  const categories = item.categories.map(item => {
    return {
      id: item.id,
      name: item.name,
      slug: item.slug
    }
  })
  const collections = item.collections.map(item => {
    return {
      id: item.id,
      name: item.name,
      slug: item.slug
    }
  })
  const tags = item.tags.map(item => {
    return {
      id: item.id,
      name: item.name,
      slug: item.slug
    }
  })

  const chapter = {
    chapterTotal: totalChapter,
    chaterIdFirst: (firstChapter) ? firstChapter.id : null,
    chapterSlugFirst: (firstChapter) ? firstChapter.slugUnique : null,
    chapterNameFirst: (firstChapter) ? firstChapter.name : null,
    chaterIdNewest: (lastChapter) ? lastChapter.id : null,
    chapterSlugNewest: (lastChapter) ? lastChapter.slugUnique : null,
    chapterNameNewest: (lastChapter) ? lastChapter.name : null,
  }
  
  const content = {
    categories,
    collections,
    tags,
    chapter
  }
  await db.story.update({
    totalChapter: chapter.chapterTotal,
    chapterSlugFirst: chapter.chapterSlugFirst,
    chapterFirst: chapter.chapterNameFirst,
    chapterSlugNewest: chapter.chapterSlugNewest,
    chapterNewest: chapter.chapterNameNewest,
    contentRef: JSON.stringify(content)}, { where: { id: id}});
}

export const syncAllContentRef = async (limit=30000) => {
  const items = await db.story.findAll({
    attributes: ['id'],
    limit: limit,
    order: [
      ['updatedAt', 'desc']
    ]
  });
  for (let i = 0; i < items.length; i++) {
    console.log('=== syncAllContentRef: ', items[i].id)
    await syncContenRefItem(items[i].id)
  }
}

export const getContentKeySetting = async (key='') => {
  var obj = await db.setting.findOne({
    attributes: ['content'],
    where: {
      type: key
    }
  });
  return obj ? JSON.parse(obj.content) : null
} 