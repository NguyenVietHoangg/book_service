import sequelize, { Op } from 'sequelize'
import * as Model from '../database/models'

class LegacyTable extends Model {}
LegacyTable.init({
  // ...
}, {
  modelName: 'chapter',
  tableName: 'chapter1',
  sequelize,
});
export default LegacyTable