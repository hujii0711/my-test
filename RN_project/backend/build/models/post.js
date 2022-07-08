"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = __importDefault(require("sequelize"));
class Post extends sequelize_1.default.Model {
    static init(sequelize) {
        return super.init({
            id: {
                type: sequelize_1.default.INTEGER,
                allowNull: false,
                primaryKey: true,
                autoIncrement: true, // 자동증가 여부
            },
            title: {
                type: sequelize_1.default.STRING,
                allowNull: false,
            },
            body: {
                type: sequelize_1.default.STRING(3000),
                allowNull: false,
            },
            tags: {
                type: sequelize_1.default.JSON,
                allowNull: true,
            },
            publishedDate: {
                type: sequelize_1.default.DATE,
                allowNull: false,
                defaultValue: sequelize_1.default.NOW,
            },
            username: {
                type: sequelize_1.default.STRING(30),
                allowNull: true,
            },
        }, {
            sequelize,
            timestamps: false,
            underscored: false,
            modelName: 'Post',
            tableName: 'post',
            paranoid: false,
            charset: 'utf8',
            collate: 'utf8_general_ci',
        });
    }
}
exports.default = Post;
;
