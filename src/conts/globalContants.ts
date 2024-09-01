import dotenv from "dotenv";
dotenv.config();

interface Config {
  NODE_ENV?: string;
  DIALECT: "postgres" | "mysql" | "sqlite" | "mariadb" | "mssql";
  DIALECTDEV: "postgres" | "mysql" | "sqlite" | "mariadb" | "mssql";
  HOST?: string;
  HOSTDEV?: string;
  DB_PORT: number;
  DB_PORTDEV: number;
  PORT: number;
  PORTDEV: number;
  DB_NAME?: string;
  DB_NAMEDEV?: string;
  DB_USERNAME?: string;
  DB_USERNAMEDEV?: string;
  SECRET?: string;
  SECRETDEV?: string;
  DB_PASSWORD?: string;
  DB_PASSWORDDEV?: string;
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

  // ENTORNO DEV
  DIALECTDEV: process.env.DIALECT as
    | "postgres"
    | "mysql"
    | "sqlite"
    | "mariadb"
    | "mssql",
  HOSTDEV: process.env.HOSTDEV,
  PORTDEV: Number(process.env.PORTDEV) || 8000,
  DB_PORTDEV: Number(process.env.DB_PORTDEV),
  DB_USERNAMEDEV: process.env.DB_USERNAMEDEV,
  DB_PASSWORDDEV: process.env.DB_PASSWORDDEV,
  DB_NAMEDEV: process.env.DB_NAMEDEV,
  SECRETDEV: process.env.SECRET,
  NODE_ENV: process.env.NODE_ENV,
};

export default config;
