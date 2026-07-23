import "dotenv/config";
import app from "./app.js";
import { sequelize } from "./models/index.js";

const port = Number(process.env.PORT || 5000);

async function start() {
  try {
    await sequelize.authenticate();
    console.log("Database connection established");

    app.listen(port, () => {
      console.log(`API running at http://localhost:${port}`);
    });
  } catch (error) {
    console.error("Unable to start the API:", error);
    process.exit(1);
  }
}

start();
