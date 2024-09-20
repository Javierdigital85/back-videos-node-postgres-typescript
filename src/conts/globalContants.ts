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
  SECRET: string;
  DB_PASSWORD?: string;
  DB_PASSWORDDEV?: string;
  FRONTEND_URL: string;
  NODEMAILER_HOST: string;
  NODEMAILER_EMAIL: string;
  NODEMAILER_PASS: string;
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
  SECRET:
    process.env.SECRET ||
    (() => {
      throw new Error("SECRET in not defined");
    })(),
  FRONTEND_URL: process.env.FRONTEND_URL || "http://localhost:5173",
  // ENTORNO DEV
  DIALECTDEV: process.env.DIALECT as
    | "postgres"
    | "mysql"
    | "sqlite"
    | "mariadb"
    | "mssql",
  HOSTDEV: process.env.HOSTDEV,
  PORTDEV: Number(process.env.PORTDEV) || 8000,
  DB_PORTDEV: Number(process.env.DB_PORTDEV) || 5432,
  DB_USERNAMEDEV: process.env.DB_USERNAMEDEV,
  DB_PASSWORDDEV: process.env.DB_PASSWORDDEV,
  DB_NAMEDEV: process.env.DB_NAMEDEV,
  NODE_ENV: process.env.NODE_ENV,
  NODEMAILER_HOST:
    process.env.NODEMAILER_HOST ||
    (() => {
      throw new Error("NODEMAILER is not defined");
    })(),
  NODEMAILER_EMAIL:
    process.env.NODEMAILER_EMAIL ||
    (() => {
      throw new Error("NODEMAILER_EMAIL is not defined");
    })(),
  NODEMAILER_PASS:
    process.env.NODEMAILER_PASS ||
    (() => {
      throw new Error("NODEMAILER_PASS is not defined");
    })(),
};

export default config;
//es mejor manejar los error lanzando un throw error que usar ? por ej: NODEMAILER_HOST?: string;
