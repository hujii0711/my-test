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
        username: {
          type: Sequelize.STRING,
          allowNull: false,
        },
        hashedPassword: {
          type: Sequelize.STRING,
          allowNull: false,
        },
        // id: {
        //   type: Sequelize.INTEGER,
        //   allowNull: false,
        //   primaryKey: true,
        //   autoIncrement: true, // 자동증가 여부
        // },
        // userId: {
        //   type: Sequelize.STRING(30),
        //   allowNull: false,
        // },
        // userPwd: {
        //   type: Sequelize.STRING,
        //   allowNull: false,
        // },
        // userName: {
        //   type: Sequelize.STRING(20),
        //   allowNull: false,
        // },
        // profile: {
        //   type: Sequelize.STRING(30),
        //   allowNull: false,
        // },
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

  static findByUserInfo = (username) => {
    return this.findOne({
      attributes: ['id', 'username', 'hashedPassword'],
      where: { username },
      raw: true,
    });
  };

  // static checkPassword = (userPwd) => {
  //   return this.findOne({
  //     attributes: ['userPwd'],
  //     where: { userPwd },
  //     raw: true,
  //   });
  // };

  //static serialize = function() {
  //  const data = this.toJSON();
  //  return data;
  //};
};
