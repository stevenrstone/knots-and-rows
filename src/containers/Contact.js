import React from 'react';
import { Head } from 'react-static';
import Page from '../components/page';
import Paragraph from '../components/paragraph';
import StyledLink, { InlineLink } from '../components/styled-link';

export default () => (
  <React.Fragment>
    <Head>
      <title>{'Knots and Rows | Contact Us'}</title>
    </Head>
    <Page>
      <Paragraph>
        Couldn't find what you were looking for? Or you want to place a larger
        order? Let us know!
      </Paragraph>
      <Paragraph>
        <StyledLink
          className={InlineLink.inlineLink}
          to="mailto:knots.and.rows@gmail.com"
        >
          knots.and.rows@gmail.com
        </StyledLink>
      </Paragraph>
    </Page>
  </React.Fragment>
);
