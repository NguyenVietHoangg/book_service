import monent from 'moment'
import dotenv from 'dotenv'
import fs from 'fs'
import * as db from '../database/models'
dotenv.config({path: `${__dirname}/../../.env`})

const datetime = monent().format('YYYY MM DD HH:mm:ss')

const timeupdate = () => {
  console.log('process.env.PATH_SITEMAPprocess.env.PATH_SITEMAP', process.env.PATH_SITEMAP)
  fs.writeFileSync(process.env.PATH_SITEMAP+'/timeupdate.json', JSON.stringify({time: datetime}));
}

const syncCategoriesJson = async () => {
  const categries = await db['category'].findAll({attributes: ['slug'], where: { status: 'on'}})
  const cates = categries.map(item => item.slug)
  fs.writeFileSync(process.env.PATH_SITEMAP+'/categories.json', JSON.stringify(cates));
}

const syncTagsJson = async () => {
  const tags = await db['tag'].findAll({attributes: ['slug'], where: { status: 'on'}, limit: 10000})
  const taggs = tags.map(item => item.slug)
  fs.writeFileSync(process.env.PATH_SITEMAP+'/tags.json', JSON.stringify(taggs));
}

const syncStoriesJson = async () => {
  const stories = await db['story'].findAll({
    attributes: ['slug', 'createdAt'], 
    where: { status: 'on'},
    include: [
      { model: db['category'] }
    ],
    raw: true,
    order:[['createdAt', 'desc'], ['id', 'desc']], 
    limit: 10000
  })
  console.log(stories)
  const stos = stories.map(item => `${item['categories.slug']}/${item.slug}`)
  fs.writeFileSync(process.env.PATH_SITEMAP+'/articles.json', JSON.stringify(stos));
}

const run = () => {
  timeupdate()
  syncCategoriesJson()
  syncTagsJson()
  syncStoriesJson()
}
export default {
  run
}