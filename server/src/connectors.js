const SQL = require('sequelize');
const casual = require('casual');

module.exports.createStore = () => {
  const Op = SQL.Op;
  const operatorsAliases = {
    $in: Op.in,
  };

  const db = new SQL('database', 'username', 'password', {
    dialect: 'sqlite',
    storage: './store.sqlite',
    operatorsAliases,
    logging: false,
  });

  const BookModel = db.define('book', {
    id: {
      type: SQL.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    createdAt: SQL.DATE,
    updatedAt: SQL.DATE,
    title: { type: SQL.STRING },
    year: { type: SQL.INTEGER },
  });

  casual.seed(123);
  db.sync({ force: true }).then(() => {
    return BookModel.create({
      title: "Drive",
      year: 2009,
    });
  });

  return { BookModel };
};