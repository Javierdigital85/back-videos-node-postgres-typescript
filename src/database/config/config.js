// eslint-disable-next-line @typescript-eslint/no-require-imports
require("dotenv").config();
module.exports = {
  development: {
    username: process.env.DB_USERNAMEDEV,
    password: process.env.DB_PASSWORDDEV,
    database: process.env.DB_NAMEDEV,
    host: "127.0.0.1",
    dialect: process.env.DIALECTDEV,
  },
  test: {
    username: "root",
    password: null,
    database: "database_test",
    host: "127.0.0.1",
    dialect: "mysql",
  },
  production: {
    username: "root",
    password: null,
    database: "database_production",
    host: "127.0.0.1",
    dialect: "mysql",
  },
};
