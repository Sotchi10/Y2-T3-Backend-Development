import { DataTypes } from "sequelize";

export async function up({ context: queryInterface }) {
    await queryInterface.createTable("student_tbl", {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
      },
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
    });
}

export async function down({ context: queryInterface }) {
    await queryInterface.dropTable("student_tbl");
}
