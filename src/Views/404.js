import React from 'react';
import { Head } from 'react-static';
import Page from '../components/page';
import Paragraph from '../components/paragraph';

export default () => (
  <React.Fragment>
    <Head>
      <title>{'Knots and Rows | 404'}</title>
      <meta
        name="description"
        content="Welcome to Knots and Rows! You found our 404 page."
      />
    </Head>
    <Page>
      <Paragraph>
        Our technical support alpacas couldn't find what you were looking for.
        Try one of the links above &mdash; they'll be sure to help you from
        there.
      </Paragraph>
    </Page>
  </React.Fragment>
);
