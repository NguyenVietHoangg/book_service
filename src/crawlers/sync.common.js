
import { imageRandom } from './saveUrlFile'
import { xoaDau, sleep } from '../helpers/common'
import * as Model from '../database/models'
import { Op } from 'sequelize'

export const updateImageForstory = async () => {
  const list = await Model['story'].findAll({
    attributes: ['id']
  });
  for(let i=0; i< list.length; i++) {
    const img = await imageRandom()
    const data = {imageSave: img}
    await Model['story'].update(data, {where:{ id: list[i].id}})
  }
  console.log('xong updated updateImageForstory !!!!!!!')
}

export const updateMedia = async () => {
  const list = await listImagesOptimize()
  for(let i=0; i< list.length; i++) {
    const data = {
      name: list[i],
      alt: 'truyenfullonline, cập nhật liên tục hàng ngày - '+list[i],
      path: '/uploads/images/'+list[i],
      fullpath: '/public/uploads/images/'+list[i],
      type: 'jpg',
      category: 'image',
      inside: 'true',
      status: 'on',
      createdAt: moment().format('YYYY/MM/DD HH:mm:ss'), 
      updatedAt: moment().format('YYYY/MM/DD HH:mm:ss'),
    }
    await Model['media'].create(data)
  }
  console.log('xong updated updateMedia !!!!!!!')
}

export const removeDuplicate = async (storyObj = null) => {
  if (!storyObj) {
    return
  }
  let arr = storyObj.slug.split('-');
  if (parseInt(arr[arr.length-1])) {
    let slug = storyObj.slug.replace('-'+arr[arr.length-1], '');
    const listRemove = await Model.story.findAll({
      attributes: ['id', 'slug'],
      where: [
        {'slug': { [Op.substring] : slug}},
        {'id': { [Op.not] : storyObj.id}}
      ],
      order: [['id', 'desc']]
    })
    if (!listRemove.length) {
      return
    }
    listRemove.map(item => {
      const regex = /\d/;
      const doesItHaveNumber = regex.test(item.slug);
      if (doesItHaveNumber && item.slug.length > slug.length) {
        Model.story.destroy({where: {id: item.id}})
        Model.chapter.destroy({where: {storyId: item.id}})
        Model.category_story.destroy({where: {storyId: item.id}})
        Model.collection_story.destroy({where: {storyId: item.id}})
        Model.tag_story.destroy({where: {storyId: item.id}})
      }
    })
  }
}

export const updateStoryToCategory = async (storyId=null, categoryString=null) => {
  if (!storyId || !categoryString) {
    return
  }
  if (!categoryString) {
    let story = await Model.story.findOne({
      attributes: ['genre'],
      where: {id: storyId}
    })
    categoryString = story.genre
  }
  const categroyList = categoryString.split(',')
  if (categroyList.length) {
    categroyList.map(async (item) => {
      const slug = xoaDau(item)
      if (!slug) {
        return
      }
      let cate = await Model.category.findOne({
        attributes:['id'],
        where: {
          slug: slug
        }
      })
      if (!cate) {
        cate = await Model.category.create({
          name: item.trim(),
          slug: slug,
        }, { ignoreDuplicates: true })
      }
      let mapCates = [{
        storyId: storyId,
        categoryId: cate ? cate.id : null,
      }]
      Model.category_story.bulkCreate(mapCates, { ignoreDuplicates: true })
    })
  }
}

export const syncToCategoryStory = async (list = []) => {
  let stop = 2;
  for (let i = 1; i < stop; i++) {
    list = await Model.story.findAll({
      attributes: ['id', 'genre'],
      order: [
        ['id', 'desc']
      ],
      offset: (i-1)*1000,
      limit: 1000
    })
    list.map(item => {
      updateStoryToCategory(item.id, item.genre)
    })
  }
}

export const syncRemoveDuplicate = async (list = []) => {
  let stop = 6;
  for (let i = 1; i < stop; i++) {
    list = await Model.story.findAll({
      attributes: ['id', 'slug'],
      order: [
        ['id', 'desc']
      ],
      offset: (i-1)*1000,
      limit: 1000
    })
    list.map(item => {
      removeDuplicate(item)
    })
  }
}

export const updateTotalStory = async () => {
  const result = await Model.category.findAll({
    attributes: ['id', 'slug', 'name'],
    where: {
      status: 'on'
    },
    raw: true
  })
  console.log('=============== updateTotalStory === count = '+result.length)
  if (result.length) {
    const cates = await Promise.all(result.map(async (cate) => {
      const count = await Model.story.count({
        where: {
          genre: {
            [Op.substring]: cate.name,
          },
          status: 'on'
        },
        order: [
          ['id', 'asc']
        ],
      })
      const sql = "UPDATE category set totalStory = "+count+" WHERE id = "+cate.id
      Model.sequelize.query(sql)
    }))
  }
  console.log('==== update totalStory ====')
  await updateTotalChapter()
}

export const updateTotalChapter = async (storyId = null) => {
  return true;
  let where = '';
  if (storyId) {
    where = ' WHERE storyId='+storyId+' ';
  }
  const sql = `UPDATE story LEFT JOIN (
    SELECT COUNT(*) AS num, storyId
    FROM chapter ${where}
    GROUP BY storyId
  ) As t ON story.id = t.storyId
  SET story.totalChapter = t.num`
  await Model.sequelize.query(sql)
  await Model.story.update({
    chapterSlugNewest: null,
    chapterNewest: null
  }, { where: {
    totalChapter: 0
  }})
  console.log('==== update updateTotalChapter ====')
}

export const itemSyncChapterNewest = async (storyId=null) => {
  if (!storyId) {
    return;
  }
  const item = await Model.story.findOne({
    attributes: ['id', 'slug', 'updatedAt'], 
    where: { id: storyId}, 
    include: [
      {
        model: Model.chapter,
        attributes: ['id', 'name', 'slugUnique'],
        order: [
          ['id', 'desc']
        ],
        limit: 1,
        required: true
      }
    ]
  })
  const { count } = await Model.chapter.findAndCountAll({
    where: {
      storyId: storyId,
    },
    limit: 1,
  });
  if (item.chapters[0]) {
    Model.story.update({totalChapter: count, chapterNewest: item.chapters[0].name, chapterSlugNewest: item.chapters[0].slugUnique, updatedAt: item.updatedAt}, { where: { id: item.id }})
  }
}

export const syncChapterNewest = async () => {
  let limit = 1000;
  let offset = 0;
  for (let i=0; i < 2; i++) {
    offset = i*limit
    const stories = await Model.story.findAll({
      attributes: ['id', 'slug', 'updatedAt'], 
      where: { status: 'on'}, 
      order:[['updatedAt', 'desc'], ['id', 'desc']],
      include: [
        {
          model: Model.chapter,
          attributes: ['id', 'name', 'slugUnique'],
          order: [
            ['id', 'desc']
          ],
          limit: 1,
          required: true
        }
      ],  
      limit: limit,
      offset: offset
    })
    stories.map(item => {
      if (item.chapters[0]) {
        Model.story.update({chapterNewest: item.chapters[0].name, chapterSlugNewest: item.chapters[0].slugUnique, updatedAt: item.updatedAt}, { where: { id: item.id }})
      }
    })
  }
  console.log("=== finished sync chapterest to story")
}

export const removeRefStory = async (storyId) => {
  if (!storyId) {
    return;
  }
  // await Model['story'].destroy({
  //   where: {id: storyId}
  // })
  await Model['chapter'].destroy({
    where: {storyId: storyId}
  })
  await Model['collection_story'].destroy({
    where: {storyId: storyId}
  })
  await Model['category_story'].destroy({
    where: {storyId: storyId}
  })
  await Model['tag_story'].destroy({
    where: {storyId: storyId}
  })
  await sleep(2000);
}

var myArgs = process.argv.slice(2);
switch (myArgs[0]) {
case 'syncToCategoryStory':
  syncToCategoryStory();
  break;
case 'syncRemoveDuplicate':
  syncRemoveDuplicate();
  break;
case 'syncRemoveDuplicate':
  updateTotalStory();
  break;
case 'updateTotalChapter':
  updateTotalChapter();
  break;
default:
  console.log('Sorry, that is not something I know how to do.');
}

export default {
  updateImageForstory,
  updateMedia,
  updateStoryToCategory,
  syncToCategoryStory,
  syncRemoveDuplicate,
  updateTotalStory,
  removeRefStory,
  itemSyncChapterNewest,
  syncChapterNewest
}