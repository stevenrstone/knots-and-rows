import React from 'react';
import { withRouteData, Head } from 'react-static';
import Page from '../components/page';
import StyledLink, { InlineLink } from '../components/styled-link';

export default withRouteData(({ patterns }) => (
  <React.Fragment>
    <Head>
      <title>{'Knots and Rows | Patterns'}</title>
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
