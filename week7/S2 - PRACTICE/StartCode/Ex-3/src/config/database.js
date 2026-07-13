import { Sequelize } from 'sequelize';

const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: './Ex-3/src/data/database.sqlite'
});

export default sequelize;