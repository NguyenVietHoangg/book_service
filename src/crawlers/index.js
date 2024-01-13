import moment from 'moment'

import publishedNews from './publishedNews'
import synsSitemap from './syncSitemap'

export default () => {
  const time = moment().format('HH:mm')
  const hour = moment().format('HH')
  const minute = moment().format('mm')
  // syncSitemap
  if (parseInt(minute) % 1 === 0) {
    // publishedNews.run()
  }
  // setting syncSitemap
  if (parseInt(minute) % 15 === 0) {
    synsSitemap.run()
  }
  console.log('=============== RUN syncdata ==============')
  //node_modules/.bin/babel-node src/crawlers/sync.truyentr.org.js getNewestStory
}