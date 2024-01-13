var moment = require('moment')
var shell = require('shelljs');
require('dotenv').config()
const ENVS_USE = ['development', 'development'];

if (process.env && process.env.NODE_ENV && !ENVS_USE.includes(process.env.NODE_ENV)) {
  console.log("==== Create database only using for development environment ====");
  process.exit()
}

if (process.env.ENABLE_RESET_DB && process.env.ENABLE_RESET_DB === '0') {
  console.log("==== Can not reset database, if reset it, please set ENABLE_RESET_DB to value 1  ====");
  process.exit()
}

var mysql = require('mysql')

const configdb = {
  development: {
    username: process.env.DEV_DB_USERNAME,
    password: process.env.DEV_DB_PASSWORD,
    database: process.env.DEV_DB_NAME,
    host: process.env.DEV_DB_HOSTNAME || 'localhost',
    port: process.env.DEV_DB_PORT || 3306,
    dialect: process.env.DB_DIALECT,
  },
  test: {
    username: process.env.CI_DB_USERNAME,
    password: process.env.CI_DB_PASSWORD,
    database: process.env.CI_DB_NAME,
    host: process.env.CI_DB_HOSTNAME || 'localhost',
    port: process.env.CI_DB_PORT || 3306,
    dialect: process.env.DB_DIALECT,
  },
  production: {
    username: process.env.PROD_DB_USERNAME,
    password: process.env.PROD_DB_PASSWORD,
    database: process.env.PROD_DB_NAME,
    host: process.env.PROD_DB_HOSTNAME || 'localhost',
    port: process.env.PROD_DB_PORT || 3306,
    dialect: process.env.DB_DIALECT,
  }
}

var setting = configdb[process.env.NODE_ENV]

var con = mysql.createConnection({
  host: setting.host,
  user: setting.username,
  password: setting.password
});

function timeout(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}
async function sleep(fn, ...args) {
  await timeout(3000);
  return fn(...args);
}

con.connect(function(err) {
  if (err) throw err;
  console.log("==== MySQL Connected! ====");
  var backupdb = process.env.BACKUP_DB_PATH
  if (backupdb) {
    var filebackupInSecond = backupdb+'/'+setting.database+'_'+moment().format('YYYY-MM-DD_HH_mm_ss')+'.sql'
    var filebackup = backupdb+'/'+setting.database+'_'+moment().format('YYYY-MM-DD_HH')+'.sql'
    // var sqlbackup = `mysqldump -u ${setting.username} -p'${setting.password}' ${setting.database} --no-create-info --ignore-table=${setting.database}.SequelizeMeta> ${filebackup}`
    var sqlbackup = `mysqldump -u ${setting.username} -p'${setting.password}' ${setting.database} > ${filebackup}`
    var sqlbackupInSecond = `mysqldump -u ${setting.username} -p'${setting.password}' ${setting.database} > ${filebackupInSecond}`
  } else {
    console.log('==== Error! Please set path BACKUP_DB_PATH in .env ====')
    process.exit(1)
  }
  shell.exec(sqlbackup);
  shell.exec(sqlbackupInSecond);
  console.log('==== '+setting.database+' DB backup completed! ====')
  setTimeout(function () {
    con.query("DROP DATABASE IF EXISTS "+setting.database, function (err) {
      if (err) throw err;
      console.log("==== Database "+setting.database+" droped ====");
      con.query("CREATE DATABASE "+setting.database+" CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci;", function (err) {
        if (err) throw err;
        console.log("==== Database "+setting.database+" created ====");
        var scriptShell = process.env.IS_RESTORE_DB && process.env.IS_RESTORE_DB === '1'? 'npx sequelize-cli db:migrate' : 'cd src/database && npx sequelize-cli db:migrate';
        shell.exec(scriptShell);
        if (process.env.IS_RESTORE_DB && process.env.IS_RESTORE_DB === '1') {
          setTimeout(function() {
            var sqlrestore = `mysql -u ${setting.username} -p'${setting.password}' ${setting.database} < ${filebackup}`
            shell.exec(sqlrestore);
            console.log("==== Database "+setting.database+" restored data ====");
            process.exit();
          }, 1000)
        } else {
          process.exit();
        }
      });
    });
  }, 5000);
});


