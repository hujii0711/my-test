import { Sequelize, DataTypes, Model, Association } from 'sequelize';
import { Users } from './users';
import { CommentsAttributes } from './types';

export class Comments extends Model<CommentsAttributes> implements CommentsAttributes {
  public readonly id!: number;
  public message!: string;
  public user_id!: string;
  public article_ref!: number;
  public liked!: number;
  public unliked!: number;
  public created_at!: Date;
  public updated_at!: Date;

  public static initModel(sequelize: Sequelize): typeof Comments {
    Comments.init(
      {
        id: {
          type: DataTypes.INTEGER,
          allowNull: false,
          primaryKey: true,
          autoIncrement: true,
        },
        message: {
          type: DataTypes.STRING(300),
          allowNull: false,
        },
        user_id: {
          type: DataTypes.STRING(50),
          allowNull: false,
        },
        article_ref: {
          type: DataTypes.INTEGER,
          allowNull: false,
        },
        liked: {
          type: DataTypes.INTEGER,
          allowNull: false,
          defaultValue: 0,
        },
        unliked: {
          type: DataTypes.INTEGER,
          allowNull: false,
          defaultValue: 0,
        },
        created_at: {
          type: DataTypes.DATE,
          allowNull: false,
          defaultValue: DataTypes.NOW,
        },
        updated_at: {
          type: DataTypes.DATE,
          allowNull: false,
          defaultValue: DataTypes.NOW,
        },
      },
      {
        sequelize,
        modelName: 'Comments',
        tableName: 'comments',
      },
    );
    return Comments;
  }

  public static associations: {
    projects: Association<Comments, Users>;
  };
}
