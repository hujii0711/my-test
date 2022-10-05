import Sequelize from 'sequelize';
import Test from './test.js';

const sequelize = new Sequelize('example', 'root', 'hj@1560813', {
  host: 'localhost', //데이터베이스가 실행중인 호스트
  port: 3307,
  dialect: 'mysql',
  timezone: '+09:00',
  define: {
    charset: 'utf8',
    collate: 'utf8_general_ci',
    timestamps: false,
    freezeTableName: true, //모든 TableName을 복수형이 아닌 Model을 설정시 입력한 이름 그대로 사용하게 해준다.
  },
  dialectOptions: {
    timezone: '+09:00',
  },
  logQueryParameters: true,
  logging: (query) => {
    console.log('DB_LOGGER==========', query);
  },
});

const db = {
  sequelize,
  sequelize,
};

Test.init(sequelize);

export default db;
