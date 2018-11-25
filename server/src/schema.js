const { gql } = require('apollo-server');

const typeDefs = gql`
  type Query {
    hello: String,
    author(id: ID!): Author,
    authors: [Author],
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
  input BookInput {
    title: String!,
    year: Int!,
    authorId: Int!
  },
  type Mutation{
    createAuthor(firstname: String!, lastname: String!): Author!
    createBook(input: BookInput!): Book!
  }
`

module.exports = typeDefs;