import sequelize from "../config/database.js";
import Student from "./Student.js";
import Score from "./Score.js";
import Course from "./Course.js";
import Major from "./Major.js";

Student.hasMany(Score, { foreignKey: "student_id", as: "scores" });
Score.belongsTo(Student, { foreignKey: "student_id", as: "student" });

Course.hasMany(Score, { foreignKey: "course_id", as: "scores" });
Score.belongsTo(Course, { foreignKey: "course_id", as: "course" });

Major.hasMany(Course, { foreignKey: "major_id", as: "courses" });
Course.belongsTo(Major, { foreignKey: "major_id", as: "major" });

export { sequelize, Student, Score, Course, Major };
