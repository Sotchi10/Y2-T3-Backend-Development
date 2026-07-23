import { DataTypes, Model } from "sequelize";
import sequelize from "../config/database.js";

class Course extends Model {}

Course.init(
  {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    name: { type: DataTypes.STRING(120), allowNull: false },
    credit: { type: DataTypes.DOUBLE, allowNull: false },
    hours: { type: DataTypes.DOUBLE, allowNull: true },
    status: { type: DataTypes.BOOLEAN, allowNull: false, defaultValue: true },
    major_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: { model: "major_tbl", key: "id" }
    }
  },
  {
    sequelize,
    modelName: "Course",
    tableName: "course_tbl",
    timestamps: false
  }
);

export default Course;
