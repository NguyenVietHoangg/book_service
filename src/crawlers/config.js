import axios from 'axios'
import cheerio from 'cheerio'
import _ from 'lodash'
import fetch from 'node-fetch'
import moment from 'moment'
import HttpsProxyAgent from 'https-proxy-agent'

import { sleep } from './../helpers/common'

const fetchHtml = async (url, method='get', params={}, config={}, jsonAttr=null) => {
  let dataReturn = null
  let proxy = {
    protocol: 'http',
    host: '64.43.90.230',
    port: 6745,
    // auth: {
    //   username: 'htnowgmu',
    //   password: 'd49v91yoytd5'
    // }
  }
  // proxy = false;
  // var proxyOpts = url.parse('https://your-proxy.com');
  // proxyOpts.auth = 'username:password';
  // var proxy = new HttpsProxyAgent(proxyOpts);
  try {
    let newConfig = {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/95.0.4638.54 Safari/537.36',
      },
      proxy: proxy,
      // httpsAgent: new HttpsProxyAgent('http://113.176.88.14:8080')
    }
    if (!method || method == 'get') {
      dataReturn = await axios.get(url, {...config, ...newConfig})
    } else {
      dataReturn = await axios.post(url, params, config)
    }
    if (jsonAttr && dataReturn.data) {
      return dataReturn.data[jsonAttr.fieldSelected]
    }
    console.log('lay duoc du lieu ok')
    return dataReturn.data;
  } catch (error) {
    console.log('error', error);
    console.error(
      `${moment(new Date()).format('YYYY-MM-DD HH:mm:ss')} - ERROR:An error occurred while trying to fetch the URL: ${url}`
    );
    return null
  }
};

const loadCheerio = async (url) => {
  try {
    let html = await fetchHtml(url);
    if (!html) {
      // html = await fetchHtml(url.replace('sstruyen.com', 'wattpad.vn'));
      // if (!html) {
      //   return null
      // }
      return null
    }
    const selector = cheerio.load(html, { decodeEntities: false });
    return selector;
  } catch (error) {
    console.log(moment(new Date()).format('YYYY-MM-DD HH:mm:ss')+' = error fetch =======================> url: '+url, error)
    return null;
  }
}

const extractDeal = (selector, type) => {
  switch (type) {
    case 'href':
      return selector.attr('href');
    case 'text':
      return selector.text().trim();
    default:
      break;
  }
  return false;
}

const configNodejsLoad = async (ur) => {
  return await fetch("https://webtruyenfree.com/mao-son-troc-quy-nhan/", {
    "headers": {
      "accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9",
      "accept-language": "en-US,en;q=0.9,vi;q=0.8",
      "cache-control": "max-age=0",
      "if-modified-since": "Sun, 18 Jul 2021 03:56:46 GMT",
      "sec-ch-ua": "\" Not;A Brand\";v=\"99\", \"Google Chrome\";v=\"91\", \"Chromium\";v=\"91\"",
      "sec-ch-ua-mobile": "?0",
      "sec-fetch-dest": "document",
      "sec-fetch-mode": "navigate",
      "sec-fetch-site": "same-origin",
      "sec-fetch-user": "?1",
      "upgrade-insecure-requests": "1",
      "cookie": "_ga=GA1.2.478439892.1626541520; _gid=GA1.2.1854597466.1626541521; __gads=ID=e5c184d76f153ba1-22ed2f8066ca00b6:T=1626541520:RT=1626541520:S=ALNI_MZ-BEUe_0ZQ5UopITOWAaYrNo4qLg; cf_clearance=06eeb6b4ae6e8cf29c6ffc9f39f54a3b2c966a48-1626576484-0-150; AdskeeperStorage=%7B%220%22%3A%7B%22svspr%22%3A%22https%3A%2F%2Fwebtruyenfree.com%2F%22%2C%22svsds%22%3A5%2C%22TejndEEDj%22%3A%22eVaOycsSl%22%7D%2C%22C1103098%22%3A%7B%22page%22%3A1%7D%7D"
    },
    "referrerPolicy": "strict-origin-when-cross-origin",
    "body": null,
    "method": "GET",
    // "mode": "cors"
  });
}

export default {
  fetchHtml,
  loadCheerio,
  extractDeal,
  configNodejsLoad
}
