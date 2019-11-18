import { Sequelize, Model, DataTypes, BuildOptions } from 'sequelize';
import { database } from '../../database/config/database';
import bcrypt from 'bcrypt';

export class User extends Model {
  public id!: number;
  public name!: string;
  public username!: string;
  public password!: string;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;

  public generateHash = password => {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
  };
  
  public validPassword = password => {
    return bcrypt.compareSync(password, this.password);
  };

}

User.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    name: {
      type: new DataTypes.STRING,
      allowNull: false
    },
    username: {
      type: new DataTypes.STRING,
      allowNull: false
    },
    password: {
      type: new DataTypes.STRING,
      allowNull: false
    }
  },
  {
    tableName: "Users",
    modelName: "User",
    sequelize: database // this bit is important
  }
);


User.sync();