import Class from "./Class.js";
import Student from "./Student.js";
import AttendanceRecord from "./attendanceRecord.js";


Class.hasMany(Student, {
    foreignKey: "classId",
    as: "students",
});

Student.belongsTo(Class, {
    foreignKey: "classId",
    as: "class",
});


Student.hasMany(AttendanceRecord, {
    foreignKey: "studentId",
    as: "attendanceRecords",
});

AttendanceRecord.belongsTo(Student, {
    foreignKey: "studentId",
    as: "student",
});


Class.hasMany(AttendanceRecord, {
    foreignKey: "classId",
    as: "attendanceRecords",
});

AttendanceRecord.belongsTo(Class, {
    foreignKey: "classId",
    as: "class",
});