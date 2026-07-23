import { DataTypes, Model } from "sequelize";
import sequelize from "../config/database.js";

class Student extends Model {}

Student.init(
  {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    firstname: { type: DataTypes.STRING(30), allowNull: false },
    lastname: { type: DataTypes.STRING(120), allowNull: false },
    sex: {
      type: DataTypes.ENUM("male", "female", "other"),
      allowNull: true
    },
    dob: { type: DataTypes.DATEONLY, allowNull: true },
    status: { type: DataTypes.BOOLEAN, allowNull: false, defaultValue: true },
    address: { type: DataTypes.TEXT, allowNull: true },
    tel: { type: DataTypes.STRING(30), allowNull: true }
  },
  {
    sequelize,
    modelName: "Student",
    tableName: "student_tbl",
    timestamps: false
  }
);

export default Student;
