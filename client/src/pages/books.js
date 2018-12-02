import React from 'react';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';

import { Loading, Button } from '../components';

const GET_BOOKS_PAGINATED = gql`
  query getBooksPaginated($after: Int) {
    getBooks(after: $after, pageSize: 5) {
      hasMore
      cursor
      books {
        id
        title
        author {
          firstname
        }
      }
    }
  }
`;

export default function books() {
  return (
    <Query query={GET_BOOKS_PAGINATED}>
      {({ data, loading, error, fetchMore }) => {
        if (loading) return <Loading />;
        if (error) {
          console.log(error);
          return <p>ERROR</p>;
        }

        console.log(data);

        return (
          <div>
            {data.getBooks && 
              data.getBooks.books.map(book => (
                <div key={book.id}>{book.title} by {book.author.firstname}</div>
              ))}
            {data.getBooks && 
              data.getBooks.hasMore && (
                <Button
                  onClick={() =>
                    fetchMore({
                      variables: {
                        after: parseInt(data.getBooks.cursor),
                      },
                      updateQuery: (prev, { fetchMoreResult, ...rest }) => {
                        if (!fetchMoreResult) return prev;
                        return {
                          ...fetchMoreResult,
                          getBooks: {
                            ...fetchMoreResult.getBooks,
                            getBooks: [
                              ...prev.getBooks.books,
                              ...fetchMoreResult.getBooks.books,
                            ],
                          },
                        };
                      },
                    })
                  }
                >
                Load More
                </Button>
              )}
          </div>
        );
      }}  
    </Query>  
  );
}
