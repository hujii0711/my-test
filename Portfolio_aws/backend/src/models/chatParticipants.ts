import { Sequelize, DataTypes, Model, Association } from 'sequelize';
import { ChatParticipantAttributes } from './types';
import { ChatRooms } from './chatRooms';

export class ChatParticipants extends Model<ChatParticipantAttributes> implements ChatParticipantAttributes {
  public readonly id!: number;
  public room_id!: string;
  public participant_id!: string;
  public participant_name!: string;
  public created_at!: Date;

  public static initModel(sequelize: Sequelize): typeof ChatParticipants {
    ChatParticipants.init(
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
        participant_id: {
          type: DataTypes.STRING(50),
          allowNull: false,
        },
        participant_name: {
          type: DataTypes.STRING(50),
          allowNull: false,
        },
        created_at: {
          type: DataTypes.DATE,
          allowNull: false,
          defaultValue: DataTypes.NOW,
        },
      },
      {
        sequelize,
        modelName: 'ChatParticipants',
        tableName: 'chat_participants',
      },
    );
    return ChatParticipants;
  }
  public static associations: {
    projects: Association<ChatParticipants, ChatRooms>;
  };
}
