import { Sequelize, DataTypes, Model } from 'sequelize';

// 테이블에 존재하는 중요 컬럼 인터페이스
export interface Card {
  cardId: number;
  using: boolean;
  type: number;
  deletedAt: Date;
}

// Model.create()시 필요한 컬럼을 지정함
type CardCreateInterface = Pick<Card, 'type'>;

export class CardModel extends Model<Card, CardCreateInterface> implements Card {
  public cardId: number;
  public using: boolean;
  public type: number;
  public deletedAt: Date;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

// 모델을 생성하는 함수
export default function(sequelize: Sequelize): typeof CardModel {
  CardModel.init(
    {
      cardId: {
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
      },
      using: {
        allowNull: false,
        type: DataTypes.BOOLEAN,
        defaultValue: false
      },
      type: {
        allowNull: false,
        type: DataTypes.INTEGER
      },
      deletedAt: {
        type: DataTypes.INTEGER,
        allowNull: true
      }
    },
    {
      tableName: 'card', // table 이름 지정
      modelName: 'card', // 모델의 이름 지정
      sequelize,
    }
  );

  return CardModel;
}