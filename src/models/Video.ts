import { Model, DataTypes } from "sequelize";
import db from "../config/database";
class Video extends Model {}

Video.init(
  {
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    url: {
      type: DataTypes.STRING,
      allowNull: true,
      unique: true,
    },
    author: {
      // Nuevo atributo
      type: DataTypes.STRING,
      allowNull: true,
    },
  },
  {
    sequelize: db,
    modelName: "video",
    timestamps: true,
  }
);
export default Video;
