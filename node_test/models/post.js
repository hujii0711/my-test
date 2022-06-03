const Sequelize = require('sequelize');

module.exports = class Post extends Sequelize.Model {
  static init(sequelize) {
    return super.init(
      {
        id: {
          type: Sequelize.INTEGER,
          allowNull: false,
          primaryKey: true,
          autoIncrement: true, // 자동증가 여부
        },
        title: {
          type: Sequelize.STRING,
          allowNull: false,
        },
        body: {
          type: Sequelize.STRING(3000),
          allowNull: false,
        },
        tags: {
           type: Sequelize.JSON,
           allowNull: true,
        },
        publishedDate: {
          type: Sequelize.DATE,
          allowNull: false,
          defaultValue: Sequelize.NOW,
        },
        user: {
          type: Sequelize.STRING(30),
          allowNull: false,
        }
      },
      {
        sequelize,
        timestamps: false,
        underscored: false,
        modelName: 'Post',
        tableName: 'post',
        paranoid: false,
        charset: 'utf8',
        collate: 'utf8_general_ci',
      }
    );
  }
  static findAllPost= () => {
    return this.findAll({
      raw: true,
    });
  };
};
