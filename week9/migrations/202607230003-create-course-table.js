import { DataTypes } from "sequelize";

export async function up({ context: queryInterface }) {
    await queryInterface.createTable("course_tbl", {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
      },
      name: { type: DataTypes.STRING(120), allowNull: false },
      credit: { type: DataTypes.DOUBLE, allowNull: false },
      hours: { type: DataTypes.DOUBLE, allowNull: true },
      status: { type: DataTypes.BOOLEAN, allowNull: false, defaultValue: true },
      major_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: { model: "major_tbl", key: "id" },
        onUpdate: "CASCADE",
        onDelete: "RESTRICT"
      }
    });

    await queryInterface.addIndex("course_tbl", ["major_id"]);
    await queryInterface.addIndex("course_tbl", ["status"]);
}

export async function down({ context: queryInterface }) {
    await queryInterface.dropTable("course_tbl");
}
