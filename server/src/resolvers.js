const resolvers = {
  Query: {
    author: async(_, { id }, { dataSources }) => {
      return dataSources.bookRepo.findAuthor({ id });
    },
    authors: async(_, _args, { dataSources }) => {
      return dataSources.bookRepo.getAuthors();
    },
    books: async(_, _args, { dataSources }) => {
      return dataSources.bookRepo.getBooks();  
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