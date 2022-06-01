const Sequelize = require('sequelize');

module.exports = class User extends Sequelize.Model {
  static init(sequelize) {
    return super.init(
      {
        id: {
          type: Sequelize.INTEGER,
          allowNull: false,
          primaryKey: true,
          autoIncrement: true, // 자동증가 여부
        },
        userId: {
          type: Sequelize.STRING,
          allowNull: false,
        },
        userPwd: {
          type: Sequelize.STRING,
          allowNull: false,
        },
        name: {
          type: Sequelize.STRING,
          allowNull: false,
        },
        profile: {
          type: Sequelize.TEXT,
          allowNull: false,
        },
      },
      {
        sequelize,
        timestamps: false,
        underscored: false,
        modelName: 'User',
        tableName: 'user',
        paranoid: false,
        charset: 'utf8',
        collate: 'utf8_general_ci',
      }
    );
  }

  static associate(db) {
    //db.User.hasMany(db.Comment, { foreignKey: 'commenter', sourceKey: 'id' });
  }

  static findByUserId = (userId) => {
    return this.findOne({
      attributes: ['id', 'userId', 'userPwd'],
      where: {
        userId: userId,
      }, // 축약 : findByUserId({ where: { userId } });
      raw: true,
    });
  };

  static checkPassword = (userPwd) => {
    return this.findOne({
      attributes: ['userPwd'],
      where: {
        userPwd: userPwd,
      },
      raw: true,
    });
  };

  //static serialize = function() {
  //  const data = this.toJSON();
  //  return data;
  //};
};
