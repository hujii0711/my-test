import {Sequelize} from 'sequelize';
import {database} from '../config/database';
import User from './user';

export const sequelize = new Sequelize(
  database.development.dbname, //스키마 이름
  database.development.username,
  database.development.password,
  {
    host: database.development.host, //데이터베이스가 실행중인 호스트
    port: database.development.port,
    dialect: 'mysql', //어떤 SQL언어를 사용할 것인지 설정
    define: { //DB 설정
      charset: 'utf8',
      collate: 'utf8_general_ci',
      freezeTableName: true //모든 TableName을 복수형이 아닌 Model을 설정시 입력한 이름 그대로 사용하게 해준다.
    },
    logQueryParameters: process.env.NODE_ENV === 'development', //로깅을 할것인지 여부
    logging: (query, time) => { //쿼리가 실행되는 경우 그 쿼리문자열을 전달하여 실행할 콜백함수
      console.log(time + 'ms' + ' ' + query);
    }
  }
);

const db = {
  sequelize,
  Sequelize,
  User
};

User(db.sequelize);

export default db;