const resolvers = {
  Query: {
    author: async(_, { id }, { dataSources }) => {
      return dataSources.authorRepo.find({ id });
    },
    books: async(_, _args, { dataSources }) => {
      return dataSources.bookRepo.getBooks();  
    }
  }
};

module.exports = resolvers;