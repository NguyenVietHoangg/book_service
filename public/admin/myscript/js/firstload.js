window.substringchar = function (str='', len = 50) {
  if(str != null && str.length > len) {
    str = str.substring(0, len);
    return `${str} ...`
  }
  return str
}