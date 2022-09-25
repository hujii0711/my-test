import { Sequelize, DataTypes, Model, Association } from 'sequelize';
import { ChatRoomAttributes } from './types';
import { ChatMessages } from './chatMessages';

export class ChatRooms extends Model<ChatRoomAttributes> implements ChatRoomAttributes {
  public readonly id!: string;
  public creator_id!: string;
  public title!: string;
  public max_room!: number;
  public password!: string;
  public created_at!: Date;

  public static initModel(sequelize: Sequelize): typeof ChatRooms {
    ChatRooms.init(
      {
        id: {
          type: DataTypes.UUID,
          defaultValue: DataTypes.UUIDV4,
          allowNull: false,
          primaryKey: true,
        },
        creator_id: {
          type: DataTypes.STRING(50),
          allowNull: false,
        },
        title: {
          type: DataTypes.STRING(100),
          allowNull: true,
        },
        max_room: {
          type: DataTypes.INTEGER,
          allowNull: false,
          defaultValue: 0,
        },
        password: {
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
        modelName: 'ChatRooms',
        tableName: 'chat_rooms',
      },
    );
    return ChatRooms;
  }

  public static associations: {
    projects: Association<ChatRooms, ChatMessages>;
  };
}
