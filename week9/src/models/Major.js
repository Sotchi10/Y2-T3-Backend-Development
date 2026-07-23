import { DataTypes, Model } from "sequelize";
import sequelize from "../config/database.js";

class Major extends Model {}

Major.init(
  {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    name: { type: DataTypes.STRING(120), allowNull: false },
    description: { type: DataTypes.TEXT, allowNull: true },
    status: { type: DataTypes.BOOLEAN, allowNull: false, defaultValue: true }
  },
  {
    sequelize,
    modelName: "Major",
    tableName: "major_tbl",
    timestamps: false
  }
);

export default Major;
