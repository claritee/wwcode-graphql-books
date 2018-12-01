import { ApolloClient } from "apollo-client";
import {InMemoryCache} from 'apollo-cache-inmemory';
import {HttpLink} from 'apollo-link-http';
import gql from "graphql-tag";

const cache = new InMemoryCache();
const client = new ApolloClient({
  cache,
  link: new HttpLink({
    uri: 'http://localhost:4000/graphql'
  }),
});

const query = gql`
  query getbooks {
    books(limit: 5, cursor: 10) {
      id
      title
      year
      author {
        firstname
      }
    }
  }
`;

const body = document.body;
client.query({ query }).then((results) => {
  results.data.books.forEach( (book) => render(body, book) );
});

const render = (body, book) => {
  const bookElement = document.createElement('book');
  const domString = `
    <p>
      <strong>${book.title}</strong> by ${book.author.firstname}
    </p>
  `;
  bookElement.innerHTML = domString;
  body.appendChild(bookElement);
};