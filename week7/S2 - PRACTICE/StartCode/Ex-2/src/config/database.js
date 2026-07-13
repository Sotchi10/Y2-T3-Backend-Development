import { Sequelize } from 'sequelize';

const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: './Ex-2/src/data/database.sqlite'
});

export default sequelize;