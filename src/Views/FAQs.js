import React from 'react';
import { withRouteData, Head } from 'react-static';
import Page from '../components/page';
import MarkdownContainer from '../components/markdown-container';

export default withRouteData(({ faqsHtml }) => (
  <React.Fragment>
    <Head>
      <title>{'Knots and Rows | Frequently Asked Questions'}</title>
      <meta
        name="description"
        content="What dyes do we use? How do we wash our yarn? Can we cake your yarn? When will your yarn ship? Find these answers here."
      />
    </Head>
    <Page>
      <MarkdownContainer dangerouslySetInnerHTML={{ __html: faqsHtml }} />
    </Page>
  </React.Fragment>
));
