const resolvers = {
  Query: {
    hello(_, args) {
      return "Hello World"
    },
    books(_, args) {
      return [{ 
        year: 2013,
        title: "Lean In",
        author: "Sheryl Sandberg"
      },
      { 
        year: 2008,
        title: "Outliers",
        author: "Malcolm Gladwell"
      }]
    }
  }
};

module.exports = resolvers;