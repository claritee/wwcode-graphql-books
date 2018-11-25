const { gql } = require('apollo-server');

const typeDefs = gql`
  type Query {
    hello: String,
    author(id: ID!): Author,
    books: [Book] 
  },
  type Author {
    id: ID!,
    firstname: String,
    lastname: String
  },
  type Book {
    id: ID!,
    year: Int
    title: String
    author: Author
  },
  type Mutation{
    createAuthor(firstname: String!, lastname: String!): Author!
  }
`

module.exports = typeDefs;