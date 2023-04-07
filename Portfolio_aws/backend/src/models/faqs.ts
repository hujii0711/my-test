import { Sequelize, DataTypes, Model } from 'sequelize';
import { FaqAttributes } from './types';

export class Faqs extends Model<FaqAttributes> implements FaqAttributes {
  public readonly id!: number;
  public user_id!: string;
  public question!: string;
  public answer!: string;
  public created_at!: Date;
  public update_at!: Date;

  public static initModel(sequelize: Sequelize): typeof Faqs {
    Faqs.init(
      {
        id: {
          type: DataTypes.INTEGER,
          allowNull: false,
          primaryKey: true,
          autoIncrement: true,
        },
        user_id: {
          type: DataTypes.STRING(50),
          allowNull: false,
        },
        question: {
          type: DataTypes.STRING(100),
          allowNull: false,
        },
        answer: {
          type: DataTypes.STRING(100),
          allowNull: false,
        },
        created_at: {
          type: DataTypes.DATE,
          allowNull: false,
          defaultValue: DataTypes.NOW,
        },
        update_at: {
          type: DataTypes.DATE,
          allowNull: false,
          defaultValue: DataTypes.NOW,
        },
      },
      {
        sequelize,
        modelName: 'Faqs',
        tableName: 'faqs',
      },
    );
    return Faqs;
  }
}
