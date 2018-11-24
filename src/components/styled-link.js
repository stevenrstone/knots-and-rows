import React from 'react'; // eslint-disable-line
import { Link } from 'react-static';
import { css } from 'react-emotion';
import linkStyle from './link-styling';

const StyledLink = ({ to, children }) => (
  <Link to={to} prefetch="true" className={linkStyle}>
    {children}
  </Link>
);

const InlineLink = css`
  display: inline;
  margin: 0;
`;

export { InlineLink };
export default StyledLink;
