import React from 'react'; // eslint-disable-line
import styled from 'astroturf';

const MarkdownContainer = styled('div')`
  @import '../theme.scss';
  color: $colorCopy;
  font-family: $fontPrimary;
  padding: 1rem;

  img {
    display: inline-block;
    margin: 0 0.5rem 0.5rem 0;
  }
`;

export default MarkdownContainer;
