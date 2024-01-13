import _ from 'lodash'
import * as dbz from './../adapters/fetchData'
import * as cache from './../cache'
import configGlobal from './../config/constant'

const cmsSetting = async (req, res, next) => {
  global.configGlobal = configGlobal
  global.DOMAIN_IMG = res.locals.DOMAIN_IMG
  const keyCache = `cms_menu_cms`
  let cacheData = await cache.get(keyCache, true)
  cacheData = await dbz.fetchOne('setting', { where: {type: 'menu_cms'}, raw: true})
  if (cacheData && cacheData.length) {
    cacheData = cacheData[0].content
  }
  global.menuCms = cacheData && cacheData.length ? cacheData : '[]'
  res.locals.menuCms = JSON.parse(global.menuCms)
  next()
}

export default cmsSetting