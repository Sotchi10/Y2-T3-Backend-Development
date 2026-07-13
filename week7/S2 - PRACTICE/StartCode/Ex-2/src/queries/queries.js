import { Author, Book } from '../models/index.js';

// Fetch all books by a given author.
export const getBooksByAuthor = async (name) => {
  const author = await Author.findOne({
    where: { name },
    include: Book
  });

  console.log(author.Books);
};

// Create a new book for an existing author using .createBook().
export const createBookForAuthor = async (name) => {
  const author = await Author.findOne({ where: { name } });

  const book = await author.createBook({
    title: "New Book",
    publicationYear: 2026,
    pages: 300
  });

  console.log(book);
};

// List all authors along with their books (include).	
export const listAuthorsWithBooks = async () => {
  const authors = await Author.findAll({
    include: Book
  });

  console.log(JSON.stringify(authors, null, 2));
};