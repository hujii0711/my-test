import { Sequelize, DataTypes, Model, Association } from 'sequelize';
import {Users} from './users';


interface CommentsAttributes {
  id: number;
  message : string;
  user_id : number;
  created_at? : Date;
  updated_at? : Date;
}

export class Comments extends Model<CommentsAttributes> implements CommentsAttributes{

  public readonly id! : number;
  public message! : string;
  public user_id! : number;
  public created_at! : Date;
  public updated_at! : Date;

  public static initModel(sequelize: Sequelize) : typeof Comments {

    Comments.init(
      {
        id: {
          type: DataTypes.INTEGER,
          allowNull: false,
          primaryKey: true,
          autoIncrement: true,
        },
        message : {
            type : DataTypes.STRING(300),
            allowNull : false
        },
        user_id : {
            type : DataTypes.INTEGER,
            allowNull : false
        },
        created_at : {
            type : DataTypes.DATE,
            allowNull : false,
            defaultValue: DataTypes.NOW
        },
        updated_at : {
            type : DataTypes.DATE,
            allowNull : false,
            defaultValue: DataTypes.NOW
        }
      },
      {
          sequelize,
          modelName : 'Comments',
          tableName : 'Comments',
      }
    )
    return Comments;
  }

  public static associations: {
    projects: Association<Comments, Users>;
  };
}