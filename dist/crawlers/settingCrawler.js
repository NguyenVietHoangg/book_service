"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getUrl = void 0;
// import Model from './../database/models'
// import truyenfull from './sync.truyenfull.vn'
// import truyenone from './sync.truyen.one'
// import truyenyy from './sync.truyenyy.vip'
// import truyentrcom from './sync.truyentr.com'
// import truyentrorg from './sync.truyentr.org'
// import webtruyen from './sync.webtruyen.com'
// import blogtamsu from './sync.vi.blogtamsu.com'
// import truyenhay from './sync.truyenhay.com'
// import truyenngontinh18 from './sync.truyenngontinh18.com'
// import sstruyen from './sync.sstruyen.com'
// import wattpad from './sync.wattpad.vn'
// import { getContentKeySetting } from './../webServices/syncAllToStory'

// /**
//  * tính năng crawler truyện mới nhất
//  */
// export const syncNewest = async () => {
//   const siteSelect = await getContentKeySetting('crawler_from');
//   const site = siteSelect.site;
//   switch (site) {
//     case 'sstruyen.com':
//       sstruyen.getNewestStory('sstruyen.com');
//       break;
//     case 'wattpad.vn':
//       wattpad.getNewestStory('wattpad.vn');
//       break;

//     default:
//       break;
//   }
// }

// /**
//  * tính năng crawler truyện mới nhất
//  */
//  export const syncNewestFromDb = async () => {
//   const siteSelect = await getContentKeySetting('crawler_from');
//   const site = siteSelect.site;
//   switch (site) {
//     case 'sstruyen.com':
//       sstruyen.updateNewStory();
//       break;
//     case 'wattpad.vn':
//       wattpad.updateNewStory();
//       break;

//     default:
//       break;
//   }
// }

// /**
//  * Quét truyện theo domain, cập nhật lại
//  */
// export const syncSites = async () => {
//   const sites = [
//     'truyenfull.vn', 
//     'truyentr.org',
//     'truyentr.com',
//     'truyen.one',
//     'truyenhay.com',
//     'truyenyy.vip',
//     'vi.blogtamsu.com',
//     'webtruyen.com',
//     'truyenngontinh18.com'
//   ]
//   for(let i = 0; i < sites.length; i++) {
//     const data = Model.story.findAll({
//       attributes: ['id', 'source_crawler_1'],
//       where: {
//         crawlerFrom: sites[i]
//       },
//       order: [['updatedAt', 'desc']],
//       limit: 500
//     })
//     switch (sites[i]) {
//       case 'truyenfull.vn':
//         data.map(item => {
//           truyenfull.getStoryDetail(item.source_crawler_1)
//         })
//         break;
//       case 'truyentr.org':
//         data.map(item => {
//           truyentrorg.getStoryDetail(item.source_crawler_1)
//         })
//         break;
//       case 'truyentr.com':
//         data.map(item => {
//           truyentrcom.getStoryDetail(item.source_crawler_1)
//         })
//         break;
//       case 'truyenhay.com':
//         data.map(item => {
//           truyenhay.getStoryDetail(item.source_crawler_1)
//         })
//         break;
//       case 'truyen.one':
//         data.map(item => {
//           truyenone.getStoryDetail(item.source_crawler_1)
//         })
//         break;
//       case 'truyenyy.vip':
//         data.map(item => {
//           truyenyy.getStoryDetail(item.source_crawler_1)
//         })
//         break;
//       case 'webtruyen.com':
//         data.map(item => {
//           webtruyen.getStoryDetail(item.source_crawler_1)
//         })
//         break;      
//       case 'vi.blogtamsu.com':
//         data.map(item => {
//           blogtamsu.getStoryDetail(item.source_crawler_1)
//         })
//         break;
//       case 'truyenngontinh18.com':
//         data.map(item => {
//           truyenngontinh18.getStoryDetail(item.source_crawler_1)
//         })
//         break;
//       default:
//         break;
//     }
//   }
// }

// export const getUrl = (url='') => {
//   const configDomainFrom = process.env.CRAWLER_FROM || 'wattpad.vn'
//   let domain = (new URL(url));
//   domain = domain.hostname.replace('www.','');
//   url = !url.includes('ttps://') ? 'https://' : '' + url.replace(domain, configDomainFrom)
//   return url
// }

// /**
//  * Quyét lại chương bị null
//  */
// export const syncChapterNull = () => {
//   wattpad.quetChuongTruyenConTrong()
// }

// export const  syncStoryTotalChapterZero = () => {
//   wattpad.quetTruyenZero()
// }

var getUrl = exports.getUrl = function getUrl() {
  var url = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
  var configDomainFrom = process.env.CRAWLER_FROM || 'wattpad.vn';
  var domain = new URL(url);
  domain = domain.hostname.replace('www.', '');
  url = !url.includes('ttps://') ? 'https://' : '' + url.replace(domain, configDomainFrom);
  return url;
};

// export default {
//   syncNewest,
//   syncNewestFromDb,
//   syncSites,
//   syncChapterNull,
//   syncStoryTotalChapterZero
// }