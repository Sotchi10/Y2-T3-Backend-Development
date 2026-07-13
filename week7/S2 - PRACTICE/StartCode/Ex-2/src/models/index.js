import sequelize from '../config/database.js';
import Author from './Author.js';
import Book from './Book.js';

Author.hasMany(Book);
Book.belongsTo(Author);

export {
  sequelize,
  Author,
  Book
};