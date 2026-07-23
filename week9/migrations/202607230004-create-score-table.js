import { DataTypes, Op } from "sequelize";

export async function up({ context: queryInterface }) {
    await queryInterface.createTable("score_tbl", {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
      },
      score: { type: DataTypes.DOUBLE, allowNull: false },
      academic_year: { type: DataTypes.STRING(30), allowNull: false },
      course_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: { model: "course_tbl", key: "id" },
        onUpdate: "CASCADE",
        onDelete: "CASCADE"
      },
      student_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: { model: "student_tbl", key: "id" },
        onUpdate: "CASCADE",
        onDelete: "CASCADE"
      }
    });

    await queryInterface.addConstraint("score_tbl", {
      fields: ["score"],
      type: "check",
      where: {
        score: { [Op.between]: [0, 100] }
      },
      name: "score_tbl_score_range"
    });

    await queryInterface.addIndex("score_tbl", ["academic_year", "score"]);
    await queryInterface.addIndex("score_tbl", ["student_id"]);
    await queryInterface.addIndex("score_tbl", ["course_id"]);
}

export async function down({ context: queryInterface }) {
    await queryInterface.dropTable("score_tbl");
}
