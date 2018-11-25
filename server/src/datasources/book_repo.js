const { DataSource } = require('apollo-datasource');

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

  async getBooks() {
    return await this.store.BookModel.findAll({
      include: [{ all: true }]
    });
  }
}

module.exports = BookRepo;