import _ from 'lodash'
import moment from 'moment'
import { betweenDateNumber } from '../helpers/common'

export const timlineActivityCm = (data) => {
  const momentdf = moment()
  const momentNow = momentdf.format('YYYY-MM-DD HH:mm:ss')
  const momentNowStart = `${momentdf.format('YYYY-MM-DD')} 00:00:01`
  const momentNowEnd = `${momentdf.format('YYYY-MM-DD')} 23:59:59`
  const filterToday = {
    start: momentNowStart,
    end: momentNowEnd,
    now: momentNow
  }
  const filterTomorrow = {
    start: moment(momentNowStart).add(1, 'd').format('YYYY-MM-DD HH:mm:ss'),
    end: moment(momentNowEnd).add(1, 'd').format('YYYY-MM-DD HH:mm:ss'),
    now: moment(momentNow).add(1, 'd').format('YYYY-MM-DD HH:mm:ss')
  }
  const filterNextTomorrow = {
    start: moment(momentNowStart).add(2, 'd').format('YYYY-MM-DD HH:mm:ss'),
    end: moment(momentNowEnd).add(2, 'd').format('YYYY-MM-DD HH:mm:ss'),
    now: moment(momentNow).add(2, 'd').format('YYYY-MM-DD HH:mm:ss')
  }
  const filterNext2Tomorrow = {
    start: moment(momentNowStart).add(3, 'd').format('YYYY-MM-DD HH:mm:ss'),
    end: moment(momentNowEnd).add(3, 'd').format('YYYY-MM-DD HH:mm:ss'),
    now: moment(momentNow).add(3, 'd').format('YYYY-MM-DD HH:mm:ss')
  }
  const obj = {
    filterToday,
    filterTomorrow,
    filterNextTomorrow,
    filterNext2Tomorrow,
    outdateActivities: _.filter(data, (k) => k.dataValues.status !== 'success' && betweenDateNumber(k.dataValues.timeEnd, filterToday.end) <= 0),
    completedActivities: _.filter(data, (k) => k.dataValues.status === 'success'),
    pendingActivities: _.filter(data, (k) => k.dataValues.status === 'pending'),
    todayActivities: _.filter(data, (k) => betweenDateNumber(k.dataValues.timeStart, filterToday.start) >= 0 && betweenDateNumber(k.dataValues.timeStart, filterToday.end) <= 0),
    tomorrowActivities: _.filter(data, (k) => betweenDateNumber(k.dataValues.timeStart, filterTomorrow.start) >= 0 && betweenDateNumber(k.dataValues.timeStart, filterTomorrow.end) <= 0),
    nextTomorrowActivities: _.filter(data, (k) => betweenDateNumber(k.dataValues.timeStart, filterNextTomorrow.start) >= 0 && betweenDateNumber(k.dataValues.timeStart, filterNextTomorrow.end) <= 0),
    next2TomorrowActivities: _.filter(data, (k) => betweenDateNumber(k.dataValues.timeStart, filterNext2Tomorrow.start) >= 0 && betweenDateNumber(k.dataValues.timeStart, filterNext2Tomorrow.end) <= 0)
  }
  return obj
}