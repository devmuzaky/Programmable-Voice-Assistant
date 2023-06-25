import {DataTypes, Model} from 'sequelize';
import sequelize from '../config';

class Command extends Model {
  public id: number;
  public name: string;
  public executable_path: string;
}

Command.init(
  {
    id: {
      primaryKey: true,
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    executable_path: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {sequelize, modelName: 'Command'}
);

export default Command;
