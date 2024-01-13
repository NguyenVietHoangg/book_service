import _ from 'lodash'
import sequelize, { Op } from 'sequelize'
import * as Model from './../database/models'
import truyenfullCrawler from '../crawlers/sync.truyenfull.vn'
import truyenyyCrawler from '../crawlers/sync.truyenyy.vip'
import truyenoneCrawler from '../crawlers/sync.truyen.one'
import webtruyenCrawler from '../crawlers/sync.webtruyen.com'
import truyentrCrawler from '../crawlers/sync.truyentr.org'
import truyenngontinh18Crawler from '../crawlers/sync.truyenngontinh18.com'
import sstruyenCrawler from '../crawlers/sync.sstruyen.com'
import wattpadCrawler from '../crawlers/sync.wattpad.vn'

const processStoryCrawler = async (link, storyId=null) => {
  try {
    if (link.includes('truyenfull.vn')){
      await truyenfullCrawler.getStoryDetail(link, storyId)
    } else if (link.includes('truyenyy.vip')){
      await truyenyyCrawler.getStoryDetail(link, storyId)
    } else if (link.includes('truyen.one')){
      await truyenoneCrawler.getStoryDetail(link, storyId)
    } else if (link.includes('webtruyen.com')) {
      await webtruyenCrawler.getStoryDetail(link, storyId)
    } else if (link.includes('truyenngontinh18.com')) {
      await truyenngontinh18Crawler.getStoryDetail(link, storyId)
    } else if (link.includes('truyentr.org')) {
      await truyentrCrawler.getStoryDetail(link, storyId)
    } else if (link.includes('sstruyen.com')) {
      await sstruyenCrawler.getStoryDetail(link, storyId)
    } else if (link.includes('wattpad.vn')) {
      await wattpadCrawler.getStoryDetail(link, storyId)
      // await wattpadCrawler.quetChuongTruyenConTrong(storyId)
    }
    return false
  } catch (error) {
    console.log('processStoryCrawler', error)
    return false
  }
}

const totalDashboard = async () => {
  const data = []
  const totalStory = await Model.story.count()
  data.push({
    name: 'Tổng số truyện',
    key_name: 'total_story',
    value: totalStory
  })
  const totalChapterEmpty = await Model.chapter.count({
    where: {
      description: ''
    }
  })
  data.push({
    name: 'Tổng số chương bị trống',
    key_name: 'total_chapter_empty',
    value: totalChapterEmpty
  })
  const listStoryEmpty = await Model.story.findAll({
    attributes: ['id', 'slug', 'name'],
    where: {
      contentRef: {
        [Op.is]: null
      }
    },
    raw: true,
    limit: 100
  })
  console.log('raw', listStoryEmpty);
  data.push({
    name: 'Danh sách truyện chưa đồng bộ chương',
    key_name: 'total_story_empty',
    value: listStoryEmpty
  })
  Model.setting.update({content: JSON.stringify(data)}, { where: {type:'dashboard_general'}})
}
export default {
  processStoryCrawler,
  totalDashboard
}