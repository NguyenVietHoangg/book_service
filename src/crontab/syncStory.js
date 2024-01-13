import dotenv from 'dotenv'
import * as db from '../database/models'
dotenv.config({path: `${__dirname}/../.env`})

export const itemSyncChapterNewest = async (storyId=null) => {
  if (!storyId) {
    return;
  }
  const item = await db.story.findOne({
    attributes: ['id', 'slug', 'updatedAt'], 
    where: { id: storyId}, 
    include: [
      {
        model: db.chapter,
        attributes: ['id', 'name', 'slugUnique'],
        order: [
          ['id', 'desc']
        ],
        limit: 1,
        required: true
      }
    ]
  })
  const { count } = await db.chapter.findAndCountAll({
    where: {
      storyId: storyId,
    },
    limit: 1,
  });
  db.story.update({totalChapter: count, chapterNewest: item.chapters[0].name, chapterSlugNewest: item.chapters[0].slugUnique, updatedAt: item.updatedAt}, { where: { id: item.id }})
}

export const syncChapterNewest = async (page=2) => {
  let offset = 0;
  let limit = 1000;
  for (let i=0; i < page; i++) {
    offset = i*limit
    const stories = await db.story.findAll({
      attributes: ['id', 'slug', 'updatedAt'], 
      where: { status: 'on'}, 
      order:[['updatedAt', 'desc'], ['id', 'desc']],
      include: [
        {
          model: db.chapter,
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
        db.story.update({chapterNewest: item.chapters[0].name, chapterSlugNewest: item.chapters[0].slugUnique, updatedAt: item.updatedAt}, { where: { id: item.id }})
      }
    })
  }
  console.log("=== finished sync chapterest to story")
}
var myArgs = process.argv.slice(2);
console.log('myArgs: ', myArgs);

const run = () => {
  var page = myArgs[0] ? myArgs[0] : 2;
  console.log('run ================> page = '+ page);
  syncChapterNewest(page);
}
if (myArgs[0] && parseInt(myArgs[0]) > 0) {
  run()
}
export default {
  run
}