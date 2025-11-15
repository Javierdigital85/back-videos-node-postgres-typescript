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
  RESEND_API_KEY?: string;
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

  // Email - Nodemailer (solo desarrollo)
  NODEMAILER_HOST: optional("NODEMAILER_HOST", "smtp.gmail.com"),
  NODEMAILER_EMAIL: optional("NODEMAILER_EMAIL", ""),
  NODEMAILER_PASS: optional("NODEMAILER_PASS", ""),

  // Email - Resend (solo producción)
  RESEND_API_KEY: process.env.RESEND_API_KEY,
};

export default config;
