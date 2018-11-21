import React from 'react';
import styled from 'astroturf';
import Afterbar from './after-bar';

const LegalCopy = styled('p')`
  @import '../theme.scss';
  color: $colorCopy;
  margin: 1rem auto;
  max-width: 80%;
`;

export default () => (
  <React.Fragment>
    <Afterbar />
    <LegalCopy>
      &copy; {new Date().getFullYear()} Knots and Rows, Inc. Website built and
      maintained by{' '}
      <a href="https://stone.codes" target="_blank" rel="noreferer">
        Stone Code Productions
      </a>
      .<br />
      This site uses cookies to make sure you keep the right cart. All personal
      data handled by{' '}
      <a
        href="https://www.shopify.com/legal/privacy"
        target="_blank"
        rel="noreferer"
      >
        Shopify
      </a>
      .
    </LegalCopy>
  </React.Fragment>
);
