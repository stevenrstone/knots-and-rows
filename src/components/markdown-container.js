import React from 'react'; // eslint-disable-line
import styled from 'react-emotion';
import theme from '../theme';

const MarkdownContainer = styled('div')`
color: ${theme.colors.copy};
font-family: ${theme.fonts.primary};
  padding: 1rem;
`;

export default MarkdownContainer;
