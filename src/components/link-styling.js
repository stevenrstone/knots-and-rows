import React from 'react';
import { css } from 'astroturf';

const styles = css`
  @import '../theme.scss';

  .linkStyle {
    color: $colorLink;
    font-family: $fontPrimary;
    text-decoration: none;

    &:hover {
      cursor: pointer;
      text-decoration: underline;
    }

    &:visited {
      color: $colorLinkVisited;
    }
  }
`;

export default styles.linkStyle;
