const resolvers = {
  Query: {
    hello(_, args) {
      return "Hello!"
    }
  }
};

module.exports = resolvers;