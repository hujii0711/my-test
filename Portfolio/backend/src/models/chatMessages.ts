import { Sequelize, DataTypes, Model, Association } from 'sequelize';
import { ChatMessageAttributes } from './types';
import { ChatRooms } from './chatRooms';

export class ChatMessages extends Model<ChatMessageAttributes> implements ChatMessageAttributes {
  public readonly id!: number;
  public room_id!: string;
  public message!: string;
  public sender_id!: string;
  public receiver_id!: string;
  public file_name!: string;
  public created_at!: Date;

  public static initModel(sequelize: Sequelize): typeof ChatMessages {
    ChatMessages.init(
      {
        id: {
          type: DataTypes.INTEGER,
          allowNull: false,
          primaryKey: true,
          autoIncrement: true,
        },
        room_id: {
          type: DataTypes.UUID,
          defaultValue: DataTypes.UUIDV4,
          allowNull: false,
          primaryKey: true,
        },
        message: {
          type: DataTypes.STRING(1000),
          allowNull: true,
        },
        sender_id: {
          type: DataTypes.STRING(50),
          allowNull: false,
        },
        receiver_id: {
          type: DataTypes.STRING(50),
          allowNull: false,
        },
        file_name: {
          type: DataTypes.STRING(200),
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
        modelName: 'ChatMessages',
        tableName: 'chat_messages',
      },
    );
    return ChatMessages;
  }
  public static associations: {
    projects: Association<ChatMessages, ChatRooms>;
  };
}
