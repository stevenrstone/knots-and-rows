import React from 'react';
import { withRouteData, Head } from 'react-static';
import Page from '../components/page';
import MarkdownContainer from '../components/markdown-container';

export default withRouteData(({ faqsHtml }) => (
  <React.Fragment>
    <Head>
      <title>{'Knots and Rows | Frequently Asked Questions'}</title>
    </Head>
    <Page>
      <MarkdownContainer dangerouslySetInnerHTML={{ __html: faqsHtml }} />
    </Page>
  </React.Fragment>
));
