import { Sequelize } from "sequelize-typescript";
import globalContants from "../conts/globalContants";

let sequelize: Sequelize;
if (globalContants.NODE_ENV === "development") {
  sequelize = new Sequelize({
    dialect: globalContants.DIALECTDEV || "postgres",
    host: globalContants.HOSTDEV,
    port: globalContants.DB_PORTDEV,
    username: globalContants.DB_USERNAMEDEV,
    password: globalContants.DB_PASSWORDDEV,
    database: globalContants.DB_NAMEDEV,
    logging: false,
  });
} else {
  sequelize = new Sequelize({
    dialect: globalContants.DIALECT || "postgres",
    host: globalContants.HOST,
    port: globalContants.DB_PORT,
    username: globalContants.DB_USERNAME,
    password: globalContants.DB_PASSWORD,
    database: globalContants.DB_NAME,
    logging: false,
  });
}

export default sequelize;
