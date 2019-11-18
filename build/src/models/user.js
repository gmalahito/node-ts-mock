"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const database_1 = require("../../database/config/database");
const bcrypt_1 = __importDefault(require("bcrypt"));
class User extends sequelize_1.Model {
    constructor() {
        super(...arguments);
        this.generateHash = password => {
            return bcrypt_1.default.hashSync(password, bcrypt_1.default.genSaltSync(8), null);
        };
        this.validPassword = password => {
            return bcrypt_1.default.compareSync(password, this.password);
        };
    }
}
exports.User = User;
User.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    name: {
        type: new sequelize_1.DataTypes.STRING,
        allowNull: false
    },
    username: {
        type: new sequelize_1.DataTypes.STRING,
        allowNull: false
    },
    password: {
        type: new sequelize_1.DataTypes.STRING,
        allowNull: false
    }
}, {
    tableName: "Users",
    modelName: "User",
    sequelize: database_1.database // this bit is important
});
User.sync();
//# sourceMappingURL=user.js.map