import React from 'react';
import ReactDOM from 'react-dom';

import { ApolloClient } from "apollo-client";
import { ApolloProvider } from 'react-apollo';
import {InMemoryCache} from 'apollo-cache-inmemory';
import {HttpLink} from 'apollo-link-http';
import gql from "graphql-tag";

import Pages from './pages';

const cache = new InMemoryCache();
const client = new ApolloClient({
  cache,
  link: new HttpLink({
    uri: 'http://localhost:4000/graphql'
  }),
});

client
  .query({
    query: gql`
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
    `
  })
  .then(result => console.log(result));

ReactDOM.render(
  <ApolloProvider client={client}>
    <Pages />
  </ApolloProvider>, document.getElementById('root')
);