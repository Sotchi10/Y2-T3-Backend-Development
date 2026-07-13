import { sequelize } from './src/models/index.js';
import seedData from './src/seeders/seed.js';
import {
  getBooksByAuthor,
  createBookForAuthor,
  listAuthorsWithBooks
} from './src/queries/queries.js';

const start = async () => {
  try {
    await sequelize.sync({ force: true });
    console.log("Database synced");

    await seedData();

    await getBooksByAuthor("Ronan The Best");
    await createBookForAuthor("Kim Ang");
    await listAuthorsWithBooks();

  } catch (err) {
    console.error(err);
  }
};

start();