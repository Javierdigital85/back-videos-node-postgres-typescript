import dotenv from "dotenv";
dotenv.config();

interface Config {
  DIALECT: "postgres" | "mysql" | "sqlite" | "mariadb" | "mssql";
  HOST?: string;
  DB_PORT: number;
  PORT: number;
  DB_NAME?: string;
  DB_USERNAME?: string;
  SECRET?: string;
  DB_PASSWORD?: string;
}

const config: Config = {
  DIALECT: process.env.DIALECT as
    | "postgres"
    | "mysql"
    | "sqlite"
    | "mariadb"
    | "mssql",
  HOST: process.env.HOST,
  PORT: Number(process.env.PORT) || 5000,
  DB_PORT: Number(process.env.DB_PORT),
  DB_USERNAME: process.env.DB_USERNAME,
  DB_PASSWORD: process.env.DB_PASSWORD,
  DB_NAME: process.env.DB_NAME,
  SECRET: process.env.SECRET,
};

export default config;
