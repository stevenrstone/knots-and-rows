import React from 'react';
import { withRouteData, Head } from 'react-static';
import Page from '../components/page';
import StyledLink, { InlineLink } from '../components/styled-link';

export default withRouteData(({ patterns }) => (
  <React.Fragment>
    <Head>
      <title>{'Knots and Rows | Patterns'}</title>
      <meta
        name="description"
        content="Free knitting and crocheting patterns from Knots and Rows"
      />
      <meta
        name="og:image"
        content="https://knotsandrows.com/featured-phoenix-rising.jpg"
      />
    </Head>
    <Page>
      <ul>
        {patterns.map(pattern => (
          <li key={pattern.split('.')[0]}>
            <StyledLink
              to={`/patterns/${pattern.split('.')[0]}`}
              className={InlineLink}
            >
              {pattern
                .split('.')[0]
                .split('-')
                .map(word => word.charAt(0).toUpperCase() + word.slice(1))
                .join(' ')}
            </StyledLink>
          </li>
        ))}
      </ul>
    </Page>
  </React.Fragment>
));
