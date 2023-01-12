import Sequelize, { DataTypes } from 'sequelize';

class Test extends Sequelize.Model {
  static init(sequelize) {
    return super.init(
      {
        id: {
          type: DataTypes.INTEGER,
          allowNull: false,
          primaryKey: true,
          autoIncrement: true, // 자동증가 여부
        },
        user_id: {
          type: DataTypes.STRING(50),
          allowNull: false,
        },
        user_name: {
          type: DataTypes.STRING(50),
          allowNull: false,
        },
        pwd: {
          type: DataTypes.STRING(20),
          allowNull: false,
        },
        sex: {
          type: DataTypes.STRING(10),
          allowNull: true,
        },
        address: {
          type: DataTypes.STRING(50),
          allowNull: true,
        },
        created_at: {
          type: DataTypes.DATE,
          allowNull: false,
          defaultValue: DataTypes.NOW,
        },
      },
      {
        sequelize,
        modelName: 'Test',
        tableName: 'tests',
      }
    );
  }
}

export default Test;
