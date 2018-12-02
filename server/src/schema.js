const { gql } = require('apollo-server');

const typeDefs = gql`
  type Query {
    hello: String,
    author(id: ID!): Author,
    authors: [Author],
    books(cursor: Int, limit: Int): [Book],
    """
    Query with connections, in practise this should be called 'books'
    We're keeping the above to show the differences
    """
    getBooks(after: Int, pageSize: Int): BookConnection! 
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

  type BookConnection {
    cursor: String!
    hasMore: Boolean!
    books: [Book]!
  }

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