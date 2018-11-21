import React from 'react';
import { Link } from 'react-static';
// import styled from 'astroturf';
import { css } from 'astroturf';

const NavLink = ({ to, children }) => {
  const styles = css`
    @import '../theme.scss';
    .linkStyle {
      color: $colorLink;
      font-family: $fontPrimary;
      margin: 0 1rem;
      text-decoration: none;

      &:hover {
        cursor: pointer;
        text-decoration: underline;
      }

      &:visited {
        color: $colorLinkVisited;
      }

      @media (max-width: 768px) {
        padding: 1rem 0;
      }
    }
  `;

  return (
    <Link to={to} prefetch="true" className={styles.linkStyle}>
      {children}
    </Link>
  );
};

export default NavLink;
