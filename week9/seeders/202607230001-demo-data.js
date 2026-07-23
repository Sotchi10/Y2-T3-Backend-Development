export async function up({ context: queryInterface }) {
    await queryInterface.bulkInsert("major_tbl", [
      {
        id: 1,
        name: "Software Engineering",
        description: "Software design and development",
        status: true
      },
      {
        id: 2,
        name: "Data Science",
        description: "Data analysis and intelligent systems",
        status: true
      }
    ]);

    await queryInterface.bulkInsert("student_tbl", [
      {
        id: 1,
        firstname: "Dara",
        lastname: "Sok",
        sex: "male",
        dob: "2005-02-12",
        status: true,
        address: "Phnom Penh",
        tel: "010111222"
      },
      {
        id: 2,
        firstname: "Sophea",
        lastname: "Chan",
        sex: "female",
        dob: "2004-08-21",
        status: true,
        address: "Kandal",
        tel: "010333444"
      },
      {
        id: 3,
        firstname: "Vanna",
        lastname: "Lim",
        sex: "other",
        dob: "2005-05-09",
        status: true,
        address: "Siem Reap",
        tel: "010555666"
      }
    ]);

    await queryInterface.bulkInsert("course_tbl", [
      {
        id: 1,
        name: "Backend Development",
        credit: 3,
        hours: 45,
        status: true,
        major_id: 1
      },
      {
        id: 2,
        name: "Database Systems",
        credit: 3,
        hours: 45,
        status: true,
        major_id: 1
      },
      {
        id: 3,
        name: "Legacy Programming",
        credit: 2,
        hours: 30,
        status: false,
        major_id: 1
      },
      {
        id: 4,
        name: "Data Analytics",
        credit: 3,
        hours: 45,
        status: true,
        major_id: 2
      }
    ]);

    await queryInterface.bulkInsert("score_tbl", [
      {
        id: 1,
        score: 92,
        academic_year: "2025-2026",
        course_id: 1,
        student_id: 1
      },
      {
        id: 2,
        score: 86,
        academic_year: "2025-2026",
        course_id: 2,
        student_id: 1
      },
      {
        id: 3,
        score: 78,
        academic_year: "2025-2026",
        course_id: 1,
        student_id: 2
      },
      {
        id: 4,
        score: 58,
        academic_year: "2025-2026",
        course_id: 2,
        student_id: 2
      },
      {
        id: 5,
        score: 88,
        academic_year: "2025-2026",
        course_id: 4,
        student_id: 3
      },
      {
        id: 6,
        score: 90,
        academic_year: "2025-2026",
        course_id: 3,
        student_id: 1
      },
      {
        id: 7,
        score: 72,
        academic_year: "2024-2025",
        course_id: 1,
        student_id: 3
      }
    ]);
}

export async function down({ context: queryInterface }) {
    await queryInterface.bulkDelete("score_tbl", null, {});
    await queryInterface.bulkDelete("course_tbl", null, {});
    await queryInterface.bulkDelete("student_tbl", null, {});
    await queryInterface.bulkDelete("major_tbl", null, {});
}
