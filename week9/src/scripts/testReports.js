import "dotenv/config";
import app from "../app.js";
import sequelize from "../config/database.js";

const endpoints = [
  "/api/reports/high-performing-students",
  "/api/reports/scores?keyword=a",
  "/api/reports/full-academic-report",
  "/api/reports/student-averages",
  "/api/reports/student-performance",
  "/api/reports/course-performance",
  "/api/reports/major-performance",
  "/api/reports/top-students",
  "/api/reports/at-risk-students",
  "/api/reports/pass-rate"
];

let server;
try {
  await sequelize.authenticate();
  server = app.listen(0);
  await new Promise((resolve) => server.once("listening", resolve));
  const port = server.address().port;

  for (const endpoint of endpoints) {
    const response = await fetch(`http://127.0.0.1:${port}${endpoint}`);
    if (!response.ok) throw new Error(`${endpoint} returned ${response.status}`);
    console.log(`PASS ${endpoint}`);
  }
} finally {
  if (server) await new Promise((resolve) => server.close(resolve));
  await sequelize.close();
}
