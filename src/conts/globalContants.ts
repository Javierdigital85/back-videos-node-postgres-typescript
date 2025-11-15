import dotenv from "dotenv";
dotenv.config();

const isDevelopment = process.env.NODE_ENV === "development";

// Helper para validar variables requeridas
const required = (key: string): string => {
  const value = process.env[key];
  if (!value) {
    throw new Error(`${key} is not defined in environment variables`);
  }
  return value;
};

// Helper para valores opcionales con default
const optional = (key: string, defaultValue: string): string => {
  return process.env[key] || defaultValue;
};

interface Config {
  NODE_ENV: string;
  DIALECT: "postgres" | "mysql" | "sqlite" | "mariadb" | "mssql";
  HOST: string;
  DB_PORT: number;
  PORT: number;
  DB_NAME: string;
  DB_USERNAME: string;
  DB_PASSWORD: string;
  SECRET: string;
  FRONTEND_URL: string;
  NODEMAILER_HOST: string;
  NODEMAILER_EMAIL: string;
  NODEMAILER_PASS: string;
}

const config: Config = {
  NODE_ENV: optional("NODE_ENV", "development"),
  DIALECT: optional("DIALECT", "postgres") as Config["DIALECT"],

  // Database - diferentes valores según entorno
  HOST: isDevelopment ? optional("HOST", "localhost") : required("HOST"),
  DB_PORT: Number(optional("DB_PORT", "5432")),
  DB_NAME: isDevelopment
    ? optional("DB_NAME", "postgres")
    : required("DB_NAME"),
  DB_USERNAME: isDevelopment
    ? optional("DB_USERNAME", "postgres")
    : required("DB_USERNAME"),
  DB_PASSWORD: isDevelopment
    ? optional("DB_PASSWORD", "")
    : required("DB_PASSWORD"),

  // Server
  PORT: Number(optional("PORT", isDevelopment ? "8000" : "5000")),

  // Security
  SECRET: required("SECRET"),

  // Frontend
  FRONTEND_URL: isDevelopment
    ? optional("FRONTEND_URL", "http://localhost:5173")
    : required("FRONTEND_URL"),

  // Email
  NODEMAILER_HOST: required("NODEMAILER_HOST"),
  NODEMAILER_EMAIL: required("NODEMAILER_EMAIL"),
  NODEMAILER_PASS: required("NODEMAILER_PASS"),
};

export default config;
