import moment from 'moment'

import syncSitemap from './syncSitemap'
import publishedNews from './publishedNews'
import settingCrawler from './../crawlers/settingCrawler'
import { syncAllContentRef } from './../webServices/syncAllToStory'
import syncCommon from './../crawlers/sync.common'
import storyService from './../webServices/storyService'

export default () => {
  const time = moment().format('HH:mm')
  const hour = moment().format('HH')
  const minute = moment().format('mm')

  if (parseInt(hour) % 5 == 0) {
    console.log('=============================== syncAllContentRef ================================');
    // syncAllContentRef(100)
    // storyService.totalDashboard()
  }
  // syncPublish
  // publishedNews.run()
  if (parseInt(minute) == 50 && hour % 2 == 0) {
    console.log('=============================== syncAllContentRef ================================');
    // syncAllContentRef(100)
    // storyService.totalDashboard()
    // settingCrawler.syncChapterNull()
  }
  // setting sitemap
  if (minute == 30 && hour %4 == 0) {
    console.log('=============================== syncNewest ================================');
    // settingCrawler.syncNewest()
  }
  if (minute % 5 ==0) {
    // settingCrawler.syncChapterNull()
  }
  if (minute == 50 && hour % 2 == 1) {
    console.log('=============================== syncNewest ================================');
    // settingCrawler.syncStoryTotalChapterZero()
    // settingCrawler.syncNewest()
  }
  if (minute == 59) {
    console.log('=============================== syncNewest syncNewestFromDb ================================');
    // settingCrawler.syncNewestFromDb()
  }
  if (time == '08:00') {
    syncSitemap.run()
  }
  if (time == '01:30') {
    // settingCrawler.syncSites();
    console.log('=============================== syncNewest ================================');
    // settingCrawler.syncNewest()
  }
  if (time == '03:00') {
    console.log('=============================== syncNewest syncNewestFromDb ================================');
    // settingCrawler.syncNewestFromDb()
    // syncCommon.updateTotalStory()
  }
  if (time == 20 && hour % 3 == 0) {
    console.log('=============================== syncNewest syncAllContentRef ================================');
    // syncAllContentRef(1000)
    // syncCommon.syncChapterNewest()
  }
  console.log('=============== RUN syncdata ==============')
}