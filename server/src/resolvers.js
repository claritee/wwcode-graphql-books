const resolvers = {
  Query: {
    books: async(_, _args, { dataSources }) => {
      return dataSources.bookRepo.getBooks();  
    }
  }
};

module.exports = resolvers;