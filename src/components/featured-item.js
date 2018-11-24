import React from 'react'; // eslint-disable-line
import styled from 'react-emotion';
import theme from '../theme';

const FeaturedItem = styled('img')`
  border: 0.5rem ridge ${theme.colors.bars};
  display: inline-block;
  flex-basis: 25%;
  // height: 25vw;
  object-fit: contain;
  object-position: center;

  @media (max-width: 768px) {
    flex: auto;
    height: auto;
    margin: 2rem auto;
    width: 90%;
  }
`;

export default FeaturedItem;
