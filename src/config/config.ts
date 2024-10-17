import { config as conf } from "dotenv";

conf();

const _config = {
  port: process.env.PORT,
  databaseURL: process.env.MONGO_STRING_CONNECTION,
  env: process.env.NODE_ENV,
};

export const config = Object.freeze(_config);

// import { config as conf } from "dotenv";

// conf();

// const _config = {
//   port: process.env.PORT,
//   mysqlHost: process.env.MYSQL_HOST,
//   mysqlUser: process.env.MYSQL_USER,
//   mysqlPassword: process.env.MYSQL_PASSWORD,
//   mysqlDatabase: process.env.MYSQL_DATABASE,
// };

// export const config = Object.freeze(_config);
