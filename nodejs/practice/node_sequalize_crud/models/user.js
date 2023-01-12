const Sequelize = require('sequelize');

// - VARCHAR : STRING
// - INT : INTEGER
// - TINYINT : BOOLEAN
// - DATETIME : DATE
// - NOT NULL : allowNull
// - UNIQUE : unique
// - DEFAULT : defaultValue
// - UNSIGNED : INTEGER.UNSIGNED
// - ZEROFILL : INTEGER.UNSIGNED.ZEROFILL
module.exports = class User extends Sequelize.Model {
  static init(sequelize) {
    return super.init({
      name: {
        type: Sequelize.STRING(20),
        allowNull: false,
        unique: true,
      },
      age: {
        type: Sequelize.INTEGER.UNSIGNED,
        allowNull: false,
      },
      married: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
      },
      comment: {
        type: Sequelize.TEXT,
        allowNull: true,
      },
      created_at: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.NOW,
      },
    }, {
      sequelize,
      timestamps: false,// 따로 created_at컬럼을 만들었으므로 자동으로 createdAt 컬럼을 추가해주는 true옵션은 필요없다.
      underscored: false,
      modelName: 'User',
      tableName: 'users',
      paranoid: false,
      charset: 'utf8',
      collate: 'utf8_general_ci',
    });
  }

  static associate(db) {
    db.User.hasMany(db.Comment, { foreignKey: 'commenter', sourceKey: 'id' });
    //db.Comment -> N_테이블 정의
    //foreignKey: 'commenter' -> N_테이블의 외래키 컬럼을 정의
    //sourceKey: 'id' -> 1_테이블의 id 컬럼을 가리킨다.
  }
};
