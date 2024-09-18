import { Model, DataTypes } from "sequelize";
import db from "../config/database";
import bcrypt from "bcryptjs";

class User extends Model {
  public name!: string; // Esto debe ser de tipo `string`, alineado con `DataTypes.STRING`
  public email!: string;
  public password!: string;
  public salt!: string;
  public id!: number;
  public token!: string | null;

  hash(password: string, salt: string): Promise<string> {
    return bcrypt.hash(password, salt);
  }
  async validatePassword(password: string): Promise<boolean> {
    return await bcrypt.compare(password, this.password);
  }
}
// return await bcrypt.compare(password, this.password);

User.init(
  {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    token: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    salt: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  },
  { sequelize: db, modelName: "user", timestamps: true }
);

User.beforeCreate(async (user) => {
  const salt = bcrypt.genSaltSync(8);
  user.salt = salt;
  user.password = await user.hash(user.password, user.salt);
});

export default User;
