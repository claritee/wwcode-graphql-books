const { gql } = require('apollo-server');

const typeDefs = gql`
  type Query {
    hello: String,
    books: [Book] 
  },
  type Book {
    year: Int
    title: String
    author: String
  }
`

module.exports = typeDefs;