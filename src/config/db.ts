import mysql from "mysql2/promise";
import { config } from "./config";

const connectDB = async () => {
  try {
    const connection = await mysql.createConnection({
      host: config.mysqlHost,
      user: config.mysqlUser,
      password: config.mysqlPassword,
      database: config.mysqlDatabase,
    });
    console.log("Connected to MySQL database");

    return connection;
  } catch (err) {
    console.error("Failed to connect to MySQL database", err);
    process.exit(1);
  }
};

export default connectDB;

// If mysql do not work then use this code

// import mongoose from "mongoose";
// import { config } from "./config";

// const connectDB = async () => {
//   try {
//     mongoose.connection.on("connected", () => {
//       console.log("Connected to database");
//     });

//     mongoose.connection.on("error", (err) => {
//       console.error("Error on connecting to database", err);
//     });
//     await mongoose.connect(config.databaseURL as string);
//   } catch (err) {
//     console.error("Failed to connect to database", err);
//     process.exit(1);
//   }
// };

// export default connectDB;
