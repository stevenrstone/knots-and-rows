import React from 'react';
import { withRouteData, Head } from 'react-static';
import Page from '../components/page';
import MarkdownContainer from '../components/markdown-container';

export default withRouteData(({ patternHtml }) => (
  <React.Fragment>
    <Head>
      <title>{'Knots and Rows | Patterns'}</title>
    </Head>
    <Page>
      <MarkdownContainer dangerouslySetInnerHTML={{ __html: patternHtml }} />
    </Page>
  </React.Fragment>
));
