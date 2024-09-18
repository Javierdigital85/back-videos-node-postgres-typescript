import { Model, DataTypes } from "sequelize";
import db from "../config/database";
import User from "./User";

class Video extends Model {}

Video.init(
  {
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: User,
        key: "id",
      },
    },
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
  },
  {
    sequelize: db,
    modelName: "video",
    timestamps: true,
  }
);
export default Video;
