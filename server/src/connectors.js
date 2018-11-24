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

  const AuthorModel = db.define('author', {
    id: {
      type: SQL.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    createdAt: SQL.DATE,
    updatedAt: SQL.DATE,
    firstname: { type: SQL.STRING },
    lastname: { type: SQL.STRING },
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

  AuthorModel.hasMany(BookModel);
  BookModel.belongsTo(AuthorModel, { foreignKey: 'author_id' });

  casual.seed(123);
  db.sync({ force: true }).then(() => {
    AuthorModel.create({
      firstname: "Dan",
      lastname: "Pink"
    }).then((author) => {
      return BookModel.create({
        title: "Drive",
        year: 2009,
        author_id: author.id
      });
    })
    return true;
  });

  return { AuthorModel, BookModel };
};