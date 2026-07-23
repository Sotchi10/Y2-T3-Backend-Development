import "dotenv/config";
import { Sequelize } from "sequelize";

const useSsl = process.env.DB_SSL === "true";

const sequelize = new Sequelize(
  process.env.DB_NAME || "academic_db",
  process.env.DB_USER || "root",
  process.env.DB_PASSWORD || "",
  {
    host: process.env.DB_HOST || "localhost",
    port: Number(process.env.DB_PORT || 3306),
    dialect: "mysql",
    logging: false,
    dialectOptions: useSsl
      ? { ssl: { rejectUnauthorized: false } }
      : {}
  }
);

export default sequelize;
