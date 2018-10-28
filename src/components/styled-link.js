import React from 'react';
import { Link } from 'react-static';
import linkStyle from './link-styling';

const StyledLink = ({ to, children }) => (
  <Link to={to} prefetch="true" className={linkStyle}>
    {children}
  </Link>
);

export default StyledLink;
