import React from 'react';
import { withRouteData, Head } from 'react-static';
import Page from '../components/page';
import MarkdownContainer from '../components/markdown-container';

export default withRouteData(({ aboutHtml }) => (
  <React.Fragment>
    <Head>
      <title>{'Knots and Rows | About'}</title>
      <meta name="description" content="Learn more about Knots and Rows!" />
    </Head>
    <Page>
      <MarkdownContainer dangerouslySetInnerHTML={{ __html: aboutHtml }} />
    </Page>
  </React.Fragment>
));
