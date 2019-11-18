import { Sequelize } from "sequelize";
import databaseConfig from '../../config/database.json';

const env = process.env.NODE_ENV || "development";
const config = databaseConfig[env];

export const database = new Sequelize(config.database, config.username, config.password, config);