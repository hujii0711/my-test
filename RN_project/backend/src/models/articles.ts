import { Sequelize, DataTypes, Model, Association } from 'sequelize';
import {Users} from './users';


interface ArticlesAttributes {
  id: number;
  title : string;
  contents? : string;
  user_id? : string;
  user_name? : string;
  created_at? : Date;
  updated_at? : Date;
}

export class Articles extends Model<ArticlesAttributes> implements ArticlesAttributes{

  public readonly id! : number;
  public title! : string;
  public contents! : string;
  public user_id! : string;
  public user_name! : string;
  public created_at! : Date;
  public updated_at! : Date;

  public static initModel(sequelize: Sequelize) : typeof Articles {

    Articles.init(
      {
        id: {
          type: DataTypes.INTEGER,
          allowNull: false,
          primaryKey: true,
          autoIncrement: true, // 자동증가 여부
        },
        title : {
            type : DataTypes.STRING(100),
            allowNull: false
        },
        contents : {
            type : DataTypes.STRING(1000),
            allowNull : false
        },
        user_id : {
            type : DataTypes.STRING(30),
            allowNull : false,
        },
        user_name : {
          type : DataTypes.STRING(30),
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
          modelName : 'Articles',
          tableName : 'articles',
      }
    )
    return Articles;
  }

  public static associations: {
    projects: Association<Articles, Users>;
  };
}