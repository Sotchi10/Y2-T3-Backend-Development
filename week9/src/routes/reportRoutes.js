import { Router } from "express";
import {
  highPerformingStudents,
  searchScores,
  fullAcademicReport,
  studentAverages,
  studentPerformance,
  coursePerformance,
  majorPerformance,
  topStudents,
  atRiskStudents,
  passRate
} from "../controllers/reportController.js";

const router = Router();

// Exercises 1–5
router.get("/high-performing-students", highPerformingStudents);
router.get("/scores", searchScores);
router.get("/full-academic-report", fullAcademicReport);
router.get("/student-averages", studentAverages);

// Part 11: Academic Performance API
router.get("/student-performance", studentPerformance);
router.get("/course-performance", coursePerformance);
router.get("/major-performance", majorPerformance);
router.get("/top-students", topStudents);
router.get("/at-risk-students", atRiskStudents);
router.get("/pass-rate", passRate);

export default router;
