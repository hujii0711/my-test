import { Sequelize, DataTypes, Model } from 'sequelize';

// These are all the attributes in the User model
interface UsersAttributes {
  id: number | null;
  email : string;
  password : string | null;
  nickname : string;
  age : number;
  sex : boolean;
}

export class Users extends Model<UsersAttributes>{
  public readonly id! : number;
  public email! : string;
  public password! : string;
  public nickname! : string;
  public age! : number;
  public sex! : boolean;
}

export default function(sequelize: Sequelize) {
 
  Users.init(
    {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true, // 자동증가 여부
      },
      email : {
          type : DataTypes.STRING(45),
          allowNull: false
      },
      password : {
          type : DataTypes.STRING(45),
          allowNull : true
      },
      nickname : {
          type : DataTypes.STRING(45),
          allowNull : false
      },
      age : {
          type : DataTypes.INTEGER,
          allowNull : false
      },
      sex : {
          type : DataTypes.BOOLEAN,
          allowNull : false
      }
    },
    {
        sequelize,
        modelName : 'Users',
        tableName : 'users',
    }
  )
  console.log("Users====", Users)
  return Users;
};