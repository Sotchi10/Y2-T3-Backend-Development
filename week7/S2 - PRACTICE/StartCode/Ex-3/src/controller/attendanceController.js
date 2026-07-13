import { Sequelize as sequelize }  from "sequelize";
import AttendanceRecord from "../models/attendanceRecord.js";
import Class from "../models/Class.js";
import Student from "../models/Student.js";

export const seedDatabase = async (req, res) => {
    const t = await sequelize.transaction();

    try {
        await Promise.all([
            AttendanceRecord.destroy({ where: {}, transaction: t }),
            Student.destroy({ where: {}, transaction: t }),
            Class.destroy({ where: {}, transaction: t }),
        ]);

        const classes = await Class.bulkCreate(
            [
                { name: "Web Development", code: "WD101" },
                { name: "Mobile Programming", code: "MP102" },
            ],
            { returning: true, transaction: t }
        );

        const [classA, classB] = classes;

        const students = await Student.bulkCreate(
            [
                {
                    name: "John Doe",
                    email: "john@example.com",
                    classId: classA.id,
                },
                {
                    name: "Jane Smith",
                    email: "jane@example.com",
                    classId: classA.id,
                },
                {
                    name: "Bob Johnson",
                    email: "bob@example.com",
                    classId: classB.id,
                },
            ],
            { returning: true, transaction: t }
        );

        await t.commit();

        res.status(201).json({
            message: "Database seeded successfully",
            data: {
                classes,
                students,
            },
        });

    } catch (error) {
        await t.rollback();
        res.status(500).json({
            error: error.message,
        });
    }
};


export const markAttendance = async (req, res) => {
    try {
        const {
            studentId,
            date,
            classId,
            status = "Present",
        } = {
            ...req.query,
            ...req.body,
        };

        if (!studentId || !date) {
            return res.status(400).json({
                error: "StudentId and Date are required",
            });
        }

        const student = await Student.findByPk(studentId);

        if (!student) {
            return res.status(404).json({
                error: "Student not found",
            });
        }

        const resolvedClassId = classId || student.classId;

        if (!resolvedClassId) {
            return res.status(400).json({
                error: "ClassId is required",
            });
        }

        const [record] = await AttendanceRecord.upsert({
            studentId,
            date,
            classId: resolvedClassId,
            status,
        });

        res.status(200).json({
            message: "Attendance marked successfully",
            record,
        });

    } catch (error) {
        res.status(500).json({
            error: error.message,
        });
    }
};


export const getStudentAttendanceOnDate = async (req, res) => {
    try {
        const { studentId, date } = req.query;

        if (!studentId || !date) {
            return res.status(400).json({
                error: "StudentId and Date are required",
            });
        }

        const record = await AttendanceRecord.findOne({
            where: {
                studentId,
                date,
            },
            include: [
                {
                    model: Student,
                    as: "student",
                },
                {
                    model: Class,
                    as: "class",
                },
            ],
        });

        if (!record) {
            return res.status(404).json({
                error: "No record found",
            });
        }

        res.json(record);

    } catch (error) {
        res.status(500).json({
            error: error.message,
        });
    }
};


export const getClassAttendance = async (req, res) => {
    try {
        const { id: classId } = req.params;

        const classObj = await Class.findByPk(classId);

        if (!classObj) {
            return res.status(404).json({
                error: "Class not found",
            });
        }

        const records = await AttendanceRecord.findAll({
            where: {
                classId,
            },
            include: [
                {
                    model: Student,
                    as: "student",
                },
            ],
        });

        res.json({
            class: classObj,
            records,
        });

    } catch (error) {
        res.status(500).json({
            error: error.message,
        });
    }
};


export const getStudentAttendanceSummary = async (req, res) => {
    try {
        const { id: studentId } = req.params;

        const student = await Student.findByPk(studentId, {
            include: [
                {
                    model: Class,
                    as: "class",
                },
            ],
        });

        if (!student) {
            return res.status(404).json({
                error: "Student not found",
            });
        }

        const records = await AttendanceRecord.findAll({
            where: {
                studentId,
            },
            attributes: ["status"],
        });

        const summary = records.reduce(
            (result, record) => {
                result.totalDays++;

                if (result[record.status] !== undefined) {
                    result[record.status]++;
                }

                return result;
            },
            {
                totalDays: 0,
                Present: 0,
                Absent: 0,
                Late: 0,
            }
        );

        res.json({
            student,
            summary,
        });

    } catch (error) {
        res.status(500).json({
            error: error.message,
        });
    }
};