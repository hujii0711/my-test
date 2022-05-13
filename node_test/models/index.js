const Sequelize = require('sequelize');
const User = require('./user');

const config = {
    "username": "fujii0711",
    "password": "hj@1560813",
    "database": "example",
    "host": "127.0.0.1",
    "dialect": "mysql"
};

const sequelizeConf = new Sequelize("example", "fujii0711", "hj@1560813", config);
const db = {
    sequelize : sequelizeConf,
    Sequelize : Sequelize,
    User : User
};

User.init(db.sequelize);
User.associate(db);

module.exports = db;

