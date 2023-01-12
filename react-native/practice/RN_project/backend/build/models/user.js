"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Users = void 0;
const sequelize_1 = require("sequelize");
const index_1 = require("./index"); //방금 만들어주었던 sequelize객체 임포트
const scores_1 = require("./scores");
class Users extends sequelize_1.Model {
}
exports.Users = Users;
//----------------------------
Users.init({
    email: {
        type: sequelize_1.DataTypes.STRING(45),
        allowNull: false
    },
    password: {
        type: sequelize_1.DataTypes.STRING(45),
        allowNull: true
    },
    nickname: {
        type: sequelize_1.DataTypes.STRING(45),
        allowNull: false
    },
    age: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false
    },
    sex: {
        type: sequelize_1.DataTypes.BOOLEAN,
        allowNull: false
    }
}, {
    modelName: 'Users',
    tableName: 'Users',
    sequelize: index_1.sequelize,
    freezeTableName: true,
    timestamps: true,
    updatedAt: 'updateTimestamp'
});
Users.hasMany(scores_1.Scores, {
    sourceKey: "id",
    foreignKey: "user_id",
    as: 'userHasManyScores'
});
