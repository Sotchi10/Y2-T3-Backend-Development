import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";

const Class = sequelize.define("Class", {
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    code: {
        type: DataTypes.STRING,
        unique: true,
    },
});

export default Class;