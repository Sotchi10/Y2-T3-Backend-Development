import express from "express";
import attendanceRoutes from "./routes/attendanceRoute.js";

const app = express();

app.use(express.json());

app.get("/", (req, res) => {
    res.json({
        message: "Welcome to EX-3 Attendance System API",
        endpoints: {
            seed: "POST /seed",
            markAttendance: "POST /attendance?studentId=1&date=2025-06-17",
            getAttendance: "GET /attendance?studentId=1&date=2025-06-17",
            getClassAttendance: "GET /classes/:id/attendance",
            getStudentSummary: "GET /students/:id/attendance",
        },
    });
});
app.use("/", attendanceRoutes);

export default app;