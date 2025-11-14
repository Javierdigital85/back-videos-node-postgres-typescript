import User from "./User";
import Video from "./Video";
import Fav from "./Favs";

Video.belongsTo(User, { as: "user", foreignKey: "userId" });
User.hasMany(Video, { as: "video" });

Fav.belongsTo(User, { as: "favourite", foreignKey: "userId" });
User.hasMany(Fav, { as: "favourite", foreignKey: "userId" });

Fav.belongsTo(Video, {
  as: "video",
  foreignKey: "videoId",
  onDelete: "CASCADE",
});
Video.hasMany(Fav, { as: "favourites", foreignKey: "videoId" });

export { User, Video, Fav };
