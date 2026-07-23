import { Op, fn, col, literal } from "sequelize";
import { Student, Score, Course, Major } from "../models/index.js";
import {
  optionalNumber,
  positiveInteger,
  rounded
} from "../utils/query.js";

const studentAttributes = ["id", "firstname", "lastname"];
const courseAttributes = ["id", "name", "credit"];
const majorAttributes = ["id", "name"];

const toScoreReport = (row) => ({
  student_id: row.student.id,
  full_name: `${row.student.firstname} ${row.student.lastname}`,
  course: row.course.name,
  score: Number(row.score),
  academic_year: row.academic_year
});

export async function highPerformingStudents(req, res, next) {
  try {
    const academicYear = req.query.academicYear || "2025-2026";
    const minScore =
      optionalNumber(req.query.minScore, "minScore", { min: 0, max: 100 }) ??
      85;

    const rows = await Score.findAll({
      where: {
        academic_year: academicYear,
        score: { [Op.gte]: minScore }
      },
      include: [
        {
          model: Student,
          as: "student",
          attributes: studentAttributes,
          required: true
        },
        {
          model: Course,
          as: "course",
          attributes: courseAttributes,
          where: { status: true },
          required: true
        }
      ],
      order: [["score", "DESC"]]
    });

    res.json({ count: rows.length, data: rows.map(toScoreReport) });
  } catch (error) {
    next(error);
  }
}

export async function searchScores(req, res, next) {
  try {
    const academicYear = req.query.academicYear || "2025-2026";
    const keyword = req.query.keyword?.trim();
    const requestedMin = optionalNumber(req.query.minScore, "minScore", {
      min: 0,
      max: 100
    });
    const requestedMax = optionalNumber(req.query.maxScore, "maxScore", {
      min: 0,
      max: 100
    });
    const minScore = requestedMin ?? (keyword ? 0 : 60);
    const maxScore = requestedMax ?? (keyword ? undefined : 90);

    if (maxScore !== undefined && minScore > maxScore) {
      const error = new Error("minScore cannot be greater than maxScore");
      error.status = 400;
      throw error;
    }

    const scoreCondition =
      maxScore === undefined
        ? { [Op.gte]: minScore }
        : { [Op.between]: [minScore, maxScore] };

    const studentWhere = keyword
      ? {
          [Op.or]: [
            { firstname: { [Op.like]: `%${keyword}%` } },
            { lastname: { [Op.like]: `%${keyword}%` } }
          ]
        }
      : undefined;

    const rows = await Score.findAll({
      where: {
        score: scoreCondition,
        academic_year: academicYear
      },
      include: [
        {
          model: Student,
          as: "student",
          attributes: studentAttributes,
          where: studentWhere,
          required: true
        },
        {
          model: Course,
          as: "course",
          attributes: courseAttributes,
          required: true
        }
      ],
      order: [
        [{ model: Student, as: "student" }, "firstname", "ASC"],
        ["score", "DESC"]
      ]
    });

    res.json({
      filters: { academicYear, keyword: keyword || null, minScore, maxScore },
      count: rows.length,
      data: rows.map(toScoreReport)
    });
  } catch (error) {
    next(error);
  }
}

export async function fullAcademicReport(req, res, next) {
  try {
    const where = req.query.academicYear
      ? { academic_year: req.query.academicYear }
      : undefined;

    const rows = await Score.findAll({
      where,
      include: [
        {
          model: Student,
          as: "student",
          attributes: studentAttributes,
          required: true
        },
        {
          model: Course,
          as: "course",
          attributes: courseAttributes,
          required: true,
          include: [
            {
              model: Major,
              as: "major",
              attributes: majorAttributes,
              required: true
            }
          ]
        }
      ],
      order: [
        ["academic_year", "DESC"],
        [{ model: Student, as: "student" }, "firstname", "ASC"]
      ]
    });

    const data = rows.map((row) => ({
      student_id: row.student.id,
      student: `${row.student.firstname} ${row.student.lastname}`,
      score: Number(row.score),
      academic_year: row.academic_year,
      course: row.course.name,
      credit: Number(row.course.credit),
      major: row.course.major.name
    }));

    res.json({ count: data.length, data });
  } catch (error) {
    next(error);
  }
}

export async function studentAverages(req, res, next) {
  try {
    const scoreWhere = req.query.academicYear
      ? { academic_year: req.query.academicYear }
      : undefined;

    const rows = await Student.findAll({
      attributes: [
        "id",
        "firstname",
        "lastname",
        [fn("AVG", col("scores.score")), "average_score"]
      ],
      include: [
        {
          model: Score,
          as: "scores",
          attributes: [],
          where: scoreWhere,
          required: true
        }
      ],
      group: ["Student.id", "Student.firstname", "Student.lastname"],
      order: [[literal("average_score"), "DESC"]],
      raw: true
    });

    const data = rows.map((row) => ({
      student_id: row.id,
      full_name: `${row.firstname} ${row.lastname}`,
      average_score: rounded(row.average_score)
    }));

    res.json({ count: data.length, data });
  } catch (error) {
    next(error);
  }
}

export async function studentPerformance(req, res, next) {
  try {
    const academicYear = req.query.academicYear;
    const rows = await Student.findAll({
      attributes: [
        "id",
        "firstname",
        "lastname",
        [fn("COUNT", col("scores.id")), "courses_taken"],
        [fn("AVG", col("scores.score")), "average_score"],
        [fn("MIN", col("scores.score")), "lowest_score"],
        [fn("MAX", col("scores.score")), "highest_score"]
      ],
      include: [
        {
          model: Score,
          as: "scores",
          attributes: [],
          where: academicYear ? { academic_year: academicYear } : undefined,
          required: true
        }
      ],
      group: ["Student.id", "Student.firstname", "Student.lastname"],
      order: [[literal("average_score"), "DESC"]],
      raw: true
    });

    res.json({
      count: rows.length,
      data: rows.map((row) => ({
        student_id: row.id,
        full_name: `${row.firstname} ${row.lastname}`,
        courses_taken: Number(row.courses_taken),
        average_score: rounded(row.average_score),
        lowest_score: rounded(row.lowest_score),
        highest_score: rounded(row.highest_score)
      }))
    });
  } catch (error) {
    next(error);
  }
}

export async function coursePerformance(req, res, next) {
  try {
    const scoreWhere = req.query.academicYear
      ? { academic_year: req.query.academicYear }
      : undefined;

    const rows = await Course.findAll({
      attributes: [
        "id",
        "name",
        "credit",
        [fn("COUNT", col("scores.id")), "student_count"],
        [fn("AVG", col("scores.score")), "average_score"],
        [fn("MIN", col("scores.score")), "lowest_score"],
        [fn("MAX", col("scores.score")), "highest_score"]
      ],
      where: { status: true },
      include: [
        {
          model: Score,
          as: "scores",
          attributes: [],
          where: scoreWhere,
          required: true
        }
      ],
      group: ["Course.id", "Course.name", "Course.credit"],
      order: [[literal("average_score"), "DESC"]],
      raw: true
    });

    res.json({
      count: rows.length,
      data: rows.map((row) => ({
        course_id: row.id,
        course: row.name,
        credit: Number(row.credit),
        student_count: Number(row.student_count),
        average_score: rounded(row.average_score),
        lowest_score: rounded(row.lowest_score),
        highest_score: rounded(row.highest_score)
      }))
    });
  } catch (error) {
    next(error);
  }
}

export async function majorPerformance(req, res, next) {
  try {
    const academicYear = req.query.academicYear;
    const rows = await Major.findAll({
      attributes: [
        "id",
        "name",
        [fn("COUNT", col("courses->scores.id")), "score_count"],
        [fn("AVG", col("courses->scores.score")), "average_score"]
      ],
      where: { status: true },
      include: [
        {
          model: Course,
          as: "courses",
          attributes: [],
          where: { status: true },
          required: true,
          include: [
            {
              model: Score,
              as: "scores",
              attributes: [],
              where: academicYear
                ? { academic_year: academicYear }
                : undefined,
              required: true
            }
          ]
        }
      ],
      group: ["Major.id", "Major.name"],
      order: [[literal("average_score"), "DESC"]],
      raw: true
    });

    res.json({
      count: rows.length,
      data: rows.map((row) => ({
        major_id: row.id,
        major: row.name,
        score_count: Number(row.score_count),
        average_score: rounded(row.average_score)
      }))
    });
  } catch (error) {
    next(error);
  }
}

export async function topStudents(req, res, next) {
  try {
    const limit = positiveInteger(req.query.limit, "limit", 10);
    const academicYear = req.query.academicYear;

    const rows = await Student.findAll({
      attributes: [
        "id",
        "firstname",
        "lastname",
        [fn("AVG", col("scores.score")), "average_score"]
      ],
      include: [
        {
          model: Score,
          as: "scores",
          attributes: [],
          where: academicYear ? { academic_year: academicYear } : undefined,
          required: true
        }
      ],
      group: ["Student.id", "Student.firstname", "Student.lastname"],
      order: [[literal("average_score"), "DESC"]],
      limit,
      subQuery: false,
      raw: true
    });

    res.json({
      count: rows.length,
      data: rows.map((row, index) => ({
        rank: index + 1,
        student_id: row.id,
        full_name: `${row.firstname} ${row.lastname}`,
        average_score: rounded(row.average_score)
      }))
    });
  } catch (error) {
    next(error);
  }
}

export async function atRiskStudents(req, res, next) {
  try {
    const threshold =
      optionalNumber(req.query.threshold, "threshold", { min: 0, max: 100 }) ??
      60;
    const academicYear = req.query.academicYear;

    const rows = await Student.findAll({
      attributes: [
        "id",
        "firstname",
        "lastname",
        [fn("AVG", col("scores.score")), "average_score"]
      ],
      include: [
        {
          model: Score,
          as: "scores",
          attributes: [],
          where: academicYear ? { academic_year: academicYear } : undefined,
          required: true
        }
      ],
      group: ["Student.id", "Student.firstname", "Student.lastname"],
      having: literal(`AVG(\`scores\`.\`score\`) < ${threshold}`),
      order: [[literal("average_score"), "ASC"]],
      raw: true
    });

    res.json({
      threshold,
      count: rows.length,
      data: rows.map((row) => ({
        student_id: row.id,
        full_name: `${row.firstname} ${row.lastname}`,
        average_score: rounded(row.average_score)
      }))
    });
  } catch (error) {
    next(error);
  }
}

export async function passRate(req, res, next) {
  try {
    const passScore =
      optionalNumber(req.query.passScore, "passScore", { min: 0, max: 100 }) ??
      60;
    const where = req.query.academicYear
      ? { academic_year: req.query.academicYear }
      : undefined;

    const total = await Score.count({ where });
    const passed = await Score.count({
      where: {
        ...(where || {}),
        score: { [Op.gte]: passScore }
      }
    });
    const failed = total - passed;

    res.json({
      pass_score: passScore,
      total_scores: total,
      passed,
      failed,
      pass_rate: total === 0 ? 0 : rounded((passed / total) * 100)
    });
  } catch (error) {
    next(error);
  }
}
