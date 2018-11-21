import React from 'react';
import { Link } from 'react-static';
import { css } from 'astroturf';
import linkStyle from './link-styling';

const StyledLink = ({ to, children }) => (
  <Link to={to} prefetch="true" className={linkStyle}>
    {children}
  </Link>
);

const InlineLink = css`
  .inlineLink {
    display: inline;
    margin: 0;
  }
`;

export { InlineLink };
export default StyledLink;
