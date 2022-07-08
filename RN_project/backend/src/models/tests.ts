import { Sequelize, DataTypes, Model } from 'sequelize';

interface TestsAttributes {
  id?: number | null;
  username : string;
  created_at? : Date;
  updated_at? : Date;
}

export class Tests extends Model<TestsAttributes> implements TestsAttributes {

  public readonly id! : number;
  public username! : string;
  public created_at! : Date;
  public updated_at! : Date;

  public static initModel(sequelize: Sequelize) : typeof Tests {

    Tests.init(
      {
        id: {
          type: DataTypes.INTEGER,
          allowNull: false,
          primaryKey: true,
          autoIncrement: true,
        },
        username : {
            type : DataTypes.STRING(30),
            allowNull: false
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
          modelName : 'Tests',
          tableName : 'tests',
      }
    )
    return Tests;
  }
}
