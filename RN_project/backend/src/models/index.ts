import database from "sequelize";
import { databaseConfig } from "../config/database";
import { Users } from "./users";
import { Articles } from "./articles";
import { Tests } from "./tests";
import { Comments } from "./comments";

const sequelize = new database.Sequelize(
  databaseConfig.development.dbname, //스키마 이름
  databaseConfig.development.username,
  databaseConfig.development.password,
  {
    host: databaseConfig.development.host, //데이터베이스가 실행중인 호스트
    port: databaseConfig.development.port,
    dialect: "mysql", //어떤 SQL언어를 사용할 것인지 설정
    timezone: "+09:00", // DB에 저장할 때 시간 설정
    define: {
      //DB 설정
      charset: "utf8",
      collate: "utf8_general_ci",
      timestamps: false,
      freezeTableName: true, //모든 TableName을 복수형이 아닌 Model을 설정시 입력한 이름 그대로 사용하게 해준다.
    },
    dialectOptions: {
      timezone: "+09:00", // DB에서 가져올 때 시간 설정
    },
    //logQueryParameters: process.env.NODE_ENV === 'development', //로깅을 할것인지 여부
    logQueryParameters: true,
    logging: (query) => {
      //쿼리가 실행되는 경우 그 쿼리문자열을 전달하여 실행할 콜백함수
      console.log("DB_LOGGER==========", query);
    },
  },
);

export function Sequelize() {
  Tests.initModel(sequelize);
  Articles.initModel(sequelize);
  Users.initModel(sequelize);
  Comments.initModel(sequelize);
  //Articles.hasMany(Users, { foreignKey: 'user_id', sourceKey: 'id' });
  //Users.belongsTo(Articles, { foreignKey: 'user_id', targetKey: 'user_id' });
  Articles.hasOne(Comments, { foreignKey: "articles_ref", sourceKey: "id" });
  //Foreign key 관계의 경우 관계를 만드는 상위 테이블은 Unique 하거나 Primary 이어야 합니다. 또한 같은 데이터 타입 이어야 합니다.
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
