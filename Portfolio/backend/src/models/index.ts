import database from 'sequelize';
import { databaseConfig as db } from '../config/database';
import { Users } from './users';
import { Articles } from './articles';
import { Comments } from './comments';
import { ChatMessages } from './chatMessages';
import { ChatParticipants } from './chatParticipants';
import { ChatRooms } from './chatRooms';
import { Faqs } from './faqs';
import env from '../modules/env';

const sequelize = new database.Sequelize(
  db[env.node_env].dbname, //스키마 이름
  db[env.node_env].username,
  db[env.node_env].password,
  {
    host: db[env.node_env].host, //데이터베이스가 실행중인 호스트
    port: db[env.node_env].port,
    dialect: 'mysql', //어떤 SQL언어를 사용할 것인지 설정
    timezone: '+09:00', // DB에 저장할 때 시간 설정
    define: {
      //DB 설정
      charset: 'utf8',
      collate: 'utf8_general_ci',
      timestamps: false,
      freezeTableName: true, //모든 TableName을 복수형이 아닌 Model을 설정시 입력한 이름 그대로 사용하게 해준다.
    },
    dialectOptions: {
      timezone: '+09:00', // DB에서 가져올 때 시간 설정
    },
    //logQueryParameters: process.env.NODE_ENV === 'development', //로깅을 할것인지 여부
    logQueryParameters: true,
    logging: (query) => {
      //쿼리가 실행되는 경우 그 쿼리문자열을 전달하여 실행할 콜백함수
      console.log('DB_LOGGER==========', query);
    },
  },
);

export function Sequelize() {
  Users.initModel(sequelize);
  Articles.initModel(sequelize);
  Comments.initModel(sequelize);
  ChatMessages.initModel(sequelize);
  ChatRooms.initModel(sequelize);
  ChatParticipants.initModel(sequelize);
  Faqs.initModel(sequelize);

  //Foreign key 관계의 경우 관계를 만드는 상위 테이블은 Unique 하거나 Primary 이어야 합니다. 또한 같은 데이터 타입 이어야 합니다.
  //Articles.hasMany(Users, { foreignKey: 'user_id', sourceKey: 'id' });
  //Users.belongsTo(Articles, { foreignKey: 'user_id', targetKey: 'user_id' });
  Articles.hasOne(Comments, { foreignKey: 'article_ref', sourceKey: 'id' });
  ChatRooms.hasOne(ChatMessages, { foreignKey: 'room_id', sourceKey: 'id' });
  ChatRooms.hasOne(ChatParticipants, { foreignKey: 'room_id', sourceKey: 'id' });
  return sequelize;
}

// sequelize
//   .authenticate() authenticate 메소드로 DB 연결 확인
//   .then(() => {
//       console.log('Connection has been established successfully.');
//   })
//   .catch(err => {
//     console.log('Unable to connect to the database:', err);
//   });

// const db = {
//   sequelize,
//   database,
//   Users,
//   Articles,
// };

//export default db;
