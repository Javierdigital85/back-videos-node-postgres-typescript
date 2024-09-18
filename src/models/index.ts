import User from "./User";
import Video from "./Video";

Video.belongsTo(User, { as: "user",foreignKey:"userId" });
User.hasMany(Video,{as:"video"})

export { User, Video };
