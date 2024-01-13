import dotenv from 'dotenv'
dotenv.config({path: `${__dirname}/../../.env`})

export const PREFIX = process.env.PREFIX_WEB_CACHE
export const RELOAD_ALL_ROUTERS_CMS = PREFIX + '_RELOAD_ALL_ROUTERS_CMS'
export const ENABLE_CACHE = true
export const ENABLE_TEMPLATE_FULL = true
export const SALT_PASSWORD = 'Sars-covid-19'
export const TIMEZONE = '+07:00'
export const JWT_SECRET = 'cmsgo746@#18'
export const JWT_EXPIRED = 2592000 // 30 days
export const LIMIT = 20
export const LIMIT_MAX = 50000
export const LIMIT_MIN = 2

// danh sách case dùng để cache dữ liệu
export const CACHE_ADMIN_CONFIG = PREFIX+'_ADMIN_CONFIG'
export const CACHE_MENU_WEB_CONFIG = PREFIX+'_CACHE_MENU_WEB_CONFIG'
export const CACHE_CONFIG = PREFIX + '_CACHE_CONFIG'
export const CACHE_STORY = PREFIX + '_CACHE_APP_STORY'
export const CACHE_DETAIL_STORY = PREFIX + '_CACHE_APP_DEATIL_STORY'
export const CACHE_CATEGORY = PREFIX + '_CACHE_APP_CATEGORY'
export const CACHE_DETAIL_CATEGORY = PREFIX + '_CACHE_APP_DETAIL_CATEGORY'
export const CACHE_COLLECTION = PREFIX + '_CACHE_COLLECTION'
export const CACHE_DETAIL_COLLECTION = PREFIX + '_CACHE_DEAIL_COLLECTION'
export const CACHE_HOME_CLIENT = PREFIX + '_CACHE_HOME_CLIENT'
export const CACHE_CATEGORY_CLIENT = PREFIX + '_CACHE_CATEGORY_CLIENT'
export const CACHE_DETAIL_STORY_CLIENT = PREFIX + '_CACHE_DETAIL_STORY_CLIENT'
export const CACHE_TAG_CLIENT = PREFIX + '_CACHE_TAG_CLIENT'
export const CACHE_SEARCH_CLIENT = PREFIX + '_CACHE_SEARCH_CLIENT'