import { DataTypes, Model } from "sequelize";
import sequelize from "../config/database.js";

class Score extends Model {}

Score.init(
  {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    score: { type: DataTypes.DOUBLE, allowNull: false },
    academic_year: { type: DataTypes.STRING(30), allowNull: false },
    course_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: { model: "course_tbl", key: "id" }
    },
    student_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: { model: "student_tbl", key: "id" }
    }
  },
  {
    sequelize,
    modelName: "Score",
    tableName: "score_tbl",
    timestamps: false
  }
);

export default Score;
