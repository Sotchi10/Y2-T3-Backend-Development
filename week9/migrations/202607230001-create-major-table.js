import { DataTypes } from "sequelize";

export async function up({ context: queryInterface }) {
    await queryInterface.createTable("major_tbl", {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
      },
      name: { type: DataTypes.STRING(120), allowNull: false },
      description: { type: DataTypes.TEXT, allowNull: true },
      status: { type: DataTypes.BOOLEAN, allowNull: false, defaultValue: true }
    });
}

export async function down({ context: queryInterface }) {
    await queryInterface.dropTable("major_tbl");
}
