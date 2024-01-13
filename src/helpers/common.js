import moment from 'moment'
import _, { isInteger } from 'lodash'

const FORMAT_DATE = 'YYYY-MM-DD HH:mm:ss'

export const formatDate = (dateUtc=null) => moment(dateUtc).format('DD-MM-YYYY HH:mm:ss')
export class TravellerCollection extends Array {
  sum(key) {
      return this.reduce((a, b) => a + (b[key] || 0), 0);
  }
}

export const betweenDateStr = (date1, date2, format='hour') => {
  const duration = moment.utc(moment(date1, FORMAT_DATE).diff(moment(date2, FORMAT_DATE))).format("HH:mm:ss")
  try {
    let str = ''
    const arr = duration.split(':')
    if (parseInt(arr[0]) === 0 && parseInt(arr[1]) === 0) {
      return duration
    }
    if (parseFloat(arr[0]) > 0) {
      str += parseFloat(arr[0]) + ' giờ '
    }
    if (parseInt(arr[1]) > 0) {
      str += parseInt(arr[0]) + ' phút '
    }
    return str
  } catch (error) {
    return 'Không xác định'
  }
}

export const betweenDateNumber = (date1, date2, format='seconds') => {
  return moment(date1, FORMAT_DATE).diff(moment(date2, FORMAT_DATE), format)
}

export const dayVnStr = (date, type='short') => {
  let momentObj = date ? moment(date, FORMAT_DATE) : moment()
  if (type === 'short') {
    return momentObj.format('ddd') + ', ' + momentObj.format('D') + ' tháng '+ momentObj.format('M')
  }
}

export const getQuarter = (d) => {
  d = d || moment();
  return d.format('MM') + '-' + d.format('YYYY');
}

export const removeEmptyField = (object) => {
  Object.keys(object).forEach((key) => (object[key] == null || object[key] == '') && delete object[key]);
  return object
} 

export const checkValidPassword = (pw) => {
  const regex = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,32}$/
  return regex.test(pw);
}

export const checkValidEmail = (em) => {
  const regex = /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/i;
  return regex.test(em);
}

export const checkValidUsername = (em) => {
  const re = /^(?=.{6,20}$)(?![_.])(?!.*[_.]{2})[a-zA-Z0-9._]+(?<![_.])$/;
  return re.test(String(em).toLowerCase());
}


export const getNameFromEmail = (email) => {
  const name   = email.substring(0, email.lastIndexOf("@"));
  const domain = email.substring(email.lastIndexOf("@") +1);
  return {name, domain}
}


export const checkValidPhone = (em) => {
  const re = /^[+(]*[(+]{0,1}[0-9]{1,4}[)]{0,1}[-\s\./0-9]*$/;
  return em.match(re) ? em : false
}

export const VndCurrencyFormat = (number) => {
  return number.toLocaleString('it-IT', {style : 'currency', currency : 'VND'});
}

export const uniqueByObjectFieldInArray = (array, field) => {
  var flags = [], output = [], outputLocked=[], l = array.length, i;
  for( i=0; i<l; i++) {
      if( flags[array[i][field]]) {
        outputLocked.push(array[i]);
        continue;
      }
      flags[array[i][field]] = true;
      output.push(array[i]);
  }
  return {output, outputLocked}
}

export const modifyQuery = (data = {}) => {  
  if (!_.isEmpty(data)) {
    let query = {
      where: {},
      offset: 0,
      limit: 20
    }
    if (data.keySearch && !data.keySearch.includes('-') ){         
      query.where.keySearch = data.keySearch
    }
    if (data.keySearch && data.keySearch.includes('-') ){     
      query.where.keySearchSlug = data.keySearch
    }
    if (data.q) {
      query.where.keySearch = data.q
    }
    if (data.status) {
      query.where.status = data.status
    }
    if (data.fromId && data.fromId != '') {
      query.where.crawlerFrom = data.fromId
    }  
    if (data.haveChapter && data.haveChapter != '') {
      query.where.haveChapterContent = data.haveChapter == 1 ? 1 : 0
    }    
    if (data.updatedBy) {
      query.where.updatedBy = data.updatedBy
    }
    if (data.start_date) {
      query.where.start_date = data.start_date
    }
    if (data.end_date) {
      query.where.end_date = data.end_date
    }    
    if (data.offset) {
      query.offset = data.offset
    }
    if (data.limit) {
      query.limit = data.limit
    }    
    return query
    
  }
}

export const getHostName = (url='') => {
  var match = url.match(/:\/\/(www[0-9]?\.)?(.[^/:]+)/i);
  if (match != null && match.length > 2 && typeof match[2] === 'string' && match[2].length > 0) {
      return match[2];
  }
  else {
      return null;
  }
}

export const xoaDau = (str, char=null) => {
  if (!str) {
    return null;
  }
  let newStr = str.normalize("NFD").replace(/[\u0300-\u036f]/g, "")
  .replace(/[\u0300-\u036f]/g, "").replace(/đ/g, "d").replace(/Đ/g, "D").replace('%', '').replace(/  +/g, ' ').toLowerCase()
  if (char) {
    newStr = newStr.replace(' ', char)
  }
  let stringSplitted = newStr.split(' ');
  stringSplitted.forEach(e => {
    e.trim()
  });
  newStr = stringSplitted.filter(x => typeof x === 'string' && x.length > 0).join('-')
  newStr = newStr.replace(/“/g, '').replace(/,/g).replace(/:-/g, '-').replace(/\?/g, '').replace(/”/g,'').replace('[', '').replace(']', '').replace('\n', '').replace('  ', '').replace(/undefined/g, '');
  let arr = newStr.match(/[a-zA-Z-0-9]+/g);
  if (!arr) {
    return null;
  }
  return (arr.join('-')).toLocaleString();
}

export const xoaKhoangTrang = (str, char=' ') => {
  if (!str) {
    return;
  }
  let newStr=str.replace(/  +/g, char)
  return newStr
}

export const getFilename = (url) => {
  if (url)
  {
     var m = url.toString().match(/.*\/(.+?)\./);
     if (m && m.length > 1)
     {
        return m[1];
     }
  }
  return "";
}

export const getFileName2 = (url) => {
  return url.substring(url.lastIndexOf('/')+1);
}

export const getExt = (url) => {
  let ext = url.split('.').pop();
  ext = ext ? `.${ext}` : ''
  return ext;
}

export const cleanString = (input) => {
  if (!input) {
    return null;
  }
  var output = "";
  for (var i=0; i<input.length; i++) {
      if (input.charCodeAt(i) <= 127) {
          output += input.charAt(i);
      }
  }
  return output;
}

export const clearUnicode = (input) => {
  if (input) {
    return input.replace(/([\uE000-\uF8FF]|\uD83C[\uDF00-\uDFFF]|\uD83D[\uDC00-\uDDFF])/g, '')
  }
  return null;
}

export const convertSlugStory = (input) => {
  if (!input) {
    return null;
  }
  input = string.replace(/\s\s+/g, '-');
  return xoaDau(input)
}

export const sleep = (ms) => {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}  

export const randomSetTimeout = (use=1) => {
  if (use==1) {
    var months = [10, 100, 200, 300, 400, 500, 600, 700, 800, 900, 1000];
  } else {
    var months = [1000, 1300, 1500, 1700, 2000];
  }
  const random = Math.floor(Math.random() * months.length);
  return random;
}