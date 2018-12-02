const resolvers = {
  Query: {
    author: async(_, { id }, { dataSources }) => {
      return dataSources.bookRepo.findAuthor({ id });
    },
    authors: async(_, _args, { dataSources }) => {
      return dataSources.bookRepo.getAuthors();
    },
    books: async(_, args, { dataSources }) => {
      return dataSources.bookRepo.getBooks(args);  
    },
    getBooks: async(_, { after, pageSize }, { dataSources }) => {
      const totalResult = await dataSources.bookRepo.getBookTotal();
      total = totalResult[0].dataValues.total;

      let booksResult = await dataSources.bookRepo.getPaginatedBooks({ after, pageSize });
      let booksLength = booksResult.length;
      cursor = (total > 0 && booksLength > 0) ? booksResult[booksLength - 1].dataValues.id : 0;
      hasMore = cursor < (total - 1)

      return {
        cursor: cursor,
        hasMore: hasMore,
        books: booksResult
      };
    }
  },
  Mutation: {
    createAuthor: async(_, args, { dataSources }) => {
      return dataSources.bookRepo.createAuthor(args)
    },
    createBook: async(_, { input }, { dataSources }) => {
      return dataSources.bookRepo.createBook(input)
    }
  }
};

module.exports = resolvers;