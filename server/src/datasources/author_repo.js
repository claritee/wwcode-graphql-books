const { DataSource } = require('apollo-datasource');

class AuthorRepo extends DataSource {
  constructor({ store }) {
    super();
    this.store = store;
  }

  initialize(config) {
    this.context = config.context;
  }

  async find({ id }) {
    return await this.store.AuthorModel.findByPk(id);
  }
}

module.exports = AuthorRepo;