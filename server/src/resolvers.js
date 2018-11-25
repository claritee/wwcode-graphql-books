const resolvers = {
  Query: {
    author: async(_, { id }, { dataSources }) => {
      return dataSources.bookRepo.findAuthor({ id });
    },
    books: async(_, _args, { dataSources }) => {
      return dataSources.bookRepo.getBooks();  
    }
  },
  Mutation: {
    createAuthor: async(_, args, { dataSources }) => {
      return dataSources.bookRepo.createAuthor(args)
    }
  }
};

module.exports = resolvers;