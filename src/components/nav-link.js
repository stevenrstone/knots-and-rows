import React from 'react'; // eslint-disable-line
import { Link } from 'react-static';
import { css } from 'emotion';
import theme from '../theme';

const NavLink = ({ to, children }) => {
  const linkStyle = css`
    color: ${theme.colors.link};
    font-family: ${theme.fonts.primary};
    margin: 0 1rem;
    text-decoration: none;

    &:hover {
      cursor: pointer;
      text-decoration: underline;
    }

    &:visited {
      color: ${theme.colors.linkVisited};
    }

    @media (max-width: 768px) {
      padding: 1rem 0;
    }
  `;

  const activeLink = css`
    text-decoration: underline;
  `;

  return (
    <Link
      to={to}
      prefetch="true"
      className={linkStyle}
      activeClassName={activeLink}
    >
      {children}
    </Link>
  );
};

export default NavLink;
