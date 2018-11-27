import React from 'react'; // eslint-disable-line
import styled, { css } from 'react-emotion';
import theme from '../theme';

const FeaturedItem = styled('img')`
  border: 0.5rem ridge ${theme.colors.bars};
  box-sizing: border-box;
  display: inline-block;
  max-width: 100%;
  object-fit: contain;
  object-position: center;
`;

export const featuredLink = css`
  flex-basis: 25%;

  @media (max-width: 768px) {
    flex: auto;
    height: auto;
    margin: 2rem auto;
    width: 90%;
  }
`;

export default FeaturedItem;
