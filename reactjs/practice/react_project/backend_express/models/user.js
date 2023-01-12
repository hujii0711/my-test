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
};
