import { Sequelize } from "sequelize-typescript";
import globalConstants from "../conts/globalContants";

const isDevelopment = globalConstants.NODE_ENV === "development";

const sequelize = new Sequelize({
  dialect: globalConstants.DIALECT,
  host: globalConstants.HOST,
  port: globalConstants.DB_PORT,
  username: globalConstants.DB_USERNAME,
  password: globalConstants.DB_PASSWORD,
  database: globalConstants.DB_NAME,
  logging: isDevelopment ? console.log : false,

  // Configuración adicional solo en producción
  ...(isDevelopment
    ? {}
    : {
        dialectOptions: {
          ssl: {
            require: true,
            rejectUnauthorized: false,
          },
        },
        pool: {
          max: 5,
          min: 0,
          acquire: 30000,
          idle: 10000,
        },
      }),
});

console.log(
  `Database configured for ${isDevelopment ? "development" : "production"}`
);

export default sequelize;
