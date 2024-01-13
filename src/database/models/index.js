'use strict';

const fs = require('fs');
const moment = require('moment');
const path = require('path');
const Sequelize = require('sequelize');
const { LIMIT } = require('./../../config/common');
const highlight = require('cli-highlight').highlight;
const basename = path.basename(__filename);
const env = process.env.NODE_ENV || 'development';

const timezone = require('./../../config/common').TIMEZONE
const config = require(__dirname + '/../config/config.js')[env];

const db = {};
const dialectOptions = {
  dateStrings: true,
  typeCast: true,
  multipleStatements: true
}
const opts = {
  define: {
    freezeTableName: true,
    charset: 'utf8',
    collate: 'utf8_general_ci'
  },
  logging(log) {
    console.log(highlight(log, {language: 'sql', ignoreIllegals: true}))
  }
}


let sequelize;
if (config.use_env_variable) {
  sequelize = new Sequelize(process.env[config.use_env_variable], {...config, ...opts, ...{timezone, dialectOptions}});
} else {
  sequelize = new Sequelize(config.database, config.username, config.password, {...config, ...opts, ...{timezone, dialectOptions}});
}

fs
  .readdirSync(__dirname)
  .filter(file => {
    return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js');
  })
  .forEach(file => {
    const model = require(path.join(__dirname, file))(sequelize, Sequelize.DataTypes)
    db[model.name] = model;
  });

Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;
db.pager = {
  currentPage: 1,
  perPage : LIMIT,
  segmentPage: 2,
  totalRows: 0,
  totalPage: 0,
  rows: []
}
db.setupInsert = function(data) {
  data.createdAt = moment().format('YYYY-MM-DD hh:mm:ss')
  data.updatedAt = null
  return data
}

db.setupUpdate = function(data) {
  data.updatedAt = moment().format('YYYY-MM-DD hh:mm:ss')
  return data
}
db.getMediaSource = function(item = null) {
  if (!item) {
    item = {
      "id": 1,
      "name": "1674980344-acbcef0f-71f6-4c79-aaf5-50f62f695c5c.png",
      "alt": null,
      "filename": "1674980344-acbcef0f-71f6-4c79-aaf5-50f62f695c5c.png",
      "path": "assets/uploads/2023/01/1674980344-acbcef0f-71f6-4c79-aaf5-50f62f695c5c.png",
      "type": "png",
      "mimetype": "image/png",
      "inside": true,
      "note": "default image",
      "link": `${process.env.MEDIA_URL}/assets/uploads/2023/01/1674980344-acbcef0f-71f6-4c79-aaf5-50f62f695c5c.png`
    }
  } else {
    item.link = `${process.env.MEDIA_URL}/${item.path}`
    item.url = item.link
  }
  return item
}

module.exports = db;