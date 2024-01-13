import slugify from 'slugify'
export const genSlug = (str, char='-', length=3) => {
  const config = {
    replacement: char,  // replace spaces with replacement character, defaults to `-`
    remove: undefined, // remove characters that match regex, defaults to `undefined`
    lower: false,      // convert to lower case, defaults to `false`
    strict: false,     // strip special characters except replacement, defaults to `false`
    locale: 'vi',      // language code of the locale to use
    trim: true         // trim leading and trailing replacement chars, defaults to `true`
  }
  if (!length) {
    return `${slugify(str, config).toLocaleLowerCase()}`
  } else {
    return `${slugify(str, config)}-${randomString(length).toLocaleLowerCase()}`
  }
}

export const xoaKhoangTrang = (str) => {
  let newStr=str.replace(/  +/g, ' ')
  return newStr
}

export const removeTagHtml = (str) => {
  const regex = /(<([^>]+)>)/ig
  return str.replace(regex, "")
}

export const removeJsScript = (str) => {
  const regex = /<.*?script.*?>.*?<\/.*?script.*?>/igm
  return str.replace(regex, "")
}

/**
 *
 * They can only contain alphabetic characters, spaces (0 - any ), hyphens (0 - any), apostrophes ' (0 - any ) and number of symbols 1 - 40.
 * First and Last name can not start with ' or whitespace
 */
export const checkNameValid = (name) => {
  if (!name)
    return false
  return /^(?=.{1,40}$)[a-zA-Z]+(?:[-'\s][a-zA-Z]+)*$/.test(name)
}

export const resetFont = (content = '') => {
  return content.replace(/font-family:[^;']*(;)?/g, '');
}

export function randomString(length=11) {
  var result           = '';
  var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  var charactersLength = characters.length;
  for ( var i = 0; i < length; i++ ) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}