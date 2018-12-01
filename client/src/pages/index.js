import React, { Fragment } from 'react';
import { Router } from '@reach/router';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';

import Books from './books';
import { PageContainer } from '../components';

export default function Pages() {
  return (
    <Fragment>
      <PageContainer>
        <Router primary={false} component={Fragment}>
          <Books path="/" />
        </Router>
      </PageContainer>
    </Fragment>
  );
}
