import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';

const Book = sequelize.define('Book', {
  title: DataTypes.STRING,
  publicationYear: DataTypes.INTEGER,   
  pages: DataTypes.INTEGER
});

export default Book;