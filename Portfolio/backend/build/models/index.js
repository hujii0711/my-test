'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
exports.sequelize = void 0;
const sequelize_1 = require('sequelize');
const database_1 = require('../config/database');
// export const sequelize = new Sequelize('typescript_test', 'root','Jaehyeon2!',{
//     host : 'localhost',
//     dialect : 'mysql',
// })
exports.sequelize = new sequelize_1.Sequelize(
  database_1.database.development.dbname,
  database_1.database.development.username,
  database_1.database.development.password,
  {
    host: database_1.database.development.host,
    dialect: 'mysql',
  },
);
