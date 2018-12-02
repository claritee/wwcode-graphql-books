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
        [Sequelize.Op.and]: [
          {
            id: {
              [Sequelize.Op.lte]: cursor
            },  
          },
          {
            id: {
              [Sequelize.Op.gt]: cursor - limit
            },
          }
        ]
      }
    });
  }

  // after: 0, 5, 10
  async getPaginatedBooks({ after = 0, pageSize = 5 }) {
    return await this.store.BookModel.findAll({
      include: [{ all: true }],
      pageSize,
      // attributes: [[Sequelize.fn('COUNT', Sequelize.col('title')), 'total']],
      where: {
        [Sequelize.Op.and]: [
          {
            id: {
              [Sequelize.Op.lte]: after + pageSize
            },  
          },
          {
            id: {
              [Sequelize.Op.gt]: after
            },
          }
        ]
      }
    });
  }

  async getBookTotal() {
    return await this.store.BookModel.findAll({
      attributes: [[Sequelize.fn('COUNT', Sequelize.col('title')), 'total']]
    })
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