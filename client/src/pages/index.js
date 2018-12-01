import React from 'react';
import { Router } from '@reach/router';

import Books from './books';
import { PageContainer } from '../components';

export default function Pages() {
  return (
      <PageContainer>
        <Router primary={false} >
          <Books path="/" />
        </Router>
      </PageContainer>
  );
}
