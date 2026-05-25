// server.js
import express from 'express';
import courses from "./course.js";
import requireToken from "./auth.js";
import logger from "./logger.js";
import validateQuery from "./validateQuery.js";

const app = express();
const PORT = 3000;

app.use(logger);

// Route: GET /departments/:dept/courses
app.get('/departments/:dept/courses', requireToken, validateQuery, (req, res) => {
    const { dept } = req.params;
    const { level, semester, instructor } = req.query;
    const { minCredits: min, maxCredits: max } = req.parsedCredits;
    // Implementing the filter logic
    // Hint: Use the filter method to filter the courses array based on the provided criteria

    let filteredCourses = courses.filter(course => {

        if (course.department !== dept) return false;

        if (level && course.level !== level) return false;

        if (semester && course.semester !== semester) return false;

        if (min !== undefined && course.credits < min) return false;

        if (max !== undefined && course.credits > max) return false;

        if (instructor && !course.instructor.toLowerCase().includes(instructor.toLowerCase())) {
            return false;
        }

        return true;
    });

    if (filteredCourses.length === 0) {
        return res.status(404).json({
            message: "No matching courses found"
        });
    }

    res.json(filteredCourses);
});


app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
