import moment from 'moment'
import { Op } from 'sequelize'

import * as Model from '../database/models'
const updateNewsPending = async () => {
  const time_now = moment().format('YYYY-MM-DD HH:mm')+':00'
  const sql = 'UPDATE story set status= "on" where status = "approved" AND publishedAt = "'+time_now+'"'
  Model.sequelize.query(sql);
  console.log('--- add to process updateNewsPending: '+ sql)
}
const run = () => {
  updateNewsPending()
}
export default {
  run
}