import React from 'react';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';

import { Loading } from '../components';

const GET_BOOKS = gql`
  query GetBookList {
    books(limit: 5, cursor: 5) {
      id
      title
      year
      author {
        firstname
      }
    }
  }
`;

export default function Launches() {
  return (
    <Query query={GET_BOOKS}>
      {({ data, loading, error }) => {
        if (loading) return <Loading />;
        if (error) {
          console.log(error);
          return <p>ERROR</p>;
        }

        return (
          data.books && 
          data.books.map(book => (
            <div key={book.id}>{book.title} by {book.author.firstname}</div>
          ))
        );
      }}  
    </Query>  
  );
}
