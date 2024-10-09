import { config as conf } from "dotenv";

conf();

const _config = {
  port: process.env.PORT,
  databaseURL: process.env.MONGO_STRING_CONNECTION,
};

export const config = Object.freeze(_config);
