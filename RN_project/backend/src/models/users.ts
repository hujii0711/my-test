import { Sequelize, DataTypes, Model, Association } from "sequelize";
//import { Articles } from "./articles";
import { UsersAttributes } from "./types";

export class Users extends Model<UsersAttributes> implements UsersAttributes {
  public readonly id!: number;
  public user_id!: string;
  public user_name!: string;
  public email!: string;
  public password!: string;
  public provider!: string;
  public confirmed!: boolean;
  public blocked!: string;
  public jwt!: string;
  public created_at!: Date;
  public updated_at!: Date;

  public static initModel(sequelize: Sequelize): typeof Users {
    Users.init(
      {
        id: {
          type: DataTypes.INTEGER,
          allowNull: false,
          primaryKey: true,
          autoIncrement: true, // 자동증가 여부
        },
        user_id: {
          type: DataTypes.STRING(30),
          allowNull: false,
        },
        user_name: {
          type: DataTypes.STRING(30),
          allowNull: false,
        },
        email: {
          type: DataTypes.STRING(50),
          allowNull: false,
        },
        password: {
          type: DataTypes.STRING(100),
          allowNull: false,
        },
        provider: {
          type: DataTypes.STRING(30),
          allowNull: false,
          defaultValue: "local",
        },
        confirmed: {
          type: DataTypes.BOOLEAN,
          allowNull: false,
          defaultValue: true,
        },
        blocked: {
          type: DataTypes.STRING(30),
          allowNull: true,
        },
        jwt: {
          type: DataTypes.STRING(500),
          allowNull: false,
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
        sequelize, //static init 메서드의 매개변수와 연결되는 옵션으로 db.sequelize 객체를 넣어야 합니다.
        modelName: "Users",
        tableName: "users", //실제 MySQL에 생성되는 테이블 이름
      },
      //sequelize, //static init 메서드의 매개변수와 연결되는 옵션으로 db.sequelize 객체를 넣어야 합니다.
      //timestamps: false, //이 속성 값이 true면 시퀄라이즈는 createdAt과 updatedAt 컬럼을 추가합니다.
      //underscored: false, // 테이블명과 컬럼명을 캐멀 케이스(camel case)(예시: createdAt)로 만듭니다. 기본: false
      //modelName: 'Post', //모델 이름을 설정
      //tableName: 'post', //실제 데이터베이스의 테이블 이름이 됩니다
      //paranoid: false, //true로 설정하면 deletedAt이라는 컬럼이 생깁니다.
      //charset: 'utf8', //이모티콘까지 입력할 수 있게 하고 싶다면 utf8mb4와 utf8mb4_general_ci를 입력합니다.
      //collate: 'utf8_general_ci',
    );
    return Users;
  }

  //public static associations: {
  //  projects: Association<Users, Articles>;
  //};
}
