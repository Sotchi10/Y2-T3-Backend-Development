import express from "express";
import sequelize from "./src/config/database.js";
import "./src/models/index.js";
import attendanceRoutes from "./src/routes/attendanceRoute.js";
import app from "./src/app.js";

const PORT = 3000;
const startServer = async () => {
    try {
        await sequelize.authenticate();
        console.log("MySQL Database connection has been established successfully.");

        await sequelize.sync({ force: false });
        console.log("Database schema synchronized successfully.");

        app.listen(PORT, () => {
            console.log(`Server is running on port http://localhost:${PORT}`);
        });

    } catch (error) {
        console.error("Fatal error during server startup:", error);
        process.exit(1);
    }
};

startServer();