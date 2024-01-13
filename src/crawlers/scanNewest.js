import moment from 'moment'

import config from './config'
import saveUrlFile, { imageRandom } from './saveUrlFile'
import * as Model from '../database/models'
import { xoaDau, clearUnicode, convertSlugStory } from '../helpers/common'
import { updateStoryToCategory, updateTotalChapter, itemSyncChapterNewest, removeRefStory } from './sync.common'
import truyentr from './sync.truyentr.com'
import truyenfull from './sync.truyenfull.vn'
import truyenone from './sync.truyen.one'
import truyenyy from './sync.truyenyy.vip'
import truyentrcom from './sync.truyentr.com'
import truyentrorg from './sync.truyentr.org'
import webtruyen from './sync.webtruyen.com'
import blogtamsu from './sync.vi.blogtamsu.com'
import truyenhay from './sync.truyenhay.com'
import truyenngontinh18 from './sync.truyenngontinh18.com'

const sites = [
  'truyenfull.vn', 
  'truyentr.org',
  'truyentr.com',
  'truyen.one',
  'truyenhay.com',
  'truyenyy.vip',
  'vi.blogtamsu.com',
  'webtruyen.com',
  'truyenngontinh18.com'
]

const syncCollectionHot = async () => {
  const data = await Model.collection.findOne({
    attributes: ['id'],
    include: [
      {
        model: Model.story,
        attributes: ['id', 'source_crawler_1']
      }
    ]
  })
  data.stories.map(async (item) => {
    switch (true) {
      case item.source_crawler_1.includes('truyenfull.vn'):
        truyenfull.getStoryDetail(item.source_crawler_1)
        break;
      case item.source_crawler_1.includes('truyen.one'):
        truyenone.getStoryDetail(item.source_crawler_1)
        break;      
      case item.source_crawler_1.includes('truyenyy.vip'):
        truyenyy.getStoryDetail(item.source_crawler_1)
        break;
      case item.source_crawler_1.includes('truyentr.org'):
        truyentrorg.getStoryDetail(item.source_crawler_1)
        break;
      case item.source_crawler_1.includes('webtruyen.com'):
        webtruyen.getStoryDetail(item.source_crawler_1)
        break;      
      case item.source_crawler_1.includes('truyenhay.com'):
        truyenhay.getStoryDetail(item.source_crawler_1)
        break;      
      case item.source_crawler_1.includes('truyenngontinh18.com'):
        truyenngontinh18.getStoryDetail(item.source_crawler_1)
        break;
      default:
        break;
    }
    return item;
  })
}

syncCollectionHot();