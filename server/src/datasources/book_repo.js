const { DataSource } = require('apollo-datasource');

class BookRepo extends DataSource {
  constructor({ store }) {
    super();
    this.store = store;
  }

  initialize(config) {
    this.context = config.context;
  }

  async getBooks() {
    return await this.store.BookModel.findAll();
  }
}

module.exports = BookRepo;