import mysql from "mysql2/promise";
import dotenv from "dotenv";
import path from "path";

// getting the .env file where the credentials are there
dotenv.config({ path: path.resolve("./.env") });

let db;

// function to initialize db
export async function initDB() {
  if (!db) {
    try {
      db = await mysql.createConnection({
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASS,
        database: process.env.DB_NAME
      });

      // connection is established to mysql database
      console.log("Connected to MySQL database successfully!");
    } catch (err) {
      console.error("Error connecting to MySQL database:", err);
      process.exit(1);
    }
  }
  return db;
}

