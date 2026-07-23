import "dotenv/config";
import { Umzug, SequelizeStorage } from "umzug";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";
import sequelize from "../config/database.js";

const task = process.argv[2];
if (task !== "migrate" && task !== "seed") {
  throw new Error("Usage: node databaseTasks.js <migrate|seed>");
}

const directory = dirname(fileURLToPath(import.meta.url));
const isSeed = task === "seed";
const runner = new Umzug({
  migrations: {
    glob: join(directory, `../../${isSeed ? "seeders" : "migrations"}/*.js`)
  },
  context: sequelize.getQueryInterface(),
  storage: new SequelizeStorage({
    sequelize,
    ...(isSeed ? { modelName: "SequelizeData" } : {})
  }),
  logger: console
});

try {
  await sequelize.authenticate();
  await runner.up();
  console.log(`${isSeed ? "Seed data" : "Migrations"} completed`);
} finally {
  await sequelize.close();
}
