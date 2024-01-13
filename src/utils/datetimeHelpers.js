import moment from 'moment'
import _, { split } from 'lodash'

const daysInWeek = [
  { key: 0,name: 'chủ nhật' },
  { key: 1,name: 'thứ 2' },
  { key: 2,name: 'thứ 3' },
  { key: 3,name: 'thứ 4' },
  { key: 4,name: 'thứ 5' },
  { key: 5,name: 'thứ 6' },
  { key: 6,name: 'thứ 7' },
]

const getDayInWeek = (timeInput) => {
  const time = timeInput || moment()
  return daysInWeek.filter((item) => time.day() === item.key)
}

const getFullDate = (timeInput) => {
  const time = timeInput || moment()
  console.log(getDayInWeek(time))
  return _.capitalize(getDayInWeek(time)[0].name) +', '+time.format('D')+' tháng '+time.format('M')+', '+time.format('YYYY')
}

const inverseDate = (date=null, char='/', char2='/') => {
  if (!date)
    return null
  const arr = date.split(char)
  return arr[2]+char2+arr[1]+char2+arr[0]
} 

const ampmTOhis = (time=null) => {
  if (!time)
    return null
  let arr = time.split(':')
  let arr_minute = arr[1].split(' ')[0]
  let timeF = arr[0] + ':' + arr_minute+':00'
  if (time.includes('PM')) {
    if (parseInt(arr[0]) === 12) {
      timeF = '12:'+arr_minute+':00'
    } else if (parseInt(arr[0]) < 12) {
      timeF = ((parseInt(arr[0])+12)).toString() + ':'+arr_minute+':00'
    }
  }
  return timeF
}

const dateTOAmPm = (date=null, char='-', char2='/') => {
  if (!date)
    return null
  let arr = date.split(' ')
  let dateF = {
    date: inverseDate(arr[0], char, char2),
    time: arr[1]
  }
  let arr2 = arr[1].split(':')
  if (parseInt(arr2[0]) >= 12) {
    dateF.time = (parseInt(arr2[0])-12).toString()+':'+arr2[1]+' PM'
  } else {
    dateF.time = arr2[0]+':'+arr[1]
  }
  return dateF
}

const convertTimeformat = (time, format, str) => {
  var hours = Number(time.match(/^(\d+)/)[1]);
  var minutes = Number(time.match(/:(\d+)/)[1]);
  var AMPM = time.match(/\s(.*)$/)[1];
  if (AMPM == "PM" && hours < 12) hours = hours + 12;
  if (AMPM == "AM" && hours == 12) hours = hours - 12;
  var sHours = hours.toString();
  var sMinutes = minutes.toString();
  if (hours < 10) sHours = "0" + sHours;
  if (minutes < 10) sMinutes = "0" + sMinutes;
  return sHours + ":" + sMinutes;
}

export default {
  dateTOAmPm,
  daysInWeek,
  getDayInWeek,
  getFullDate,
  inverseDate,
  ampmTOhis,
  convertTimeformat
}