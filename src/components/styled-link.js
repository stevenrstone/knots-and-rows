import React from 'react';
import { Link } from 'react-static';
import { css } from 'emotion';
import theme from '../theme';

const NavLink = ({ to, children }) => {
  const linkStyle = css`
    color: ${theme.colors.link};
    font-family: ${theme.fonts.primary};
    text-decoration: none;

    &:hover {
      cursor: pointer;
      text-decoration: underline;
    }

    &:visited {
      color: ${theme.colors.linkVisited};
    }
  `;

  return (
    <Link to={to} prefetch="true" className={linkStyle}>
      {children}
    </Link>
  );
};

export default NavLink;
