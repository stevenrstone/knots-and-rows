import React from 'react'; // eslint-disable-line
import styled from 'react-emotion';
import theme from '../theme';

const MarkdownContainer = styled('div')`
  color: ${theme.colors.copy};
  font-family: ${theme.fonts.primary};
  padding: 1rem;

  img {
    display: inline-block;
    margin: 0 0.5rem 0.5rem 0;
    max-width: 100%;
  }
`;

export default MarkdownContainer;
