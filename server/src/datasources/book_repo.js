const { DataSource } = require('apollo-datasource');
const { Sequelize } = require('sequelize');

class BookRepo extends DataSource {
  constructor({ store }) {
    super();
    this.store = store;
  }

  initialize(config) {
    this.context = config.context;
  }

  async findAuthor({ id }) {
    return await this.store.AuthorModel.findByPk(id);
  }

  async createAuthor({ firstname, lastname }) {
    return await this.store.AuthorModel.create({
      firstname: firstname,
      lastname: lastname
    });
  }

  async getAuthors() {
    return await this.store.AuthorModel.findAll();
  }

  async getBooks({ cursor, limit = 5 }) {
    return await this.store.BookModel.findAll({
      include: [{ all: true }],
      limit,
      where: {
        year: {
          [Sequelize.Op.lt]: cursor
        }
      }
    });
  }

  async createBook({ title, year, authorId }) {
    return await this.store.BookModel.create({
      title: title,
      year: year,
      author_id: authorId
    });
  }
}

module.exports = BookRepo;