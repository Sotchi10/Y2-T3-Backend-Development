import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";

const AttendanceRecord = sequelize.define("AttendanceRecord", {
    date: {
        type: DataTypes.DATEONLY,
        allowNull: false,
    },
    status: {
        type: DataTypes.ENUM("Present", "Absent", "Late"),
        defaultValue: "Present",
    },
    studentId: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    classId: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
});

export default AttendanceRecord;