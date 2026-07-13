import express from "express";

import {
    seedDatabase,
    getStudentAttendanceOnDate,
    markAttendance,
    getClassAttendance,
    getStudentAttendanceSummary,
} from "../controller/attendanceController.js";

const attendanceRoutes = express.Router();

attendanceRoutes.post("/seed", seedDatabase);

attendanceRoutes.post("/attendance", markAttendance);
attendanceRoutes.get("/attendance", getStudentAttendanceOnDate);

attendanceRoutes.get("/classes/:id/attendance", getClassAttendance);

attendanceRoutes.get("/students/:id/attendance", getStudentAttendanceSummary);

export default attendanceRoutes;