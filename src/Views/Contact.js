import React from 'react';
import { Head } from 'react-static';
import Page from '../components/page';
import Paragraph from '../components/paragraph';
import StyledLink, { InlineLink } from '../components/styled-link';

export default () => (
  <React.Fragment>
    <Head>
      <title>{'Knots and Rows | Contact Us'}</title>
      <meta
        name="description"
        content="Need to contact us at Knots and Rows?"
      />
    </Head>
    <Page>
      <Paragraph>
        Couldn't find what you were looking for? Or you want to place a larger
        order? Let us know!
      </Paragraph>
      <Paragraph>
        <StyledLink className={InlineLink} to="mailto:knots.and.rows@gmail.com">
          knots.and.rows@gmail.com
        </StyledLink>
      </Paragraph>
    </Page>
  </React.Fragment>
);
