import { Model, DataTypes } from "sequelize";
import db from "../config/database";
import Video from "./Video";
import User from "./User";

class Fav extends Model {}

Fav.init(
  {
    videoId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Video,
        key: "id",
      },
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: User,
        key: "id",
      },
    },
  },
  {
    sequelize: db,
    modelName: "favs",
    timestamps: true,
  }
);

export default Fav;
