const Sequelize = require('sequelize');
const User = require('./user');
const Comment = require('./comment');

const env = process.env.NODE_ENV || 'development';
const config = require('../config/config')[env];
// {
//     username: 'fujii0711',
//     password: 'hj@1560813',
//     database: 'example',
//     host: '127.0.0.1',
//     dialect: 'mysql'
// }
const db = {};

const sequelize = new Sequelize(config.database, config.username, config.password, config);
db.sequelize = sequelize;
db.Sequelize = Sequelize;

// db 객체에 User와 Comment 모델을 담아두어서 앞으로 db 객체를 require하여 User, Comment 모델에 접근할 수 있다.
db.User = User;
db.Comment = Comment;

User.init(sequelize);
Comment.init(sequelize);

User.associate(db);
Comment.associate(db);

module.exports = db;
