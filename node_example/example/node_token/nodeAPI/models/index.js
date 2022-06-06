const Sequelize = require('sequelize');
const env = process.env.NODE_ENV || 'production';
const config = require('../config/database')[env];
const User = require('./user');
const Post = require('./post');
const Hashtag = require('./hashtag');

//시퀄라이즈는 ORM(Object-relational Mapping)으로 분류됩니다. 
//ORM은 자바스크립트 객체와 데이터베이스의 릴레이션을 매핑해주는 도구입니다.

//Sequelize는 시퀄라이즈 패키지이자 생성자입니다.
//config/database.json에서 데이터베이스 설정을 불러온 후 new Sequelize를 통해 MySQL 연결 객체를 생성합니다. 
//연결 객체를 나중에 재사용하기 위해 db.sequelize에 넣어두었습니다.
const _sequelize = new Sequelize(config.database, config.username, config.password, config);

const db = {
  sequelize : _sequelize,
  User : User,
  Post : Post,
  Hashtag : Hashtag,
};

//User.init과 Post.init은 각각의 모델의 static.init 메서드를 호출하는 것입니다.
//init이 실행되어야 테이블이 모델로 연결됩니다. 
User.init(_sequelize);
Post.init(_sequelize);
Hashtag.init(_sequelize);

//다른 테이블과의 관계를 연결하는 associate 메서드도 미리 실행해둡니다.
User.associate(db);
Post.associate(db);
Hashtag.associate(db);

//db 객체를 require하여 User와 Post, Hashtag 모델에 접근할 수 있습니다. 
module.exports = db;
